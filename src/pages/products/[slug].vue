<script setup lang="ts">
import { useCatalogStore } from '~/features/catalog/stores/useCatalogStore';
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { formatPrice } from '~/shared/utils/format';

const route = useRoute();
const catalog = useCatalogStore();
const cart = useCartStore();

const slug = route.params.slug as string;
const product = catalog.getProduct(slug);
const related = catalog.getRelatedProducts(slug, 4);

if (!product) {
  throw createError({ statusCode: 404, message: 'Sản phẩm không tồn tại' });
}

useHead({ title: `${product.name} — IRONMAN` });

const qty = ref(1);
const activeTab = ref<'desc' | 'specs' | 'reviews'>('desc');
const addedToast = ref(false);

function addToCart() {
  cart.addItem(product!, qty.value);
  addedToast.value = true;
  setTimeout(() => { addedToast.value = false; }, 2000);
}
</script>

<template>
  <main v-if="product" class="pdp">
    <nav class="breadcrumb">
      <NuxtLink to="/">Trang chủ</NuxtLink>
      <span>/</span>
      <NuxtLink to="/products">Sản phẩm</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/categories/${product.categorySlug}`">{{ product.categoryName }}</NuxtLink>
      <span>/</span>
      <span class="current">{{ product.name }}</span>
    </nav>

    <div class="pdp-layout">
      <div class="pdp-gallery">
        <div class="gallery-main">
          <CommonProductMedia
            :src="product.images[0] || undefined"
            :alt="product.name"
            aspect="1/1"
            :placeholder-icon="product.icon"
            :icon-size="160"
          />
          <span v-if="product.salePrice" class="sale-tag">
            -{{ Math.round((1 - product.salePrice / product.price) * 100) }}%
          </span>
        </div>
        <div v-if="product.images.length > 1" class="gallery-thumbs">
          <div v-for="(img, i) in product.images" :key="i" class="thumb">
            <img :src="img" :alt="`${product.name} ${i + 1}`" loading="lazy" />
          </div>
        </div>
      </div>

      <div class="pdp-info">
        <div class="pdp-meta">
          <span class="pdp-brand">{{ product.brand }}</span>
          <span class="pdp-cat">{{ product.categoryName }}</span>
        </div>

        <h1 class="pdp-title">{{ product.name }}</h1>

        <div class="pdp-rating">
          <i v-for="n in 5" :key="n" class="bx" :class="n <= Math.round(product.rating) ? 'bxs-star' : 'bx-star'" />
          <span>{{ product.rating }} ({{ product.reviewCount }} đánh giá)</span>
        </div>

        <div class="pdp-price">
          <span v-if="product.salePrice" class="price-sale">{{ formatPrice(product.salePrice) }}</span>
          <span :class="{ 'price-old': product.salePrice }">{{ formatPrice(product.price) }}</span>
        </div>

        <p class="pdp-desc">{{ product.description }}</p>

        <div class="pdp-actions">
          <div class="qty-control">
            <button @click="qty = Math.max(1, qty - 1)">−</button>
            <span>{{ qty }}</span>
            <button @click="qty++">+</button>
          </div>
          <button class="btn-add-cart" @click="addToCart">
            <i class="bx bx-shopping-bag" />
            Thêm Vào Giỏ
          </button>
        </div>

        <Transition name="fade">
          <div v-if="addedToast" class="toast-added">
            <i class="bx bx-check" /> Đã thêm vào giỏ hàng
          </div>
        </Transition>

        <div class="pdp-services">
          <div><i class="bx bx-check-shield" /> Chính hãng 100%</div>
          <div><i class="bx bx-transfer" /> Đổi trả 30 ngày</div>
          <div><i class="bx bx-package" /> Giao hàng nhanh</div>
        </div>
      </div>
    </div>

    <div class="pdp-tabs">
      <div class="tab-headers">
        <button :class="{ active: activeTab === 'desc' }" @click="activeTab = 'desc'">Mô tả</button>
        <button :class="{ active: activeTab === 'specs' }" @click="activeTab = 'specs'">Thông số</button>
        <button :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">Đánh giá</button>
      </div>
      <div class="tab-content">
        <div v-if="activeTab === 'desc'" class="tab-desc">
          <p>{{ product.description }}</p>
        </div>
        <div v-else-if="activeTab === 'specs'" class="tab-specs">
          <table>
            <tr v-for="spec in product.specs" :key="spec.label">
              <td>{{ spec.label }}</td>
              <td>{{ spec.value }}</td>
            </tr>
          </table>
        </div>
        <div v-else class="tab-reviews">
          <p class="no-reviews">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        </div>
      </div>
    </div>

    <section v-if="related.length" class="related">
      <h2 class="related-title">Có Thể Bạn Thích</h2>
      <div class="related-grid">
        <NuxtLink
          v-for="rp in related"
          :key="rp.id"
          :to="`/products/${rp.slug}`"
          class="related-link"
        >
          <div class="related-card">
            <CommonProductMedia
              :src="rp.images[0] || undefined"
              :alt="rp.name"
              aspect="3/4"
              :placeholder-icon="rp.icon"
              :icon-size="56"
            />
            <div class="related-info">
              <div class="related-name">{{ rp.name }}</div>
              <div class="related-price">{{ formatPrice(rp.salePrice ?? rp.price) }}</div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.pdp {
  padding: 90px var(--gutter) var(--sp-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--smoke);
  margin-bottom: 40px;
}
.breadcrumb a {
  color: var(--smoke);
  text-decoration: none;
  transition: color 0.25s;
}
.breadcrumb a:hover { color: var(--accent); }
.breadcrumb .current { color: var(--text); }

.pdp-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-md);
  margin-bottom: var(--sp-lg);
}

.gallery-main {
  position: relative;
  background: var(--card);
  border: 1px solid var(--rule);
  padding: 14px;
}
.sale-tag {
  position: absolute;
  top: 20px; left: 20px;
  background: var(--oxblood);
  color: #e8e2d0;
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 4px 12px;
  z-index: 2;
}
.gallery-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.thumb {
  width: 72px; height: 72px;
  border: 1px solid var(--rule);
  overflow: hidden;
  cursor: pointer;
}
.thumb img { width: 100%; height: 100%; object-fit: cover; }

.pdp-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}
.pdp-brand {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
}
.pdp-cat {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--smoke);
}

.pdp-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 16px;
  line-height: 1.15;
}

.pdp-rating {
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--accent);
  font-size: 0.85rem;
  margin-bottom: 20px;
}
.pdp-rating span { color: var(--smoke); font-size: 0.78rem; margin-left: 6px; }

.pdp-price {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.price-sale {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent);
}
.price-old {
  font-family: var(--font-condensed);
  font-size: 1.1rem;
  color: var(--smoke);
  text-decoration: line-through;
}
.pdp-price span:only-child {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
}

.pdp-desc {
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--mid);
  margin-bottom: 32px;
}

.pdp-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}
.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--rule);
}
.qty-control button {
  width: 40px; height: 40px;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.25s;
}
.qty-control button:hover { color: var(--accent); }
.qty-control span {
  width: 40px;
  text-align: center;
  font-family: var(--font-condensed);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  border-left: 1px solid var(--rule);
  border-right: 1px solid var(--rule);
  line-height: 40px;
}

.btn-add-cart {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--accent);
  color: var(--on-accent);
  border: none;
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 12px 28px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-add-cart:hover {
  background: var(--brass-deep, var(--accent));
  transform: translateY(-1px);
}

.toast-added {
  background: var(--olive);
  color: #e8e2d0;
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.pdp-services {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 1px solid var(--rule);
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--smoke);
}
.pdp-services i { color: var(--accent); margin-right: 4px; }

/* Tabs */
.pdp-tabs { margin-bottom: var(--sp-lg); }
.tab-headers {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--rule);
  margin-bottom: 28px;
}
.tab-headers button {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--smoke);
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.25s;
}
.tab-headers button:hover { color: var(--text); }
.tab-headers button.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
.tab-content { min-height: 100px; }
.tab-desc p { font-size: 0.92rem; line-height: 1.8; color: var(--mid); }
.tab-specs table { width: 100%; border-collapse: collapse; }
.tab-specs td {
  padding: 12px 16px;
  font-size: 0.88rem;
  border-bottom: 1px solid var(--rule);
}
.tab-specs td:first-child {
  font-family: var(--font-condensed);
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text);
  width: 35%;
}
.tab-specs td:last-child { color: var(--mid); }
.no-reviews { color: var(--smoke); font-style: italic; }

/* Related */
.related { padding-top: var(--sp-md); border-top: 1px solid var(--rule); }
.related-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 28px;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.related-link { text-decoration: none; color: inherit; }
.related-card {
  background: var(--card);
  border: 1px solid var(--rule);
  transition: border-color 0.3s;
}
.related-card:hover { border-color: var(--rule-strong); }
.related-info { padding: 12px; }
.related-name {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 4px;
}
.related-price {
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
}

@media (max-width: 900px) {
  .pdp-layout { grid-template-columns: 1fr; }
  .related-grid { grid-template-columns: repeat(2, 1fr); }
  .pdp { padding: 90px 24px 60px; }
}
</style>
