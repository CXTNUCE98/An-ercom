import type { CartItem, PromoCode } from '../types';

interface ApplyCouponResponse {
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  discount: number;
}

export const cartService = {
  calcSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
  },

  calcDiscount(subtotal: number, promo?: PromoCode): number {
    if (!promo) return 0;
    return Math.min(promo.discountAmount, subtotal);
  },

  /** Kiểm tra mã giảm giá qua BE (/coupons/apply). */
  async validatePromo(code: string, subtotal: number): Promise<PromoCode | null> {
    try {
      const res = (await $anErcom('/coupons/apply', {
        method: 'POST',
        body: { code, subtotal },
      })) as unknown as ApplyCouponResponse;
      return {
        code: res.code,
        label:
          res.type === 'PERCENT'
            ? `Giảm ${res.value}%`
            : `Giảm ${res.value.toLocaleString('vi-VN')}đ`,
        discountAmount: res.discount,
      };
    } catch {
      return null;
    }
  },
};
