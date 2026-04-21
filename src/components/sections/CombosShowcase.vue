<script setup lang="ts">
import { RESOLVED_COMBOS } from '~/constants/combos';
import { formatPrice } from '~/shared/utils/format';

const combos = RESOLVED_COMBOS;
</script>

<template>
  <section id="combos" class="combos-section">
    <!-- Editorial header -->
    <div class="combos-head">
      <div class="head-eyebrow">
        <span class="rule" />
        <span class="text">Curated · Combo Tinh Tuyển</span>
        <span class="rule" />
      </div>
      <h2 class="head-title">
        Mua Theo Bộ — <em>Tiết Kiệm Đến 25%</em>
      </h2>
      <p class="head-sub">
        Mỗi bộ là một câu chuyện. Một phong cách. Một cái cớ để bạn hào phóng
        với chính mình — hoặc với người đàn ông bạn yêu quý.
      </p>
    </div>

    <!-- Combos -->
    <div class="combos-grid">
      <article
        v-for="(combo, idx) in combos"
        :key="combo.id"
        class="combo-card"
        :class="{ 'is-featured': idx === 0 }"
      >
        <NuxtLink :to="`/combos/${combo.slug}`" class="combo-link" />

        <!-- Visual -->
        <div class="combo-visual">
          <div class="visual-frame">
            <img :src="combo.heroImage" :alt="combo.name" loading="lazy" />
            <div class="visual-overlay" />
          </div>

          <div v-if="combo.badge" class="combo-badge" :class="`badge-${combo.badgeVariant}`">
            <i class="bx bxs-bookmark-star" />
            {{ combo.badge }}
          </div>

          <!-- Stack mini items -->
          <div class="stack-items">
            <div
              v-for="(it, i) in combo.items"
              :key="it.product.id"
              class="stack-chip"
              :style="{ '--i': i }"
            >
              <CommonIconLine :name="it.product.icon" :size="22" />
            </div>
            <div class="stack-count">
              <span>{{ combo.items.length }}</span>
              món
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="combo-body">
          <div class="combo-meta">
            <span class="combo-tag">{{ combo.occasion.split('·')[0].trim() }}</span>
            <span v-if="combo.isLimited" class="meta-limited">
              <i class="bx bxs-flame" /> Còn {{ combo.stock }} sets
            </span>
          </div>

          <h3 class="combo-name">{{ combo.name }}</h3>
          <div class="combo-tagline">{{ combo.tagline }}</div>

          <!-- Items breakdown -->
          <ul class="items-list">
            <li v-for="it in combo.items" :key="it.product.id">
              <i class="bx bx-plus-medical" />
              <div class="item-info">
                <span class="item-name">{{ it.product.name }}</span>
                <span v-if="it.note" class="item-note">{{ it.note }}</span>
              </div>
              <span class="item-price">{{ formatPrice(it.product.salePrice ?? it.product.price) }}</span>
            </li>
          </ul>

          <!-- Pricing zone — focal point -->
          <div class="combo-pricing">
            <div class="price-rows">
              <div class="price-row mute">
                <span>Mua lẻ</span>
                <span class="strike">{{ formatPrice(combo.originalPrice) }}</span>
              </div>
              <div class="price-row save">
                <span>Bạn tiết kiệm</span>
                <span class="save-amount">
                  − {{ formatPrice(combo.savings) }}
                </span>
              </div>
              <div class="price-row final">
                <span class="combo-label">Giá Combo</span>
                <span class="combo-final">{{ formatPrice(combo.comboPrice) }}</span>
              </div>
            </div>
            <div class="save-pill">
              <strong>−{{ combo.savingsPercent }}%</strong>
              <span>tiết kiệm</span>
            </div>
          </div>

          <!-- Perks -->
          <ul class="perks">
            <li v-for="p in combo.perks.slice(0, 3)" :key="p">
              <i class="bx bx-check" /> {{ p }}
            </li>
          </ul>

          <div class="combo-cta">
            <span class="cta-text">
              Khám Phá Combo
              <i class="bx bx-right-arrow-alt" />
            </span>
            <span class="cta-mini">
              <i class="bx bx-shield-quarter" /> Bảo hành chính hãng
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- Trust strip -->
    <div class="combo-trust">
      <div><i class="bx bx-package" /> Hộp gỗ phôi · Khắc tên miễn phí</div>
      <div><i class="bx bx-medal" /> Bảo hành chính hãng đầy đủ</div>
      <div><i class="bx bx-time-five" /> Giao 2h nội thành · 24h toàn quốc</div>
      <div><i class="bx bx-credit-card" /> Trả góp 0% — qua thẻ tín dụng</div>
    </div>
  </section>
