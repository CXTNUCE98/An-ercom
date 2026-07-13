<script setup lang="ts">
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { useWishlistToggle } from '~/composables/useWishlistToggle';
import { useNotifications } from '~/composables/notifications';
import { formatPrice } from '~/shared/utils/format';
import type { CatalogProduct } from '~/types/landing';

defineProps<{
  products: CatalogProduct[];
}>();

const cart = useCartStore();
const { notify } = useNotifications();
const { isInWishlist, toggle: toggleWishlist } = useWishlistToggle();
const router = useRouter();

function salePercent(p: CatalogProduct) {
  if (!p.salePrice) return 0;
  return Math.round((1 - p.salePrice / p.price) * 100);
}

function addToCart(p: CatalogProduct) {
  if (p.stock <= 0) {
    notify('warning', 'Sản phẩm tạm hết hàng');
    return;
  }
  cart.addItem(p, 1);
  cart.openDrawer();
  notify('success', `Đã thêm "${p.name}" vào giỏ`);
}

function buyNow(p: CatalogProduct) {
  if (p.stock <= 0) {
    notify('warning', 'Sản phẩm tạm hết hàng');
    return;
  }
  cart.addItem(p, 1);
  router.push('/checkout');
}

const badgeBase =
  'absolute top-3 right-3 font-condensed text-[0.65rem] font-bold tracking-[2px] uppercase py-1 px-2.5 z-[3]';
</script>

<template>
  <div class="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
    <NuxtLink v-for="p in products" :key="p.id" :to="`/products/${p.slug}`"
      class="group no-underline text-inherit flex flex-col cursor-pointer">
      <div
        class="relative overflow-hidden bg-card [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.06]">
        <CommonProductMedia :src="p.images[0] || undefined" :alt="p.name" aspect="3/4" :placeholder-icon="p.icon"
          :icon-size="80" />
        <span v-if="salePercent(p)"
          class="absolute top-3 left-3 z-[3] bg-oxblood text-white font-condensed text-[0.7rem] font-bold tracking-[1px] py-1 px-2.5">-{{
          salePercent(p) }}%</span>
        <span v-if="p.isNew" :class="[badgeBase, 'bg-olive text-white']">Mới</span>
        <span v-else-if="p.isBestSeller" :class="[badgeBase, 'bg-accent text-on-accent']">Bán Chạy</span>
        <span v-else-if="p.isLuxury"
          :class="[badgeBase, 'text-ink bg-gradient-to-br from-accent to-[var(--accent-2)]']">Luxury</span>
        <!-- Nút yêu thích (góc trên phải) -->
        <button
          type="button"
          :aria-label="isInWishlist(p.id) ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'"
          class="absolute top-3 right-3 z-[4] w-9 h-9 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 cursor-pointer"
          :class="isInWishlist(p.id)
            ? 'bg-oxblood/90 border-oxblood text-white'
            : 'bg-black/35 border-white/40 text-white opacity-0 group-hover:opacity-100 hover:bg-oxblood hover:border-oxblood'"
          @click.prevent.stop="toggleWishlist(p.id)"
        >
          <i class="bx text-[1.05rem]" :class="isInWishlist(p.id) ? 'bxs-heart' : 'bx-heart'" />
        </button>

        <!-- Overlay CTA — 2 nút ngang hàng -->
        <div
          class="absolute inset-0 flex items-end justify-center gap-2 px-3 pb-5 opacity-0 transition-opacity duration-400 z-[2] group-hover:opacity-100"
          :style="{ background: 'linear-gradient(180deg, transparent 45%, rgba(7, 7, 10, 0.68))' }">
          <button
            type="button"
            class="flex-1 flex items-center justify-center gap-1.5 bg-transparent text-[#f8f5ef] border border-[rgba(241,236,224,0.7)] font-condensed text-[0.68rem] font-bold tracking-[1.5px] uppercase py-2.5 px-2 translate-y-2 transition-all duration-400 group-hover:translate-y-0 cursor-pointer hover:bg-[#f8f5ef] hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="p.stock <= 0"
            @click.prevent.stop="addToCart(p)"
          >
            <i class="bx bx-shopping-bag text-[0.95rem]" />
            {{ p.stock <= 0 ? 'Hết hàng' : 'Thêm giỏ' }}
          </button>
          <button
            type="button"
            class="flex-1 flex items-center justify-center gap-1.5 bg-accent text-on-accent border border-accent font-condensed text-[0.68rem] font-bold tracking-[1.5px] uppercase py-2.5 px-2 translate-y-2 transition-all duration-400 delay-75 group-hover:translate-y-0 cursor-pointer hover:bg-[var(--accent-2)] hover:border-[var(--accent-2)] disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="p.stock <= 0"
            @click.prevent.stop="buyNow(p)"
          >
            <i class="bx bx-bolt-circle text-[0.95rem]" />
            Mua ngay
          </button>
        </div>
      </div>
      <div class="pt-3.5 px-0.5 pb-1">
        <div class="flex justify-between items-center mb-1.5">
          <span class="font-condensed text-[0.65rem] font-semibold tracking-[3px] uppercase text-accent">{{
            p.brand }}</span>
          <span class="inline-flex items-center gap-[3px] font-condensed text-[0.78rem] font-semibold text-mid">
            <i class="bx bxs-star text-accent text-[0.8rem]" /> {{ p.rating }}
          </span>
        </div>
        <h4 class="font-display text-base font-semibold text-text m-0 mb-2 leading-[1.3]">{{ p.name }}</h4>
        <div class="flex items-baseline gap-2">
          <span v-if="p.salePrice" class="font-condensed text-[0.95rem] font-bold text-accent">{{
            formatPrice(p.salePrice) }}</span>
          <span :class="p.salePrice
            ? 'font-condensed text-[0.8rem] text-smoke line-through'
            : 'font-condensed text-[0.95rem] font-semibold text-text'">{{ formatPrice(p.price) }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
