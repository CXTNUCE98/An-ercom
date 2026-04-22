import type { CatalogProduct } from "~/types/landing";

import { WATCH_PRODUCTS } from "./watches";
import { ZIPPO_PRODUCTS } from "./zippo";
import { GLASSES_PRODUCTS } from "./glasses";
import { BELT_PRODUCTS } from "./belts";
import { WALLET_PRODUCTS } from "./wallets";
import { HAT_PRODUCTS } from "./hats";

export {
  WATCH_PRODUCTS,
  ZIPPO_PRODUCTS,
  GLASSES_PRODUCTS,
  BELT_PRODUCTS,
  WALLET_PRODUCTS,
  HAT_PRODUCTS,
};

/**
 * Toàn bộ sản phẩm trên catalog, gộp từ các file con theo từng category.
 * Khi cần thêm/sửa/xóa sản phẩm, chỉnh trong file category tương ứng.
 */
export const CATALOG_PRODUCTS: CatalogProduct[] = [
  ...WATCH_PRODUCTS,
  ...ZIPPO_PRODUCTS,
  ...GLASSES_PRODUCTS,
  ...BELT_PRODUCTS,
  ...WALLET_PRODUCTS,
  ...HAT_PRODUCTS,
];

export const PRODUCT_BY_SLUG: Record<string, CatalogProduct> =
  Object.fromEntries(CATALOG_PRODUCTS.map((p) => [p.slug, p]));
