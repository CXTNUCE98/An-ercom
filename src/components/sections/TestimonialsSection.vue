<script setup lang="ts">
import { TESTIMONIALS } from '~/constants/landing';
</script>

<template>
  <section class="testimonials">
    <SectionHeader
      tag="Đánh giá khách hàng"
      title="Họ Nói Gì"
      accent="Về Chúng Tôi"
      link="#"
      link-text="Xem tất cả đánh giá"
    />

    <div class="tm-grid">
      <ItemsTestimonialCard
        v-for="(t, i) in TESTIMONIALS"
        :key="i"
        :testimonial="t"
      />
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  padding: 80px 56px;
  background: var(--card);
}

.tm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1100px) {
  .tm-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .testimonials { padding: 60px 24px; }
}
</style>
