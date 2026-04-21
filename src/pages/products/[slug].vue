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

useHead({ title: `${product!.name} — IRONMAN` });

/* ── Gallery: derive multiple "angles" from images, fall back to one ──── */
const gallery = computed(() => {
  const imgs = product!.images.filter(Boolean);
  if (imgs.length >= 3) return imgs;
  // Synthesize visual variations using unsplash transform params if possible
  const base = imgs[0];
  if (!base) return [];
  const variants = [
    base,
    `${base}${base.includes('?') ? '&' : '?'}sat=-30`,
    `${base}${base.includes('?') ? '&' : '?'}blur=0&sat=20`,
    `${base}${base.includes('?') ? '&' : '?'}flip=h`,
  ];
  return Array.from(new Set([...imgs, ...variants])).slice(0, 4);
});

const angleLabels = ['Mặt chính', 'Cạnh bên', 'Mặt sau', 'Chi tiết'];

/* ── Lightbox ──────────────────────────────────────────────────────────── */
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
function openLightbox(i: number) {
  lightboxIndex.value = i;
  lightboxOpen.value = true;
}
function closeLightbox() { lightboxOpen.value = false; }
function nextImg() {
  lightboxIndex.value = (lightboxIndex.value + 1) % gallery.value.length;
}
function prevImg() {
  lightboxIndex.value = (lightboxIndex.value - 1 + gallery.value.length) % gallery.value.length;
}
watch(lightboxOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '';
});

/* ── Active main image ────────────────────────────────────────────────── */
const activeIdx = ref(0);

/* ── Cart logic ───────────────────────────────────────────────────────── */
const qty = ref(1);
const addedToast = ref(false);
function addToCart() {
  cart.addItem(product!, qty.value);
  addedToast.value = true;
  setTimeout(() => (addedToast.value = false), 2000);
}

/* ── Rating breakdown fallback ─────────────────────────────────────────── */
const ratingBreakdown = computed(() => {
  const r = product!.ratingBreakdown ?? {};
  const base = product!.rating;
  return {
    quality:    r.quality    ?? Math.min(5, base + 0.1),
    design:     r.design     ?? Math.max(0, base - 0.1),
    durability: r.durability ?? Math.min(5, base + 0.05),
    value:      r.value      ?? Math.max(0, base - 0.2),
  };
});

/* ── Highlights fallback derived from specs ────────────────────────────── */
const highlights = computed(() => {
  if (product!.highlights?.length) return product!.highlights;
  return product!.specs.slice(0, 4).map((s) => `${s.label}: ${s.value}`);
});

/* ── Video URL fallback (sample review) ────────────────────────────────── */
const videoUrl = computed(() => product!.videoUrl ?? '');

/* ── Rating breakdown labels (extracted to avoid template parse issues) ── */
const rbLabels: Record<string, string> = {
  quality: 'Chất liệu',
  design: 'Thiết kế',
  durability: 'Độ bền',
  value: 'Giá trị',
};
</script>

