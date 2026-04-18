<script setup lang="ts">
import type { Category } from '~/types/landing';

defineProps<{
  category: Category;
  index?: number;
  featured?: boolean;
}>();
</script>

<template>
  <div class="cat-card" :class="{ 'cat-card--feat': featured }">
    <div class="cat-media">
      <CommonIconLine :name="category.icon" :size="featured ? 96 : 64" />
    </div>

    <div class="cat-meta">
      <CommonNumeralIndex
        v-if="index !== undefined"
        :value="index"
        format="arabic"
        class="cat-num"
      />
      <div>
        <h3 class="cat-name">{{ category.name }}</h3>
        <div class="cat-count">{{ category.count }} sản phẩm</div>
      </div>
      <span class="cat-arrow">→</span>
    </div>
  </div>
</template>

<style scoped>
.cat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: 1px solid var(--rule);
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.4s ease, transform 0.4s ease, background 0.4s ease;
}
.cat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 80% at 30% 20%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.cat-card:hover {
  border-color: var(--rule-strong);
  background: var(--card-alt);
}
.cat-card:hover::before { opacity: 1; }
.cat-card:hover .cat-arrow { transform: translateX(6px); color: var(--accent); }
.cat-card:hover :deep(.icon-line) { transform: scale(1.06); }

.cat-media {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 20px 24px;
  min-height: 140px;
}
.cat-card--feat .cat-media { padding: 64px 20px 40px; min-height: 220px; }

.cat-media :deep(.icon-line) {
  color: color-mix(in srgb, var(--accent) 80%, var(--mid));
  transition: transform 0.5s ease;
}

.cat-meta {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px 22px 20px;
  border-top: 1px solid var(--rule);
}

.cat-num {
  font-size: 1.3rem;
}
.cat-card--feat .cat-num { font-size: 1.8rem; }

.cat-name {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  line-height: 1.1;
}
.cat-card--feat .cat-name { font-size: 1.45rem; }

.cat-count {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--smoke);
  margin-top: 4px;
}

.cat-arrow {
  font-size: 1.05rem;
  color: var(--mid);
  transition: transform 0.3s ease, color 0.3s ease;
}
</style>
