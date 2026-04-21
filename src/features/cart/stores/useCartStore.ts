import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CatalogProduct } from '~/types/landing';
import type { CartItem, PromoCode } from '../types';
import { cartService } from '../services/cartService';

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<CartItem[]>([]);
    const appliedPromo = ref<PromoCode | null>(null);

    const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
    const subtotal = computed(() => cartService.calcSubtotal(items.value));
    const discount = computed(() => cartService.calcDiscount(subtotal.value, appliedPromo.value ?? undefined));
    const total = computed(() => subtotal.value - discount.value);

    function addItem(product: CatalogProduct, qty = 1) {
      const existing = items.value.find((i) => i.productId === product.id);
      if (existing) {
        existing.quantity += qty;
      } else {
        items.value.push({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          icon: product.icon,
          image: product.images[0],
          price: product.price,
          salePrice: product.salePrice,
          quantity: qty,
        });
      }
    }

    function removeItem(productId: string) {
      items.value = items.value.filter((i) => i.productId !== productId);
    }

    function updateQuantity(productId: string, qty: number) {
      const item = items.value.find((i) => i.productId === productId);
      if (!item) return;
      if (qty <= 0) {
        removeItem(productId);
      } else {
        item.quantity = qty;
      }
    }

    function applyPromo(code: string): boolean {
      const promo = cartService.validatePromo(code);
      if (promo) {
        appliedPromo.value = promo;
        return true;
      }
      return false;
    }

    function clearPromo() {
      appliedPromo.value = null;
    }

    function clearCart() {
      items.value = [];
      appliedPromo.value = null;
    }

    return {
      items, appliedPromo, count, subtotal, discount, total,
      addItem, removeItem, updateQuantity, applyPromo, clearPromo, clearCart,
    };
  },
  {
    persist: true,
  },
);