<template>
  <main v-if="product" class="pdp">
    <!-- Breadcrumb -->
    <nav class="crumb">
      <NuxtLink to="/">Trang Chủ</NuxtLink>
      <span>/</span>
      <NuxtLink to="/#products">Sản Phẩm</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/#cat-${product.categorySlug}`">{{ product.categoryName }}</NuxtLink>
      <span>/</span>
      <span class="cur">{{ product.name }}</span>
    </nav>

    <!-- Top: Gallery + Buy box (vertical, mobile-first) -->
    <section class="pdp-top">
      <!-- Gallery -->
      <div class="gallery">
        <div class="gallery-main" @click="openLightbox(activeIdx)">
          <CommonProductMedia
            :src="gallery[activeIdx] || product.images[0]"
            :alt="product.name"
            aspect="1/1"
            :placeholder-icon="product.icon"
            :icon-size="160"
          />
          <span v-if="product.salePrice" class="sale-tag">
            −{{ Math.round((1 - product.salePrice / product.price) * 100) }}%
          </span>
          <span v-if="product.isLuxury" class="lux-tag">
            <i class="bx bxs-crown" /> Luxury
          </span>
          <button class="zoom-cue" aria-label="Phóng to">
            <i class="bx bx-search-alt-2" />
            <span>Bấm xem chi tiết góc cạnh</span>
          </button>
        </div>

        <div v-if="gallery.length > 1" class="gallery-thumbs">
          <button
            v-for="(img, i) in gallery"
            :key="i"
            class="thumb"
            :class="{ active: activeIdx === i }"
            @click="activeIdx = i"
          >
            <img :src="img" :alt="`${product.name} ${i + 1}`" loading="lazy" />
            <span class="thumb-label">{{ angleLabels[i] || `Góc ${i + 1}` }}</span>
          </button>
        </div>
      </div>

      <!-- Info / Buy -->
      <aside class="info">
        <div class="brand-row">
          <span class="brand">{{ product.brand }}</span>
          <span class="cat">{{ product.categoryName }}</span>
        </div>

        <h1 class="name">{{ product.name }}</h1>

        <div class="rating-row">
          <div class="stars">
            <i v-for="n in 5" :key="n"
               class="bx" :class="n <= Math.round(product.rating) ? 'bxs-star' : 'bx-star'" />
          </div>
          <span class="rate-num">{{ product.rating }}</span>
          <span class="rate-count">· {{ product.reviewCount }} đánh giá</span>
        </div>

        <div class="price-block">
          <div class="price-main">
            <span v-if="product.salePrice" class="sale">{{ formatPrice(product.salePrice) }}</span>
            <span :class="['orig', { strike: product.salePrice }]">{{ formatPrice(product.price) }}</span>
          </div>
          <div v-if="product.salePrice" class="save-line">
            <i class="bx bxs-offer" />
            Tiết kiệm <strong>{{ formatPrice(product.price - product.salePrice) }}</strong>
          </div>
        </div>

        <p class="desc">{{ product.description }}</p>

        <ul class="hl">
          <li v-for="h in highlights" :key="h">
            <i class="bx bx-check" /> {{ h }}
          </li>
        </ul>

        <div class="actions">
          <div class="qty">
            <button @click="qty = Math.max(1, qty - 1)" aria-label="Giảm">−</button>
            <span>{{ qty }}</span>
            <button @click="qty++" aria-label="Tăng">+</button>
          </div>
          <button class="btn-cart" @click="addToCart">
            <i class="bx bx-shopping-bag" />
            Thêm Vào Giỏ
          </button>
        </div>

        <Transition name="fade">
          <div v-if="addedToast" class="toast">
            <i class="bx bx-check" /> Đã thêm vào giỏ hàng
          </div>
        </Transition>

        <ul class="services">
          <li><i class="bx bx-shield-quarter" /> Chính hãng 100%</li>
          <li><i class="bx bx-refresh" /> Đổi trả 30 ngày</li>
          <li><i class="bx bx-package" /> Giao 2h nội thành</li>
          <li><i class="bx bx-credit-card" /> Trả góp 0%</li>
        </ul>
      </aside>
    </section>

    <!-- Vertical detail blocks -->
    <section class="vstack">
      <!-- 360° / angles editorial -->
      <article class="vblock angles" id="angles">
        <header class="vhead">
          <span class="eyebrow">Chi Tiết Từng Góc</span>
          <h2>Nhìn Cận. Soi Kỹ. Yên Tâm.</h2>
          <p>
            Mỗi góc cạnh được chụp tại studio. Bấm vào ảnh bất kỳ để phóng to,
            xoay chuyển và quan sát đường may, chất liệu, ánh sáng phản chiếu.
          </p>
        </header>
        <div class="angles-grid">
          <button
            v-for="(img, i) in gallery"
            :key="`a-${i}`"
            class="angle-card"
            @click="openLightbox(i)"
          >
            <img :src="img" :alt="`${product.name} - ${angleLabels[i] || i+1}`" loading="lazy" />
            <div class="angle-cap">
              <span class="angle-idx">0{{ i + 1 }}</span>
              <span class="angle-name">{{ angleLabels[i] || `Góc ${i+1}` }}</span>
              <i class="bx bx-fullscreen" />
            </div>
          </button>
        </div>
      </article>

      <!-- Video review -->
      <article class="vblock video" id="video">
        <header class="vhead">
          <span class="eyebrow">Video Review</span>
          <h2>Trên Tay & Cảm Nhận</h2>
          <p>Xem trực tiếp bằng video chuyên gia thay vì chỉ nhìn ảnh tĩnh.</p>
        </header>

        <div class="video-frame">
          <iframe
            v-if="videoUrl"
            :src="videoUrl"
            title="Product review video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <div v-else class="video-empty">
            <div class="vid-poster">
              <img :src="product.images[0] || ''" :alt="product.name" />
              <button class="play">
                <i class="bx bx-play" />
              </button>
            </div>
            <div class="vid-meta">
              <span class="eyebrow">Coming Soon</span>
              <h3>Video review đang được biên tập</h3>
              <p>
                Đội ngũ chuyên gia của IRONMAN đang quay clip on-hand cho mẫu
                này. Đăng ký nhận thông báo để xem đầu tiên.
              </p>
            </div>
          </div>
        </div>
      </article>

      <!-- Specs -->
      <article class="vblock specs" id="specs">
        <header class="vhead">
          <span class="eyebrow">Thông Số Kỹ Thuật</span>
          <h2>Số Liệu — Không Chém Gió.</h2>
        </header>
        <dl class="spec-list">
          <div v-for="s in product.specs" :key="s.label" class="spec-row">
            <dt>{{ s.label }}</dt>
            <dd>{{ s.value }}</dd>
          </div>
          <div class="spec-row">
            <dt>Tồn kho</dt>
            <dd>{{ product.stock }} sản phẩm</dd>
          </div>
          <div class="spec-row">
            <dt>Bảo hành</dt>
            <dd>Theo chính sách hãng + IRONMAN 12 tháng</dd>
          </div>
        </dl>
      </article>

      <!-- Rating breakdown -->
      <article class="vblock rating" id="rating">
        <header class="vhead">
          <span class="eyebrow">Đánh Giá Chi Tiết</span>
          <h2>{{ product.rating }}<span class="r5">/5</span></h2>
          <p>Tổng hợp từ {{ product.reviewCount }} khách hàng đã mua sản phẩm.</p>
        </header>
        <div class="rb-list">
          <div v-for="(val, key) in ratingBreakdown" :key="key" class="rb-row">
            <span class="rb-label">{{ rbLabels[key] || key }}</span>
            <div class="rb-bar">
              <span class="rb-fill" :style="{ width: `${(val / 5) * 100}%` }" />
            </div>
            <span class="rb-num">{{ val.toFixed(1) }}</span>
          </div>
        </div>
      </article>
    </section>

    <!-- Related -->
    <section v-if="related.length" class="related">
      <header class="vhead is-row">
        <div>
          <span class="eyebrow">Có Thể Bạn Thích</span>
          <h2>Cùng Phong Cách</h2>
        </div>
        <NuxtLink to="/#products" class="see-all">Xem tất cả →</NuxtLink>
      </header>
      <div class="rel-grid">
        <NuxtLink
          v-for="rp in related"
          :key="rp.id"
          :to="`/products/${rp.slug}`"
          class="rel-card"
        >
          <CommonProductMedia
            :src="rp.images[0] || undefined"
            :alt="rp.name"
            aspect="3/4"
            :placeholder-icon="rp.icon"
            :icon-size="56"
          />
          <div class="rel-body">
            <span class="rel-cat">{{ rp.categoryName }}</span>
            <h3>{{ rp.name }}</h3>
            <span class="rel-price">{{ formatPrice(rp.salePrice ?? rp.price) }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lb">
        <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
          <button class="lb-close" @click="closeLightbox" aria-label="Đóng">
            <i class="bx bx-x" />
          </button>
          <button class="lb-nav prev" @click="prevImg" aria-label="Trước">
            <i class="bx bx-chevron-left" />
          </button>
          <figure class="lb-figure">
            <img :src="gallery[lightboxIndex]" :alt="product.name" />
            <figcaption>
              <span class="lb-idx">{{ String(lightboxIndex + 1).padStart(2, '0') }} / {{ String(gallery.length).padStart(2, '0') }}</span>
              <span class="lb-name">{{ product.name }} — {{ angleLabels[lightboxIndex] || `Góc ${lightboxIndex+1}` }}</span>
            </figcaption>
          </figure>
          <button class="lb-nav next" @click="nextImg" aria-label="Tiếp">
            <i class="bx bx-chevron-right" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<style scoped>
.pdp {
  padding: 90px var(--gutter) var(--sp-lg);
  max-width: 1280px;
  margin: 0 auto;
}

/* ── Crumb ─────────────────────────────────────────────── */
.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--smoke);
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.crumb a { color: var(--smoke); text-decoration: none; transition: color 0.25s; }
.crumb a:hover { color: var(--accent); }
.crumb .cur { color: var(--text); }

