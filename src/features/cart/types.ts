export interface CartItem {
  productId: string;
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
  discountPercent: number;
  label: string;
}
