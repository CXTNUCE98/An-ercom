<script setup lang="ts">
import { COMBO_BY_SLUG, resolveCombo } from '~/constants/combos';
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { formatPrice } from '~/shared/utils/format';

const route = useRoute();
const slug = route.params.slug as string;
const raw = COMBO_BY_SLUG[slug];

if (!raw) {
  throw createError({ statusCode: 404, message: 'Combo không tồn tại' });
}

const combo = resolveCombo(raw);
const cart = useCartStore();
const addedToast = ref(false);

useHead({
  title: `${combo.name} — IRONMAN Combo`,
  meta: [{ name: 'description', content: combo.tagline }],
});

function addComboToCart() {
  combo.items.forEach((it) => cart.addItem(it.product, 1));
  addedToast.value = true;
  setTimeout(() => (addedToast.value = false), 2200);
}
</script>

<template>
  <main class="combo-page">
    <!-- Hero Banner -->
    <section class="combo-hero">
      <div class="hero-bg">
        <img :src="combo.heroImage" :alt="combo.name" />
        <div class="hero-shade" />
      </div>

      <div class="hero-inner">
        <nav class="crumb">
          <NuxtLink to="/">Trang Chủ</NuxtLink>
          <span>/</span>
          <NuxtLink to="/#combos">Combo</NuxtLink>
          <span>/</span>
          <span class="cur">{{ combo.name }}</span>
        </nav>

        <div v-if="combo.badge" class="hero-badge" :class="`badge-${combo.badgeVariant}`">
          <i class="bx bxs-bookmark-star" /> {{ combo.badge }}
        </div>

        <h1 class="hero-title">{{ combo.name }}</h1>
        <p class="hero-tagline">{{ combo.tagline }}</p>

        <div class="hero-meta">
          <div class="meta-item">
            <i class="bx bx-collection" />
            <span>{{ combo.items.length }} sản phẩm chọn lọc</span>
          </div>
          <div class="meta-item">
            <i class="bx bxs-star" />
            <span>{{ combo.occasion }}</span>
          </div>
          <div class="meta-item">
            <i class="bx bx-package" />
            <span>Còn {{ combo.stock }} sets</span>
          </div>
        </div>

        <div class="hero-scroll">
          <span>Cuộn xuống</span>
          <span class="line" />
        </div>
      </div>
    </section>

    <!-- Story + Pricing -->
    <section class="combo-story">
      <div class="story-text">
        <span class="eyebrow">Câu chuyện bộ sưu tập</span>
        <h2>Thiết kế bởi người biết bạn cần gì.</h2>
        <p>{{ combo.story }}</p>

        <ul class="perk-list">
          <li v-for="p in combo.perks" :key="p">
            <i class="bx bx-check-circle" />
            {{ p }}
          </li>
        </ul>
      </div>

      <!-- Sticky pricing card -->
      <aside class="price-panel">
        <div class="panel-top">
          <span class="eyebrow">Giá trọn bộ</span>
          <div class="price-final">{{ formatPrice(combo.comboPrice) }}</div>
          <div class="price-meta">
            <span class="strike">{{ formatPrice(combo.originalPrice) }}</span>
            <span class="badge-save">−{{ combo.savingsPercent }}%</span>
          </div>
          <div class="save-line">
            <i class="bx bxs-offer" />
            Bạn tiết kiệm <strong>{{ formatPrice(combo.savings) }}</strong>
          </div>
        </div>

        <button class="btn-combo" @click="addComboToCart">
          <i class="bx bx-shopping-bag" />
          Mua Trọn Bộ
        </button>

        <Transition name="fade">
          <div v-if="addedToast" class="toast">
            <i class="bx bx-check-circle" />
            Đã thêm {{ combo.items.length }} sản phẩm vào giỏ
          </div>
        </Transition>

        <div class="panel-assure">
          <div><i class="bx bx-shield-quarter" /> Chính hãng 100%</div>
          <div><i class="bx bx-refresh" /> Đổi trả 30 ngày</div>
          <div><i class="bx bx-package" /> Giao 2h nội thành</div>
          <div><i class="bx bx-credit-card" /> Trả góp 0%</div>
        </div>
      </aside>
    </section>

    <!-- Items breakdown -->
    <section class="combo-items">
      <header class="sec-head">
        <span class="eyebrow">Gồm có</span>
        <h2>{{ combo.items.length }} Sản Phẩm — Chất Lượng Chọn Lọc</h2>
      </header>

      <div class="items-grid">
        <NuxtLink
          v-for="(it, i) in combo.items"
          :key="it.product.id"
          :to="`/products/${it.product.slug}`"
          class="item-card"
        >
          <div class="idx">0{{ i + 1 }}</div>
          <div class="item-visual">
            <CommonProductMedia
              :src="it.product.images[0]"
              :alt="it.product.name"
              aspect="1/1"
              :placeholder-icon="it.product.icon"
              :icon-size="80"
            />
          </div>
          <div class="item-body">
            <span class="cat">{{ it.product.categoryName }} · {{ it.product.brand }}</span>
            <h3>{{ it.product.name }}</h3>
            <p v-if="it.note" class="note">{{ it.note }}</p>
            <div class="row">
              <span class="price">{{ formatPrice(it.product.salePrice ?? it.product.price) }}</span>
              <span class="go">Xem chi tiết →</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Gift banner -->
    <section class="gift-banner">
      <div class="gift-content">
        <span class="eyebrow">Dịch vụ quà tặng</span>
        <h2>Hộp Gỗ Phôi · Khắc Tên · Thiệp Viết Tay</h2>
        <p>
          Mỗi bộ combo đều được đóng trong hộp gỗ phôi tự nhiên, khắc laser tên
          người nhận. Đính kèm thiệp viết tay theo đúng ý bạn — biến món quà
          thành kỷ vật.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.combo-page { background: var(--bg); color: var(--text); }

