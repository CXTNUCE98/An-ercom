<script setup lang="ts">
import type { IconName } from '~/types/landing';

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: number | string;
    stroke?: number;
  }>(),
  { size: 48, stroke: 1.4 }
);

const px = typeof props.size === 'number' ? `${props.size}px` : props.size;
</script>

<template>
  <!-- WATCH: raster image — render ngoài svg để tránh namespace mismatch khi hydrate -->
  <svg class="icon-line inline-block align-middle text-[var(--accent)]" :width="px" :height="px" viewBox="0 0 48 48" fill="none" :stroke-width="stroke"
    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- WATCH -->
    <template v-if="name === 'watch'">
      <circle cx="24" cy="24" r="10" />
      <circle cx="24" cy="24" r="1.2" fill="currentColor" />
      <line x1="24" y1="24" x2="24" y2="18" />
      <line x1="24" y1="24" x2="28" y2="24" />
      <path d="M19 14 L20 8 H28 L29 14" />
      <path d="M19 34 L20 40 H28 L29 34" />
      <line x1="14" y1="24" x2="11" y2="24" />
      <line x1="37" y1="24" x2="34" y2="24" />
    </template>


    <!-- <svg v-else class="icon-line" :width="px" :height="px" viewBox="0 0 48 48" fill="none" :stroke-width="stroke"
    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> -->
    <!-- ZIPPO (lighter body + flame) -->
    <template v-else-if="name === 'zippo'">
      <rect x="14" y="16" width="20" height="26" rx="1.5" />
      <line x1="14" y1="22" x2="34" y2="22" />
      <path d="M22 16 V12 H26 V16" />
      <path d="M24 10 C23 8 25 7 24 5 C23 7 25 8 24 10 Z" fill="currentColor" stroke="none" />
    </template>

    <!-- GLASSES -->
    <template v-else-if="name === 'glasses'">
      <circle cx="13" cy="28" r="7" />
      <circle cx="35" cy="28" r="7" />
      <path d="M20 28 C22 26 26 26 28 28" />
      <path d="M6 22 L9 24" />
      <path d="M42 22 L39 24" />
    </template>

    <!-- BELT -->
    <template v-else-if="name === 'belt'">
      <path d="M4 20 H44 V28 H4 Z" />
      <rect x="18" y="16" width="12" height="16" />
      <line x1="24" y1="16" x2="24" y2="32" />
      <circle cx="24" cy="24" r="1.3" fill="currentColor" stroke="none" />
    </template>

    <!-- WALLET -->
    <template v-else-if="name === 'wallet'">
      <rect x="8" y="14" width="32" height="22" rx="2" />
      <path d="M8 20 H36 A4 4 0 0 1 40 24 V26 A4 4 0 0 1 36 30 H8 Z" />
      <circle cx="36" cy="25" r="1.4" fill="currentColor" stroke="none" />
    </template>

    <!-- SHIELD -->
    <template v-else-if="name === 'shield'">
      <path d="M24 6 L38 12 V24 C38 32 32 40 24 42 C16 40 10 32 10 24 V12 Z" />
      <path d="M18 24 L22 28 L30 20" />
    </template>

    <!-- TRUCK -->
    <template v-else-if="name === 'truck'">
      <rect x="4" y="14" width="22" height="16" />
      <path d="M26 20 H36 L42 26 V30 H26 Z" />
      <circle cx="14" cy="34" r="3" />
      <circle cx="34" cy="34" r="3" />
    </template>

    <!-- RETURN arrow -->
    <template v-else-if="name === 'return'">
      <path d="M10 20 H32 A8 8 0 1 1 24 36" />
      <path d="M14 14 L8 20 L14 26" />
    </template>

    <!-- CHECK / seal -->
    <template v-else-if="name === 'check'">
      <circle cx="24" cy="24" r="16" />
      <path d="M16 24 L22 30 L34 18" />
    </template>

    <!-- GIFT -->
    <template v-else-if="name === 'gift'">
      <rect x="8" y="18" width="32" height="22" />
      <line x1="8" y1="26" x2="40" y2="26" />
      <line x1="24" y1="18" x2="24" y2="40" />
      <path d="M16 18 C12 14 16 8 20 12 C22 14 24 18 24 18" />
      <path d="M32 18 C36 14 32 8 28 12 C26 14 24 18 24 18" />
    </template>

    <!-- ENGRAVE pen -->
    <template v-else-if="name === 'engrave'">
      <path d="M10 38 L14 34 L34 14 L38 18 L18 38 Z" />
      <line x1="30" y1="18" x2="34" y2="22" />
      <line x1="8" y1="40" x2="18" y2="40" />
    </template>

    <!-- BOX -->
    <template v-else-if="name === 'box'">
      <path d="M8 16 L24 10 L40 16 V34 L24 40 L8 34 Z" />
      <line x1="8" y1="16" x2="24" y2="22" />
      <line x1="24" y1="22" x2="40" y2="16" />
      <line x1="24" y1="22" x2="24" y2="40" />
    </template>

    <!-- CARD -->
    <template v-else-if="name === 'card'">
      <rect x="6" y="12" width="36" height="24" rx="2" />
      <line x1="6" y1="20" x2="42" y2="20" />
      <line x1="12" y1="28" x2="20" y2="28" />
      <line x1="12" y1="31" x2="16" y2="31" />
    </template>

    <!-- HAT (fedora) -->
    <template v-else-if="name === 'hat'">
      <ellipse cx="24" cy="34" rx="20" ry="4" />
      <path d="M12 34 C12 28 16 18 20 16 C22 15 26 15 28 16 C32 18 36 28 36 34" />
      <path d="M16 22 C18 20 30 20 32 22" />
      <line x1="20" y1="16" x2="18" y2="12" />
    </template>
  </svg>
</template>
