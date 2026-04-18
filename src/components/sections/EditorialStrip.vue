<script setup lang="ts">
import { EDITORIAL_FEATURES } from '~/constants/landing';
</script>

<template>
  <div class="editorial">
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

<style scoped>
.editorial {
  margin: 64px 56px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--rule);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}

@media (max-width: 900px) {
  .editorial { margin: 48px 24px; grid-template-columns: 1fr 1fr; }
}
@media (max-width: 540px) {
  .editorial { grid-template-columns: 1fr; }
}
</style>
