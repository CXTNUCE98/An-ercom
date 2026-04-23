<script setup lang="ts">
import { CATALOG_PRODUCTS } from '~/constants/products';
import { formatPrice } from '~/shared/utils/format';
import type { CategorySlug, IconName } from '~/types/landing';

interface Group {
  slug: CategorySlug;
  name: string;
  tagline: string;
  icon: IconName;
}

const GROUPS: Group[] = [
  { slug: 'watches', name: 'Watches', tagline: 'Cỗ máy thời gian trên cổ tay', icon: 'watch' },
  { slug: 'zippo', name: 'Zippo', tagline: 'Ngọn lửa Mỹ — bảo hành trọn đời', icon: 'zippo' },
  { slug: 'glasses', name: 'Glasses', tagline: 'Ánh nhìn sắc. Phong cách riêng.', icon: 'glasses' },
  { slug: 'belts', name: 'Belts', tagline: 'Da bò Italy · khoá đồng nguyên khối', icon: 'belt' },
  { slug: 'wallets', name: 'Wallets', tagline: 'Mềm tay. Gọn túi. Bền lâu.', icon: 'wallet' },
  { slug: 'hats', name: 'Hats', tagline: 'Hoàn thiện bộ trang phục đàn ông', icon: 'hat' },
];

const activeSlug = ref<CategorySlug>('watches');

function selectGroup(slug: CategorySlug) {
  activeSlug.value = slug;
}

onMounted(() => {
  // Sync active slug with the section currently in view while scrolling
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const sections = GROUPS
    .map(g => document.getElementById(`cat-${g.slug}`))
    .filter((el): el is HTMLElement => el !== null);

  if (!sections.length) return;

  // Track visibility ratios per section so the most prominent one wins
  const ratios = new Map<string, number>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target.id, entry.intersectionRatio);
      }
      let topId = '';
      let topRatio = 0;
      for (const [id, r] of ratios) {
        if (r > topRatio) { topRatio = r; topId = id; }
      }
      if (topRatio > 0 && topId.startsWith('cat-')) {
        const slug = topId.slice(4) as CategorySlug;
        if (slug !== activeSlug.value) activeSlug.value = slug;
      }
    },
    {
      // Focus on the band roughly around viewport center
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach(el => observer.observe(el));

  onBeforeUnmount(() => observer.disconnect());
});

const productsByGroup = computed(() => {
  const map: Record<string, typeof CATALOG_PRODUCTS> = {};
  for (const g of GROUPS) {
    map[g.slug] = CATALOG_PRODUCTS.filter(p => p.categorySlug === g.slug);
  }
  return map;
});

function salePercent(p: (typeof CATALOG_PRODUCTS)[number]) {
  if (!p.salePrice) return 0;
  return Math.round((1 - p.salePrice / p.price) * 100);
}

const pillBase =
  'inline-flex items-center gap-2 py-2 px-4 border border-rule bg-surface text-mid no-underline font-condensed text-[0.78rem] font-semibold tracking-[2px] uppercase transition-all duration-300 cursor-pointer hover:border-accent hover:text-accent hover:-translate-y-px';
const pillActive = 'bg-accent border-accent text-on-accent';
const badgeBase =
  'absolute top-3 right-3 font-condensed text-[0.65rem] font-bold tracking-[2px] uppercase py-1 px-2.5 z-[3]';
</script>

