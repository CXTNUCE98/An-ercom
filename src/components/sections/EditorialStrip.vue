<script setup lang="ts">
import { EDITORIAL_FEATURES } from '~/constants/landing';
</script>

<template>
  <div class="mx-6 my-12 sm:mx-14 sm:my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--rule)] border-y border-[var(--rule)]">
    <ItemsFeatureItem
      v-for="f in EDITORIAL_FEATURES"
      :key="f.title"
      :icon="f.icon"
      :title="f.title"
      :desc="f.desc"
      variant="editorial"
    />
  </div>
</template>
