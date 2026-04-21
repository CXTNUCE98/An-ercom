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
  { slug: 'watches', name: 'Watches',  tagline: 'Cỗ máy thời gian trên cổ tay',        icon: 'watch' },
  { slug: 'zippo',   name: 'Zippo',    tagline: 'Ngọn lửa Mỹ — bảo hành trọn đời',     icon: 'zippo' },
  { slug: 'glasses', name: 'Glasses',  tagline: 'Ánh nhìn sắc. Phong cách riêng.',     icon: 'glasses' },
  { slug: 'belts',   name: 'Belts',    tagline: 'Da bò Italy · khoá đồng nguyên khối', icon: 'belt' },
  { slug: 'wallets', name: 'Wallets',  tagline: 'Mềm tay. Gọn túi. Bền lâu.',          icon: 'wallet' },
  { slug: 'hats',    name: 'Hats',     tagline: 'Hoàn thiện bộ trang phục đàn ông',    icon: 'hat' },
];

const activeSlug = ref<CategorySlug>('watches');

const productsByGroup = computed(() => {
  const map: Record<string, typeof CATALOG_PRODUCTS> = {};
  for (const g of GROUPS) {
    map[g.slug] = CATALOG_PRODUCTS.filter(p => p.categorySlug === g.slug);
  }
  return map;
});

const activeProducts = computed(() => productsByGroup.value[activeSlug.value] ?? []);

function salePercent(p: (typeof CATALOG_PRODUCTS)[number]) {
  if (!p.salePrice) return 0;
  return Math.round((1 - p.salePrice / p.price) * 100);
}
</script>

<template>
  <section id="products" class="products-section">
    <!-- Editorial head -->
    <div class="ps-head">
      <div class="ps-eyebrow">
        <span class="rule" />
        <span class="txt">Toàn bộ sản phẩm · Chọn theo loại</span>
        <span class="rule" />
      </div>
      <h2 class="ps-title">
        Sáu Dòng Sản Phẩm — <em>Một Phong Cách</em>
      </h2>
      <p class="ps-sub">
        Cuộn xuống để xem toàn bộ kho hàng theo từng loại. Hoặc chọn nhanh một
        dòng ở dưới để nhảy tới mục bạn quan tâm.
      </p>
    </div>

    <!-- Category pill nav (anchor jump) -->
    <nav class="cat-nav" aria-label="Chọn nhóm sản phẩm">
      <a
        v-for="g in GROUPS"
        :key="g.slug"
        :href="`#cat-${g.slug}`"
        class="cat-pill"
        :class="{ active: activeSlug === g.slug }"
        @click="activeSlug = g.slug"
      >
        <CommonIconLine :name="g.icon" :size="18" />
        <span class="pill-name">{{ g.name }}</span>
        <span class="pill-count">{{ productsByGroup[g.slug].length }}</span>
      </a>
    </nav>

    <!-- Per-category rows -->
    <div class="cat-stack">
      <section
        v-for="g in GROUPS"
        :key="g.slug"
        :id="`cat-${g.slug}`"
        class="cat-row"
      >
        <header class="cat-head">
          <div class="cat-head-left">
            <span class="cat-icon"><CommonIconLine :name="g.icon" :size="28" /></span>
            <div>
              <h3>{{ g.name }}</h3>
              <p>{{ g.tagline }}</p>
            </div>
          </div>
          <span class="cat-count">
            {{ productsByGroup[g.slug].length }} sản phẩm
          </span>
        </header>

        <div class="products-grid">
          <NuxtLink
            v-for="p in productsByGroup[g.slug]"
            :key="p.id"
            :to="`/products/${p.slug}`"
            class="showcase-card"
          >
            <div class="sc-frame">
              <CommonProductMedia
                :src="p.images[0] || undefined"
                :alt="p.name"
                aspect="3/4"
                :placeholder-icon="p.icon"
                :icon-size="80"
              />
              <span v-if="salePercent(p)" class="sc-sale">-{{ salePercent(p) }}%</span>
              <span v-if="p.isNew" class="sc-badge new">Mới</span>
              <span v-else-if="p.isBestSeller" class="sc-badge best">Bán Chạy</span>
              <span v-else-if="p.isLuxury" class="sc-badge lux">Luxury</span>
              <div class="sc-overlay">
                <span class="sc-cta">Xem Chi Tiết →</span>
              </div>
            </div>
            <div class="sc-info">
              <div class="sc-brand-row">
                <span class="sc-brand">{{ p.brand }}</span>
                <span class="sc-rating"><i class="bx bxs-star" /> {{ p.rating }}</span>
              </div>
              <h4 class="sc-name">{{ p.name }}</h4>
              <div class="sc-prices">
                <span v-if="p.salePrice" class="sc-price-sale">{{ formatPrice(p.salePrice) }}</span>
                <span :class="p.salePrice ? 'sc-price-old' : 'sc-price'">{{ formatPrice(p.price) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.products-section {
  padding: var(--sp-lg) var(--gutter);
  max-width: 1360px;
  margin: 0 auto;
}

/* Head */
.ps-head { text-align: center; max-width: 720px; margin: 0 auto 40px; }
.ps-eyebrow {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; margin-bottom: 16px;
}
.ps-eyebrow .rule { width: 40px; height: 1px; background: var(--accent); }
.ps-eyebrow .txt {
  font-family: var(--font-condensed);
  font-size: 0.72rem; font-weight: 600;
  letter-spacing: 4px; text-transform: uppercase;
  color: var(--accent);
}
.ps-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: 700;
  line-height: 1.08;
  color: var(--text);
  margin: 0 0 14px;
}
.ps-title em { font-style: italic; color: var(--accent); }
.ps-sub {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--mid);
  margin: 0;
}

