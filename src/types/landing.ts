// Domain types for the IRONMAN landing page

export type IconName =
  | 'watch'
  | 'zippo'
  | 'glasses'
  | 'belt'
  | 'wallet'
  | 'shield'
  | 'truck'
  | 'return'
  | 'check'
  | 'gift'
  | 'engrave'
  | 'box'
  | 'card';

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
