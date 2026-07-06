export interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  note: string;
  paymentMethod: 'COD' | 'BANK_TRANSFER' | 'MOMO';
}

export interface OrderConfirmation {
  orderId: string;
  total: number;
  itemCount: number;
  estimatedDelivery: string;
}
