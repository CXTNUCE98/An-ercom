<script setup lang="ts">
import { catalogService } from '~/features/catalog/services/catalogService';
import { formatPrice } from '~/shared/utils/format';
import type { SortOption } from '~/features/catalog/types';

const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug as string);

// Danh mục (SSR, 404 đúng)
const { data: category } = await useAsyncData(
  () => `category-${slug.value}`,
  () => catalogService.getCategory(slug.value),
  { watch: [slug] },
);
if (!category.value) {
  throw createError({ statusCode: 404, message: 'Danh mục không tồn tại' });
}

// State filter / sort / phân trang (đồng bộ query URL)
const sort = ref<SortOption>((route.query.sort as SortOption) || 'newest');
const page = ref(Number(route.query.page) || 1);
const priceMin = ref<number | undefined>(route.query.min ? Number(route.query.min) : undefined);
const priceMax = ref<number | undefined>(route.query.max ? Number(route.query.max) : undefined);
const pageSize = 12;

const { data: result, pending } = await useAsyncData(
  () => `category-products-${slug.value}`,
  () =>
    catalogService.listProducts(
      { category: slug.value, priceMin: priceMin.value, priceMax: priceMax.value },
      sort.value,
      page.value,
      pageSize,
    ),
  { watch: [slug, sort, page, priceMin, priceMax] },
);

const products = computed(() => result.value?.items ?? []);
const total = computed(() => result.value?.total ?? 0);
const totalPages = computed(() => result.value?.totalPages ?? 1);

watch([sort, page, priceMin, priceMax], () => {
  router.replace({
    query: {
      ...(sort.value !== 'newest' && { sort: sort.value }),
      ...(page.value > 1 && { page: page.value }),
      ...(priceMin.value !== undefined && { min: priceMin.value }),
      ...(priceMax.value !== undefined && { max: priceMax.value }),
    },
  });
});
watch([sort, priceMin, priceMax], () => { page.value = 1; });

function applyPrice() { page.value = 1; }
function clearPrice() { priceMin.value = undefined; priceMax.value = undefined; }

function salePercent(p: { salePrice?: number; price: number }) {
  if (!p.salePrice) return 0;
  return Math.round((1 - p.salePrice / p.price) * 100);
}

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;
const canonicalUrl = computed(() => `${siteUrl}/categories/${slug.value}`);
const catDescription = computed(
  () => category.value?.description || `Bộ sưu tập ${category.value?.name} chính hãng, bảo hành tại IRONMAN.`,
);
const catOgImage = computed(() => category.value?.image || `${siteUrl}/favicon.ico`);

useSeoMeta({
  title: () => `${category.value?.name} — IRONMAN`,
  description: () => catDescription.value,
  ogTitle: () => `${category.value?.name} — IRONMAN`,
  ogDescription: () => catDescription.value,
  ogImage: () => catOgImage.value,
  ogType: 'website',
  ogUrl: () => canonicalUrl.value,
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${category.value?.name} — IRONMAN`,
  twitterImage: () => catOgImage.value,
});

useHead({
  link: [{ rel: 'canonical', href: () => canonicalUrl.value }],
  script: [
    // Breadcrumb: Trang chủ › Danh mục
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Trang Chủ', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: category.value?.name, item: canonicalUrl.value },
          ],
        }),
      ),
    },
    // ItemList: các sản phẩm hiển thị trên trang danh mục hiện tại
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Sản phẩm ${category.value?.name}`,
          numberOfItems: products.value.length,
          itemListElement: products.value.map((p, i) => ({
            '@type': 'ListItem',
            position: (page.value - 1) * pageSize + i + 1,
            url: `${siteUrl}/products/${p.slug}`,
            name: p.name,
          })),
        }),
      ),
    },
  ],
});

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'best-seller', label: 'Bán chạy' },
];
const badgeBase = 'absolute top-3 right-3 font-condensed text-[0.65rem] font-bold tracking-[2px] uppercase py-1 px-2.5 z-[3]';
</script>

