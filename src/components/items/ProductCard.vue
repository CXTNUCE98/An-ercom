<script setup lang="ts">
import type { Product } from '~/types/landing';

const props = defineProps<{
  product: Product;
  index?: number;
}>();

const padIndex = computed(() => String(props.index ?? 1).padStart(2, '0'));
</script>

<template>
  <article class="pcard" :class="{ 'pcard--hero': product.featured }">
    <div class="pcard-frame">
      <CommonProductMedia
        :src="product.image || undefined"
        :alt="product.name"
        :aspect="product.featured ? '4/5' : '4/5'"
        :placeholder-icon="product.icon"
        :icon-size="product.featured ? 160 : 96"
      />

      <span class="pcard-numeral">N°{{ padIndex }}</span>

      <Badge
        v-if="product.badge"
        :label="product.badge"
        :variant="product.badgeVariant ?? 'copper'"
        class="pcard-badge"
      />

      <div class="pcard-overlay">
        <button class="pcard-cta">
          Xem Chi Tiết
          <span class="arrow">→</span>
        </button>
      </div>
    </div>

    <div class="pcard-info">
      <div class="pcard-cat">{{ product.category }}</div>
      <div class="pcard-row">
        <h3 class="pcard-name">{{ product.name }}</h3>
        <div class="pcard-price">{{ product.price }}</div>
      </div>
      <div class="pcard-add">
        <span class="line" />
        <span class="plus">+ Thêm vào giỏ</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pcard {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.5s ease;
}
.pcard--hero { grid-row: span 2; }

.pcard-frame {
  position: relative;
  overflow: hidden;
}

.pcard-frame :deep(.media-img) { transform: scale(1.02); }
.pcard:hover .pcard-frame :deep(.media-img) { transform: scale(1.06); }
.pcard:hover .pcard-frame :deep(.media-placeholder .icon-line) { opacity: 1; }

.pcard-numeral {
  position: absolute;
  top: 16px; left: 18px;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 1.35rem;
  color: var(--accent);
  letter-spacing: 0.5px;
  z-index: 3;
  mix-blend-mode: normal;
}
.pcard--hero .pcard-numeral { font-size: 1.8rem; top: 22px; left: 26px; }

.pcard-badge { position: absolute; top: 16px; right: 16px; z-index: 3; }
.pcard--hero .pcard-badge { top: 22px; right: 22px; }

.pcard-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(7, 7, 10, 0.55));
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 26px;
  z-index: 2;
}
.pcard:hover .pcard-overlay { opacity: 1; }

.pcard-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: 1px solid rgba(241, 236, 224, 0.8);
  color: #f8f5ef;
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 12px 24px;
  cursor: pointer;
  transform: translateY(6px);
  transition: all 0.4s ease;
}
.pcard:hover .pcard-cta { transform: translateY(0); }
.pcard-cta:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}
.pcard-cta .arrow { transition: transform 0.3s ease; }
.pcard-cta:hover .arrow { transform: translateX(4px); }

.pcard-info {
  padding: 20px 2px 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pcard-cat {
  font-family: var(--font-condensed);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
}

.pcard-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.pcard-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: var(--text);
  line-height: 1.25;
  margin: 0;
}
.pcard--hero .pcard-name { font-size: 1.5rem; }

.pcard-price {
  font-family: var(--font-condensed);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}

.pcard-add {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 6px;
  border-top: 1px solid var(--rule);
  opacity: 0.7;
  transition: opacity 0.3s ease, color 0.3s ease;
}
.pcard-add .line { flex: 1; height: 1px; background: var(--rule); }
.pcard-add .plus {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--mid);
  transition: color 0.3s ease;
}
.pcard:hover .pcard-add { opacity: 1; }
.pcard:hover .pcard-add .plus { color: var(--accent); }
</style>
