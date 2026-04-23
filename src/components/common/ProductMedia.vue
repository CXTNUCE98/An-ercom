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
  <div
    class="media relative w-full overflow-hidden bg-gradient-to-br from-linen to-card"
    :style="{ aspectRatio: aspect.replace('/', ' / ') }"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="block h-full w-full object-cover transition-transform duration-700 ease-out"
    />
    <div
      v-else
      class="media-placeholder absolute inset-0 flex items-center justify-center bg-mix-accent-10 [&_.icon-line]:opacity-85"
      :style="{
        background:
          'radial-gradient(120% 80% at 30% 20%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%), linear-gradient(145deg, var(--linen), var(--card-alt))'
      }"
    >
      <CommonIconLine
        v-if="placeholderIcon"
        :name="placeholderIcon"
        :size="iconSize"
        :style="{ color: 'color-mix(in srgb, var(--accent) 70%, var(--mid))' }"
      />
    </div>
    <slot />
  </div>
</template>
