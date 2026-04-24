<script setup lang="ts">
import { HERO_STATS } from '~/constants/landing';
</script>

<template>
  <section class="light-lux-hero min-h-screen pt-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] relative overflow-hidden">
    <span class="hidden lg:inline-block absolute top-1/2 left-[18px] -translate-y-1/2 vrail z-[4] !tracking-[6px]">
      EST. 2015 · Issue N°27 · Xuân Hè 2025
    </span>

    <!-- LEFT -->
    <div
      class="flex flex-col justify-center py-20 px-6 lg:py-20 lg:pl-20 lg:pr-14 relative lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-[12%] lg:after:bottom-[12%] lg:after:w-px lg:after:bg-gradient-to-b lg:after:from-transparent lg:after:via-rule lg:after:to-transparent">
      <div class="flex items-center gap-[14px] mb-7 animate-fade-up [animation-delay:0.15s]">
        <span class="w-8 h-px bg-accent" />
        <span class="font-condensed text-[0.7rem] font-semibold tracking-[4px] uppercase text-accent">
          Bộ sưu tập mới · Spring/Summer Edition
        </span>
      </div>

      <h1
        class="font-display font-black text-[clamp(4.5rem,10vw,10rem)] leading-[0.86] tracking-[-2px] m-0 mb-3 text-text animate-fade-up [animation-delay:0.3s]">
        IRON<span class="text-accent">MAN</span>
      </h1>
      <p
        class="font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[0.95] text-mid m-0 mb-9 animate-fade-up [animation-delay:0.4s] [&_em]:italic [&_em:last-child]:text-accent">
        <em>for the man</em><br />
        <em>who knows.</em>
      </p>

      <p
        class="font-condensed text-base font-light leading-[1.75] text-mid max-w-[460px] mb-11 animate-fade-up [animation-delay:0.5s]">
        Một chiếc đồng hồ. Một chiếc Zippo. Một chiếc ví đã mòn cạnh.
        Phụ kiện không nói thay được con người, nhưng đủ để hé lộ bạn là ai.
      </p>

      <div class="flex gap-[22px] items-center flex-wrap mb-14 animate-fade-up [animation-delay:0.6s]">
        <CommonAppButton variant="brass">Khám Phá Lookbook</CommonAppButton>
        <CommonAppButton variant="link">Đặt lịch tư vấn 1-1 →</CommonAppButton>
      </div>

      <div
        class="flex items-end gap-[22px] flex-wrap pt-7 border-t border-rule animate-fade-up [animation-delay:0.75s]">
        <template v-for="(s, i) in HERO_STATS" :key="s.label">
          <div>
            <div class="font-display text-[2.2rem] font-bold text-text leading-none">
              {{ s.value }}<sup class="text-[0.85rem] text-accent ml-0.5">{{ s.suffix }}</sup>
            </div>
            <div class="font-condensed text-[0.68rem] tracking-[2.5px] uppercase text-smoke mt-1.5">
              {{ s.label }}
            </div>
          </div>
          <span v-if="i < HERO_STATS.length - 1"
            class="hidden lg:inline-block font-display text-[1.6rem] text-accent mx-1 mb-1">·</span>
        </template>
      </div>
    </div>

    <!-- RIGHT -->
    <div
      class="relative bg-card hidden md:flex items-center justify-center py-10 px-6 lg:py-[100px] lg:px-14 lg:pb-[60px] overflow-hidden">
      <div aria-hidden="true" class="absolute -inset-10 pointer-events-none" :style="{
        backgroundImage:
          'linear-gradient(color-mix(in srgb, var(--accent) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--accent) 6%, transparent) 1px, transparent 1px)',
        backgroundSize: '56px 56px'
      }" />

      <div
        class="relative w-full max-w-[460px] z-[2] border border-rule-strong p-[14px] bg-surface animate-fade-up [animation-delay:0.55s] lg:shadow-[-22px_22px_0_-1px_var(--card-alt),-22px_22px_0_0_var(--rule-strong)]">
        <CommonProductMedia aspect="3/4" placeholder-icon="watch"
          src="https://i.pinimg.com/1200x/26/ea/3c/26ea3ced6503ce21d58cf458526b58f4.jpg" :icon-size="240">
          <span
            class="absolute top-[22px] right-[22px] font-condensed text-[0.7rem] font-semibold tracking-[3px] text-accent z-[3]">
            01 / 04
          </span>
          <span class="absolute bottom-[22px] left-[22px] font-display italic text-[0.95rem] text-text z-[3]">
            Sea-Master · Steel &amp; Leather
          </span>
          <span
            class="absolute bottom-[22px] right-[22px] font-condensed text-[0.6rem] font-medium tracking-[3px] uppercase text-smoke z-[3]">
            Photo · Studio Ironman
          </span>
        </CommonProductMedia>
      </div>

      <CommonScrollCue label="Cuộn xuống" class="absolute bottom-9 left-1/2 -translate-x-1/2 z-[3]" />
    </div>
  </section>
</template>
