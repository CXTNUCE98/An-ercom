export type CartLineKind = 'product' | 'combo';

export interface CartItem {
  /** Khoá dòng ổn định: 'p:<productId>' cho sản phẩm, 'c:<comboId>' cho combo. */
  lineId: string;
  kind: CartLineKind;
  /** ID sản phẩm (kind='product'). */
  productId?: string;
  /** ID combo (kind='combo'). */
  comboId?: string;
  slug: string;
  name: string;
  brand: string;
  icon: string;
  image?: string;
  price: number;
  salePrice?: number;
  quantity: number;
}

export interface PromoCode {
  code: string;
  label: string;
  /** Số tiền giảm (VND) do BE tính chính xác theo subtotal + maxDiscount. */
  discountAmount: number;
}