/* ── Top: gallery + info ───────────────────────────────── */
.pdp-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: var(--sp-lg);
}
@media (min-width: 900px) {
  .pdp-top { grid-template-columns: 1.15fr 1fr; gap: 56px; align-items: start; }
}

/* Gallery */
.gallery { display: flex; flex-direction: column; gap: 14px; }
.gallery-main {
  position: relative;
  background: var(--card);
  border: 1px solid var(--rule);
  padding: 14px;
  cursor: zoom-in;
  overflow: hidden;
}
.gallery-main:hover .zoom-cue { opacity: 1; transform: translateY(0); }
.sale-tag {
  position: absolute; top: 22px; left: 22px;
  background: var(--oxblood); color: #fbf6ea;
  font-family: var(--font-condensed);
  font-size: 0.78rem; font-weight: 700;
  letter-spacing: 1.5px;
  padding: 4px 12px;
  z-index: 2;
}
.lux-tag {
  position: absolute; top: 22px; right: 22px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--ink);
  font-family: var(--font-condensed);
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 5px 12px;
  display: inline-flex; align-items: center; gap: 4px;
  z-index: 2;
}
.zoom-cue {
  position: absolute;
  bottom: 22px; left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: color-mix(in srgb, var(--ink) 88%, transparent);
  color: #fbf6ea;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 14px;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  display: inline-flex; align-items: center; gap: 8px;
  opacity: 0;
  transition: all 0.3s;
  cursor: pointer;
  z-index: 3;
}
.zoom-cue i { color: var(--accent-2); font-size: 1rem; }

