import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

const COOLDOWN_PERIOD = 60 * 60 * 1000 // 1 hour in milliseconds

export async function POST(req: NextRequest) {
  try {
    const ipAddress = req.ip || 'unknown'
    const cookieStore = cookies()
    let cookieId = cookieStore.get('visitor_id')?.value

    if (!cookieId) {
      cookieId = uuidv4()
      cookieStore.set('visitor_id', cookieId, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
    }

    // Check for recent claims
    const recentClaim = await prisma.claimRecord.findFirst({
      where: {
        OR: [
          { ipAddress },
          { cookieId },
        ],
        claimedAt: {
          gte: new Date(Date.now() - COOLDOWN_PERIOD),
        },
      },
      orderBy: {
        claimedAt: 'desc',
      },
    })

    if (recentClaim) {
      const timeLeft = COOLDOWN_PERIOD - (Date.now() - recentClaim.claimedAt.getTime())
      const minutesLeft = Math.ceil(timeLeft / (60 * 1000))
      return NextResponse.json({
        success: false,
        message: `Please wait ${minutesLeft} minutes before claiming another coupon.`,
      }, { status: 429 })
    }

    // Find the next available coupon
    const coupon = await prisma.coupon.findFirst({
      where: {
        isClaimed: false,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (!coupon) {
      return NextResponse.json({
        success: false,
        message: 'No coupons available at the moment.',
      }, { status: 404 })
    }

    // Create claim record and update coupon
    const [updatedCoupon, claimRecord] = await prisma.$transaction([
      prisma.coupon.update({
        where: { id: coupon.id },
        data: {
          isClaimed: true,
          claimedAt: new Date(),
          claimedBy: cookieId,
        },
      }),
      prisma.claimRecord.create({
        data: {
          ipAddress,
          couponId: coupon.id,
          cookieId,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Coupon claimed successfully!',
      data: {
        code: updatedCoupon.code,
      },
    })
  } catch (error) {
    console.error('Error claiming coupon:', error)
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing your request.',
    }, { status: 500 })
  }
} 