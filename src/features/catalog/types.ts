import type { CatalogProduct, CategorySlug } from '~/types/landing';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-seller';

export interface CatalogFilters {
  category?: CategorySlug;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
  search?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