.gallery-thumbs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.thumb {
  position: relative;
  aspect-ratio: 1;
  background: var(--card);
  border: 1px solid var(--rule);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;
}
.thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.thumb:hover { border-color: var(--accent); }
.thumb:hover img { transform: scale(1.05); }
.thumb.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent);
}
.thumb-label {
  position: absolute;
  inset: auto 0 0 0;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--ink) 85%, transparent));
  color: #fbf6ea;
  font-family: var(--font-condensed);
  font-size: 0.6rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 16px 6px 5px;
  text-align: center;
}

/* Info */
.info {
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: sticky;
  top: 96px;
}
@media (max-width: 900px) { .info { position: static; } }

.brand-row { display: flex; gap: 14px; }
.brand {
  font-family: var(--font-condensed);
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--accent);
}
.cat {
  font-family: var(--font-condensed);
  font-size: 0.7rem; font-weight: 500;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--smoke);
}

.name {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.6vw, 2.4rem);
  font-weight: 700;
  color: var(--text);
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.5px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.stars { color: var(--accent); display: flex; gap: 2px; }
.rate-num {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}
.rate-count { font-size: 0.85rem; color: var(--smoke); }

.price-block {
  padding: 16px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  display: flex; flex-direction: column; gap: 6px;
}
.price-main { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.sale {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.5px;
}
.orig {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
}
.orig.strike { font-size: 1.05rem; color: var(--smoke); text-decoration: line-through; font-weight: 500; }
.save-line {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--oxblood);
}
.save-line i { font-size: 1.05rem; }
.save-line strong { font-weight: 700; }

.desc { font-size: 0.95rem; line-height: 1.75; color: var(--mid); margin: 0; }

