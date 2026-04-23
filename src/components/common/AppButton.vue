<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'filled' | 'outline' | 'ghost' | 'copper' | 'dark' | 'brass' | 'link';

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    type?: 'button' | 'submit';
  }>(),
  { variant: 'filled', type: 'button' },
);

// Per-variant utility classes. Box-shadow w/ color-mix uses arbitrary values.
const variantClasses: Record<Variant, string> = {
  filled:
    'bg-[var(--text)] text-[var(--bg)] border-transparent hover:bg-[var(--accent)] hover:text-[var(--on-accent)] hover:-translate-y-px hover:shadow-[0_6px_20px_color-mix(in_srgb,var(--accent)_35%,transparent)]',
  outline:
    'bg-transparent text-[var(--text)] border-[var(--rule)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  ghost:
    'bg-transparent text-[var(--text)] border-transparent !py-[10px] !px-0 hover:text-[var(--accent)]',
  copper:
    'bg-[var(--accent-2)] text-[var(--on-accent)] border-transparent hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_color-mix(in_srgb,var(--accent-2)_40%,transparent)]',
  dark:
    'bg-[#0a0a0a] text-[var(--accent)] border-transparent !px-[42px] !py-[18px] tracking-[3px] hover:bg-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]',
  brass:
    'bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)] hover:bg-[var(--accent-2)] hover:border-[var(--accent-2)] hover:-translate-y-px hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent)_40%,transparent)]',
  link:
    'bg-transparent text-[var(--accent)] !px-0 !py-2 !border-0 !border-b !border-solid !border-[var(--rule-strong)] !rounded-none hover:text-[var(--accent-2)] hover:!border-b-[var(--accent-2)]',
};

const variantClass = computed(() => variantClasses[props.variant]);
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center gap-2.5 font-condensed text-[0.82rem] font-semibold tracking-[2.5px] uppercase px-8 py-3.5 border border-solid cursor-pointer whitespace-nowrap transition-all duration-300"
    :class="variantClass"
  >
    <slot />
  </button>
</template>
