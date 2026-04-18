<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    variant?: 'copper' | 'olive' | 'dark';
  }>(),
  { variant: 'copper' },
);
</script>

<template>
  <span class="badge" :class="`badge--${variant}`">{{ label }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 5px 12px;
  font-family: var(--font-condensed);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
}
.badge--copper { background: var(--accent); }
.badge--olive  { background: var(--olive); }
.badge--dark   { background: var(--text); color: var(--bg); }
</style>
