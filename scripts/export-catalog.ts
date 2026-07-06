/**
 * Trích xuất dữ liệu catalog tĩnh (constants) ra JSON để seed vào DB backend.
 * Chạy: pnpm tsx scripts/export-catalog.ts
 * Output: ../BE-An-ercom/prisma/seed-data.json
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CATALOG_PRODUCTS } from '../src/constants/products/index';
import { CATALOG_CATEGORIES } from '../src/constants/categories';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '../../BE-An-ercom/prisma/seed-data.json');

const categories = CATALOG_CATEGORIES.map((c) => ({
  slug: c.slug,
  name: c.name,
  description: c.description ?? null,
  image: c.image ?? null,
}));

const products = CATALOG_PRODUCTS.map((p) => ({
  slug: p.slug,
  name: p.name,
  brand: p.brand,
  categorySlug: p.categorySlug,
  price: p.price,
  salePrice: p.salePrice ?? null,
  description: p.description ?? null,
  images: p.images ?? [],
  specs: p.specs ?? [],
  tags: p.tags ?? [],
  highlights: p.highlights ?? [],
  rating: p.rating ?? 0,
  reviewCount: p.reviewCount ?? 0,
  stock: p.stock ?? 0,
  isNew: p.isNew ?? false,
  isBestSeller: p.isBestSeller ?? false,
  isLuxury: p.isLuxury ?? false,
  videoUrl: p.videoUrl ?? null,
  videoPoster: p.videoPoster ?? null,
}));

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify({ categories, products }, null, 2), 'utf-8');
console.log(
  `Đã xuất ${categories.length} danh mục + ${products.length} sản phẩm → ${outPath}`,
);
