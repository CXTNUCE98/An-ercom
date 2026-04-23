<script setup lang="ts">
import {
  FOOTER_CATEGORIES,
  FOOTER_SUPPORT,
  FOOTER_CONTACT,
} from '~/constants/landing';

const socials = [
  { abbr: 'FB', icon: 'bx bxl-facebook' },
  { abbr: 'IG', icon: 'bx bxl-instagram' },
  { abbr: 'YT', icon: 'bx bxl-youtube' },
  { abbr: 'TT', icon: 'bx bxl-tiktok' },
];
const year = new Date().getFullYear();

const fLink =
  'text-[rgba(245,240,232,0.55)] no-underline text-[0.85rem] tracking-[0.5px] transition-colors duration-250 hover:text-[var(--accent-2)]';
</script>

<template>
  <footer class="bg-[#0a0a0a] text-[rgba(245,240,232,0.8)] px-gutter pb-8 pt-0">
    <div class="h-px opacity-40 mb-12 lg:mb-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 lg:gap-12 pb-12 border-b border-[rgba(255,255,255,0.08)] mb-8">
      <div>
        <div class="font-display text-[1.8rem] font-bold tracking-[5px] text-[var(--accent-2)] mb-3.5">
          IRON<span class="text-[#f8f5ef]">MAN</span>
        </div>
        <p class="font-body text-[0.88rem] leading-[1.65] text-[rgba(245,240,232,0.5)] max-w-[280px] mb-5">
          Phụ kiện không chỉ là đồ vật — đó là câu chuyện của một người đàn ông đích thực.
        </p>
        <div class="flex gap-2.5">
          <a
            v-for="s in socials"
            :key="s.abbr"
            href="#"
            :aria-label="s.abbr"
            class="w-9 h-9 inline-flex items-center justify-center border border-[rgba(255,255,255,0.12)] text-[rgba(245,240,232,0.55)] text-[1.1rem] no-underline cursor-pointer transition-all duration-300 hover:border-[var(--accent-2)] hover:text-[var(--accent-2)] hover:bg-[rgba(201,162,75,0.08)]"
          >
            <i :class="s.icon" />
          </a>
        </div>
      </div>

      <div>
        <h4 class="font-condensed text-[0.7rem] font-semibold tracking-[4px] uppercase text-[var(--accent-2)] mb-4">Danh Mục</h4>
        <ul class="list-none flex flex-col gap-2.5 m-0 p-0">
          <li v-for="i in FOOTER_CATEGORIES" :key="i.path">
            <NuxtLink :to="i.path" :class="fLink">{{ i.name }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-condensed text-[0.7rem] font-semibold tracking-[4px] uppercase text-[var(--accent-2)] mb-4">Hỗ Trợ</h4>
        <ul class="list-none flex flex-col gap-2.5 m-0 p-0">
          <li v-for="i in FOOTER_SUPPORT" :key="i.name">
            <NuxtLink :to="i.path" :class="fLink">{{ i.name }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-condensed text-[0.7rem] font-semibold tracking-[4px] uppercase text-[var(--accent-2)] mb-4">Liên Hệ</h4>
        <ul class="list-none flex flex-col gap-2.5 m-0 p-0">
          <li v-for="i in FOOTER_CONTACT" :key="i.name">
            <a :href="i.path" :class="fLink">{{ i.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex flex-wrap justify-between items-center gap-4">
      <div class="text-[0.72rem] text-[rgba(245,240,232,0.3)] tracking-[0.5px]">
        © {{ year }} IRONMAN. Tất cả quyền được bảo lưu. | MST: 0123456789
      </div>
      <NuxtLink
        to="/#products"
        class="font-condensed text-[0.7rem] font-semibold tracking-[3px] uppercase text-[rgba(245,240,232,0.4)] no-underline transition-colors duration-250 hover:text-[var(--accent-2)]"
      >Tất Cả Sản Phẩm →</NuxtLink>
    </div>
  </footer>
</template>
