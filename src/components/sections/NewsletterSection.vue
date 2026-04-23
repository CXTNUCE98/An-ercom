<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const submitted = ref(false);

const onSubmit = () => {
  if (!email.value) return;
  submitted.value = true;
  email.value = '';
};
</script>

<template>
  <section class="bg-[var(--card)] text-center py-15 px-6 sm:py-20 sm:px-14">
    <SectionHeader
      align="center"
      tag="Ưu đãi độc quyền"
      title="Nhận"
      accent="Ưu Đãi Sớm Nhất"
    />

    <p class="max-w-[520px] mx-auto mt-5 mb-8 text-[0.95rem] leading-[1.7] text-mid">
      Đăng ký để cập nhật bộ sưu tập mới, ưu đãi riêng cho thành viên và những
      bài viết chọn lọc về phong cách đàn ông hiện đại.
    </p>

    <form
      class="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto"
      @submit.prevent="onSubmit"
    >
      <input
        v-model="email"
        type="email"
        required
        placeholder="Email của bạn"
        class="flex-1 py-3.5 px-4 bg-transparent border border-[var(--rule)] text-[var(--text)] font-body text-[0.95rem] outline-none transition-colors duration-200 placeholder:text-smoke focus:border-[var(--accent)]"
      />
      <AppButton type="submit" variant="filled">Đăng Ký</AppButton>
    </form>

    <p
      v-if="submitted"
      class="mt-5 font-condensed text-[0.85rem] tracking-[2px] uppercase text-[var(--accent)]"
    >
      Cảm ơn bạn đã đăng ký — chúng tôi sẽ liên hệ sớm.
    </p>
  </section>
</template>
