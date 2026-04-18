<script setup lang="ts">
withDefaults(
  defineProps<{
    items: string[];
    speed?: number; // seconds per loop
    variant?: 'subtle' | 'accent';
  }>(),
  { speed: 22, variant: 'subtle' },
);
</script>

<template>
  <div class="marquee-wrap" :class="`marquee--${variant}`">
    <div class="marquee-track" :style="{ animationDuration: `${speed}s` }">
      <div v-for="(item, i) in [...items, ...items]" :key="i" class="mq-item">
        {{ item }} <span class="mq-sep">·</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrap {
  overflow: hidden;
  padding: 14px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.marquee--subtle { background: var(--card-alt); }
.marquee--accent {
  background: var(--accent);
  border-color: transparent;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: ironman-marquee linear infinite;
}

.mq-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 32px;
  font-family: var(--font-condensed);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  white-space: nowrap;
}
.marquee--subtle .mq-item { color: var(--mid); }
.marquee--accent .mq-item { color: var(--on-accent); }

.mq-sep { font-size: 1rem; opacity: 0.6; }
.marquee--subtle .mq-sep { color: var(--accent); opacity: 1; }
</style>