/* ── Hero ──────────────────────────────────────────────── */
.combo-hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: flex-end;
  padding: 100px var(--gutter) var(--sp-md);
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: saturate(0.92);
}
.hero-shade {
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg,
      color-mix(in srgb, #000 40%, transparent) 0%,
      color-mix(in srgb, #000 20%, transparent) 40%,
      color-mix(in srgb, #000 85%, transparent) 100%),
    linear-gradient(90deg, color-mix(in srgb, #000 65%, transparent), transparent 60%);
}
.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 720px;
  color: #fbf6ea;
}
.crumb {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: color-mix(in srgb, #fbf6ea 70%, transparent);
  margin-bottom: 28px;
}
.crumb a {
  color: color-mix(in srgb, #fbf6ea 70%, transparent);
  text-decoration: none;
  transition: color 0.25s;
}
.crumb a:hover { color: var(--accent-2); }
.crumb .cur { color: var(--accent-2); }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
  border: 1px solid color-mix(in srgb, #fff 30%, transparent);
  backdrop-filter: blur(8px);
}
.badge-gold    { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #0a0a0a; }
.badge-olive   { background: var(--olive); color: #fbf6ea; }
.badge-oxblood { background: var(--oxblood); color: #fbf6ea; }

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 5.6rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1px;
  margin: 0 0 18px;
  color: #fbf6ea;
  text-shadow: 0 4px 40px rgba(0,0,0,0.3);
}
.hero-tagline {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: var(--accent-2);
  line-height: 1.4;
  margin: 0 0 32px;
}
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 28px;
  padding-top: 24px;
  border-top: 1px solid color-mix(in srgb, #fbf6ea 20%, transparent);
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: color-mix(in srgb, #fbf6ea 85%, transparent);
}
.meta-item i { color: var(--accent-2); font-size: 1.15rem; }

.hero-scroll {
  position: absolute;
  bottom: 40px; left: var(--gutter);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-family: var(--font-condensed);
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: color-mix(in srgb, #fbf6ea 70%, transparent);
}
.hero-scroll .line {
  width: 1px; height: 40px;
  background: linear-gradient(180deg, var(--accent-2), transparent);
  animation: scroll-line 1.8s ease-in-out infinite;
}
@keyframes scroll-line {
  0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
  50% { transform: scaleY(1); opacity: 1; }
}

/* ── Story + price ─────────────────────────────────────── */
.combo-story {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--sp-lg) var(--gutter);
}
@media (min-width: 900px) {
  .combo-story { grid-template-columns: 1.4fr 1fr; gap: 80px; align-items: start; }
}

.eyebrow {
  display: inline-block;
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.story-text h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--text);
  margin: 0 0 20px;
}
.story-text p {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--mid);
  margin: 0 0 32px;
  font-weight: 300;
}
.perk-list {
  list-style: none;
  margin: 0; padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 600px) { .perk-list { grid-template-columns: repeat(2, 1fr); } }
.perk-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.92rem;
  color: var(--text);
}
.perk-list i { color: var(--accent); font-size: 1.25rem; }

/* Sticky price panel */
.price-panel {
  position: sticky;
  top: 96px;
  border: 1px solid var(--rule-strong);
  background:
    linear-gradient(145deg,
      color-mix(in srgb, var(--accent) 8%, var(--surface)) 0%,
      var(--surface) 70%);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 8px 40px color-mix(in srgb, #000 10%, transparent);
}
.panel-top { display: flex; flex-direction: column; gap: 8px; }
.price-final {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  letter-spacing: -1px;
}
.price-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}
.strike {
  font-family: var(--font-condensed);
  font-size: 1rem;
  color: var(--smoke);
  text-decoration: line-through;
}
.badge-save {
  display: inline-block;
  padding: 3px 10px;
  background: var(--oxblood);
  color: #fbf6ea;
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
}
.save-line {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 0.88rem;
  color: var(--oxblood);
}
.save-line i { font-size: 1.1rem; }
.save-line strong { font-weight: 700; }

.btn-combo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--accent);
  color: var(--on-accent);
  border: none;
  padding: 18px 28px;
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.btn-combo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, color-mix(in srgb, #fff 30%, transparent), transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}
.btn-combo:hover::after { transform: translateX(100%); }
.btn-combo:hover {
  background: var(--accent-2);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--accent) 40%, transparent);
}
.btn-combo i { font-size: 1.3rem; }

.toast {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: var(--olive);
  color: #fbf6ea;
  font-family: var(--font-condensed);
  font-size: 0.78rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

.panel-assure {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
}
.panel-assure > div {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-condensed);
  font-size: 0.68rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--mid);
}
.panel-assure i { color: var(--accent); font-size: 1rem; }

/* ── Items grid ────────────────────────────────────────── */
.combo-items {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--gutter) var(--sp-lg);
}
.sec-head {
  text-align: center;
  margin-bottom: 48px;
}
.sec-head h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text);
  margin: 0;
}
.items-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 720px)  { .items-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1100px) { .items-grid { grid-template-columns: repeat(3, 1fr); } }

