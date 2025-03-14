'use client'

import { useState } from 'react'
import { claimCoupon } from '@/lib/api'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [couponCode, setCouponCode] = useState('')

  const handleClaimCoupon = async () => {
    try {
      setLoading(true)
      setMessage('')
      setCouponCode('')

      const response = await claimCoupon()
      
      if (response.success) {
        setMessage('Success! Your coupon code is:')
        setCouponCode(response.data.code)
      } else {
        setMessage(response.message)
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Coupon Distribution System
        </h1>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <p className="text-gray-300 mb-6 text-center">
            Click the button below to claim your coupon. Please note that you can only claim one coupon per hour.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleClaimCoupon}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors
                ${loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {loading ? 'Processing...' : 'Claim Coupon'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('Success') ? 'bg-green-900' : 'bg-red-900'
              }`}>
                {message}
              </div>
            )}

            {couponCode && (
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-400 mb-2">Your Coupon Code:</p>
                <p className="text-2xl font-mono font-bold">{couponCode}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 