<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    items: string[];
    speed?: number; // seconds per loop
    variant?: 'subtle' | 'accent';
  }>(),
  { speed: 22, variant: 'subtle' },
);

const wrapClass = computed(() =>
  props.variant === 'accent'
    ? 'bg-[var(--accent)] border-transparent'
    : 'bg-[var(--card-alt)] border-y border-[var(--rule)]'
);

const itemColor = computed(() =>
  props.variant === 'accent' ? 'text-[var(--on-accent)]' : 'text-mid'
);

const sepColor = computed(() =>
  props.variant === 'subtle' ? 'text-[var(--accent)] !opacity-100' : ''
);
</script>

<template>
  <div class="overflow-hidden py-3.5" :class="wrapClass">
    <div
      class="flex w-max"
      style="animation: ironman-marquee linear infinite"
      :style="{ animationDuration: `${speed}s` }"
    >
      <div
        v-for="(item, i) in [...items, ...items]"
        :key="i"
        class="flex items-center gap-5 px-8 font-condensed text-[0.82rem] font-semibold tracking-[3px] uppercase whitespace-nowrap"
        :class="itemColor"
      >
        {{ item }}
        <span class="text-base opacity-60" :class="sepColor">·</span>
      </div>
    </div>
  </div>
</template>
