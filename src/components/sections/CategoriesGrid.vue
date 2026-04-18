<script setup lang="ts">
import { CATEGORIES } from '~/constants/landing';
</script>

<template>
  <section class="categories">
    <SectionHeader tag="Danh mục" title="Khám Phá" accent="Theo Loại" />

    <div class="cat-grid">
      <ItemsCategoryCard
        v-for="c in CATEGORIES"
        :key="c.name"
        :category="c"
      />
    </div>
  </section>
</template>

<style scoped>
.categories { padding: 0 56px 80px; }

.cat-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

@media (max-width: 1100px) {
  .cat-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
  .categories { padding: 0 24px 60px; }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