</template>

<style scoped>
.combos-section {
  padding: var(--sp-lg) var(--gutter);
  background:
    radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 60%),
    var(--bg);
  position: relative;
  overflow: hidden;
}
.combos-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 4%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 4%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
  opacity: 0.5;
}

.combos-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 60px;
  position: relative;
}
.head-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 18px;
}
.head-eyebrow .rule {
  width: 40px;
  height: 1px;
  background: var(--accent);
}
.head-eyebrow .text {
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
}
.head-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.05;
  color: var(--text);
  margin: 0 0 18px;
}
.head-title em {
  font-style: italic;
  color: var(--accent);
  position: relative;
}
.head-title em::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -4px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.5;
}
.head-sub {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--mid);
  font-weight: 300;
  margin: 0;
}

.combos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
}
@media (min-width: 720px) {
  .combos-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1100px) {
  .combos-grid {
    grid-template-columns: 1.4fr 1fr 1fr;
    grid-auto-rows: 1fr;
  }
  .combo-card.is-featured { grid-row: span 2; grid-column: span 1; }
}

/* CARD */
.combo-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 20px color-mix(in srgb, #000 5%, transparent);
}
.combo-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--accent);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 3;
}
.combo-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 24px 60px color-mix(in srgb, #000 16%, transparent),
    0 0 0 1px color-mix(in srgb, var(--accent) 30%, transparent);
}
.combo-card:hover::before { opacity: 0.5; }
.combo-card:hover .visual-frame img { transform: scale(1.06); }

.combo-link {
  position: absolute;
  inset: 0;
  z-index: 4;
  text-indent: -9999px;
}

/* Visual */
.combo-visual {
  position: relative;
  overflow: hidden;
  background: var(--card);
}
.visual-frame {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  position: relative;
}
.is-featured .visual-frame { aspect-ratio: 4 / 5; }
.visual-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.visual-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,
    color-mix(in srgb, #000 15%, transparent) 0%,
    transparent 30%,
    color-mix(in srgb, #000 50%, transparent) 100%);
}

.combo-badge {
  position: absolute;
  top: 16px; left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #fbf6ea;
  z-index: 2;
  border: 1px solid color-mix(in srgb, #fff 25%, transparent);
  backdrop-filter: blur(8px);
}
.combo-badge i { font-size: 0.85rem; }
.badge-gold    { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: var(--ink); }
.badge-olive   { background: var(--olive); }
.badge-oxblood { background: var(--oxblood); }

.stack-items {
  position: absolute;
  bottom: 16px; left: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
}
.stack-chip {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(10px);
  border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  margin-left: calc(var(--i) * -10px);
  position: relative;
  z-index: calc(10 - var(--i));
  transition: transform 0.3s;
}
.combo-card:hover .stack-chip {
  margin-left: 0;
  transform: translateY(-2px);
}
.stack-count {
  margin-left: 12px;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fbf6ea;
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.stack-count span {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--accent-2);
  font-weight: 800;
  margin-bottom: 2px;
}

/* Body */
.combo-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
}

.combo-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.combo-tag {
  font-family: var(--font-condensed);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
}
.meta-limited {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--oxblood);
}
.meta-limited i { color: var(--oxblood); animation: pulse 1.6s ease-in-out infinite; }
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.15); }
}

.combo-name {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1.15;
  margin: 0;
}
.combo-tagline {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--smoke);
  line-height: 1.4;
  margin-top: -8px;
}

