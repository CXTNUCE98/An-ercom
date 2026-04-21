<script setup lang="ts">
useHead({
  title: 'IRONMAN — Phụ Kiện Đàn Ông Đích Thực',
  meta: [
    {
      name: 'description',
      content:
        'Đồng hồ, Zippo, kính mắt, thắt lưng, ví, mũ — bộ sưu tập chọn lọc cho đàn ông hiện đại.',
    },
  ],
});
</script>

<template>
  <div id="top">
    <SectionsHeroSection />
  </div>
  <SectionsEditorialStrip />
  <div id="combos">
    <SectionsCombosShowcase />
  </div>
  <!-- Toàn bộ sản phẩm chia theo loại — section đã có id="products" -->
  <SectionsProductsShowcase />
  <div id="story">
    <SectionsCraftStorySection />
  </div>
  <SectionsLifestyleBanner />
  <SectionsBrandsMarquee />
  <SectionsTestimonialsSection />
  <div id="contact">
    <SectionsNewsletterSection />
  </div>
</template>
