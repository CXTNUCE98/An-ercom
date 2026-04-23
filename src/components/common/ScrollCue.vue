<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Cuộn xuống' });
</script>

<template>
  <div class="inline-flex flex-col items-center gap-2.5 text-accent font-condensed text-[0.65rem] font-semibold tracking-[5px] uppercase">
    <span>{{ label }}</span>
    <span class="block w-px h-12 origin-top bg-gradient-to-b from-accent to-transparent animate-scroll-line" />
    <span class="text-[0.85rem] tracking-normal animate-bounce-down">↓</span>
  </div>
</template>
