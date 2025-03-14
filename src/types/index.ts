export interface Coupon {
  id: string;
  code: string;
  isClaimed: boolean;
  claimedAt?: Date;
  claimedBy?: string;
}

export interface ClaimRecord {
  id: string;
  ipAddress: string;
  couponId: string;
  claimedAt: Date;
  cookieId: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
} 