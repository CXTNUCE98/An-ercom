<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number;
    format?: 'arabic' | 'roman' | 'noun';
  }>(),
  { format: 'noun' }
);

const toRoman = (n: number): string => {
  const map: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let r = '';
  let v = n;
  for (const [num, sym] of map) {
    while (v >= num) { r += sym; v -= num; }
  }
  return r || 'I';
};

const pad = (n: number) => String(n).padStart(2, '0');

const display = computed(() => {
  if (props.format === 'roman') return toRoman(props.value);
  if (props.format === 'arabic') return pad(props.value);
  return `N°${pad(props.value)}`;
});
</script>

<template>
  <span class="font-display italic font-bold text-[var(--accent)] tracking-[-0.5px] leading-none">
    {{ display }}
  </span>
</template>
