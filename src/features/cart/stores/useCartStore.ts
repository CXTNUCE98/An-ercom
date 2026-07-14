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

  /** Backfill lineId/kind cho item cũ (giỏ lưu trước khi hỗ trợ combo). */
  function migrateItem(raw: any): CartItem | null {
    if (!raw) return null;
    if (raw.lineId && raw.kind) return raw as CartItem;
    // Item cũ chỉ có productId → coi là sản phẩm lẻ.
    if (raw.productId) {
      return { ...raw, kind: 'product', lineId: `p:${raw.productId}` };
    }
    if (raw.comboId) {
      return { ...raw, kind: 'combo', lineId: `c:${raw.comboId}` };
    }
    return null;
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
      const rawItems = Array.isArray(data?.items) ? data.items : [];
      return {
        items: rawItems.map(migrateItem).filter(Boolean) as CartItem[],
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
    const existing = items.value.find((i) => i.lineId === source.lineId);
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
    const lineId = `p:${product.id}`;
    const existing = items.value.find((i) => i.lineId === lineId);
    if (existing) {
      existing.quantity += qty;
    } else {
      items.value.push({
        lineId,
        kind: 'product',
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

  /** Thêm combo vào giỏ — giữ giá combo ưu đãi (price = comboPrice). */
  function addCombo(
    combo: {
      id: string;
      slug: string;
      name: string;
      image?: string | null;
      comboPrice: number;
    },
    qty = 1,
  ) {
    const lineId = `c:${combo.id}`;
    const existing = items.value.find((i) => i.lineId === lineId);
    if (existing) {
      existing.quantity += qty;
    } else {
      items.value.push({
        lineId,
        kind: 'combo',
        comboId: combo.id,
        slug: combo.slug,
        name: combo.name,
        brand: 'Combo',
        icon: 'gift',
        image: combo.image ?? undefined,
        price: combo.comboPrice,
        quantity: qty,
      });
    }
  }

  function removeItem(lineId: string) {
    items.value = items.value.filter((i) => i.lineId !== lineId);
  }

  function updateQuantity(lineId: string, qty: number) {
    const item = items.value.find((i) => i.lineId === lineId);
    if (!item) return;
    if (qty <= 0) {
      removeItem(lineId);
    } else {
      item.quantity = qty;
    }
  }

  /** Thay toàn bộ item (dùng khi đồng bộ từ BE). */
  function replaceItems(next: CartItem[]) {
    items.value = next;
  }

  /** Đọc item trong giỏ khách (để gộp lên BE khi đăng nhập). */
  function getGuestItems(): CartItem[] {
    return readStore(GUEST_KEY).items;
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
    addItem, addCombo, removeItem, updateQuantity, replaceItems, getGuestItems,
    applyPromo, clearPromo, clearCart,
    toggleDrawer, openDrawer, closeDrawer, setOwner,
  };
});