.hl { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.hl li {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.88rem; color: var(--text);
}
.hl i { color: var(--accent); font-size: 1.05rem; }

.actions { display: flex; gap: 14px; align-items: center; }
.qty { display: flex; align-items: stretch; border: 1px solid var(--rule-strong); }
.qty button {
  width: 44px; height: 48px;
  background: transparent; border: none;
  color: var(--text); font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.25s, background 0.25s;
}
.qty button:hover { color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
.qty span {
  min-width: 44px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-condensed);
  font-weight: 600;
  border-left: 1px solid var(--rule-strong);
  border-right: 1px solid var(--rule-strong);
}

.btn-cart {
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: var(--accent); color: var(--on-accent);
  border: none;
  font-family: var(--font-condensed);
  font-size: 0.82rem; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  padding: 14px 22px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative; overflow: hidden;
}
.btn-cart::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(120deg, transparent 30%, color-mix(in srgb, #fff 30%, transparent), transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}
.btn-cart:hover::after { transform: translateX(100%); }
.btn-cart:hover { background: var(--accent-2); transform: translateY(-1px); }

.toast {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--olive); color: #fbf6ea;
  font-family: var(--font-condensed); font-size: 0.78rem;
  letter-spacing: 1.5px; text-transform: uppercase;
  padding: 10px 14px;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

.services {
  list-style: none; margin: 0; padding: 16px 0 0;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
  border-top: 1px solid var(--rule);
}
.services li {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-condensed);
  font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--mid);
}
.services i { color: var(--accent); font-size: 1.05rem; }

/* ── Vertical content stack ────────────────────────────── */
.vstack {
  display: flex;
  flex-direction: column;
  gap: var(--sp-md);
  margin-bottom: var(--sp-lg);
}
.vblock {
  border-top: 1px solid var(--rule);
  padding-top: var(--sp-sm);
}
.vhead { margin-bottom: 28px; max-width: 720px; }
.vhead.is-row { display: flex; align-items: flex-end; justify-content: space-between; max-width: none; gap: 24px; }
.eyebrow {
  display: inline-block;
  font-family: var(--font-condensed);
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 4px; text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}
.vhead h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.4vw, 2.4rem);
  font-weight: 700;
  color: var(--text);
  margin: 0 0 12px;
  line-height: 1.1;
}
.vhead h2 .r5 { color: var(--smoke); font-size: 0.5em; font-weight: 500; margin-left: 4px; }
.vhead p { color: var(--mid); font-size: 0.95rem; line-height: 1.7; margin: 0; }
.see-all {
  font-family: var(--font-condensed);
  font-size: 0.78rem; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--accent); text-decoration: none;
  white-space: nowrap;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--rule-strong);
}
.see-all:hover { color: var(--accent-2); }

/* Angles */
.angles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (min-width: 720px) { .angles-grid { grid-template-columns: repeat(4, 1fr); } }
.angle-card {
  position: relative;
  aspect-ratio: 4/5;
  background: var(--card);
  border: 1px solid var(--rule);
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  transition: all 0.3s;
}
.angle-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.angle-card:hover { border-color: var(--accent); }
.angle-card:hover img { transform: scale(1.06); }
.angle-cap {
  position: absolute; left: 0; right: 0; bottom: 0;
  display: flex; align-items: center; gap: 8px;
  padding: 12px 14px;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--ink) 85%, transparent));
  color: #fbf6ea;
  font-family: var(--font-condensed);
  letter-spacing: 1.5px;
  font-size: 0.7rem;
  text-transform: uppercase;
}
.angle-idx { color: var(--accent-2); font-weight: 700; }
.angle-name { flex: 1; }
.angle-cap i { color: var(--accent-2); font-size: 1rem; }

