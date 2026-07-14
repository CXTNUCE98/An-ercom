<script setup lang="ts">
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { formatPrice } from '~/shared/utils/format';

const cart = useCartStore();
const router = useRouter();

const promoInput = ref('');
const promoError = ref('');
const promoLoading = ref(false);

async function applyPromo() {
  promoError.value = '';
  if (!promoInput.value.trim()) return;
  promoLoading.value = true;
  try {
    const ok = await cart.applyPromo(promoInput.value.trim());
    if (!ok) {
      promoError.value = 'Mã giảm giá không hợp lệ hoặc đã hết hạn';
    } else {
      promoInput.value = '';
    }
  } finally {
    promoLoading.value = false;
  }
}

watch(() => cart.isDrawerOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '';
});

function goToCheckout() {
  cart.closeDrawer();
  router.push('/checkout');
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="cart.isDrawerOpen"
      class="fixed inset-0 z-[100] backdrop-blur-md"
      :style="{ background: 'color-mix(in srgb, #000 55%, transparent)' }"
      @click="cart.closeDrawer()"
    />
  </Transition>

  <Transition name="slide-right">
    <aside
      v-if="cart.isDrawerOpen"
      class="fixed top-0 right-0 h-screen w-[min(90vw,420px)] bg-bg border-l border-rule-strong z-[101] flex flex-col"
      :style="{ boxShadow: '-20px 0 60px color-mix(in srgb, #000 30%, transparent)' }"
      @click.stop
    >
      <div class="flex items-center justify-between py-6 px-7 border-b border-rule shrink-0">
        <h2 class="font-display text-[1.5rem] font-bold text-text m-0">Giỏ Hàng</h2>
        <button
          class="relative inline-flex items-center justify-center w-10 h-10 bg-transparent border border-transparent text-mid text-[1.4rem] cursor-pointer rounded-full transition-all duration-250 hover:text-accent hover:border-rule hover:bg-mix-accent-8"
          aria-label="Đóng"
          @click="cart.closeDrawer()"
        >
          <i class="bx bx-x" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-7 py-4">
        <div v-if="cart.items.length === 0" class="text-center py-20 text-smoke">
          <CommonIconLine name="wallet" :size="60" />
          <p class="my-5 text-sm">Giỏ hàng trống</p>
          <button
            class="inline-block bg-[var(--accent)] text-[var(--on-accent)] font-condensed text-[0.8rem] border-0 font-semibold tracking-[3px] uppercase cursor-pointer py-3.5 px-8 transition-transform duration-300 hover:-translate-y-0.5"
            @click="cart.closeDrawer()"
          >Mua Sắm Ngay</button>
        </div>

        <div v-else class="flex flex-col gap-6">
          <div
            v-for="item in cart.items"
            :key="item.lineId"
            class="grid grid-cols-[60px_1fr_auto] gap-4 items-start py-4 border-b border-rule"
          >
            <NuxtLink
              :to="item.kind === 'combo' ? `/combos/${item.slug}` : `/products/${item.slug}`"
              class="w-[60px] h-[60px] bg-card border border-rule overflow-hidden block"
              @click="cart.closeDrawer()"
            >
              <CommonProductMedia
                :src="item.image || undefined"
                :alt="item.name"
                aspect="1/1"
                :placeholder-icon="(item.icon as any)"
                :icon-size="30"
              />
            </NuxtLink>

            <div class="flex flex-col gap-1 min-w-0">
              <NuxtLink
                :to="item.kind === 'combo' ? `/combos/${item.slug}` : `/products/${item.slug}`"
                class="font-display text-[0.9rem] font-medium text-text no-underline transition-colors duration-300 hover:text-accent truncate"
                @click="cart.closeDrawer()"
              >{{ item.name }}</NuxtLink>
              <div class="text-[0.7rem] text-smoke truncate">{{ item.brand }}</div>
              <div class="font-condensed text-[0.8rem] font-medium text-mid">{{ formatPrice(item.salePrice ?? item.price) }}</div>
              
              <div class="flex items-center border border-rule w-fit mt-2">
                <button
                  class="w-7 h-7 bg-transparent border-0 text-text cursor-pointer text-sm hover:text-accent flex items-center justify-center"
                  @click="cart.updateQuantity(item.lineId, item.quantity - 1)"
                >−</button>
                <span class="w-7 text-center font-condensed font-semibold text-[0.8rem] border-x border-rule leading-7">{{ item.quantity }}</span>
                <button
                  class="w-7 h-7 bg-transparent border-0 text-text cursor-pointer text-sm hover:text-accent flex items-center justify-center"
                  @click="cart.updateQuantity(item.lineId, item.quantity + 1)"
                >+</button>
              </div>
            </div>

            <div class="flex flex-col items-end gap-2">
              <button
                class="bg-transparent border-0 text-smoke text-[1.2rem] cursor-pointer p-0 transition-colors duration-300 hover:text-[var(--oxblood)]"
                aria-label="Xóa"
                @click="cart.removeItem(item.lineId)"
              >
                <i class="bx bx-trash" />
              </button>
              <div class="font-condensed text-[0.85rem] font-semibold text-text mt-auto">
                {{ formatPrice((item.salePrice ?? item.price) * item.quantity) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cart.items.length > 0" class="bg-card border-t border-rule p-7 shrink-0">
        <div class="flex justify-between text-[0.85rem] text-mid mb-2">
          <span>Tạm tính</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>

        <div v-if="cart.appliedPromo" class="flex justify-between text-[0.85rem] text-[var(--olive)] mb-3">
          <span>
            {{ cart.appliedPromo.label }}
            <button class="bg-transparent border-0 text-smoke cursor-pointer text-sm ml-1" @click="cart.clearPromo()">×</button>
          </span>
          <span class="font-semibold">-{{ formatPrice(cart.discount) }}</span>
        </div>

        <div class="flex gap-2 mt-3 mb-2">
          <input
            v-model="promoInput"
            type="text"
            placeholder="Mã giảm giá"
            class="flex-1 bg-surface border border-rule text-text text-[0.8rem] py-2 px-3 placeholder:text-smoke"
            @keyup.enter="applyPromo"
          />
          <button
            class="bg-transparent border border-rule text-mid font-condensed text-[0.65rem] tracking-[2px] uppercase py-2 px-3 cursor-pointer transition-all duration-300 hover:border-accent hover:text-accent"
            @click="applyPromo"
          >Áp dụng</button>
        </div>
        <div v-if="promoError" class="text-[0.7rem] text-[var(--oxblood)] mb-2">{{ promoError }}</div>

        <div class="h-px bg-rule my-4" />

        <div class="flex justify-between font-display text-[1.1rem] font-bold text-text mb-5">
          <span>Tổng cộng</span>
          <span class="text-accent">{{ formatPrice(cart.total) }}</span>
        </div>

        <button
          class="w-full text-center bg-accent text-on-accent border-0 font-condensed text-[0.8rem] font-semibold tracking-[3px] uppercase py-3.5 cursor-pointer transition-transform duration-300 hover:-translate-y-px"
          @click="goToCheckout"
        >Tiến Hành Thanh Toán</button>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
