<script setup lang="ts">
import type { Category } from '~/types/landing';

const props = defineProps<{
  category: Category;
  index?: number;
  featured?: boolean;
}>();
</script>

<template>
  <div
    class="group relative flex flex-col bg-card border border-rule cursor-pointer overflow-hidden transition-all duration-400 ease-out hover:bg-card-alt hover:border-rule-strong"
    :class="{ 'cat-card--feat': featured }"
  >
    <!-- Radial halo overlay — fades in on hover -->
    <span
      aria-hidden="true"
      class="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100"
      :style="{
        background:
          'radial-gradient(120% 80% at 30% 20%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%)'
      }"
    />

    <div
      class="relative flex-1 flex items-center justify-center [&_.icon-line]:transition-transform [&_.icon-line]:duration-500 group-hover:[&_.icon-line]:scale-105"
      :class="featured ? 'pt-16 px-5 pb-10 min-h-[220px]' : 'pt-9 px-5 pb-6 min-h-[140px]'"
    >
      <CommonIconLine
        :name="category.icon"
        :size="featured ? 96 : 64"
        :style="{ color: 'color-mix(in srgb, var(--accent) 80%, var(--mid))' }"
      />
    </div>

    <div class="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-[18px_20px] px-5.5 border-t border-rule">
      <CommonNumeralIndex
        v-if="index !== undefined"
        :value="index"
        format="arabic"
        :class="featured ? 'text-[1.8rem]' : 'text-[1.3rem]'"
      />
      <div>
        <h3
          class="font-display italic font-semibold text-text m-0 leading-[1.1]"
          :class="featured ? 'text-[1.45rem]' : 'text-[1.1rem]'"
        >{{ category.name }}</h3>
        <div class="font-condensed text-[0.7rem] font-medium tracking-[2.5px] uppercase text-smoke mt-1">
          {{ category.count }} sản phẩm
        </div>
      </div>
      <span class="text-[1.05rem] text-mid transition-all duration-300 group-hover:translate-x-[6px] group-hover:text-accent">→</span>
    </div>
  </div>
</template>
