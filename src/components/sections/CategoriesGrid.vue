<script setup lang="ts">
import { CATEGORIES } from '~/constants/landing';
</script>

<template>
  <section class="categories">
    <SectionHeader tag="Danh mục" title="Khám Phá" accent="Theo Loại" />

    <div class="cat-grid">
      <NuxtLink
        v-for="(c, i) in CATEGORIES"
        :key="c.name"
        :to="`/categories/${c.slug}`"
        class="cat-link"
      >
        <ItemsCategoryCard :category="c" :index="i" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.categories { padding: 0 56px 80px; }

.cat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.cat-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

@media (max-width: 1100px) {
  .cat-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
  .categories { padding: 0 24px 60px; }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
