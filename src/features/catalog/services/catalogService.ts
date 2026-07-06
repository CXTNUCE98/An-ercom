import type { CatalogProduct, CatalogCategory } from '~/types/landing';
import type { CatalogFilters, SortOption, PaginatedResult } from '../types';
import { productRepository, categoryRepository } from '../repositories/productRepository';

/**
 * Service catalog — điều phối các lời gọi API qua repository.
 * Tất cả method đều async (đi qua BE), dùng trong `useAsyncData` để SSR-friendly.
 */
export const catalogService = {
  listProducts(
    filters: CatalogFilters = {},
    sort: SortOption = 'newest',
    page = 1,
    pageSize = 12,
  ): Promise<PaginatedResult<CatalogProduct>> {
    return productRepository.list(filters, sort, page, pageSize);
  },

  getProduct(slug: string): Promise<CatalogProduct | null> {
    return productRepository.getBySlug(slug);
  },

  getRelatedProducts(
    product: Pick<CatalogProduct, 'categorySlug' | 'slug'>,
    limit = 4,
  ): Promise<CatalogProduct[]> {
    return productRepository.getRelated(product.categorySlug, product.slug, limit);
  },

  getCategories(): Promise<CatalogCategory[]> {
    return categoryRepository.getAll();
  },

  getCategory(slug: string): Promise<CatalogCategory | null> {
    return categoryRepository.getBySlug(slug);
  },
};
