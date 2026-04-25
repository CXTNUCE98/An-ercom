<script setup lang="ts">
import { FLOATING_CONTACTS } from "~/constants/landing";

const isExternalContact = (href: string) => href.startsWith("http");
</script>

<template>
  <nav aria-label="Liên hệ nhanh"
    class="fixed bottom-5 right-4 z-[90] flex flex-col items-center gap-3 md:bottom-8 md:right-6">
    <a v-for="contact in FLOATING_CONTACTS" :key="contact.key" :href="contact.href"
      :target="isExternalContact(contact.href) ? '_blank' : undefined"
      :rel="isExternalContact(contact.href) ? 'noopener noreferrer' : undefined" :aria-label="contact.label" :class="[
        'group flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] ring-1 ring-white/35 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/80 active:translate-y-0 active:scale-95',
        contact.className,
      ]" style="background-color: #0068ff;">
      <i v-if="contact.icon" :class="contact.icon" class="text-[25px] leading-none" aria-hidden="true" />
      <span v-else class="font-700 text-[11px] leading-none tracking-[-0.03em]" aria-hidden="true">
        {{ contact.text }}
      </span>
    </a>
  </nav>
</template>
