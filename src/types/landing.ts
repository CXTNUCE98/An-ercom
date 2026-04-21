// Domain types for the IRONMAN storefront

export type IconName =
  | 'watch'
  | 'zippo'
  | 'glasses'
  | 'belt'
  | 'wallet'
  | 'hat'
  | 'shield'
  | 'truck'
  | 'return'
  | 'check'
  | 'gift'
  | 'engrave'
  | 'box'
  | 'card';

export type CategorySlug =
  | 'watches'
  | 'zippo'
  | 'glasses'
  | 'belts'
  | 'wallets'
  | 'hats';

// Landing (legacy, keeps backward compatibility)
export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  icon: IconName;
  image?: string;
  badge?: string;
  badgeVariant?: 'copper' | 'olive';
  featured?: boolean;
}

export interface Category {
  name: string;
  icon: IconName;
  count: number;
  featured?: boolean;
  image?: string;
  slug?: CategorySlug;
}

export interface EditorialFeature {
  icon: IconName;
  title: string;
  desc: string;
}

export interface NumberedFeature {
  num: string;
  title: string;
  desc: string;
}

export interface LifestyleFeature {
  icon: IconName;
  title: string;
  desc: string;
}

export interface Testimonial {
  stars: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface NavItem {
  name: string;
  path: string;
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
}

// Catalog domain (new)
export interface CatalogCategory {
  id: string;
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
  image?: string;
  featured?: boolean;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: CategorySlug;
  categoryName: string;
  price: number;           // VND
  salePrice?: number;      // VND
  icon: IconName;          // fallback icon
  images: string[];        // absolute URLs (unsplash) or empty → icon fallback
  description: string;
  specs: Array<{ label: string; value: string }>;
  tags: string[];
  rating: number;          // 0–5
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLuxury?: boolean;
  /** Optional review video (YouTube embed, MP4 url, etc.) */
  videoUrl?: string;
  /** Optional poster shown over the video before play */
  videoPoster?: string;
  /** Optional rating breakdown for vertical detail page */
  ratingBreakdown?: {
    quality?: number;     // 0..5 — chất liệu
    design?: number;      // 0..5 — thiết kế
    durability?: number;  // 0..5 — độ bền
    value?: number;       // 0..5 — giá trị
  };
  /** Optional highlight bullet points */
  highlights?: string[];
}
