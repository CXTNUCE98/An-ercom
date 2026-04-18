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
  <div class="rule" :class="`rule--${align}`">
    <span v-if="align === 'start' && label" class="rule-label">{{ label }}</span>
    <span class="rule-line" />
    <span v-if="align === 'center' && label" class="rule-label">{{ label }}</span>
    <span v-if="align === 'center'" class="rule-line" />
  </div>
</template>

<style scoped>
.rule {
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
}
.rule--start .rule-line { flex: 1; }
.rule--center .rule-line { flex: 1; }

.rule-line {
  height: 1px;
  background: var(--rule-strong);
  display: block;
}

.rule-label {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  white-space: nowrap;
}
</style>
