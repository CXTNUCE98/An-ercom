<script setup lang="ts">
import { useCatalogStore } from '~/features/catalog/stores/useCatalogStore';
import type { SortOption } from '~/features/catalog/types';
import { formatPrice } from '~/shared/utils/format';

useHead({ title: 'Tất Cả Sản Phẩm — IRONMAN' });

const catalog = useCatalogStore();
const route = useRoute();

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'best-seller', label: 'Bán chạy' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'rating', label: 'Đánh giá cao' },
];

const showFilters = ref(true);

onMounted(() => {
  if (route.query.category) {
    catalog.setFilter('category', route.query.category as string);
  }
  if (route.query.search) {
    catalog.setFilter('search', route.query.search as string);
  }
});

onUnmounted(() => {
  catalog.clearFilters();
});

function onCategoryClick(slug: string) {
  if (catalog.filters.category === slug) {
    catalog.setFilter('category', undefined);
  } else {
    catalog.setFilter('category', slug);
  }
}
</script>

<template>
  <main class="products-page">
    <div class="products-header">
      <div>
        <h1 class="page-title">Sản Phẩm</h1>
        <p class="page-count">{{ catalog.total }} sản phẩm</p>
      </div>
      <div class="header-actions">
        <button class="filter-toggle" @click="showFilters = !showFilters">
          <i class="bx bx-filter-alt" />
          {{ showFilters ? 'Ẩn bộ lọc' : 'Bộ lọc' }}
        </button>
        <select
          class="sort-select"
          :value="catalog.sort"
          @change="catalog.setSort(($event.target as HTMLSelectElement).value as SortOption)"
        >
          <option v-for="o in sortOptions" :key="o.value" :value="o.value">
            {{ o.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="products-layout" :class="{ 'no-sidebar': !showFilters }">
      <aside v-if="showFilters" class="sidebar">
        <div class="filter-group">
          <h3>Danh mục</h3>
          <button
            v-for="cat in catalog.categories"
            :key="cat.slug"
            class="filter-chip"
            :class="{ active: catalog.filters.category === cat.slug }"
            @click="onCategoryClick(cat.slug)"
          >
            {{ cat.name }}
          </button>
        </div>

        <div class="filter-group">
          <h3>Thương hiệu</h3>
          <button
            v-for="brand in catalog.brands"
            :key="brand"
            class="filter-chip"
            :class="{ active: catalog.filters.brand === brand }"
            @click="catalog.setFilter('brand', catalog.filters.brand === brand ? undefined : brand)"
          >
            {{ brand }}
          </button>
        </div>

        <button class="clear-btn" @click="catalog.clearFilters()">
          Xóa bộ lọc
        </button>
      </aside>

      <div class="products-grid">
        <NuxtLink
          v-for="product in catalog.products"
          :key="product.id"
          :to="`/products/${product.slug}`"
          class="product-link"
        >
          <article class="pcard-mini">
            <div class="pcard-mini-frame">
              <CommonProductMedia
                :src="product.images[0] || undefined"
                :alt="product.name"
                aspect="3/4"
                :placeholder-icon="product.icon"
                :icon-size="64"
              />
              <span v-if="product.isNew" class="mini-badge new">Mới</span>
              <span v-else-if="product.isBestSeller" class="mini-badge hot">Hot</span>
              <span v-else-if="product.salePrice" class="mini-badge sale">Sale</span>
            </div>
            <div class="pcard-mini-info">
              <div class="mini-cat">{{ product.categoryName }}</div>
              <h3 class="mini-name">{{ product.name }}</h3>
              <div class="mini-brand">{{ product.brand }}</div>
              <div class="mini-price-row">
                <span v-if="product.salePrice" class="mini-sale">{{ formatPrice(product.salePrice) }}</span>
                <span :class="{ 'mini-original': product.salePrice }">{{ formatPrice(product.price) }}</span>
              </div>
              <div class="mini-rating">
                <i v-for="n in 5" :key="n" class="bx" :class="n <= Math.round(product.rating) ? 'bxs-star' : 'bx-star'" />
                <span>({{ product.reviewCount }})</span>
              </div>
            </div>
          </article>
        </NuxtLink>

        <div v-if="catalog.products.length === 0" class="empty-state">
          <CommonIconLine name="glasses" :size="80" />
          <p>Không tìm thấy sản phẩm phù hợp.</p>
          <button class="clear-btn" @click="catalog.clearFilters()">Xóa bộ lọc</button>
        </div>
      </div>
    </div>

    <div v-if="catalog.totalPages > 1" class="pagination">
      <button
        v-for="p in catalog.totalPages"
        :key="p"
        class="page-btn"
        :class="{ active: p === catalog.page }"
        @click="catalog.setPage(p)"
      >
        {{ p }}
      </button>
    </div>
  </main>
</template>

<style scoped>
.products-page {
  padding: 100px var(--gutter) var(--sp-lg);
  min-height: 100vh;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 16px;
}
.page-title {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}
.page-count {
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--smoke);
  margin-top: 6px;
}

.header-actions { display: flex; gap: 12px; align-items: center; }

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--mid);
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.25s;
}
.filter-toggle:hover { border-color: var(--accent); color: var(--accent); }

