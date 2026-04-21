<script setup lang="ts">
import { CATALOG_PRODUCTS } from '~/constants/products';
import { formatPrice } from '~/shared/utils/format';

const tabs = [
  { key: 'new', label: 'Mới Về' },
  { key: 'best', label: 'Bán Chạy' },
  { key: 'luxury', label: 'Cao Cấp' },
] as const;

type TabKey = (typeof tabs)[number]['key'];
const activeTab = ref<TabKey>('new');

const filtered = computed(() => {
  let items = CATALOG_PRODUCTS;
  if (activeTab.value === 'new') items = items.filter(p => p.isNew);
  else if (activeTab.value === 'best') items = items.filter(p => p.isBestSeller);
  else items = items.filter(p => p.isLuxury);
  return items.slice(0, 8);
});

function salePercent(p: (typeof CATALOG_PRODUCTS)[number]) {
  if (!p.salePrice) return 0;
  return Math.round((1 - p.salePrice / p.price) * 100);
}
</script>

<template>
  <section class="products-section">
    <SectionHeader
      tag="Bộ sưu tập nổi bật"
      title="Sản Phẩm"
      accent="Chọn Lọc"
      link="/products"
    />

    <div class="showcase-tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="tab-btn"
        :class="{ active: activeTab === t.key }"
        @click="activeTab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <div class="products-grid">
      <NuxtLink
        v-for="(p, i) in filtered"
        :key="p.id"
        :to="`/products/${p.slug}`"
        class="showcase-card"
        :class="{ 'showcase-card--hero': i === 0 }"
      >
        <div class="sc-frame">
          <CommonProductMedia
            :src="p.images[0] || undefined"
            :alt="p.name"
            aspect="3/4"
            :placeholder-icon="p.icon"
            :icon-size="i === 0 ? 140 : 80"
          />
          <span v-if="salePercent(p)" class="sc-sale">-{{ salePercent(p) }}%</span>
          <span v-if="p.isNew" class="sc-badge new">Mới</span>
          <span v-else-if="p.isBestSeller" class="sc-badge best">Bán Chạy</span>
          <div class="sc-overlay">
            <span class="sc-cta">Xem Chi Tiết →</span>
          </div>
        </div>
        <div class="sc-info">
          <div class="sc-cat">{{ p.categoryName }}</div>
          <h3 class="sc-name">{{ p.name }}</h3>
          <div class="sc-brand">{{ p.brand }}</div>
          <div class="sc-prices">
            <span v-if="p.salePrice" class="sc-price-sale">{{ formatPrice(p.salePrice) }}</span>
            <span :class="p.salePrice ? 'sc-price-old' : 'sc-price'">{{ formatPrice(p.price) }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.products-section { padding: 80px var(--gutter); }

.showcase-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
}
.tab-btn {
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--smoke);
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 10px 24px;
  cursor: pointer;
  transition: all 0.3s;
}
.tab-btn:hover { border-color: var(--accent); color: var(--accent); }
.tab-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.showcase-card--hero {
  grid-column: span 2;
  grid-row: span 2;
}

.showcase-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.sc-frame {
  position: relative;
  overflow: hidden;
}
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
.sc-badge.new { background: var(--olive); color: #fff; }
.sc-badge.best { background: var(--accent); color: var(--on-accent); }

.sc-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(7, 7, 10, 0.6));
  opacity: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 24px;
  transition: opacity 0.4s;
  z-index: 2;
}
.showcase-card:hover .sc-overlay { opacity: 1; }

.sc-cta {
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #f8f5ef;
  border: 1px solid rgba(241, 236, 224, 0.7);
  padding: 10px 20px;
  transform: translateY(8px);
  transition: all 0.4s;
}
.showcase-card:hover .sc-cta { transform: translateY(0); }

.sc-info { padding: 16px 2px 4px; }

.sc-cat {
  font-family: var(--font-condensed);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.sc-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 4px;
  line-height: 1.3;
}
.showcase-card--hero .sc-name { font-size: 1.4rem; }
.sc-brand {
  font-size: 0.75rem;
  color: var(--smoke);
  margin-bottom: 8px;
}
.sc-prices { display: flex; align-items: baseline; gap: 8px; }
.sc-price {
  font-family: var(--font-condensed);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}
.sc-price-sale {
  font-family: var(--font-condensed);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent);
}
.sc-price-old {
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  color: var(--smoke);
  text-decoration: line-through;
}

@media (max-width: 1100px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
  .showcase-card--hero { grid-column: span 1; grid-row: span 1; }
}
@media (max-width: 768px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 500px) {
  .products-section { padding: 60px 24px; }
  .products-grid { grid-template-columns: 1fr; }
  .showcase-tabs { flex-wrap: wrap; }
}
</style>
