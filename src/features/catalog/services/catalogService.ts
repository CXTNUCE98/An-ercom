import type { CatalogProduct } from '~/types/landing';
import type { CatalogFilters, SortOption, PaginatedResult } from '../types';
import { productRepository, categoryRepository } from '../repositories/productRepository';

function applyFilters(products: CatalogProduct[], filters: CatalogFilters): CatalogProduct[] {
  let result = products;

  if (filters.category) {
    result = result.filter((p) => p.categorySlug === filters.category);
  }
  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand);
  }
  if (filters.priceMin !== undefined) {
    result = result.filter((p) => (p.salePrice ?? p.price) >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    result = result.filter((p) => (p.salePrice ?? p.price) <= filters.priceMax!);
  }
  if (filters.tags?.length) {
    result = result.filter((p) => filters.tags!.some((t) => p.tags.includes(t)));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  return result;
}

function applySort(products: CatalogProduct[], sort: SortOption): CatalogProduct[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    case 'price-desc':
      return sorted.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'best-seller':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'newest':
    default:
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }
}

export const catalogService = {
  listProducts(
    filters: CatalogFilters = {},
    sort: SortOption = 'newest',
    page = 1,
    pageSize = 12,
  ): PaginatedResult<CatalogProduct> {
    const all = productRepository.getAll();
    const filtered = applyFilters(all, filters);
    const sorted = applySort(filtered, sort);
    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;
    const items = sorted.slice(start, start + pageSize);

    return { items, total, page: safePage, pageSize, totalPages };
  },

  getProduct(slug: string) {
    return productRepository.getBySlug(slug);
  },

  getRelatedProducts(slug: string, limit = 4): CatalogProduct[] {
    const product = productRepository.getBySlug(slug);
    if (!product) return [];
    return productRepository
      .getAll()
      .filter((p) => p.categorySlug === product.categorySlug && p.slug !== slug)
      .slice(0, limit);
  },

  getCategories() {
    return categoryRepository.getAll();
  },

  getCategory(slug: string) {
    return categoryRepository.getBySlug(slug);
  },

  getBrands() {
    return productRepository.getBrands();
  },
};
