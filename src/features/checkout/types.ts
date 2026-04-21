export interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  note: string;
  paymentMethod: 'cod' | 'bank-transfer' | 'card';
}

export interface OrderConfirmation {
  orderId: string;
  total: number;
  itemCount: number;
  estimatedDelivery: string;
}
