import { CATALOG_PRODUCTS, PRODUCT_BY_SLUG } from '~/constants/products';
import { CATALOG_CATEGORIES, CATEGORY_BY_SLUG } from '~/constants/categories';
import type { CatalogProduct, CatalogCategory } from '~/types/landing';

export const productRepository = {
  getAll(): CatalogProduct[] {
    return CATALOG_PRODUCTS;
  },

  getBySlug(slug: string): CatalogProduct | undefined {
    return PRODUCT_BY_SLUG[slug];
  },

  getBrands(): string[] {
    return [...new Set(CATALOG_PRODUCTS.map((p) => p.brand))].sort();
  },
};

export const categoryRepository = {
  getAll(): CatalogCategory[] {
    return CATALOG_CATEGORIES;
  },

  getBySlug(slug: string): CatalogCategory | undefined {
    return CATEGORY_BY_SLUG[slug];
  },
};
