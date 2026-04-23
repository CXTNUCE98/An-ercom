<script setup lang="ts">
defineProps<{
  tag?: string;
  title: string;
  accent?: string;
  link?: string;
  linkText?: string;
  align?: 'start' | 'center';
}>();
</script>

<template>
  <header
    :class="[
      align === 'center'
        ? 'block text-center mb-12 pb-0 border-none'
        : 'flex items-end justify-between gap-8 mb-12 pb-5 border-b border-[var(--rule)]',
    ]"
  >
    <div>
      <div
        v-if="tag"
        class="font-condensed text-[0.68rem] font-semibold tracking-[4px] uppercase text-[var(--accent)] mb-2"
      >
        {{ tag }}
      </div>
      <h2
        class="font-display font-bold text-[var(--text)] leading-none text-[clamp(2.2rem,4vw,3.8rem)]"
      >
        <span>{{ title }}</span>
        <em v-if="accent" class="italic text-[var(--accent)] font-bold"> {{ accent }}</em>
      </h2>
    </div>
    <a
      v-if="link"
      :href="link"
      class="font-condensed text-[0.75rem] font-semibold tracking-[2.5px] uppercase text-mid no-underline pb-4 transition-colors duration-300 whitespace-nowrap hover:text-[var(--accent)]"
    >
      {{ linkText ?? 'Xem tất cả' }} →
    </a>
  </header>
</template>
