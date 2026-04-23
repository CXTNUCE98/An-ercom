<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    variant?: 'copper' | 'olive' | 'dark';
  }>(),
  { variant: 'copper' },
);

const variantClass = computed(() => {
  switch (props.variant) {
    case 'olive':
      return 'bg-olive text-white';
    case 'dark':
      return 'bg-[var(--text)] text-[var(--bg)]';
    case 'copper':
    default:
      return 'bg-[var(--accent)] text-white';
  }
});
</script>

<template>
  <span
    class="inline-block px-3 py-[5px] font-condensed text-[0.62rem] font-semibold tracking-[2px] uppercase"
    :class="variantClass"
  >
    {{ label }}
  </span>
</template>
