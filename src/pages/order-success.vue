<script setup lang="ts">
import { formatPrice } from '~/shared/utils/format';

useHead({ title: 'Đặt Hàng Thành Công — IRONMAN' });

const route = useRoute();
const orderId = route.query.id as string || 'IM-XXXXX';
const total = Number(route.query.total) || 0;
const itemCount = Number(route.query.items) || 0;
const delivery = (route.query.delivery as string) || '2-3 ngày làm việc';
</script>

<template>
  <main class="success-page">
    <div class="success-card">
      <div class="success-icon">
        <CommonIconLine name="check" :size="80" />
      </div>

      <h1>Đặt Hàng Thành Công!</h1>
      <p class="success-sub">Cảm ơn bạn đã tin tưởng IRONMAN. Đơn hàng của bạn đang được xử lý.</p>

      <div class="order-info">
        <div class="info-row">
          <span>Mã đơn hàng</span>
          <span class="value">{{ orderId }}</span>
        </div>
        <div class="info-row">
          <span>Số lượng sản phẩm</span>
          <span class="value">{{ itemCount }}</span>
        </div>
        <div class="info-row">
          <span>Tổng thanh toán</span>
          <span class="value accent">{{ formatPrice(total) }}</span>
        </div>
        <div class="info-row">
          <span>Dự kiến giao hàng</span>
          <span class="value">{{ delivery }}</span>
        </div>
      </div>

      <div class="success-actions">
        <NuxtLink to="/" class="btn-home">Về Trang Chủ</NuxtLink>
        <NuxtLink to="/products" class="btn-shop">Tiếp Tục Mua Sắm</NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.success-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px var(--gutter);
}

.success-card {
  text-align: center;
  max-width: 520px;
  width: 100%;
  background: var(--card);
  border: 1px solid var(--rule);
  padding: 60px 48px;
}

.success-icon {
  margin-bottom: 24px;
  color: var(--accent);
}

h1 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 12px;
}

.success-sub {
  font-size: 0.92rem;
  color: var(--mid);
  margin: 0 0 36px;
  line-height: 1.6;
}

.order-info {
  text-align: left;
  margin-bottom: 36px;
  border-top: 1px solid var(--rule);
}
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);
  font-size: 0.88rem;
  color: var(--mid);
}
.info-row .value {
  font-family: var(--font-condensed);
  font-weight: 600;
  color: var(--text);
}
.info-row .accent { color: var(--accent); }

.success-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.btn-home {
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--mid);
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 12px 24px;
  transition: all 0.25s;
}
.btn-home:hover { border-color: var(--accent); color: var(--accent); }

.btn-shop {
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 12px 24px;
  transition: all 0.25s;
}
.btn-shop:hover { transform: translateY(-1px); }

@media (max-width: 600px) {
  .success-card { padding: 40px 24px; }
  .success-actions { flex-direction: column; }
}
</style>
