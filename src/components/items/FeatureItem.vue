<script setup lang="ts">
import { computed } from 'vue';
import type { IconName } from '~/types/landing';

const props = defineProps<{
  icon?: IconName;
  num?: string;
  romanIndex?: number;
  title: string;
  desc: string;
  variant?: 'editorial' | 'numbered' | 'lifestyle';
}>();

const v = computed(() => props.variant ?? 'editorial');

const wrapClass = computed(() => {
  if (v.value === 'numbered') return 'py-12 px-9 bg-card';
  if (v.value === 'lifestyle')
    return 'flex flex-col items-start gap-3.5 py-8 px-7 bg-[rgba(241,236,224,0.025)] hover:bg-[rgba(241,236,224,0.06)]';
  return 'flex flex-col items-start gap-3.5 pt-11 px-8 pb-9 bg-bg hover:bg-card';
});

const iconClass = computed(() =>
  v.value === 'lifestyle'
    ? 'text-[var(--brass-light,var(--accent-2))]'
    : 'text-mid'
);

const titleClass = computed(() => {
  if (v.value === 'numbered')
    return 'font-condensed text-base font-semibold tracking-[2px] uppercase text-text mb-2.5';
  if (v.value === 'lifestyle')
    return 'font-display italic text-[1.15rem] text-[#f5f0e8]';
  return 'font-display italic text-[1.2rem] font-semibold text-text';
});

const descClass = computed(() => {
  if (v.value === 'numbered')
    return 'font-condensed text-[0.9rem] text-smoke leading-[1.6]';
  if (v.value === 'lifestyle')
    return 'font-condensed text-[0.8rem] tracking-[0.5px] text-[rgba(245,240,232,0.6)] leading-[1.55]';
  return 'font-condensed text-[0.85rem] tracking-[0.5px] text-smoke leading-[1.55]';
});
</script>

<template>
  <div
    class="group relative bg-transparent transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100"
    :class="wrapClass"
  >
    <CommonNumeralIndex
      v-if="romanIndex !== undefined"
      :value="romanIndex"
      format="roman"
      class="text-[1.6rem] opacity-85"
    />
    <CommonIconLine
      v-if="icon"
      :name="icon"
      :size="v === 'lifestyle' ? 36 : 32"
      :class="iconClass"
    />
    <div
      v-if="num"
      class="font-display italic text-[3.5rem] leading-none mb-4"
      :style="{ color: 'color-mix(in srgb, var(--accent) 28%, transparent)' }"
    >{{ num }}</div>
    <div>
      <div :class="titleClass">{{ title }}</div>
      <div :class="descClass">{{ desc }}</div>
    </div>
  </div>
</template>
