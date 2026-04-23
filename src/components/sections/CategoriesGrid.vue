<script setup lang="ts">
import { CATEGORIES } from '~/constants/landing';
</script>

<template>
  <section class="px-6 pb-15 sm:px-14 sm:pb-20">
    <SectionHeader tag="Danh mục" title="Khám Phá" accent="Theo Loại" />

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <NuxtLink
        v-for="(c, i) in CATEGORIES"
        :key="c.name"
        :to="`/categories/${c.slug}`"
        class="block no-underline text-inherit"
      >
        <ItemsCategoryCard :category="c" :index="i" />
      </NuxtLink>
    </div>
  </section>
</template>
