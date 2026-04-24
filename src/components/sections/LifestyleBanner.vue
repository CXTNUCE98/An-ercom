<script setup lang="ts">
import { LIFESTYLE_FEATURES } from '~/constants/landing';
</script>

<template>
  <section class="relative overflow-hidden mx-6 mb-15 sm:mx-14 sm:mb-20 py-12 px-8 sm:py-18 sm:px-16 bg-[#0a0a0a] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
    <!-- Decorative concentric circles -->
    <span
      aria-hidden="true"
      class="absolute right-[-80px] top-[-80px] w-[320px] h-[320px] rounded-full pointer-events-none"
      :style="{ border: '1px solid color-mix(in srgb, var(--accent-2) 20%, transparent)' }"
    />
    <span
      aria-hidden="true"
      class="absolute right-[-20px] top-[-20px] w-[200px] h-[200px] rounded-full pointer-events-none"
      :style="{ border: '1px solid color-mix(in srgb, var(--accent-2) 12%, transparent)' }"
    />

    <div class="relative z-[1]">
      <div class="font-condensed text-[0.7rem] font-semibold tracking-[4px] uppercase text-[var(--accent-2)] mb-4">
        Quà tặng ý nghĩa
      </div>
      <h2 class="font-display font-black text-[#f5f0e8] leading-none mb-5 text-[clamp(2.4rem,4.5vw,4rem)]">
        Món quà<br>
        <em class="italic text-[var(--accent-2)]">Sang trọng</em>
      </h2>
      <p class="text-[rgba(245,240,232,0.65)] text-[0.95rem] leading-[1.7] mb-9 max-w-[460px]">
        Nhân dịp Ngày Của Cha, giảm 15% toàn bộ đồng hồ và Zippo. Tặng kèm hộp quà cao cấp và thiệp viết tay miễn phí.
      </p>
      <CommonAppButton variant="copper">Chọn Quà Ngay →</CommonAppButton>
    </div>

    <div class="relative z-[1] grid grid-cols-2 gap-px bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)]">
      <ItemsFeatureItem v-for="f in LIFESTYLE_FEATURES" :key="f.title" :icon="f.icon" :title="f.title" :desc="f.desc"
        variant="lifestyle" />
    </div>
  </section>
</template>
