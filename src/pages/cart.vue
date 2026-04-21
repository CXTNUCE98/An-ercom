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
  <main class="cart-page">
    <h1 class="page-title">Giỏ Hàng</h1>

    <div v-if="cart.items.length === 0" class="empty">
      <CommonIconLine name="wallet" :size="80" />
      <p>Giỏ hàng trống</p>
      <NuxtLink to="/#products" class="btn-shop">Mua Sắm Ngay</NuxtLink>
    </div>

    <div v-else class="cart-layout">
      <div class="cart-items">
        <div v-for="item in cart.items" :key="item.productId" class="cart-line">
          <NuxtLink :to="`/products/${item.slug}`" class="line-image">
            <CommonProductMedia
              :src="item.image || undefined"
              :alt="item.name"
              aspect="1/1"
              :placeholder-icon="(item.icon as any)"
              :icon-size="40"
            />
          </NuxtLink>

          <div class="line-info">
            <NuxtLink :to="`/products/${item.slug}`" class="line-name">{{ item.name }}</NuxtLink>
            <div class="line-brand">{{ item.brand }}</div>
            <div class="line-price">{{ formatPrice(item.salePrice ?? item.price) }}</div>
          </div>

          <div class="line-qty">
            <button @click="cart.updateQuantity(item.productId, item.quantity - 1)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="cart.updateQuantity(item.productId, item.quantity + 1)">+</button>
          </div>

          <div class="line-total">
            {{ formatPrice((item.salePrice ?? item.price) * item.quantity) }}
          </div>

          <button class="line-remove" @click="cart.removeItem(item.productId)" aria-label="Xóa">
            <i class="bx bx-x" />
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Tóm Tắt Đơn Hàng</h2>

        <div class="summary-row">
          <span>Tạm tính</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>

        <div v-if="cart.appliedPromo" class="summary-row promo-row">
          <span>
            {{ cart.appliedPromo.label }}
            <button class="promo-remove" @click="cart.clearPromo()">×</button>
          </span>
          <span class="discount">-{{ formatPrice(cart.discount) }}</span>
        </div>

        <div class="promo-input">
          <input
            v-model="promoInput"
            type="text"
            placeholder="Mã giảm giá"
            @keyup.enter="applyPromo"
          />
          <button @click="applyPromo">Áp dụng</button>
        </div>
        <div v-if="promoError" class="promo-error">{{ promoError }}</div>

        <div class="summary-divider" />

        <div class="summary-row total-row">
          <span>Tổng cộng</span>
          <span>{{ formatPrice(cart.total) }}</span>
        </div>

        <NuxtLink to="/checkout" class="btn-checkout">
          Tiến Hành Thanh Toán
        </NuxtLink>

        <NuxtLink to="/#products" class="btn-continue">
          ← Tiếp Tục Mua Sắm
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.cart-page {
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

.empty {
  text-align: center;
  padding: 80px 20px;
  color: var(--smoke);
}
.empty p { margin: 20px 0; font-size: 1rem; }
.btn-shop {
  display: inline-block;
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 32px;
  transition: all 0.3s;
}
.btn-shop:hover { transform: translateY(-2px); }

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 48px;
}

.cart-items { display: flex; flex-direction: column; gap: 0; }
.cart-line {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--rule);
}

.line-image {
  width: 80px; height: 80px;
  background: var(--card);
  border: 1px solid var(--rule);
  overflow: hidden;
}
.line-info { display: flex; flex-direction: column; gap: 4px; }
.line-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  transition: color 0.25s;
}
.line-name:hover { color: var(--accent); }
.line-brand { font-size: 0.75rem; color: var(--smoke); }
.line-price {
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--mid);
}

.line-qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--rule);
}
.line-qty button {
  width: 32px; height: 32px;
  background: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-size: 1rem;
}
.line-qty button:hover { color: var(--accent); }
.line-qty span {
  width: 32px;
  text-align: center;
  font-family: var(--font-condensed);
  font-weight: 600;
  font-size: 0.85rem;
  border-left: 1px solid var(--rule);
  border-right: 1px solid var(--rule);
  line-height: 32px;
}

.line-total {
  font-family: var(--font-condensed);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  min-width: 100px;
  text-align: right;
}

.line-remove {
  background: transparent;
  border: none;
  color: var(--smoke);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  transition: color 0.25s;
}
.line-remove:hover { color: var(--oxblood); }

/* Summary */
.cart-summary {
  background: var(--card);
  border: 1px solid var(--rule);
  padding: 32px;
  align-self: start;
  position: sticky;
  top: 100px;
}
.cart-summary h2 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 24px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--mid);
  margin-bottom: 12px;
}
.promo-row { color: var(--olive); }
.discount { color: var(--olive); font-weight: 600; }
.promo-remove {
  background: transparent;
  border: none;
  color: var(--smoke);
  cursor: pointer;
  font-size: 1rem;
  margin-left: 4px;
}

.promo-input {
  display: flex;
  gap: 8px;
  margin: 16px 0 8px;
}
.promo-input input {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--rule);
  color: var(--text);
  font-size: 0.82rem;
  padding: 8px 12px;
}
.promo-input input::placeholder { color: var(--smoke); }
.promo-input button {
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--mid);
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.25s;
}
.promo-input button:hover { border-color: var(--accent); color: var(--accent); }
.promo-error {
  font-size: 0.75rem;
  color: var(--oxblood);
  margin-bottom: 8px;
}

.summary-divider {
  height: 1px;
  background: var(--rule);
  margin: 16px 0;
}
.total-row {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 24px;
}

.btn-checkout {
  display: block;
  text-align: center;
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px;
  transition: all 0.3s;
  margin-bottom: 12px;
}
.btn-checkout:hover { transform: translateY(-1px); }

.btn-continue {
  display: block;
  text-align: center;
  color: var(--smoke);
  font-family: var(--font-condensed);
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 8px;
  transition: color 0.25s;
}
.btn-continue:hover { color: var(--accent); }

@media (max-width: 900px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-line { grid-template-columns: 60px 1fr auto auto; gap: 12px; }
  .line-total { display: none; }
  .cart-page { padding: 90px 24px 60px; }
}
</style>
