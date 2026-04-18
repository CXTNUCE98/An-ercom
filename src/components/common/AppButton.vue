<script setup lang="ts">
type Variant = 'filled' | 'outline' | 'ghost' | 'copper' | 'dark' | 'brass' | 'link';

withDefaults(
  defineProps<{
    variant?: Variant;
    type?: 'button' | 'submit';
  }>(),
  { variant: 'filled', type: 'button' },
);
</script>

<template>
  <button :type="type" class="app-btn" :class="`app-btn--${variant}`">
    <slot />
  </button>
</template>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-condensed);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 14px 32px;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.app-btn--filled {
  background: var(--text);
  color: var(--bg);
}
.app-btn--filled:hover {
  background: var(--accent);
  color: var(--on-accent);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 35%, transparent);
}

.app-btn--outline {
  background: transparent;
  color: var(--text);
  border-color: var(--rule);
}
.app-btn--outline:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.app-btn--ghost {
  background: transparent;
  color: var(--text);
  padding: 10px 0;
}
.app-btn--ghost:hover { color: var(--accent); }

.app-btn--copper {
  background: var(--accent-2);
  color: var(--on-accent);
}
.app-btn--copper:hover {
  filter: brightness(1.08);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px color-mix(in srgb, var(--accent-2) 40%, transparent);
}

.app-btn--dark {
  background: #0a0a0a;
  color: var(--accent);
  padding: 18px 42px;
  letter-spacing: 3px;
}
.app-btn--dark:hover {
  background: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.app-btn--brass {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
}
.app-btn--brass:hover {
  background: var(--accent-2);
  border-color: var(--accent-2);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 40%, transparent);
}

.app-btn--link {
  background: transparent;
  color: var(--accent);
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid var(--rule-strong);
  border-radius: 0;
}
.app-btn--link:hover {
  color: var(--accent-2);
  border-bottom-color: var(--accent-2);
}
</style>