<template>
  <main class="pt-[100px] px-gutter pb-lg max-w-[1360px] mx-auto max-[900px]:pt-[90px] max-[900px]:px-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center flex-wrap gap-2 font-condensed text-[0.7rem] tracking-[2px] uppercase text-smoke mb-6 [&_a]:text-smoke [&_a]:no-underline hover:[&_a]:text-accent">
      <NuxtLink to="/">Trang Chủ</NuxtLink>
      <span>/</span>
      <NuxtLink to="/#products">Sản Phẩm</NuxtLink>
      <span>/</span>
      <span class="text-text">{{ category?.name }}</span>
    </nav>

    <header class="mb-8 pb-6 border-b border-rule">
      <h1 class="font-display font-bold text-text m-0 leading-[1.1] text-[clamp(1.8rem,4vw,2.6rem)]">
        {{ category?.name }}
      </h1>
      <p v-if="category?.description" class="text-mid text-[0.95rem] leading-[1.7] mt-2 max-w-[720px]">
        {{ category.description }}
      </p>
    </header>

    <!-- Toolbar: sort + price filter -->
    <div class="flex flex-wrap items-end gap-4 mb-8">
      <div>
        <label class="block font-condensed text-[0.68rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Sắp xếp</label>
        <select v-model="sort" class="bg-surface border border-rule text-text text-[0.85rem] py-2 px-3 focus:outline-none focus:border-accent">
          <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </div>
      <div>
        <label class="block font-condensed text-[0.68rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Giá từ</label>
        <input v-model.number="priceMin" type="number" min="0" placeholder="0" class="w-28 bg-surface border border-rule text-text text-[0.85rem] py-2 px-3 focus:outline-none focus:border-accent" />
      </div>
      <div>
        <label class="block font-condensed text-[0.68rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">đến</label>
        <input v-model.number="priceMax" type="number" min="0" placeholder="∞" class="w-28 bg-surface border border-rule text-text text-[0.85rem] py-2 px-3 focus:outline-none focus:border-accent" />
      </div>
      <button class="font-condensed text-[0.72rem] tracking-[2px] uppercase text-accent border border-accent py-2 px-4 bg-transparent cursor-pointer hover:bg-accent hover:text-on-accent transition-colors" @click="applyPrice">Lọc</button>
      <button v-if="priceMin !== undefined || priceMax !== undefined" class="font-condensed text-[0.72rem] tracking-[2px] uppercase text-smoke py-2 px-3 bg-transparent border-0 cursor-pointer hover:text-oxblood" @click="clearPrice">Xoá lọc</button>
      <span class="ml-auto font-condensed text-[0.72rem] tracking-[2px] uppercase text-smoke">{{ total }} sản phẩm</span>
    </div>

    <!-- Grid -->
    <div v-if="pending" class="text-center py-20 text-smoke">Đang tải...</div>
    <div v-else-if="!products.length" class="text-center py-20 text-smoke">Không có sản phẩm phù hợp.</div>
    <div v-else class="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
      <NuxtLink v-for="p in products" :key="p.id" :to="`/products/${p.slug}`" class="group no-underline text-inherit flex flex-col cursor-pointer">
        <div class="relative overflow-hidden bg-card [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.06]">
          <CommonProductMedia :src="p.images[0] || undefined" :alt="p.name" aspect="3/4" :placeholder-icon="p.icon" :icon-size="80" />
          <span v-if="salePercent(p)" class="absolute top-3 left-3 z-[3] bg-oxblood text-white font-condensed text-[0.7rem] font-bold tracking-[1px] py-1 px-2.5">-{{ salePercent(p) }}%</span>
          <span v-if="p.isNew" :class="[badgeBase, 'bg-olive text-white']">Mới</span>
          <span v-else-if="p.isBestSeller" :class="[badgeBase, 'bg-accent text-on-accent']">Bán Chạy</span>
        </div>
        <div class="pt-3.5 px-0.5 pb-1">
          <div class="flex justify-between items-center mb-1.5">
            <span class="font-condensed text-[0.65rem] font-semibold tracking-[3px] uppercase text-accent">{{ p.brand }}</span>
            <span class="inline-flex items-center gap-[3px] font-condensed text-[0.78rem] font-semibold text-mid"><i class="bx bxs-star text-accent text-[0.8rem]" /> {{ p.rating }}</span>
          </div>
          <h3 class="font-display text-base font-semibold text-text m-0 mb-2 leading-[1.3]">{{ p.name }}</h3>
          <div class="flex items-baseline gap-2">
            <span v-if="p.salePrice" class="font-condensed text-[0.95rem] font-bold text-accent">{{ formatPrice(p.salePrice) }}</span>
            <span :class="p.salePrice ? 'font-condensed text-[0.8rem] text-smoke line-through' : 'font-condensed text-[0.95rem] font-semibold text-text'">{{ formatPrice(p.price) }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-10">
      <button :disabled="page <= 1" class="font-condensed text-[0.78rem] tracking-[2px] uppercase py-2 px-4 border border-rule bg-transparent text-text cursor-pointer disabled:opacity-40 hover:enabled:border-accent hover:enabled:text-accent" @click="page--">← Trước</button>
      <span class="font-condensed text-[0.8rem] text-mid px-3">Trang {{ page }} / {{ totalPages }}</span>
      <button :disabled="page >= totalPages" class="font-condensed text-[0.78rem] tracking-[2px] uppercase py-2 px-4 border border-rule bg-transparent text-text cursor-pointer disabled:opacity-40 hover:enabled:border-accent hover:enabled:text-accent" @click="page++">Sau →</button>
    </div>
  </main>
</template>
