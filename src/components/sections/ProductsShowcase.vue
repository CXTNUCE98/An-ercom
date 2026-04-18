<script setup lang="ts">
import { PRODUCTS } from '~/constants/landing';
</script>

<template>
  <section class="products-section">
    <SectionHeader
      tag="Bộ sưu tập nổi bật"
      title="Sản Phẩm"
      accent="Chọn Lọc"
      link="#"
    />

    <div class="products-grid">
      <ItemsProductCard
        v-for="p in PRODUCTS"
        :key="p.id"
        :product="p"
      />
    </div>
  </section>
</template>

<style scoped>
.products-section { padding: 80px 56px; }

.products-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-auto-rows: auto;
  gap: 20px;
}

@media (max-width: 1100px) {
  .products-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .products-section { padding: 60px 24px; }
  .products-grid { grid-template-columns: 1fr; }
}
</style>
