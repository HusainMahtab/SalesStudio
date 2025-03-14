import { ApiResponse } from '@/types'

export async function claimCoupon(): Promise<ApiResponse> {
  const response = await fetch('/api/coupons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return data
} 