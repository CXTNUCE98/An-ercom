<script setup lang="ts">
import { useScrolled } from '~/composables/useScrolled';
import { useCartStore } from '~/features/cart/stores/useCartStore';

const { isScrolled } = useScrolled(20);
const cart = useCartStore();
const drawerOpen = ref(false);
const router = useRouter();
const route = useRoute();

const QUICK_LINKS = [
  { label: 'Trang Chủ',     hash: '#top',      icon: 'bx-home-alt' },
  { label: 'Combo Nổi Bật', hash: '#combos',   icon: 'bx-gift' },
  { label: 'Sản Phẩm',      hash: '#products', icon: 'bx-diamond' },
  { label: 'Câu Chuyện',    hash: '#story',    icon: 'bx-book-open' },
  { label: 'Liên Hệ',       hash: '#contact',  icon: 'bx-phone' },
];

async function goTo(hash: string) {
  drawerOpen.value = false;
  if (route.path !== '/') {
    await router.push({ path: '/', hash });
  } else {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (hash === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

watch(drawerOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '';
});

// Reusable utility class strings
const iconBtn =
  'relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-transparent border border-transparent text-mid text-[1.2rem] cursor-pointer no-underline rounded-full transition-all duration-250 hover:text-accent hover:border-rule hover:bg-mix-accent-8';

const drawerLink =
  'relative grid grid-cols-[34px_22px_1fr_auto] items-center gap-[14px] py-4 px-7 no-underline font-display text-[1.05rem] text-text border-b border-rule opacity-0 translate-x-5 animate-fade-up-x transition-[background,padding-left] duration-300 hover:bg-mix-accent-6 hover:pl-9 before:content-[\'\'] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-accent before:scale-y-0 before:origin-top before:transition-transform before:duration-300 hover:before:scale-y-100 [&_.arrow]:text-smoke [&_.arrow]:opacity-0 [&_.arrow]:-translate-x-1.5 [&_.arrow]:transition-all [&_.arrow]:duration-300 hover:[&_.arrow]:opacity-100 hover:[&_.arrow]:translate-x-0 hover:[&_.arrow]:text-accent';
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 px-gutter max-w-screen overflow-hidden box-border border-b border-transparent transition-[padding,border-color,background] duration-300 backdrop-blur-[14px] backdrop-saturate-150"
    :style="{
      background: isScrolled
        ? 'color-mix(in srgb, var(--bg) 94%, transparent)'
        : 'color-mix(in srgb, var(--bg) 85%, transparent)'
    }"
    :class="[isScrolled ? 'border-b-rule py-2' : 'py-3']"
  >
    <a
      href="#top"
      class="font-display font-extrabold text-accent no-underline leading-none min-w-0 flex-shrink whitespace-nowrap text-[1.15rem] tracking-[2.5px] sm:text-[1.3rem] sm:tracking-[3.5px] lg:text-[1.6rem] lg:tracking-[6px]"
      @click.prevent="goTo('#top')"
    >
      IRON<span class="text-text">MAN</span>
    </a>

    <div class="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 flex-shrink-0">
      <a
        href="#products"
        :class="iconBtn"
        aria-label="Tìm sản phẩm"
        @click.prevent="goTo('#products')"
      >
        <i class="bx bx-search-alt" />
      </a>
      <NuxtLink to="/cart" :class="iconBtn" aria-label="Giỏ hàng">
        <i class="bx bx-shopping-bag" />
        <span
          v-if="cart.count > 0"
          class="absolute top-0.5 right-0.5 bg-oxblood text-[#fbf6ea] font-condensed text-[0.58rem] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center leading-none border-2 border-bg"
        >{{ cart.count }}</span>
      </NuxtLink>
      <CommonThemeToggle />
    </div>

    <Transition name="fade">
      <div
        v-if="drawerOpen"
        class="fixed inset-0 z-[100] backdrop-blur-md"
        :style="{ background: 'color-mix(in srgb, #000 55%, transparent)' }"
        @click="drawerOpen = false"
      />
    </Transition>

    <Transition name="slide-right">
      <aside
        v-if="drawerOpen"
        class="fixed top-0 right-0 h-screen w-[min(88vw,380px)] bg-bg border-l border-rule-strong z-[101] flex flex-col"
        :style="{ boxShadow: '-20px 0 60px color-mix(in srgb, #000 30%, transparent)' }"
        @click.stop
      >
        <div class="flex items-start justify-between py-7 px-7 pb-5 border-b border-rule">
          <div class="flex flex-col gap-1 font-display text-[1.4rem] font-extrabold tracking-[5px] text-accent leading-none">
            IRON<span class="text-text">MAN</span>
            <em class="font-display italic text-[0.72rem] tracking-[1px] text-smoke font-normal">for the man who knows.</em>
          </div>
          <button
            :class="iconBtn"
            class="-mt-1"
            aria-label="Đóng"
            @click="drawerOpen = false"
          >
            <i class="bx bx-x" />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-4">
          <a
            v-for="(link, i) in QUICK_LINKS"
            :key="link.hash"
            href="#"
            :class="drawerLink"
            :style="{ animationDelay: `${0.05 * i + 0.1}s` }"
            @click.prevent="goTo(link.hash)"
          >
            <span class="font-condensed text-[0.7rem] tracking-[2px] text-accent font-bold">0{{ i + 1 }}</span>
            <i class="bx text-[1.15rem] text-accent" :class="link.icon" />
            <span class="tracking-[0.5px]">{{ link.label }}</span>
            <i class="bx bx-right-arrow-alt arrow text-[1.3rem]" />
          </a>
        </nav>

        <div class="py-6 px-7 pt-6 border-t border-rule flex flex-col gap-4.5">
          <div class="flex flex-col gap-1">
            <span class="font-condensed text-[0.68rem] font-semibold tracking-[3px] uppercase text-accent">Hotline 24/7</span>
            <a href="tel:18001234" class="font-display text-[1.5rem] font-bold text-text no-underline tracking-[1px]">1800 1234</a>
          </div>
          <div class="flex gap-2.5">
            <a v-for="s in [
              { label: 'Facebook', icon: 'bxl-facebook' },
              { label: 'Instagram', icon: 'bxl-instagram' },
              { label: 'Zalo', icon: 'bx-chat' },
              { label: 'TikTok', icon: 'bxl-tiktok' },
            ]" :key="s.label" href="#" :aria-label="s.label" class="w-[38px] h-[38px] border border-rule-strong text-accent flex items-center justify-center text-[1.1rem] no-underline rounded-full transition-all duration-300 hover:bg-accent hover:text-on-accent hover:-translate-y-0.5">
              <i class="bx" :class="s.icon" />
            </a>
          </div>
        </div>
      </aside>
    </Transition>
  </header>
</template>
