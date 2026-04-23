<script setup lang="ts">
import type { Testimonial } from '~/types/landing';

defineProps<{
  testimonial: Testimonial;
  index?: number;
}>();
</script>

<template>
  <article
    class="group relative bg-surface py-10 px-8 pb-8 border border-rule flex flex-col gap-4 overflow-hidden transition-all duration-400 hover:border-rule-strong hover:-translate-y-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-accent after:transition-[width] after:duration-500 hover:after:w-full"
  >
    <div class="flex justify-between items-center">
      <CommonNumeralIndex
        v-if="index !== undefined"
        :value="index"
        format="noun"
        class="text-[1.1rem]"
      />
      <div class="text-accent text-[0.95rem] tracking-[4px]">
        <span v-for="n in testimonial.stars" :key="n">★</span>
      </div>
    </div>

    <span
      class="block font-display italic text-[4.5rem] leading-[0.6] h-6"
      :style="{ color: 'color-mix(in srgb, var(--accent) 40%, transparent)' }"
    >&ldquo;</span>

    <p class="font-display italic text-[1.05rem] leading-[1.75] text-mid m-0">{{ testimonial.quote }}</p>

    <div class="h-px bg-rule" />

    <div class="flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-full flex items-center justify-center bg-transparent border border-accent text-accent font-display italic font-bold text-[0.95rem]">
        {{ testimonial.initials }}
      </div>
      <div>
        <div class="font-condensed text-[0.95rem] font-semibold tracking-[2px] uppercase text-text">{{ testimonial.name }}</div>
        <div class="font-condensed text-[0.72rem] tracking-[2px] uppercase text-smoke mt-0.5">{{ testimonial.role }}</div>
      </div>
    </div>
  </article>
</template>
