<script setup lang="ts">
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;

useHead({
  htmlAttrs: { lang: 'vi' },
  titleTemplate: (t) => (t ? `${t}` : 'IRONMAN — Phụ Kiện Đàn Ông Đích Thực'),
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'IRONMAN',
        url: siteUrl,
        description:
          'Phụ kiện cao cấp dành cho nam giới: đồng hồ, Zippo, kính mắt, thắt lưng, ví da, mũ.',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'IRONMAN',
        url: siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],
});
</script>

<template>
  <NuxtLoadingIndicator color="var(--accent)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Notification />
</template>
