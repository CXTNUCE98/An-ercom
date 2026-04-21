import type { CheckoutForm, OrderConfirmation } from '../types';
import type { CartItem } from '../../cart/types';

export const checkoutService = {
  validate(form: CheckoutForm): string[] {
    const errors: string[] = [];
    if (!form.fullName.trim()) errors.push('Vui lòng nhập họ tên');
    if (!/^(0|\+84)\d{9,10}$/.test(form.phone.replace(/\s/g, '')))
      errors.push('Số điện thoại không hợp lệ');
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.push('Email không hợp lệ');
    if (!form.address.trim()) errors.push('Vui lòng nhập địa chỉ');
    if (!form.city.trim()) errors.push('Vui lòng chọn tỉnh/thành');
    return errors;
  },

  async placeOrder(
    _form: CheckoutForm,
    items: CartItem[],
    total: number,
  ): Promise<OrderConfirmation> {
    await new Promise((r) => setTimeout(r, 1200));

    return {
      orderId: 'IM-' + Date.now().toString(36).toUpperCase(),
      total,
      itemCount: items.reduce((s, i) => s + i.quantity, 0),
      estimatedDelivery: '2-3 ngày làm việc',
    };
  },
};
