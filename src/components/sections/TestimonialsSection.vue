<script setup lang="ts">
import { TESTIMONIALS } from '~/constants/landing';
</script>

<template>
  <section class="bg-[var(--card)] py-20 px-6 sm:px-14">
    <CommonSectionHeader
      tag="Đánh giá khách hàng"
      title="Họ Nói Gì"
      accent="Về Chúng Tôi"
      link="#"
      link-text="Xem tất cả đánh giá"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ItemsTestimonialCard
        v-for="(t, i) in TESTIMONIALS"
        :key="i"
        :testimonial="t"
      />
    </div>
  </section>
</template>
