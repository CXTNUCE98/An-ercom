<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button
    class="w-[38px] h-[38px] inline-flex items-center justify-center bg-transparent border border-[var(--rule)] text-[var(--text)] text-[1.05rem] cursor-pointer rounded-full transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:rotate-[15deg]"
    :aria-label="theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'"
    @click="toggleTheme"
  >
    <i v-if="theme === 'dark'" class="bx bx-sun" />
    <i v-else class="bx bx-moon" />
  </button>
</template>
