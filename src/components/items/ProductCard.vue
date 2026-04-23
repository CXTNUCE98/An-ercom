<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '~/types/landing';

const props = defineProps<{
  product: Product;
  index?: number;
}>();

const padIndex = computed(() => String(props.index ?? 1).padStart(2, '0'));
</script>

<template>
  <article
    class="group relative flex flex-col cursor-pointer transition-transform duration-500 ease-out"
    :class="{ 'row-span-2': product.featured }"
  >
    <div class="relative overflow-hidden [&_img]:transition-transform [&_img]:duration-500 [&_img]:scale-[1.02] group-hover:[&_img]:scale-[1.06] group-hover:[&_.icon-line]:opacity-100">
      <CommonProductMedia
        :src="product.image || undefined"
        :alt="product.name"
        :aspect="product.featured ? '4/5' : '4/5'"
        :placeholder-icon="product.icon"
        :icon-size="product.featured ? 160 : 96"
      />

      <span
        class="absolute font-display italic font-bold text-accent tracking-[0.5px] z-[3]"
        :class="product.featured ? 'top-[22px] left-[26px] text-[1.8rem]' : 'top-4 left-[18px] text-[1.35rem]'"
      >N°{{ padIndex }}</span>

      <Badge
        v-if="product.badge"
        :label="product.badge"
        :variant="product.badgeVariant ?? 'copper'"
        class="absolute z-[3]"
        :class="product.featured ? 'top-[22px] right-[22px]' : 'top-4 right-4'"
      />

      <!-- Hover overlay + CTA -->
      <div
        class="absolute inset-0 flex items-end justify-center pb-[26px] z-[2] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        :style="{ background: 'linear-gradient(180deg, transparent 40%, rgba(7, 7, 10, 0.55))' }"
      >
        <button class="inline-flex items-center gap-3 bg-transparent border border-[rgba(241,236,224,0.8)] text-[#f8f5ef] font-condensed text-[0.75rem] font-semibold tracking-[3px] uppercase py-3 px-6 cursor-pointer translate-y-[6px] transition-all duration-400 group-hover:translate-y-0 hover:bg-accent hover:border-accent hover:text-on-accent [&_.arrow]:transition-transform [&_.arrow]:duration-300 hover:[&_.arrow]:translate-x-[4px]">
          Xem Chi Tiết
          <span class="arrow">→</span>
        </button>
      </div>
    </div>

    <div class="pt-5 px-0.5 pb-1 flex flex-col gap-2.5">
      <div class="font-condensed text-[0.6rem] font-semibold tracking-[4px] uppercase text-accent">
        {{ product.category }}
      </div>
      <div class="flex items-start justify-between gap-5">
        <h3
          class="font-display font-medium tracking-[0.2px] text-text leading-[1.25] m-0"
          :class="product.featured ? 'text-[1.5rem]' : 'text-[1.1rem]'"
        >{{ product.name }}</h3>
        <div class="font-condensed text-base font-semibold text-text whitespace-nowrap">
          {{ product.price }}
        </div>
      </div>
      <div class="flex items-center gap-3 pt-1.5 border-t border-rule opacity-70 transition-opacity duration-300 group-hover:opacity-100">
        <span class="flex-1 h-px bg-rule" />
        <span class="font-condensed text-[0.7rem] font-semibold tracking-[2.5px] uppercase text-mid transition-colors duration-300 group-hover:text-accent">
          + Thêm vào giỏ
        </span>
      </div>
    </div>
  </article>
</template>
