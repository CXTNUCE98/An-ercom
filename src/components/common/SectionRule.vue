<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    align?: 'start' | 'center';
  }>(),
  { align: 'center' }
);
</script>

<template>
  <div class="flex items-center gap-[18px] w-full">
    <span v-if="align === 'start' && label" class="eyebrow whitespace-nowrap">{{ label }}</span>
    <span class="block h-px flex-1 bg-rule-strong" />
    <span v-if="align === 'center' && label" class="eyebrow whitespace-nowrap">{{ label }}</span>
    <span v-if="align === 'center'" class="block h-px flex-1 bg-rule-strong" />
  </div>
</template>