/* Video */
.video-frame {
  position: relative;
  background: var(--ink);
  aspect-ratio: 16 / 9;
  border: 1px solid var(--rule-strong);
  overflow: hidden;
}
.video-frame iframe { width: 100%; height: 100%; border: 0; }
.video-empty {
  position: relative;
  width: 100%; height: 100%;
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 720px) {
  .video-empty { grid-template-columns: 1.3fr 1fr; }
}
.vid-poster {
  position: relative;
  background: var(--card);
  overflow: hidden;
}
.vid-poster img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
.play {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 80px; height: 80px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent) 92%, transparent);
  color: var(--on-accent);
  border: 3px solid #fbf6ea;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 2.2rem;
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent);
  animation: pulse-ring 2s ease-out infinite;
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); }
  100% { box-shadow: 0 0 0 24px color-mix(in srgb, var(--accent) 0%, transparent); }
}
.vid-meta {
  padding: 28px;
  display: flex; flex-direction: column; justify-content: center;
  gap: 10px;
  color: #fbf6ea;
}
.vid-meta .eyebrow { color: var(--accent-2); }
.vid-meta h3 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin: 0;
  color: #fbf6ea;
}
.vid-meta p {
  font-size: 0.9rem; line-height: 1.7;
  color: color-mix(in srgb, #fbf6ea 70%, transparent);
  margin: 0;
}

/* Specs */
.spec-list { margin: 0; }
.spec-row {
  display: grid;
  grid-template-columns: 35% 1fr;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);
}
.spec-row dt {
  font-family: var(--font-condensed);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0;
}
.spec-row dd {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.5;
}

/* Rating breakdown */
.rb-list { display: flex; flex-direction: column; gap: 14px; }
.rb-row {
  display: grid;
  grid-template-columns: 110px 1fr 36px;
  align-items: center;
  gap: 14px;
}
.rb-label {
  font-family: var(--font-condensed);
  font-size: 0.78rem; letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--mid);
}
.rb-bar {
  height: 6px;
  background: var(--card);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--rule);
}
.rb-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transition: width 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.rb-num {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  text-align: right;
}

/* Related */
.related { padding-top: var(--sp-md); border-top: 1px solid var(--rule); }
.rel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 720px)  { .rel-grid { grid-template-columns: repeat(4, 1fr); } }
.rel-card {
  background: var(--card);
  border: 1px solid var(--rule);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}
.rel-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 14px 30px color-mix(in srgb, #000 8%, transparent);
}
.rel-body { padding: 14px; }
.rel-cat {
  font-family: var(--font-condensed);
  font-size: 0.65rem; letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
}
.rel-body h3 {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  margin: 4px 0 6px;
  line-height: 1.3;
}
.rel-price {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--accent);
  font-size: 0.95rem;
}

/* ── Lightbox ──────────────────────────────────────────── */
.lightbox {
  position: fixed; inset: 0;
  background: color-mix(in srgb, #000 92%, transparent);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.lb-close {
  position: absolute; top: 24px; right: 24px;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: color-mix(in srgb, #fff 12%, transparent);
  border: 1px solid color-mix(in srgb, #fff 25%, transparent);
  color: #fbf6ea;
  font-size: 1.6rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s;
}
.lb-close:hover { background: var(--oxblood); border-color: var(--oxblood); transform: rotate(90deg); }

.lb-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 56px; height: 56px;
  border-radius: 50%;
  background: color-mix(in srgb, #fff 10%, transparent);
  border: 1px solid color-mix(in srgb, #fff 25%, transparent);
  color: #fbf6ea;
  font-size: 2rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s;
}
.lb-nav.prev { left: 24px; }
.lb-nav.next { right: 24px; }
.lb-nav:hover { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }

.lb-figure {
  margin: 0;
  max-width: min(1100px, 90vw);
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.lb-figure img {
  max-width: 100%;
  max-height: 78vh;
  object-fit: contain;
  background: var(--card);
  padding: 14px;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
}
.lb-figure figcaption {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #fbf6ea;
  font-family: var(--font-condensed);
  font-size: 0.78rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.lb-idx { color: var(--accent-2); font-weight: 700; }

.lb-enter-active, .lb-leave-active { transition: opacity 0.3s; }
.lb-enter-active .lb-figure { animation: lb-zoom 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.lb-enter-from, .lb-leave-to { opacity: 0; }
@keyframes lb-zoom {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: 720px) {
  .lb-nav { width: 44px; height: 44px; font-size: 1.5rem; }
  .lb-nav.prev { left: 12px; }
  .lb-nav.next { right: 12px; }
  .pdp { padding: 90px 24px var(--sp-md); }
}
</style>
