import type { CartItem, PromoCode } from '../types';

const PROMO_CODES: Record<string, PromoCode> = {
  IRONMAN10: { code: 'IRONMAN10', discountPercent: 10, label: 'Giảm 10% toàn đơn' },
  WELCOME5: { code: 'WELCOME5', discountPercent: 5, label: 'Giảm 5% khách mới' },
};

export const cartService = {
  calcSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
  },

  calcDiscount(subtotal: number, promo?: PromoCode): number {
    if (!promo) return 0;
    return Math.round(subtotal * promo.discountPercent / 100);
  },

  validatePromo(code: string): PromoCode | null {
    return PROMO_CODES[code.toUpperCase()] ?? null;
  },
};
