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
