<script setup lang="ts">
import { useNotifications, type NotificationType } from '@/composables/notifications'

const { items, remove } = useNotifications()

// Màu theo từng type: viền + nền mờ + màu chữ/icon (hỗ trợ dark mode)
const themeClasses: Record<NotificationType, string> = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  error: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  info: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
}

const icons: Record<NotificationType, string> = {
  success: 'bx-check-circle',
  error: 'bx-error-circle',
  warning: 'bx-error',
  info: 'bx-info-circle',
}
</script>

<template>
  <div
    class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 w-full max-w-[420px] px-4 pointer-events-none"
  >
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in absolute"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-3 opacity-0"
      move-class="transition duration-200"
    >
      <div
        v-for="n in items"
        :key="n.id"
        class="pointer-events-auto w-full backdrop-blur-xl border rounded-xl shadow-2xl p-3.5 pr-10 relative flex items-center gap-3"
        :class="themeClasses[n.type]"
        role="alert"
      >
        <i class="bx text-xl shrink-0" :class="icons[n.type]"></i>

        <p class="flex-1 text-sm font-semibold leading-snug">{{ n.message }}</p>

        <button
          type="button"
          aria-label="Đóng thông báo"
          class="absolute top-2 right-2 w-7 h-7 rounded-lg flex-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-50 hover:opacity-100"
          @click="remove(n.id)"
        >
          <i class="bx bx-x text-lg"></i>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
