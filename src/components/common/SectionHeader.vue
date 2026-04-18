<script setup lang="ts">
defineProps<{
  tag?: string;
  title: string;
  accent?: string;
  link?: string;
  linkText?: string;
  align?: 'start' | 'center';
}>();
</script>

<template>
  <header class="sec-header" :class="{ 'is-center': align === 'center' }">
    <div>
      <div v-if="tag" class="sec-tag">{{ tag }}</div>
      <h2 class="sec-title">
        <span>{{ title }}</span>
        <em v-if="accent"> {{ accent }}</em>
      </h2>
    </div>
    <a v-if="link" :href="link" class="sec-link">
      {{ linkText ?? 'Xem tất cả' }} →
    </a>
  </header>
</template>

<style scoped>
.sec-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 48px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--rule);
}
.sec-header.is-center {
  display: block;
  text-align: center;
  border-bottom: none;
  padding-bottom: 0;
}

.sec-tag {
  font-family: var(--font-condensed);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 8px;
}

.sec-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  line-height: 1;
  color: var(--text);
}
.sec-title em {
  font-style: italic;
  color: var(--accent);
  font-weight: 700;
}

.sec-link {
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--mid);
  text-decoration: none;
  padding-bottom: 16px;
  transition: color 0.25s;
  white-space: nowrap;
}
.sec-link:hover { color: var(--accent); }
</style>
