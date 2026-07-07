export type PaymentMethod = 'COD' | 'BANK_TRANSFER' | 'MOMO';

/** Thông tin giao hàng đã chọn (dựng từ sổ địa chỉ). */
export interface ShippingDetails {
  shippingAddress: string;
  phone: string;
  note: string;
  paymentMethod: PaymentMethod;
}

export interface OrderConfirmation {
  orderId: string;
  total: number;
  itemCount: number;
  estimatedDelivery: string;
}
