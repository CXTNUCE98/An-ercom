<script setup lang="ts">
import { useCatalogStore } from '~/features/catalog/stores/useCatalogStore';
import { formatPrice } from '~/shared/utils/format';

const route = useRoute();
const catalog = useCatalogStore();

const slug = computed(() => route.params.slug as string);

const category = computed(() => catalog.getCategory(slug.value));

watch(slug, (newSlug) => {
  catalog.setFilter('category', newSlug as any);
}, { immediate: true });

if (!category.value) {
  throw createError({ statusCode: 404, message: 'Category not found' });
}

useHead({ title: computed(() => `${category.value?.name ?? ''} — IRONMAN`) });

onUnmounted(() => {
  catalog.clearFilters();
});
</script>

<template>
  <main v-if="category" class="cat-page">
    <section class="cat-hero">
      <div class="cat-hero-text">
        <div class="cat-eyebrow">
          <span class="rule" />
          <span>Danh Mục</span>
        </div>
        <h1 class="cat-title">{{ category.name }}</h1>
        <p class="cat-tagline">{{ category.tagline }}</p>
        <p class="cat-desc">{{ category.description }}</p>
      </div>
      <div class="cat-hero-visual">
        <CommonProductMedia
          :src="category.image || undefined"
          :alt="category.name"
          aspect="4/3"
          :placeholder-icon="category.icon"
          :icon-size="120"
        />
      </div>
    </section>

    <section class="cat-products">
      <div class="cat-products-header">
        <span class="count-label">{{ catalog.total }} sản phẩm</span>
        <NuxtLink to="/products" class="view-all">Xem tất cả →</NuxtLink>
      </div>

      <div class="cat-grid">
        <NuxtLink
          v-for="product in catalog.products"
          :key="product.id"
          :to="`/products/${product.slug}`"
          class="cat-product-link"
        >
          <article class="cat-pcard">
            <div class="cat-pcard-frame">
              <CommonProductMedia
                :src="product.images[0] || undefined"
                :alt="product.name"
                aspect="3/4"
                :placeholder-icon="product.icon"
                :icon-size="64"
              />
              <span v-if="product.isNew" class="tag new">Mới</span>
              <span v-else-if="product.isBestSeller" class="tag hot">Hot</span>
            </div>
            <div class="cat-pcard-info">
              <h3>{{ product.name }}</h3>
              <div class="brand">{{ product.brand }}</div>
              <div class="price-row">
                <span v-if="product.salePrice" class="sale">{{ formatPrice(product.salePrice) }}</span>
                <span :class="{ 'old': product.salePrice }">{{ formatPrice(product.price) }}</span>
              </div>
            </div>
          </article>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.cat-page {
  padding: 90px var(--gutter) var(--sp-lg);
  min-height: 100vh;
}

.cat-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-md);
  align-items: center;
  margin-bottom: var(--sp-lg);
}

.cat-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.cat-eyebrow .rule { width: 32px; height: 1px; background: var(--accent); }
.cat-eyebrow span:last-child {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
}

.cat-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: var(--text);
  margin: 0 0 12px;
  line-height: 1;
}
.cat-tagline {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--accent);
  margin: 0 0 20px;
}
.cat-desc {
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--mid);
  max-width: 480px;
}

.cat-hero-visual {
  background: var(--card);
  border: 1px solid var(--rule);
  padding: 14px;
}

.cat-products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule);
}
.count-label {
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--smoke);
}
.view-all {
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  text-decoration: none;
  transition: color 0.25s;
}
.view-all:hover { color: var(--text); }

.cat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.cat-product-link { text-decoration: none; color: inherit; }

.cat-pcard { transition: transform 0.4s ease; cursor: pointer; }
.cat-pcard:hover { transform: translateY(-4px); }

.cat-pcard-frame {
  position: relative;
  background: var(--card);
  border: 1px solid var(--rule);
  overflow: hidden;
}
.cat-pcard:hover .cat-pcard-frame { border-color: var(--rule-strong); }

.tag {
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
.tag.new { background: var(--olive); color: #e8e2d0; }
.tag.hot { background: var(--accent); color: var(--on-accent); }

.cat-pcard-info { padding: 14px 4px; }
.cat-pcard-info h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  margin: 0 0 4px;
  line-height: 1.3;
}
.brand { font-size: 0.78rem; color: var(--smoke); margin-bottom: 8px; }
.price-row { display: flex; gap: 8px; align-items: center; }
.sale {
  font-family: var(--font-condensed);
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
}
.old {
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  color: var(--smoke);
  text-decoration: line-through;
}
.price-row span:only-child {
  font-family: var(--font-condensed);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
}

@media (max-width: 900px) {
  .cat-hero { grid-template-columns: 1fr; }
  .cat-hero-visual { order: -1; }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  .cat-page { padding: 90px 24px 60px; }
}
</style>
