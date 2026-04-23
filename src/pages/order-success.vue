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
  <main class="min-h-screen flex items-center justify-center py-20 px-[var(--gutter)]">
    <div class="text-center max-w-[520px] w-full bg-[var(--card)] border border-[var(--rule)] py-15 px-12 sm:py-10 sm:px-6">
      <div class="mb-6 text-[var(--accent)]">
        <CommonIconLine name="check" :size="80" />
      </div>

      <h1 class="font-display text-[2rem] font-bold text-[var(--text)] m-0 mb-3">Đặt Hàng Thành Công!</h1>
      <p class="text-[0.92rem] text-mid m-0 mb-9 leading-[1.6]">
        Cảm ơn bạn đã tin tưởng IRONMAN. Đơn hàng của bạn đang được xử lý.
      </p>

      <div class="text-left mb-9 border-t border-[var(--rule)]">
        <div v-for="row in [
          { label: 'Mã đơn hàng', value: orderId, accent: false },
          { label: 'Số lượng sản phẩm', value: String(itemCount), accent: false },
          { label: 'Tổng thanh toán', value: formatPrice(total), accent: true },
          { label: 'Dự kiến giao hàng', value: delivery, accent: false },
        ]" :key="row.label" class="flex justify-between py-3.5 border-b border-[var(--rule)] text-[0.88rem] text-mid">
          <span>{{ row.label }}</span>
          <span
            class="font-condensed font-semibold"
            :class="row.accent ? 'text-[var(--accent)]' : 'text-[var(--text)]'"
          >{{ row.value }}</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink
          to="/"
          class="bg-transparent border border-[var(--rule)] text-mid font-condensed text-[0.75rem] font-semibold tracking-[2px] uppercase no-underline py-3 px-6 transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >Về Trang Chủ</NuxtLink>
        <NuxtLink
          to="/#products"
          class="bg-[var(--accent)] text-[var(--on-accent)] font-condensed text-[0.75rem] font-semibold tracking-[2px] uppercase no-underline py-3 px-6 transition-transform duration-300 hover:-translate-y-px"
        >Tiếp Tục Mua Sắm</NuxtLink>
      </div>
    </div>
  </main>
</template>
