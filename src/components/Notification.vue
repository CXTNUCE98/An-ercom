<script setup lang="ts">
import { useNotifications } from '@/composables/notifications'
const { items, remove } = useNotifications()

const themeClasses: Record<string, string> = {
  success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  error: 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400',
  warning: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  info: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
}

const icons: Record<string, string> = {
  success: 'bx-check-circle',
  error: 'bx-error-circle',
  warning: 'bx-error',
  info: 'bx-info-circle',
}
</script>

<template>
  <div class="fixed top-24 right-6 z-[100] space-y-4 w-full max-w-[400px] pointer-events-none">
    <TransitionGroup enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-x-32 opacity-0" enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-300 ease-in" leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-90 opacity-0">

      <div v-for="n in items" :key="n.id"
        class="pointer-events-auto backdrop-blur-xl border-2 rounded-2xl shadow-2xl overflow-hidden p-4 relative flex items-center gap-4 animate-glow"
        :class="themeClasses[n.type]">

        <div class="w-10 h-10 rounded-xl flex-center shrink-0" :class="themeClasses[n.type]">
          <i class="bx text-2xl" :class="icons[n.type]"></i>
        </div>

        <div class="flex-1 pr-6">
          <p class="text-sm font-bold leading-tight">{{ n.message }}</p>
        </div>

        <button @click="remove(n.id)"
          class="absolute top-2 right-2 w-8 h-8 rounded-lg flex-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors opacity-40 hover:opacity-100">
          <i class="bx bx-x text-xl"></i>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
@keyframes glow {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.9;
  }
}

.animate-glow {
  animation: glow 2s infinite ease-in-out;
}
</style>
