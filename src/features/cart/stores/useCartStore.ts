import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { CatalogProduct } from '~/types/landing';
import type { CartItem, PromoCode } from '../types';
import { cartService } from '../services/cartService';

const CART_KEY_PREFIX = 'cart:';
const GUEST_KEY = 'guest';
const LEGACY_KEY = 'cart'; // key cũ (persistedstate) — migrate 1 lần cho khách

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const appliedPromo = ref<PromoCode | null>(null);
  const isDrawerOpen = ref(false);

  /** Chủ sở hữu giỏ hiện tại: 'guest' hoặc 'u:<userId>'. */
  const ownerKey = ref<string>(GUEST_KEY);
  let hydrated = false;

  function storageKey(key = ownerKey.value) {
    return CART_KEY_PREFIX + key;
  }

  function readStore(key: string): { items: CartItem[]; appliedPromo: PromoCode | null } {
    if (!import.meta.client) return { items: [], appliedPromo: null };
    try {
      let raw = localStorage.getItem(storageKey(key));
      // Migrate giỏ khách từ key cũ 'cart' (persistedstate) sang 'cart:guest'
      if (!raw && key === GUEST_KEY) {
        const legacy = localStorage.getItem(LEGACY_KEY);
        if (legacy) {
          raw = legacy;
          localStorage.removeItem(LEGACY_KEY);
        }
      }
      if (!raw) return { items: [], appliedPromo: null };
      const data = JSON.parse(raw);
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        appliedPromo: data?.appliedPromo ?? null,
      };
    } catch {
      return { items: [], appliedPromo: null };
    }
  }

  function save() {
    if (!import.meta.client) return;
    localStorage.setItem(
      storageKey(),
      JSON.stringify({ items: items.value, appliedPromo: appliedPromo.value }),
    );
  }

  function load() {
    const data = readStore(ownerKey.value);
    items.value = data.items;
    appliedPromo.value = data.appliedPromo;
  }

  function mergeItem(source: CartItem) {
    const existing = items.value.find((i) => i.productId === source.productId);
    if (existing) existing.quantity += source.quantity;
    else items.value.push({ ...source });
  }

  /**
   * Chuyển giỏ sang chủ sở hữu mới (gọi khi đăng nhập/đăng xuất).
   * Khi khách đăng nhập, giỏ khách sẽ được gộp vào giỏ của user rồi xoá giỏ khách.
   */
  function setOwner(key: string | null | undefined) {
    if (!import.meta.client) return;
    const newKey = key || GUEST_KEY;
    if (hydrated && newKey === ownerKey.value) return;

    const wasGuest = ownerKey.value === GUEST_KEY;
    const previousItems = items.value.slice();

    ownerKey.value = newKey;
    load();

    // Khách vừa đăng nhập → gộp giỏ khách vào giỏ user
    if (hydrated && wasGuest && newKey !== GUEST_KEY && previousItems.length) {
      previousItems.forEach(mergeItem);
      save();
      localStorage.removeItem(storageKey(GUEST_KEY));
    }

    hydrated = true;
  }

  // Tự lưu mỗi khi giỏ đổi (chỉ ở client)
  if (import.meta.client) {
    watch([items, appliedPromo], save, { deep: true });
  }

  function toggleDrawer() { isDrawerOpen.value = !isDrawerOpen.value; }
  function openDrawer() { isDrawerOpen.value = true; }
  function closeDrawer() { isDrawerOpen.value = false; }

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

  async function applyPromo(code: string): Promise<boolean> {
    const promo = await cartService.validatePromo(code, subtotal.value);
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
    items, appliedPromo, isDrawerOpen, count, subtotal, discount, total,
    addItem, removeItem, updateQuantity, applyPromo, clearPromo, clearCart,
    toggleDrawer, openDrawer, closeDrawer, setOwner,
  };
});
