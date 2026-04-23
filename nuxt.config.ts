// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  srcDir: "src/",

  imports: {
    dirs: [
      "constants",
      "composables",
      "features/**/stores",
      "features/**/composables",
      "shared/utils",
    ],
  },

  app: {
    head: {
      title: "IRONMAN — Phụ Kiện Đàn Ông Đích Thực",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "IRONMAN — Phụ kiện cao cấp dành cho nam giới: đồng hồ, Zippo, kính mắt, thắt lưng, ví da, mũ. Chính hãng, bảo hành, uy tín.",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@300;400;500;600;700&family=Bebas+Neue&display=swap",
        },
      ],
    },
    baseURL: "/",
  },

  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },
  i18n: {
    defaultLocale: "vi",
    langDir: "locales",
    locales: [{ code: "vi", name: "Tiếng Việt", file: "vi.json" }],
  },

  image: {
    domains: ["images.unsplash.com", "picsum.photos"],
  },

  css: [
    "@unocss/reset/tailwind.css",
    "boxicons/css/boxicons.min.css",
    "~/assets/css/theme.css",
  ],

  compatibilityDate: "2025-04-15",
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3001",
    },
  },
});