/* Items list */
.items-list {
  list-style: none;
  margin: 0;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px dashed var(--rule);
  border-bottom: 1px dashed var(--rule);
}
.items-list li {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  align-items: center;
  gap: 10px;
}
.items-list i {
  color: var(--accent);
  font-size: 0.8rem;
}
.item-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.item-name {
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-note {
  font-size: 0.72rem;
  color: var(--smoke);
  font-style: italic;
}
.item-price {
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--mid);
  white-space: nowrap;
}

/* Pricing — the show-stopper */
.combo-pricing {
  position: relative;
  background:
    linear-gradient(135deg,
      color-mix(in srgb, var(--accent) 12%, var(--card)) 0%,
      var(--card) 60%);
  border: 1px solid var(--rule-strong);
  padding: 18px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  overflow: hidden;
}
.combo-pricing::before {
  content: '';
  position: absolute;
  top: -1px; right: -1px;
  width: 50%; height: 100%;
  background: radial-gradient(80% 100% at 100% 0%,
    color-mix(in srgb, var(--accent) 30%, transparent),
    transparent);
  pointer-events: none;
}
.price-rows { display: flex; flex-direction: column; gap: 4px; position: relative; }
.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  font-family: var(--font-condensed);
}
.price-row span:first-child {
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--smoke);
  font-weight: 500;
}
.price-row.mute .strike {
  color: var(--smoke);
  text-decoration: line-through;
  font-size: 0.92rem;
}
.price-row.save .save-amount {
  color: var(--oxblood);
  font-weight: 700;
  font-size: 0.9rem;
}
.price-row.save span:first-child { color: var(--oxblood); }
.price-row.final {
  margin-top: 4px;
  padding-top: 8px;
  border-top: 1px solid var(--rule);
  align-items: center;
}
.combo-label {
  font-size: 0.72rem !important;
  color: var(--accent) !important;
  font-weight: 700 !important;
}
.combo-final {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  letter-spacing: -0.5px;
}

.save-pill {
  position: relative;
  width: 76px; height: 76px;
  border-radius: 50%;
  background:
    radial-gradient(circle, var(--oxblood) 0%, color-mix(in srgb, var(--oxblood) 80%, #000) 100%);
  color: #fbf6ea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-condensed);
  letter-spacing: 1px;
  box-shadow:
    0 4px 16px color-mix(in srgb, var(--oxblood) 40%, transparent),
    inset 0 0 0 2px color-mix(in srgb, #fff 25%, transparent);
  transform: rotate(-8deg);
  transition: transform 0.4s ease;
}
.combo-card:hover .save-pill {
  transform: rotate(0deg) scale(1.05);
}
.save-pill strong {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1;
}
.save-pill span {
  font-size: 0.55rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 2px;
  opacity: 0.85;
}

/* Perks */
.perks {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.perks li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--mid);
  line-height: 1.4;
}
.perks i {
  color: var(--accent);
  font-size: 0.95rem;
}

/* CTA */
.combo-cta {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
}
.cta-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-condensed);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
  position: relative;
  transition: gap 0.3s;
}
.combo-card:hover .cta-text { gap: 12px; }
.cta-text i { font-size: 1.2rem; }
.cta-mini {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-condensed);
  font-size: 0.68rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--smoke);
}

/* Trust strip */
.combo-trust {
  margin: 60px auto 0;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 24px 28px;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  position: relative;
}
.combo-trust > div {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-condensed);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: var(--mid);
  text-transform: uppercase;
}
.combo-trust i {
  color: var(--accent);
  font-size: 1.4rem;
}
@media (min-width: 720px) {
  .combo-trust { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1100px) {
  .combo-trust { grid-template-columns: repeat(4, 1fr); gap: 24px; }
}

@media (max-width: 720px) {
  .combos-section { padding: var(--sp-md) var(--gutter); }
  .combo-body { padding: 20px; gap: 14px; }
  .combo-pricing { grid-template-columns: 1fr; }
  .save-pill { justify-self: end; }
}
</style>
