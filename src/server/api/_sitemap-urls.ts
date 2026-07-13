import { defineSitemapEventHandler } from '#imports';
import type { SitemapUrlInput } from '#sitemap/types';

/**
 * Nguồn URL động cho @nuxtjs/sitemap: lấy slug sản phẩm + danh mục từ BE.
 * Được khai báo trong nuxt.config `sitemap.sources`. Lỗi BE → trả rỗng,
 * sitemap tĩnh (trang chủ...) vẫn hoạt động.
 */
interface ApiProduct { slug: string }
interface ApiPaginated { items: ApiProduct[]; totalPages?: number }
interface ApiCategory { slug: string }

export default defineSitemapEventHandler(async () => {
  const base = (process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:9001/').replace(/\/$/, '');
  const urls: SitemapUrlInput[] = [];

  // Danh mục
  try {
    const cats = await $fetch<ApiCategory[]>(`${base}/product-categories`);
    for (const c of cats ?? []) {
      if (c?.slug) urls.push({ loc: `/categories/${c.slug}`, changefreq: 'weekly', priority: 0.7 });
    }
  } catch {
    // BE không sẵn sàng — bỏ qua danh mục.
  }

  // Sản phẩm (duyệt hết trang, chặn trần an toàn để tránh loop vô hạn).
  try {
    let page = 1;
    let totalPages = 1;
    const MAX_PAGES = 50;
    do {
      const res = await $fetch<ApiPaginated>(`${base}/products`, {
        query: { page, pageSize: 100 },
      });
      for (const p of res?.items ?? []) {
        if (p?.slug) urls.push({ loc: `/products/${p.slug}`, changefreq: 'weekly', priority: 0.8 });
      }
      totalPages = res?.totalPages ?? 1;
      page++;
    } while (page <= totalPages && page <= MAX_PAGES);
  } catch {
    // BE không sẵn sàng — bỏ qua sản phẩm.
  }

  return urls;
});
