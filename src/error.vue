<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const is404 = computed(() => props.error?.statusCode === 404);
const title = computed(() => (is404.value ? 'Không tìm thấy trang' : 'Đã có lỗi xảy ra'));
const message = computed(() =>
  is404.value
    ? 'Trang hoặc sản phẩm bạn tìm không tồn tại hoặc đã bị gỡ.'
    : props.error?.message || 'Vui lòng thử lại sau ít phút.',
);

useHead({ title: title.value });

function goHome() {
  clearError({ redirect: '/' });
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 bg-bg text-text">
    <div class="text-center max-w-[520px]">
      <p class="font-display font-extrabold text-accent text-[clamp(4rem,15vw,8rem)] leading-none m-0">
        {{ error?.statusCode || 500 }}
      </p>
      <h1 class="font-display font-bold text-text text-[clamp(1.5rem,4vw,2.2rem)] m-0 mb-4">
        {{ title }}
      </h1>
      <p class="text-mid text-[0.95rem] leading-[1.7] mb-8">{{ message }}</p>
      <button
        class="inline-flex items-center gap-2 bg-accent text-on-accent border-0 font-condensed text-[0.8rem] font-semibold tracking-[3px] uppercase py-3.5 px-8 cursor-pointer transition-all duration-300 hover:-translate-y-px"
        @click="goHome"
      >
        <i class="bx bx-home" /> Về Trang Chủ
      </button>
    </div>
  </div>
</template>