.sort-select {
  background: var(--surface);
  border: 1px solid var(--rule);
  color: var(--text);
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  letter-spacing: 1.5px;
  padding: 8px 16px;
  cursor: pointer;
}

.products-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
}
.products-layout.no-sidebar { grid-template-columns: 1fr; }

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.filter-group h3 {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 12px;
}
.filter-chip {
  display: inline-block;
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--mid);
  font-family: var(--font-body);
  font-size: 0.8rem;
  padding: 6px 14px;
  margin: 0 6px 6px 0;
  cursor: pointer;
  transition: all 0.25s;
}
.filter-chip:hover { border-color: var(--accent); color: var(--accent); }
.filter-chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}
.clear-btn {
  background: transparent;
  border: none;
  color: var(--smoke);
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.25s;
}
.clear-btn:hover { color: var(--accent); }

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-link { text-decoration: none; color: inherit; }

.pcard-mini {
  cursor: pointer;
  transition: transform 0.4s ease;
}
.pcard-mini:hover { transform: translateY(-4px); }

.pcard-mini-frame {
  position: relative;
  overflow: hidden;
  background: var(--card);
  border: 1px solid var(--rule);
}
.pcard-mini:hover .pcard-mini-frame { border-color: var(--rule-strong); }

.mini-badge {
  position: absolute;
  top: 10px; right: 10px;
  font-family: var(--font-condensed);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 3px 10px;
  z-index: 2;
}
.mini-badge.new { background: var(--olive); color: #e8e2d0; }
.mini-badge.hot { background: var(--accent); color: var(--on-accent); }
.mini-badge.sale { background: var(--oxblood); color: #e8e2d0; }

.pcard-mini-info { padding: 14px 4px 4px; }
.mini-cat {
  font-family: var(--font-condensed);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.mini-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  margin: 0 0 4px;
  line-height: 1.3;
}
.mini-brand {
  font-size: 0.78rem;
  color: var(--smoke);
  margin-bottom: 8px;
}
.mini-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.mini-sale {
  font-family: var(--font-condensed);
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
}
.mini-original {
  font-family: var(--font-condensed);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--mid);
  text-decoration: line-through;
}
.mini-price-row span:only-child {
  font-family: var(--font-condensed);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
}
.mini-rating {
  display: flex;
  align-items: center;
  gap: 2px;
  color: var(--accent);
  font-size: 0.75rem;
}
.mini-rating span {
  color: var(--smoke);
  font-size: 0.7rem;
  margin-left: 4px;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: var(--smoke);
}
.empty-state p { margin: 16px 0; }

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 48px;
}
.page-btn {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--rule);
  background: transparent;
  color: var(--mid);
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s;
}
.page-btn:hover { border-color: var(--accent); color: var(--accent); }
.page-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}

@media (max-width: 1100px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 700px) {
  .products-layout { grid-template-columns: 1fr; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .products-page { padding: 90px 24px 60px; }
}
</style>
