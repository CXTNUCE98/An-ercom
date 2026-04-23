<script setup lang="ts">
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { checkoutService } from '~/features/checkout/services/checkoutService';
import type { CheckoutForm } from '~/features/checkout/types';
import { formatPrice } from '~/shared/utils/format';

useHead({ title: 'Thanh Toán — IRONMAN' });

const cart = useCartStore();
const router = useRouter();

const form = reactive<CheckoutForm>({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  note: '',
  paymentMethod: 'cod',
});

const errors = ref<string[]>([]);
const submitting = ref(false);

async function submit() {
  errors.value = checkoutService.validate(form);
  if (errors.value.length) return;
  if (cart.items.length === 0) {
    errors.value = ['Giỏ hàng trống'];
    return;
  }

  submitting.value = true;
  try {
    const confirmation = await checkoutService.placeOrder(form, cart.items, cart.total);
    cart.clearCart();
    await router.push({
      path: '/order-success',
      query: {
        id: confirmation.orderId,
        total: String(confirmation.total),
        items: String(confirmation.itemCount),
        delivery: confirmation.estimatedDelivery,
      },
    });
  } finally {
    submitting.value = false;
  }
}

const paymentMethods = [
  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: 'bx-money' },
  { value: 'bank-transfer', label: 'Chuyển khoản ngân hàng', icon: 'bx-building' },
  { value: 'card', label: 'Thẻ tín dụng / ghi nợ', icon: 'bx-credit-card' },
] as const;

// Shared class strings
const fieldLabel = 'block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5';
const fieldInput = 'w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent';
const summaryLineBase = 'flex justify-between text-[0.85rem] text-mid py-1';
</script>

<template>
  <main class="min-h-screen pt-[100px] px-gutter pb-lg max-[900px]:pt-[90px] max-[900px]:px-6 max-[900px]:pb-[60px]">
    <h1 class="font-display text-[2.4rem] font-bold text-text m-0 mb-10">Thanh Toán</h1>

    <div v-if="cart.items.length === 0 && !submitting" class="text-center py-[60px] text-smoke">
      <p>Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.</p>
      <NuxtLink
        to="/#products"
        class="inline-block mt-4 bg-accent text-on-accent font-condensed text-[0.75rem] tracking-[3px] uppercase no-underline py-3 px-7"
      >Quay Lại Mua Sắm</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-[1fr_380px] gap-12 max-[900px]:grid-cols-1">
      <form class="max-[900px]:order-2" @submit.prevent="submit">
        <div
          v-if="errors.length"
          class="border border-oxblood py-3 px-4 mb-5 bg-[color-mix(in_srgb,var(--oxblood)_12%,transparent)]"
        >
          <p v-for="e in errors" :key="e" class="text-[0.82rem] text-oxblood my-1">{{ e }}</p>
        </div>

        <fieldset class="border-0 p-0 m-0 mb-8">
          <legend class="font-display text-[1.2rem] font-bold text-text mb-5">Thông tin giao hàng</legend>
          <div class="mb-4">
            <label :class="fieldLabel">Họ và tên *</label>
            <input v-model="form.fullName" type="text" placeholder="Nguyễn Văn A" :class="fieldInput" />
          </div>
          <div class="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
            <div class="mb-4">
              <label :class="fieldLabel">Số điện thoại *</label>
              <input v-model="form.phone" type="tel" placeholder="0987 654 321" :class="fieldInput" />
            </div>
            <div class="mb-4">
              <label :class="fieldLabel">Email</label>
              <input v-model="form.email" type="email" placeholder="email@example.com" :class="fieldInput" />
            </div>
          </div>
          <div class="mb-4">
            <label :class="fieldLabel">Địa chỉ *</label>
            <input v-model="form.address" type="text" placeholder="Số nhà, đường, phường/xã" :class="fieldInput" />
          </div>
          <div class="mb-4">
            <label :class="fieldLabel">Tỉnh/Thành phố *</label>
            <input v-model="form.city" type="text" placeholder="Hà Nội / TP.HCM / ..." :class="fieldInput" />
          </div>
          <div class="mb-4">
            <label :class="fieldLabel">Ghi chú</label>
            <textarea v-model="form.note" rows="3" placeholder="Ghi chú cho đơn hàng (tuỳ chọn)" :class="fieldInput" />
          </div>
        </fieldset>

        <fieldset class="border-0 p-0 m-0 mb-8">
          <legend class="font-display text-[1.2rem] font-bold text-text mb-5">Phương thức thanh toán</legend>
          <div class="flex flex-col gap-2">
            <label
              v-for="pm in paymentMethods"
              :key="pm.value"
              :class="[
                'flex items-center gap-3 py-3.5 px-4 border cursor-pointer text-[0.88rem] transition-all duration-250',
                form.paymentMethod === pm.value
                  ? 'border-accent text-text bg-mix-accent-8'
                  : 'border-rule text-mid hover:border-accent',
                '[&_input]:hidden [&_i]:text-accent [&_i]:text-[1.2rem]',
              ]"
            >
              <input v-model="form.paymentMethod" type="radio" :value="pm.value" name="payment" />
              <i class="bx" :class="pm.icon" />
              {{ pm.label }}
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full bg-accent text-on-accent border-0 font-condensed text-[0.85rem] font-semibold tracking-[3px] uppercase py-4 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:enabled:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <i v-if="submitting" class="bx bx-loader-alt bx-spin" />
          {{ submitting ? 'Đang xử lý...' : 'Đặt Hàng' }}
        </button>
      </form>

      <div class="bg-card border border-rule p-7 self-start sticky top-[100px] max-[900px]:order-1 max-[900px]:static">
        <h2 class="font-display text-[1.1rem] font-bold text-text m-0 mb-5">Đơn hàng của bạn</h2>
        <div v-for="item in cart.items" :key="item.productId" class="flex justify-between items-start py-2 gap-3">
          <div class="flex flex-col">
            <span class="text-[0.85rem] text-text">{{ item.name }}</span>
            <span class="text-[0.72rem] text-smoke">× {{ item.quantity }}</span>
          </div>
          <span class="font-condensed text-[0.85rem] font-semibold text-text whitespace-nowrap">{{ formatPrice((item.salePrice ?? item.price) * item.quantity) }}</span>
        </div>
        <div class="h-px bg-rule my-3" />
        <div :class="summaryLineBase">
          <span>Tạm tính</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>
        <div v-if="cart.appliedPromo" :class="[summaryLineBase, '!text-olive']">
          <span>{{ cart.appliedPromo.label }}</span>
          <span>-{{ formatPrice(cart.discount) }}</span>
        </div>
        <div :class="summaryLineBase">
          <span>Vận chuyển</span>
          <span class="text-olive">Miễn phí</span>
        </div>
        <div class="h-px bg-rule my-3" />
        <div class="flex justify-between py-1 font-display text-[1.1rem] font-bold text-text">
          <span>Tổng cộng</span>
          <span>{{ formatPrice(cart.total) }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