.item-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--rule);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.35s ease;
}
.item-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 16px 40px color-mix(in srgb, #000 10%, transparent);
}
.idx {
  position: absolute;
  top: 14px; left: 14px;
  z-index: 2;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(8px);
  border: 1px solid var(--accent);
  color: var(--accent);
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  display: flex; align-items: center; justify-content: center;
}
.item-visual { background: var(--card); }
.item-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cat {
  font-family: var(--font-condensed);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
}
.item-body h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  line-height: 1.25;
}
.note {
  font-size: 0.85rem;
  color: var(--smoke);
  font-style: italic;
  margin: 0;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 14px;
  border-top: 1px dashed var(--rule);
}
.price {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--accent);
}
.go {
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--smoke);
  transition: color 0.3s;
}
.item-card:hover .go { color: var(--accent); }

/* ── Gift banner ───────────────────────────────────────── */
.gift-banner {
  position: relative;
  padding: var(--sp-lg) var(--gutter);
  background:
    linear-gradient(135deg,
      color-mix(in srgb, var(--accent) 18%, var(--ink)),
      var(--ink));
  color: #fbf6ea;
  text-align: center;
  overflow: hidden;
}
.gift-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(30% 40% at 20% 30%, color-mix(in srgb, var(--accent) 25%, transparent), transparent),
    radial-gradient(30% 40% at 80% 70%, color-mix(in srgb, var(--accent) 20%, transparent), transparent);
  opacity: 0.7;
  pointer-events: none;
}
.gift-content { position: relative; max-width: 720px; margin: 0 auto; }
.gift-content .eyebrow { color: var(--accent-2); }
.gift-content h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #fbf6ea;
  margin: 0 0 20px;
  line-height: 1.15;
}
.gift-content p {
  font-size: 1.02rem;
  line-height: 1.85;
  color: color-mix(in srgb, #fbf6ea 80%, transparent);
  font-weight: 300;
  margin: 0;
}

@media (max-width: 900px) {
  .price-panel { position: static; }
  .combo-hero { min-height: 70vh; }
}
</style>
