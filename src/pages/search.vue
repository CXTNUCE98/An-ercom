<script setup lang="ts">
import { catalogService } from '~/features/catalog/services/catalogService';
import { formatPrice } from '~/shared/utils/format';
import type { SortOption } from '~/features/catalog/types';

const route = useRoute();
const router = useRouter();

const q = ref((route.query.q as string) || '');
const searchInput = ref(q.value);
const sort = ref<SortOption>('newest');
const page = ref(1);
const pageSize = 12;

const { data: result, pending } = await useAsyncData(
  'search-products',
  () => {
    if (!q.value.trim()) return Promise.resolve({ items: [], total: 0, page: 1, pageSize, totalPages: 1 });
    return catalogService.listProducts({ search: q.value.trim() }, sort.value, page.value, pageSize);
  },
  { watch: [q, sort, page] },
);

const products = computed(() => result.value?.items ?? []);
const total = computed(() => result.value?.total ?? 0);
const totalPages = computed(() => result.value?.totalPages ?? 1);

function submitSearch() {
  q.value = searchInput.value;
  page.value = 1;
  router.replace({ query: { q: q.value } });
}
watch(sort, () => { page.value = 1; });

function salePercent(p: { salePrice?: number; price: number }) {
  if (!p.salePrice) return 0;
  return Math.round((1 - p.salePrice / p.price) * 100);
}

useSeoMeta({
  title: () => (q.value ? `Tìm: ${q.value} — IRONMAN` : 'Tìm kiếm — IRONMAN'),
  description: 'Tìm kiếm sản phẩm tại IRONMAN.',
  robots: 'noindex, follow',
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
    <h1 class="font-display font-bold text-text m-0 mb-6 text-[clamp(1.6rem,4vw,2.4rem)]">Tìm Kiếm</h1>

    <form class="flex gap-2 mb-8 max-w-[560px]" @submit.prevent="submitSearch">
      <input
        v-model="searchInput"
        type="search"
        placeholder="Nhập tên sản phẩm, thương hiệu..."
        class="flex-1 bg-surface border border-rule text-text text-[0.9rem] py-3 px-4 focus:outline-none focus:border-accent"
      />
      <button type="submit" class="bg-accent text-on-accent border-0 font-condensed text-[0.78rem] font-semibold tracking-[2px] uppercase py-3 px-6 cursor-pointer">Tìm</button>
    </form>

    <template v-if="q">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p class="text-mid text-[0.9rem] m-0">
          <span class="font-semibold text-text">{{ total }}</span> kết quả cho "<span class="text-accent">{{ q }}</span>"
        </p>
        <select v-model="sort" class="bg-surface border border-rule text-text text-[0.85rem] py-2 px-3 focus:outline-none focus:border-accent">
          <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </div>

      <div v-if="pending" class="text-center py-16 text-smoke">Đang tìm...</div>
      <div v-else-if="!products.length" class="text-center py-16 text-smoke">Không tìm thấy sản phẩm nào khớp.</div>
      <div v-else class="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
        <NuxtLink v-for="p in products" :key="p.id" :to="`/products/${p.slug}`" class="group no-underline text-inherit flex flex-col cursor-pointer">
          <div class="relative overflow-hidden bg-card [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.06]">
            <CommonProductMedia :src="p.images[0] || undefined" :alt="p.name" aspect="3/4" :placeholder-icon="p.icon" :icon-size="80" />
            <span v-if="salePercent(p)" class="absolute top-3 left-3 z-[3] bg-oxblood text-white font-condensed text-[0.7rem] font-bold tracking-[1px] py-1 px-2.5">-{{ salePercent(p) }}%</span>
            <span v-if="p.isNew" :class="[badgeBase, 'bg-olive text-white']">Mới</span>
          </div>
          <div class="pt-3.5 px-0.5 pb-1">
            <span class="font-condensed text-[0.65rem] font-semibold tracking-[3px] uppercase text-accent">{{ p.brand }}</span>
            <h3 class="font-display text-base font-semibold text-text m-0 my-1.5 leading-[1.3]">{{ p.name }}</h3>
            <div class="flex items-baseline gap-2">
              <span v-if="p.salePrice" class="font-condensed text-[0.95rem] font-bold text-accent">{{ formatPrice(p.salePrice) }}</span>
              <span :class="p.salePrice ? 'font-condensed text-[0.8rem] text-smoke line-through' : 'font-condensed text-[0.95rem] font-semibold text-text'">{{ formatPrice(p.price) }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-10">
        <button :disabled="page <= 1" class="font-condensed text-[0.78rem] tracking-[2px] uppercase py-2 px-4 border border-rule bg-transparent text-text cursor-pointer disabled:opacity-40 hover:enabled:border-accent" @click="page--">← Trước</button>
        <span class="font-condensed text-[0.8rem] text-mid px-3">Trang {{ page }} / {{ totalPages }}</span>
        <button :disabled="page >= totalPages" class="font-condensed text-[0.78rem] tracking-[2px] uppercase py-2 px-4 border border-rule bg-transparent text-text cursor-pointer disabled:opacity-40 hover:enabled:border-accent" @click="page++">Sau →</button>
      </div>
    </template>
    <p v-else class="text-smoke text-center py-16">Nhập từ khoá để tìm sản phẩm.</p>
  </main>
</template>