<template>
  <section id="products" class="py-lg px-gutter max-w-[1360px] mx-auto sm:px-5 max-[500px]:pb-[80px]">
    <!-- Editorial head -->
    <div class="text-center max-w-[720px] mx-auto mb-10">
      <div class="flex items-center justify-center gap-3.5 mb-4">
        <span class="block w-10 h-px bg-accent" />
        <span class="font-condensed text-[0.72rem] font-semibold tracking-[4px] uppercase text-accent">
          Toàn bộ sản phẩm · Chọn theo loại
        </span>
        <span class="block w-10 h-px bg-accent" />
      </div>
      <h2 class="font-display font-bold leading-[1.08] text-text m-0 mb-3.5 text-[clamp(1.8rem,4.5vw,3rem)]">
        Sáu Dòng Sản Phẩm — <em class="italic text-accent">Một Phong Cách</em>
      </h2>
      <p class="text-[0.95rem] leading-[1.7] text-mid m-0">
        Cuộn xuống để xem toàn bộ kho hàng theo từng loại. Hoặc chọn nhanh một
        dòng ở dưới để nhảy tới mục bạn quan tâm.
      </p>
    </div>

    <!-- Category nav — desktop: horizontal pill bar / mobile: sticky horizontal bar pinned to top -->
    <div class="relative z-[5] mb-8 max-[500px]:mb-6">
      <!-- Pill nav -->
      <nav id="category-rail" :class="[
        'flex flex-wrap justify-center gap-2 py-3.5 border-b border-rule',
        'max-[500px]:fixed max-[500px]:left-0 max-[500px]:right-0 max-[500px]:bottom-0 max-[500px]:top-auto max-[500px]:z-[90]',
        'max-[500px]:flex-nowrap max-[500px]:overflow-hidden',
        'max-[500px]:justify-around max-[500px]:gap-1 max-[500px]:py-2 max-[500px]:px-2',
        'max-[500px]:pb-[max(0.5rem,env(safe-area-inset-bottom))]',
        'max-[500px]:bg-[color-mix(in_srgb,var(--surface)_94%,transparent)]',
        'max-[500px]:backdrop-blur-[10px]',
        'max-[500px]:border-t max-[500px]:border-rule',
        'max-[500px]:shadow-[0_-6px_20px_color-mix(in_srgb,#000_22%,transparent)]'
      ]" aria-label="Chọn nhóm sản phẩm">
        <a v-for="g in GROUPS" :key="g.slug" :href="`#cat-${g.slug}`" :class="[
          pillBase,
          activeSlug === g.slug && pillActive,
          'max-[500px]:flex-shrink-0 max-[500px]:py-1.5 max-[500px]:px-2.5 max-[500px]:gap-1.5 max-[500px]:text-[0.65rem] max-[500px]:tracking-[1.5px] max-[500px]:rounded-sm'
        ]" :aria-label="g.name" @click="selectGroup(g.slug)">
          <CommonIconLine :name="g.icon" :size="18" />
          <span class="max-[500px]:hidden">{{ g.name }}</span>
          <span
            class="font-display font-bold text-[0.72rem] py-0.5 px-1.5 rounded-full max-[500px]:hidden"
            :style="{
              background: activeSlug === g.slug
                ? 'color-mix(in srgb, #fff 25%, transparent)'
                : 'color-mix(in srgb, var(--accent) 20%, transparent)',
              color: activeSlug === g.slug ? '#fff' : 'var(--accent)'
            }">{{ productsByGroup[g.slug].length }}</span>
        </a>
      </nav>
    </div>

    <!-- Per-category rows -->
    <div class="flex flex-col gap-lg">
      <section v-for="g in GROUPS" :key="g.slug" :id="`cat-${g.slug}`"
        class="scroll-mt-[130px] max-[500px]:scroll-mt-[72px]">
        <header class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-rule">
          <div class="flex items-center gap-4">
            <span
              class="inline-flex w-[54px] h-[54px] items-center justify-center border border-rule-strong text-accent bg-surface">
              <CommonIconLine :name="g.icon" :size="28" />
            </span>
            <div>
              <h3
                class="font-display font-bold text-text m-0 leading-[1.1] tracking-[-0.5px] text-[clamp(1.5rem,3vw,2.2rem)]">
                {{ g.name }}</h3>
              <p class="m-0 mt-1 text-smoke text-[0.9rem]">{{ g.tagline }}</p>
            </div>
          </div>
          <span
            class="font-condensed text-[0.72rem] font-semibold tracking-[2px] uppercase text-accent whitespace-nowrap">
            {{ productsByGroup[g.slug].length }} sản phẩm
          </span>
        </header>

        <div class="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          <NuxtLink v-for="p in productsByGroup[g.slug]" :key="p.id" :to="`/products/${p.slug}`"
            class="group no-underline text-inherit flex flex-col cursor-pointer">
            <div
              class="relative overflow-hidden bg-card [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.06]">
              <CommonProductMedia :src="p.images[0] || undefined" :alt="p.name" aspect="3/4" :placeholder-icon="p.icon"
                :icon-size="80" />
              <span v-if="salePercent(p)"
                class="absolute top-3 left-3 z-[3] bg-oxblood text-white font-condensed text-[0.7rem] font-bold tracking-[1px] py-1 px-2.5">-{{
                salePercent(p) }}%</span>
              <span v-if="p.isNew" :class="[badgeBase, 'bg-olive text-white']">Mới</span>
              <span v-else-if="p.isBestSeller" :class="[badgeBase, 'bg-accent text-on-accent']">Bán Chạy</span>
              <span v-else-if="p.isLuxury"
                :class="[badgeBase, 'text-ink bg-gradient-to-br from-accent to-[var(--accent-2)]']">Luxury</span>
              <div
                class="absolute inset-0 flex items-end justify-center pb-6 opacity-0 transition-opacity duration-400 z-[2] group-hover:opacity-100"
                :style="{ background: 'linear-gradient(180deg, transparent 50%, rgba(7, 7, 10, 0.6))' }">
                <span
                  class="font-condensed text-[0.72rem] font-semibold tracking-[3px] uppercase text-[#f8f5ef] border border-[rgba(241,236,224,0.7)] py-2.5 px-5 translate-y-2 transition-transform duration-400 group-hover:translate-y-0">
                  Xem Chi Tiết →
                </span>
              </div>
            </div>
            <div class="pt-3.5 px-0.5 pb-1">
              <div class="flex justify-between items-center mb-1.5">
                <span class="font-condensed text-[0.65rem] font-semibold tracking-[3px] uppercase text-accent">{{
                  p.brand }}</span>
                <span class="inline-flex items-center gap-[3px] font-condensed text-[0.78rem] font-semibold text-mid">
                  <i class="bx bxs-star text-accent text-[0.8rem]" /> {{ p.rating }}
                </span>
              </div>
              <h4 class="font-display text-base font-semibold text-text m-0 mb-2 leading-[1.3]">{{ p.name }}</h4>
              <div class="flex items-baseline gap-2">
                <span v-if="p.salePrice" class="font-condensed text-[0.95rem] font-bold text-accent">{{
                  formatPrice(p.salePrice) }}</span>
                <span :class="p.salePrice
                  ? 'font-condensed text-[0.8rem] text-smoke line-through'
                  : 'font-condensed text-[0.95rem] font-semibold text-text'">{{ formatPrice(p.price) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>
