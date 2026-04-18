<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Cuộn xuống' });
</script>

<template>
  <div class="cue">
    <span class="cue-label">{{ label }}</span>
    <span class="cue-line" />
    <span class="cue-arrow">↓</span>
  </div>
</template>

<style scoped>
.cue {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--accent);
  font-family: var(--font-condensed);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 5px;
  text-transform: uppercase;
}

.cue-line {
  display: block;
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  transform-origin: top;
  animation: ironman-scroll-line 2s ease-in-out infinite;
}

.cue-arrow {
  font-size: 0.85rem;
  letter-spacing: 0;
  animation: ironman-bounce-down 2s ease-in-out infinite;
}
</style>
