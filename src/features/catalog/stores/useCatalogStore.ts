import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CatalogProduct, CatalogCategory, CategorySlug } from '~/types/landing';
import type { CatalogFilters, SortOption } from '../types';
import { catalogService } from '../services/catalogService';

export const useCatalogStore = defineStore('catalog', () => {
  const filters = ref<CatalogFilters>({});
  const sort = ref<SortOption>('newest');
  const page = ref(1);
  const pageSize = ref(12);

  const result = computed(() =>
    catalogService.listProducts(filters.value, sort.value, page.value, pageSize.value),
  );

  const products = computed(() => result.value.items);
  const totalPages = computed(() => result.value.totalPages);
  const total = computed(() => result.value.total);

  const categories = computed(() => catalogService.getCategories());
  const brands = computed(() => catalogService.getBrands());

  function setFilter(key: keyof CatalogFilters, value: any) {
    (filters.value as any)[key] = value;
    page.value = 1;
  }

  function clearFilters() {
    filters.value = {};
    page.value = 1;
  }

  function setSort(s: SortOption) {
    sort.value = s;
    page.value = 1;
  }

  function setPage(p: number) {
    page.value = p;
  }

  function getProduct(slug: string) {
    return catalogService.getProduct(slug);
  }

  function getRelatedProducts(slug: string, limit = 4) {
    return catalogService.getRelatedProducts(slug, limit);
  }

  function getCategory(slug: string) {
    return catalogService.getCategory(slug);
  }

  return {
    filters, sort, page, pageSize,
    products, totalPages, total, categories, brands,
    setFilter, clearFilters, setSort, setPage,
    getProduct, getRelatedProducts, getCategory,
  };
});
