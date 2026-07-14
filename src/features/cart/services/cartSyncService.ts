import type { CartItem } from '../types';

/** Shape item giỏ trả về từ BE (GET/PUT/POST /cart). */
interface ApiCartItem {
  id: string;
  quantity: number;
  productId: string | null;
  comboId: string | null;
  product: {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    salePrice: number | null;
    images: string[];
  } | null;
  combo: {
    id: string;
    slug: string;
    name: string;
    image: string | null;
    comboPrice: number;
  } | null;
}

interface ApiCart {
  id: string;
  items: ApiCartItem[];
}

/** Map cart item BE → CartItem của store. Bỏ qua item trỏ tới thứ đã xoá. */
function toCartItem(it: ApiCartItem): CartItem | null {
  if (it.product) {
    return {
      lineId: `p:${it.product.id}`,
      kind: 'product',
      productId: it.product.id,
      slug: it.product.slug,
      name: it.product.name,
      brand: it.product.brand,
      icon: 'gift',
      image: it.product.images?.[0],
      price: it.product.price,
      salePrice: it.product.salePrice ?? undefined,
      quantity: it.quantity,
    };
  }
  if (it.combo) {
    return {
      lineId: `c:${it.combo.id}`,
      kind: 'combo',
      comboId: it.combo.id,
      slug: it.combo.slug,
      name: it.combo.name,
      brand: 'Combo',
      icon: 'gift',
      image: it.combo.image ?? undefined,
      price: it.combo.comboPrice,
      quantity: it.quantity,
    };
  }
  return null;
}

/** Chuyển CartItem của store → payload gửi BE. */
function toPayload(items: CartItem[]) {
  return {
    items: items.map((i) =>
      i.kind === 'combo'
        ? { comboId: i.comboId, quantity: i.quantity }
        : { productId: i.productId, quantity: i.quantity },
    ),
  };
}

export const cartSyncService = {
  /** Gộp giỏ khách vào giỏ user (khi đăng nhập) rồi trả giỏ đã gộp. */
  async merge(items: CartItem[], authHeaders: HeadersInit): Promise<CartItem[]> {
    const res = (await $anErcom('/cart/merge', {
      method: 'POST',
      headers: authHeaders,
      body: toPayload(items),
    })) as unknown as ApiCart;
    return res.items.map(toCartItem).filter(Boolean) as CartItem[];
  },

  /** Đẩy toàn bộ giỏ hiện tại lên BE (thay thế). */
  async replace(items: CartItem[], authHeaders: HeadersInit): Promise<void> {
    await $anErcom('/cart', {
      method: 'PUT',
      headers: authHeaders,
      body: toPayload(items),
    });
  },
};
