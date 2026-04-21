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
</script>

<template>
  <main class="checkout-page">
    <h1 class="page-title">Thanh Toán</h1>

    <div v-if="cart.items.length === 0 && !submitting" class="empty">
      <p>Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.</p>
      <NuxtLink to="/#products" class="btn-back">Quay Lại Mua Sắm</NuxtLink>
    </div>

    <div v-else class="checkout-layout">
      <form class="checkout-form" @submit.prevent="submit">
        <div v-if="errors.length" class="error-box">
          <p v-for="e in errors" :key="e">{{ e }}</p>
        </div>

        <fieldset>
          <legend>Thông tin giao hàng</legend>
          <div class="field">
            <label>Họ và tên *</label>
            <input v-model="form.fullName" type="text" placeholder="Nguyễn Văn A" />
          </div>
          <div class="field-row">
            <div class="field">
              <label>Số điện thoại *</label>
              <input v-model="form.phone" type="tel" placeholder="0987 654 321" />
            </div>
            <div class="field">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="email@example.com" />
            </div>
          </div>
          <div class="field">
            <label>Địa chỉ *</label>
            <input v-model="form.address" type="text" placeholder="Số nhà, đường, phường/xã" />
          </div>
          <div class="field">
            <label>Tỉnh/Thành phố *</label>
            <input v-model="form.city" type="text" placeholder="Hà Nội / TP.HCM / ..." />
          </div>
          <div class="field">
            <label>Ghi chú</label>
            <textarea v-model="form.note" rows="3" placeholder="Ghi chú cho đơn hàng (tuỳ chọn)" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Phương thức thanh toán</legend>
          <div class="payment-options">
            <label
              v-for="pm in paymentMethods"
              :key="pm.value"
              class="payment-option"
              :class="{ active: form.paymentMethod === pm.value }"
            >
              <input v-model="form.paymentMethod" type="radio" :value="pm.value" name="payment" />
              <i class="bx" :class="pm.icon" />
              {{ pm.label }}
            </label>
          </div>
        </fieldset>

        <button type="submit" class="btn-place-order" :disabled="submitting">
          <i v-if="submitting" class="bx bx-loader-alt bx-spin" />
          {{ submitting ? 'Đang xử lý...' : 'Đặt Hàng' }}
        </button>
      </form>

      <div class="order-summary">
        <h2>Đơn hàng của bạn</h2>
        <div v-for="item in cart.items" :key="item.productId" class="summary-item">
          <div class="si-info">
            <span class="si-name">{{ item.name }}</span>
            <span class="si-qty">× {{ item.quantity }}</span>
          </div>
          <span class="si-price">{{ formatPrice((item.salePrice ?? item.price) * item.quantity) }}</span>
        </div>
        <div class="summary-divider" />
        <div class="summary-line">
          <span>Tạm tính</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>
        <div v-if="cart.appliedPromo" class="summary-line promo">
          <span>{{ cart.appliedPromo.label }}</span>
          <span>-{{ formatPrice(cart.discount) }}</span>
        </div>
        <div class="summary-line">
          <span>Vận chuyển</span>
          <span class="free">Miễn phí</span>
        </div>
        <div class="summary-divider" />
        <div class="summary-line total">
          <span>Tổng cộng</span>
          <span>{{ formatPrice(cart.total) }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.checkout-page {
  padding: 100px var(--gutter) var(--sp-lg);
  min-height: 100vh;
}
.page-title {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 40px;
}

.empty { text-align: center; padding: 60px; color: var(--smoke); }
.btn-back {
  display: inline-block;
  margin-top: 16px;
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 12px 28px;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 48px;
}

.checkout-form fieldset {
  border: none;
  padding: 0;
  margin: 0 0 32px;
}
.checkout-form legend {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 20px;
}

.field { margin-bottom: 16px; }
.field label {
  display: block;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--smoke);
  margin-bottom: 6px;
}
.field input, .field textarea {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--rule);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.88rem;
  padding: 10px 14px;
  transition: border-color 0.25s;
  box-sizing: border-box;
}
.field input:focus, .field textarea:focus {
  outline: none;
  border-color: var(--accent);
}
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.payment-options { display: flex; flex-direction: column; gap: 8px; }
.payment-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--rule);
  cursor: pointer;
  font-size: 0.88rem;
  color: var(--mid);
  transition: all 0.25s;
}
.payment-option:hover { border-color: var(--accent); }
.payment-option.active {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  color: var(--text);
}
.payment-option input { display: none; }
.payment-option i { color: var(--accent); font-size: 1.2rem; }

.error-box {
  background: color-mix(in srgb, var(--oxblood) 12%, transparent);
  border: 1px solid var(--oxblood);
  padding: 12px 16px;
  margin-bottom: 20px;
}
.error-box p {
  font-size: 0.82rem;
  color: var(--oxblood);
  margin: 4px 0;
}

.btn-place-order {
  width: 100%;
  background: var(--accent);
  color: var(--on-accent);
  border: none;
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}
.btn-place-order:hover:not(:disabled) { transform: translateY(-1px); }
.btn-place-order:disabled { opacity: 0.6; cursor: not-allowed; }

/* Order summary */
.order-summary {
  background: var(--card);
  border: 1px solid var(--rule);
  padding: 28px;
  align-self: start;
  position: sticky;
  top: 100px;
}
.order-summary h2 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 20px;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;
  gap: 12px;
}
.si-info { display: flex; flex-direction: column; }
.si-name { font-size: 0.85rem; color: var(--text); }
.si-qty { font-size: 0.72rem; color: var(--smoke); }
.si-price {
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}
.summary-divider { height: 1px; background: var(--rule); margin: 12px 0; }
.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--mid);
  padding: 4px 0;
}
.summary-line.promo { color: var(--olive); }
.free { color: var(--olive); }
.summary-line.total {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
}

@media (max-width: 900px) {
  .checkout-layout { grid-template-columns: 1fr; }
  .order-summary { order: -1; }
  .field-row { grid-template-columns: 1fr; }
  .checkout-page { padding: 90px 24px 60px; }
}
</style>