/* Pill nav (sticky under header) */
.cat-nav {
  position: sticky;
  top: 68px;
  z-index: 5;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 14px 0;
  margin: 0 0 32px;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--rule);
}
.cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--rule);
  background: var(--surface);
  color: var(--mid);
  text-decoration: none;
  font-family: var(--font-condensed);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.3s;
  cursor: pointer;
}
.cat-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}
.cat-pill.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}
.pill-count {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.72rem;
  padding: 2px 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 20%, transparent);
  color: var(--accent);
}
.cat-pill.active .pill-count {
  background: color-mix(in srgb, #fff 25%, transparent);
  color: #fff;
}

/* Per-category row */
.cat-stack { display: flex; flex-direction: column; gap: var(--sp-lg); }
.cat-row { scroll-margin-top: 130px; }

.cat-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule);
}
.cat-head-left { display: flex; align-items: center; gap: 16px; }
.cat-icon {
  display: inline-flex;
  width: 54px; height: 54px;
  align-items: center; justify-content: center;
  border: 1px solid var(--rule-strong);
  color: var(--accent);
  background: var(--surface);
}
.cat-head h3 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  color: var(--text);
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.5px;
}
.cat-head p {
  margin: 4px 0 0;
  color: var(--smoke);
  font-size: 0.9rem;
}
.cat-count {
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  white-space: nowrap;
}

/* Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.showcase-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.sc-frame { position: relative; overflow: hidden; background: var(--card); }
.sc-frame :deep(.media-img) { transition: transform 0.5s ease; }
.showcase-card:hover .sc-frame :deep(.media-img) { transform: scale(1.06); }

.sc-sale {
  position: absolute;
  top: 12px; left: 12px;
  background: var(--oxblood);
  color: #fff;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 4px 10px;
  z-index: 3;
}
.sc-badge {
  position: absolute;
  top: 12px; right: 12px;
  font-family: var(--font-condensed);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 10px;
  z-index: 3;
}
.sc-badge.new  { background: var(--olive); color: #fff; }
.sc-badge.best { background: var(--accent); color: var(--on-accent); }
.sc-badge.lux  { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: var(--ink); }

.sc-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(7, 7, 10, 0.6));
  opacity: 0;
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 24px;
  transition: opacity 0.4s;
  z-index: 2;
}
.showcase-card:hover .sc-overlay { opacity: 1; }
.sc-cta {
  font-family: var(--font-condensed);
  font-size: 0.72rem; font-weight: 600;
  letter-spacing: 3px; text-transform: uppercase;
  color: #f8f5ef;
  border: 1px solid rgba(241, 236, 224, 0.7);
  padding: 10px 20px;
  transform: translateY(8px);
  transition: all 0.4s;
}
.showcase-card:hover .sc-cta { transform: translateY(0); }

.sc-info { padding: 14px 2px 4px; }
.sc-brand-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 6px;
}
.sc-brand {
  font-family: var(--font-condensed);
  font-size: 0.65rem; font-weight: 600;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--accent);
}
.sc-rating {
  display: inline-flex; align-items: center; gap: 3px;
  font-family: var(--font-condensed);
  font-size: 0.78rem; font-weight: 600;
  color: var(--mid);
}
.sc-rating i { color: var(--accent); font-size: 0.8rem; }
.sc-name {
  font-family: var(--font-display);
  font-size: 1rem; font-weight: 600;
  color: var(--text);
  margin: 0 0 8px;
  line-height: 1.3;
}
.sc-prices { display: flex; align-items: baseline; gap: 8px; }
.sc-price       { font-family: var(--font-condensed); font-size: 0.95rem; font-weight: 600; color: var(--text); }
.sc-price-sale  { font-family: var(--font-condensed); font-size: 0.95rem; font-weight: 700; color: var(--accent); }
.sc-price-old   { font-family: var(--font-condensed); font-size: 0.8rem;  color: var(--smoke); text-decoration: line-through; }

@media (max-width: 1100px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .cat-head { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 500px) {
  .products-section { padding: var(--sp-md) 20px; }
  .cat-nav { top: 60px; padding: 10px 0; }
  .cat-pill { padding: 7px 12px; font-size: 0.7rem; letter-spacing: 1.5px; }
  .pill-name { display: none; }
}
</style>
