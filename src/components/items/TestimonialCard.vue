<script setup lang="ts">
import type { Testimonial } from '~/types/landing';

defineProps<{
  testimonial: Testimonial;
  index?: number;
}>();
</script>

<template>
  <article class="tm-card">
    <div class="tm-top">
      <CommonNumeralIndex v-if="index !== undefined" :value="index" format="noun" class="tm-index" />
      <div class="tm-stars">
        <span v-for="n in testimonial.stars" :key="n">★</span>
      </div>
    </div>

    <span class="tm-mark">&ldquo;</span>

    <p class="tm-quote">{{ testimonial.quote }}</p>

    <div class="tm-rule" />

    <div class="tm-author">
      <div class="tm-avatar">{{ testimonial.initials }}</div>
      <div>
        <div class="tm-name">{{ testimonial.name }}</div>
        <div class="tm-role">{{ testimonial.role }}</div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.tm-card {
  position: relative;
  background: var(--surface);
  padding: 40px 34px 32px;
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: hidden;
  transition: border-color 0.4s ease, transform 0.4s ease;
}
.tm-card::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  height: 2px;
  width: 0;
  background: var(--accent);
  transition: width 0.5s ease;
}
.tm-card:hover { border-color: var(--rule-strong); transform: translateY(-4px); }
.tm-card:hover::after { width: 100%; }

.tm-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tm-index { font-size: 1.1rem; }

.tm-stars {
  color: var(--accent);
  font-size: 0.95rem;
  letter-spacing: 4px;
}

.tm-mark {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 4.5rem;
  line-height: 0.6;
  color: color-mix(in srgb, var(--accent) 40%, transparent);
  display: block;
  height: 24px;
}

.tm-quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--mid);
  margin: 0;
}

.tm-rule { height: 1px; background: var(--rule); }

.tm-author {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tm-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 0.95rem;
}

.tm-name {
  font-family: var(--font-condensed);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text);
}

.tm-role {
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--smoke);
  margin-top: 2px;
}
</style>
