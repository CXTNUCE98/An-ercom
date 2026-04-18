<script setup lang="ts">
import { MARQUEE_ITEMS } from '~/constants/landing';
</script>

<template>
  <CommonMarquee :items="MARQUEE_ITEMS" :speed="22" variant="subtle" />
</template>
