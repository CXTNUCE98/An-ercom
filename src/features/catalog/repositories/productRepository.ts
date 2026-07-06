import type {
  CatalogProduct,
  CatalogCategory,
  CategorySlug,
  IconName,
} from '~/types/landing';
import type { CatalogFilters, SortOption, PaginatedResult } from '../types';

/**
 * Icon fallback theo slug danh mục (BE không lưu icon, FE tự suy ra).
 */
const CATEGORY_ICON: Record<string, IconName> = {
  watches: 'watch',
  zippo: 'zippo',
  glasses: 'glasses',
  belts: 'belt',
  wallets: 'wallet',
  hats: 'hat',
};

/** Shape thô trả về từ BE (đã phẳng hoá category). */
interface ApiProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number | null;
  description?: string | null;
  images?: string[] | null;
  specs?: Array<{ label: string; value: string }> | null;
  tags?: string[] | null;
  highlights?: string[] | null;
  rating?: number | null;
  reviewCount?: number | null;
  stock?: number | null;
  isNew?: boolean | null;
  isBestSeller?: boolean | null;
  isLuxury?: boolean | null;
  videoUrl?: string | null;
  videoPoster?: string | null;
  categorySlug?: string | null;
  categoryName?: string | null;
  category?: { slug?: string; name?: string } | null;
}

interface ApiPaginated {
  items: ApiProduct[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Chuẩn hoá sản phẩm BE về `CatalogProduct` mà UI đang dùng.
 * Bù các field UI cần nhưng BE không có (icon), và default an toàn cho card
 * (endpoint lưới không trả specs/tags/description).
 */
export function normalizeProduct(p: ApiProduct): CatalogProduct {
  const categorySlug = (p.categorySlug ?? p.category?.slug ?? '') as CategorySlug;
  const categoryName = p.categoryName ?? p.category?.name ?? '';
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    categorySlug,
    categoryName,
    price: p.price,
    salePrice: p.salePrice ?? undefined,
    icon: CATEGORY_ICON[categorySlug] ?? 'shield',
    images: p.images ?? [],
    description: p.description ?? '',
    specs: p.specs ?? [],
    tags: p.tags ?? [],
    rating: p.rating ?? 0,
    reviewCount: p.reviewCount ?? 0,
    stock: p.stock ?? 0,
    isNew: p.isNew ?? undefined,
    isBestSeller: p.isBestSeller ?? undefined,
    isLuxury: p.isLuxury ?? undefined,
    videoUrl: p.videoUrl ?? undefined,
    videoPoster: p.videoPoster ?? undefined,
    highlights: p.highlights ?? undefined,
  };
}

function buildQuery(
  filters: CatalogFilters,
  sort: SortOption,
  page: number,
  pageSize: number,
): Record<string, string | number> {
  const q: Record<string, string | number> = { page, pageSize };
  if (sort) q.sort = sort;
  if (filters.category) q.categorySlug = filters.category;
  if (filters.brand) q.brand = filters.brand;
  if (filters.search) q.search = filters.search;
  if (filters.priceMin !== undefined) q.priceMin = filters.priceMin;
  if (filters.priceMax !== undefined) q.priceMax = filters.priceMax;
  if (filters.tags?.length) q.tags = filters.tags.join(',');
  return q;
}

export const productRepository = {
  /** Danh sách sản phẩm có phân trang (đi qua BE). */
  async list(
    filters: CatalogFilters = {},
    sort: SortOption = 'newest',
    page = 1,
    pageSize = 12,
  ): Promise<PaginatedResult<CatalogProduct>> {
    const res = (await $anErcom('/products', {
      query: buildQuery(filters, sort, page, pageSize),
    })) as unknown as ApiPaginated;
    return {
      items: (res.items ?? []).map(normalizeProduct),
      total: res.total ?? 0,
      page: res.page ?? page,
      pageSize: res.pageSize ?? pageSize,
      totalPages: res.totalPages ?? 1,
    };
  },

  /** Chi tiết sản phẩm theo slug (full field). */
  async getBySlug(slug: string): Promise<CatalogProduct | null> {
    try {
      const res = (await $anErcom(`/products/slug/${slug}`)) as unknown as ApiProduct;
      return normalizeProduct(res);
    } catch {
      return null;
    }
  },

  /** Sản phẩm liên quan cùng danh mục. */
  async getRelated(
    categorySlug: string,
    excludeSlug: string,
    limit = 4,
  ): Promise<CatalogProduct[]> {
    const res = (await $anErcom('/products', {
      query: { categorySlug, pageSize: limit + 1 },
    })) as unknown as ApiPaginated;
    return (res.items ?? [])
      .map(normalizeProduct)
      .filter((p) => p.slug !== excludeSlug)
      .slice(0, limit);
  },
};

/** Shape thô category từ BE. */
interface ApiCategory {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  image?: string | null;
}

export function normalizeCategory(c: ApiCategory): CatalogCategory {
  const slug = c.slug as CategorySlug;
  return {
    id: c.id,
    slug,
    name: c.name,
    tagline: '',
    description: c.description ?? '',
    icon: CATEGORY_ICON[slug] ?? 'shield',
    image: c.image ?? undefined,
  };
}

export const categoryRepository = {
  async getAll(): Promise<CatalogCategory[]> {
    const res = (await $anErcom('/product-categories')) as unknown as ApiCategory[];
    return (res ?? []).map(normalizeCategory);
  },

  async getBySlug(slug: string): Promise<CatalogCategory | null> {
    try {
      const res = (await $anErcom(`/product-categories/slug/${slug}`)) as unknown as ApiCategory;
      return normalizeCategory(res);
    } catch {
      return null;
    }
  },
};
