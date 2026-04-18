<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'"
    @click="toggleTheme"
  >
    <i v-if="theme === 'dark'" class="bx bx-sun" />
    <i v-else class="bx bx-moon" />
  </button>
</template>

<style scoped>
.theme-toggle {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--text);
  font-size: 1.05rem;
  cursor: pointer;
  border-radius: 999px;
  transition: all 0.25s ease;
}
.theme-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: rotate(15deg);
}
</style>
