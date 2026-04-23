<script setup lang="ts">
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { formatPrice } from '~/shared/utils/format';

useHead({ title: 'Giỏ Hàng — IRONMAN' });

const cart = useCartStore();
const promoInput = ref('');
const promoError = ref('');

function applyPromo() {
  promoError.value = '';
  if (!promoInput.value.trim()) return;
  const ok = cart.applyPromo(promoInput.value.trim());
  if (!ok) {
    promoError.value = 'Mã giảm giá không hợp lệ';
  }
  promoInput.value = '';
}
</script>

<template>
  <main class="pt-25 px-[var(--gutter)] pb-[var(--sp-lg)] min-h-screen lg:pt-[100px]">
    <h1 class="font-display text-[2.4rem] font-bold text-[var(--text)] m-0 mb-10">Giỏ Hàng</h1>

    <div v-if="cart.items.length === 0" class="text-center py-20 px-5 text-smoke">
      <CommonIconLine name="wallet" :size="80" />
      <p class="my-5 text-base">Giỏ hàng trống</p>
      <NuxtLink
        to="/#products"
        class="inline-block bg-[var(--accent)] text-[var(--on-accent)] font-condensed text-[0.8rem] font-semibold tracking-[3px] uppercase no-underline py-3.5 px-8 transition-transform duration-300 hover:-translate-y-0.5"
      >Mua Sắm Ngay</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-12">
      <div class="flex flex-col">
        <div
          v-for="item in cart.items"
          :key="item.productId"
          class="cart-line grid grid-cols-[60px_1fr_auto_auto] lg:grid-cols-[80px_1fr_auto_auto_auto] gap-3 lg:gap-5 items-center py-5 border-b border-[var(--rule)]"
        >
          <NuxtLink
            :to="`/products/${item.slug}`"
            class="w-15 h-15 lg:w-20 lg:h-20 bg-[var(--card)] border border-[var(--rule)] overflow-hidden"
          >
            <CommonProductMedia
              :src="item.image || undefined"
              :alt="item.name"
              aspect="1/1"
              :placeholder-icon="(item.icon as any)"
              :icon-size="40"
            />
          </NuxtLink>

          <div class="flex flex-col gap-1">
            <NuxtLink
              :to="`/products/${item.slug}`"
              class="font-display text-[0.95rem] font-medium text-[var(--text)] no-underline transition-colors duration-300 hover:text-[var(--accent)]"
            >{{ item.name }}</NuxtLink>
            <div class="text-[0.75rem] text-smoke">{{ item.brand }}</div>
            <div class="font-condensed text-[0.85rem] font-medium text-mid">{{ formatPrice(item.salePrice ?? item.price) }}</div>
          </div>

          <div class="flex items-center border border-[var(--rule)]">
            <button
              class="w-8 h-8 bg-transparent border-0 text-[var(--text)] cursor-pointer text-base hover:text-[var(--accent)]"
              @click="cart.updateQuantity(item.productId, item.quantity - 1)"
            >−</button>
            <span class="w-8 text-center font-condensed font-semibold text-[0.85rem] border-x border-[var(--rule)] leading-8">{{ item.quantity }}</span>
            <button
              class="w-8 h-8 bg-transparent border-0 text-[var(--text)] cursor-pointer text-base hover:text-[var(--accent)]"
              @click="cart.updateQuantity(item.productId, item.quantity + 1)"
            >+</button>
          </div>

          <div class="hidden lg:block font-condensed text-[0.95rem] font-semibold text-[var(--text)] min-w-[100px] text-right">
            {{ formatPrice((item.salePrice ?? item.price) * item.quantity) }}
          </div>

          <button
            class="bg-transparent border-0 text-smoke text-[1.2rem] cursor-pointer p-1 transition-colors duration-300 hover:text-[var(--oxblood)]"
            aria-label="Xóa"
            @click="cart.removeItem(item.productId)"
          >
            <i class="bx bx-x" />
          </button>
        </div>
      </div>

      <div class="bg-[var(--card)] border border-[var(--rule)] p-8 self-start lg:sticky lg:top-25">
        <h2 class="font-display text-[1.2rem] font-bold text-[var(--text)] m-0 mb-6">Tóm Tắt Đơn Hàng</h2>

        <div class="flex justify-between text-[0.88rem] text-mid mb-3">
          <span>Tạm tính</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>

        <div v-if="cart.appliedPromo" class="flex justify-between text-[0.88rem] text-[var(--olive)] mb-3">
          <span>
            {{ cart.appliedPromo.label }}
            <button class="bg-transparent border-0 text-smoke cursor-pointer text-base ml-1" @click="cart.clearPromo()">×</button>
          </span>
          <span class="font-semibold">-{{ formatPrice(cart.discount) }}</span>
        </div>

        <div class="flex gap-2 mt-4 mb-2">
          <input
            v-model="promoInput"
            type="text"
            placeholder="Mã giảm giá"
            class="flex-1 bg-[var(--surface)] border border-[var(--rule)] text-[var(--text)] text-[0.82rem] py-2 px-3 placeholder:text-smoke"
            @keyup.enter="applyPromo"
          />
          <button
            class="bg-transparent border border-[var(--rule)] text-mid font-condensed text-[0.7rem] tracking-[2px] uppercase py-2 px-3.5 cursor-pointer transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            @click="applyPromo"
          >Áp dụng</button>
        </div>
        <div v-if="promoError" class="text-[0.75rem] text-[var(--oxblood)] mb-2">{{ promoError }}</div>

        <div class="h-px bg-[var(--rule)] my-4" />

        <div class="flex justify-between font-display text-[1.1rem] font-bold text-[var(--text)] mb-6">
          <span>Tổng cộng</span>
          <span>{{ formatPrice(cart.total) }}</span>
        </div>

        <NuxtLink
          to="/checkout"
          class="block text-center bg-[var(--accent)] text-[var(--on-accent)] font-condensed text-[0.8rem] font-semibold tracking-[3px] uppercase no-underline py-3.5 transition-transform duration-300 hover:-translate-y-px mb-3"
        >Tiến Hành Thanh Toán</NuxtLink>

        <NuxtLink
          to="/#products"
          class="block text-center text-smoke font-condensed text-[0.72rem] tracking-[2px] uppercase no-underline py-2 transition-colors duration-300 hover:text-[var(--accent)]"
        >← Tiếp Tục Mua Sắm</NuxtLink>
      </div>
    </div>
  </main>
</template>
