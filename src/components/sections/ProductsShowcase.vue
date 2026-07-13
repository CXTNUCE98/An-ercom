<script setup lang="ts">
import { catalogService } from '~/features/catalog/services/catalogService';
import type { CatalogProduct, CategorySlug, IconName } from '~/types/landing';

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

// Fetch toàn bộ sản phẩm từ BE (SSR-friendly). pageSize lớn để lấy đủ cho lưới.
const { data: allProducts } = await useAsyncData(
  'showcase-products',
  async () => {
    const res = await catalogService.listProducts({}, 'newest', 1, 100);
    return res.items;
  },
  { default: () => [] as CatalogProduct[] },
);

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
  const map: Record<string, CatalogProduct[]> = {};
  for (const g of GROUPS) {
    map[g.slug] = (allProducts.value ?? []).filter(p => p.categorySlug === g.slug);
  }
  return map;
});

const pillBase =
  'inline-flex items-center gap-2 py-2 px-4 border no-underline font-condensed text-[0.78rem] font-semibold tracking-[2px] uppercase transition-all duration-300 cursor-pointer hover:-translate-y-px';
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
          activeSlug === g.slug 
            ? 'bg-accent border-accent text-on-accent shadow-md [&_.icon-line]:text-[var(--on-accent)]' 
            : 'bg-surface border-rule text-mid hover:border-accent hover:text-accent',
          'max-[500px]:flex-shrink-0 max-[500px]:py-1.5 max-[500px]:px-2.5 max-[500px]:gap-1.5 max-[500px]:text-[0.65rem] max-[500px]:tracking-[1.5px] max-[500px]:rounded-sm'
        ]" :aria-label="g.name" @click="selectGroup(g.slug)">
          <CommonIconLine :name="g.icon" :size="18" />
          <span class="max-[500px]:hidden">{{ g.name }}</span>
          <span
            class="font-display font-bold text-[0.72rem] py-0.5 px-1.5 rounded-full max-[500px]:hidden transition-colors duration-300"
            :style="{
              background: activeSlug === g.slug ? 'var(--on-accent)' : 'color-mix(in srgb, var(--accent) 15%, transparent)',
              color: activeSlug === g.slug ? 'var(--accent)' : 'var(--accent)'
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

        <!-- SSR render đủ để SEO, nhưng client chỉ hydrate lưới khi cuộn tới
             (hydrate-on-visible) → giảm mạnh TBT lúc tải trang. -->
        <LazyItemsCategoryProductGrid
          :products="productsByGroup[g.slug]"
          hydrate-on-visible
        />
      </section>
    </div>
  </section>
</template>
