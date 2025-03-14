import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing coupons
  await prisma.claimRecord.deleteMany()
  await prisma.coupon.deleteMany()

  // Create new coupons
  const coupons = [
    { code: 'WELCOME10', isClaimed: false },
    { code: 'SUMMER20', isClaimed: false },
    { code: 'FALL15', isClaimed: false },
    { code: 'WINTER25', isClaimed: false },
    { code: 'SPRING30', isClaimed: false },
  ]

  for (const coupon of coupons) {
    await prisma.coupon.create({
      data: coupon,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 