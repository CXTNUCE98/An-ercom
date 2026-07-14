import type { ShippingDetails, OrderConfirmation } from '../types';
import type { CartItem } from '../../cart/types';

/** Shape đơn hàng trả về từ BE (rút gọn phần dùng ở đây). */
interface ApiOrder {
  id: string;
  totalPrice: number;
  items: { quantity: number }[];
}

export const checkoutService = {
  /**
   * Tạo đơn hàng thật qua BE (POST /orders).
   * BE tự tính lại tổng tiền từ DB và trừ tồn kho trong transaction,
   * nên client chỉ gửi productId + quantity. shippingAddress đã dựng sẵn
   * từ địa chỉ trong sổ (đã kèm phường/xã + tỉnh/thành).
   */
  async placeOrder(
    shipping: ShippingDetails,
    items: CartItem[],
    authHeaders: HeadersInit,
    couponCode?: string,
  ): Promise<OrderConfirmation> {
    const order = (await $anErcom('/orders', {
      method: 'POST',
      headers: authHeaders,
      body: {
        items: items.map((i) =>
          i.kind === 'combo'
            ? { comboId: i.comboId, quantity: i.quantity }
            : { productId: i.productId, quantity: i.quantity },
        ),
        shippingAddress: shipping.shippingAddress,
        phone: shipping.phone.replace(/\s/g, ''),
        note: shipping.note || undefined,
        paymentMethod: shipping.paymentMethod,
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
