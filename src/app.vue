<script setup lang="ts">
useHead({
  titleTemplate: (t) => (t ? `${t}` : 'IRONMAN — Phụ Kiện Đàn Ông Đích Thực'),
});
</script>

<template>
  <NuxtLoadingIndicator color="#B87333" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease, filter 0.35s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(8px);
}
</style>
