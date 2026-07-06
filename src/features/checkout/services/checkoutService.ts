import type { CheckoutForm, OrderConfirmation } from '../types';
import type { CartItem } from '../../cart/types';

/** Shape đơn hàng trả về từ BE (rút gọn phần dùng ở đây). */
interface ApiOrder {
  id: string;
  totalPrice: number;
  items: { quantity: number }[];
}

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

  /**
   * Tạo đơn hàng thật qua BE (POST /orders).
   * BE tự tính lại tổng tiền từ DB và trừ tồn kho trong transaction,
   * nên client chỉ gửi productId + quantity.
   */
  async placeOrder(
    form: CheckoutForm,
    items: CartItem[],
    authHeaders: HeadersInit,
    couponCode?: string,
  ): Promise<OrderConfirmation> {
    const shippingAddress = `${form.address}, ${form.city}`.trim();

    const order = (await $anErcom('/orders', {
      method: 'POST',
      headers: authHeaders,
      body: {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress,
        phone: form.phone.replace(/\s/g, ''),
        note: form.note || undefined,
        paymentMethod: form.paymentMethod,
        couponCode: couponCode || undefined,
      },
    })) as unknown as ApiOrder;

    return {
      orderId: order.id,
      total: order.totalPrice,
      itemCount: order.items.reduce((s, i) => s + i.quantity, 0),
      estimatedDelivery: '2-3 ngày làm việc',
    };
  },
};
