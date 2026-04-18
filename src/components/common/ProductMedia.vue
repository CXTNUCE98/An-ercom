<script setup lang="ts">
import type { IconName } from '~/types/landing';

withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    aspect?: '4/5' | '1/1' | '3/4' | '16/9';
    placeholderIcon?: IconName;
    iconSize?: number;
  }>(),
  { aspect: '4/5', iconSize: 96 }
);
</script>

<template>
  <div class="media" :style="{ aspectRatio: aspect.replace('/', ' / ') }">
    <img v-if="src" :src="src" :alt="alt" class="media-img" />
    <div v-else class="media-placeholder">
      <CommonIconLine v-if="placeholderIcon" :name="placeholderIcon" :size="iconSize" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.media {
  position: relative;
  width: 100%;
  background: linear-gradient(145deg, var(--linen), var(--card));
  overflow: hidden;
}

.media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s ease;
}

.media-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(120% 80% at 30% 20%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%),
    linear-gradient(145deg, var(--linen), var(--card-alt));
}
.media-placeholder :deep(.icon-line) {
  color: color-mix(in srgb, var(--accent) 70%, var(--mid));
  opacity: 0.85;
}
</style>
