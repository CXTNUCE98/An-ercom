// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);
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
      // Fonts giờ do @nuxt/fonts tự self-host + preload (không còn render-blocking
      // từ Google Fonts). Xem block `fonts` bên dưới.
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
    "nuxt-api-party",
    "@nuxtjs/sitemap",
    "@nuxt/fonts",
  ],

  // Self-host + tự preload các font thực sự dùng (4 họ). @nuxt/fonts tự quét
  // font-family trong CSS/UnoCSS và tải, nên chỉ cần liệt kê để đảm bảo weights.
  fonts: {
    families: [
      { name: "Cormorant Garamond", provider: "google", weights: [400, 500, 600, 700], styles: ["normal", "italic"] },
      { name: "Playfair Display", provider: "google", weights: [400, 700, 900] },
      { name: "Barlow", provider: "google", weights: [300, 400, 500, 600] },
      { name: "Barlow Condensed", provider: "google", weights: [300, 400, 500, 600, 700] },
    ],
  },

  // URL gốc cho sitemap/robots (module @nuxtjs/sitemap đọc từ đây).
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://accessories-ercom.vercel.app",
    name: "IRONMAN",
  },

  sitemap: {
    // Nguồn URL động (products + categories) lấy từ BE lúc runtime.
    sources: ["/api/_sitemap-urls"],
    // Không đưa các trang riêng tư/tiện ích vào sitemap.
    exclude: [
      "/cart",
      "/checkout",
      "/account",
      "/order-success",
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
      "/search",
    ],
  },
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },
  i18n: {
    defaultLocale: "vi",
    langDir: "locales",
    locales: [{ code: "vi", name: "Tiếng Việt", file: "vi.json" }],
    // Cần cho hreflang/canonical chuẩn khi build SEO.
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://accessories-ercom.vercel.app",
  },

  nitro: {
    // Nén sẵn asset tĩnh (gzip + brotli) → giảm transfer size.
    compressPublicAssets: { gzip: true, brotli: true },
    routeRules: {
      // Trang catalog công khai: cache CDN + revalidate nền (SWR).
      "/": { swr: 3600 },
      "/products/**": { swr: 3600 },
      "/categories/**": { swr: 3600 },
      "/combos/**": { swr: 3600 },
      // Trang phụ thuộc phiên đăng nhập / giỏ: KHÔNG cache.
      "/cart": { swr: false },
      "/checkout": { swr: false },
      "/account": { swr: false },
      "/order-success": { swr: false },
      "/login": { swr: false },
      "/register": { swr: false },
      "/search": { swr: false },
    },
  },

  image: {
    domains: ["images.unsplash.com", "picsum.photos", "i.pinimg.com"],
  },

  css: [
    "@unocss/reset/tailwind.css",
    "boxicons/css/boxicons.min.css",
    "~/assets/css/theme.css",
  ],

  compatibilityDate: "2025-04-15",
  apiParty: {
    endpoints: {
      anErcom: {
        url:
          process.env.NUXT_PUBLIC_API_BASE || "http://localhost:9001/",
        schema: resolve("./schemas/anErcom.json"),
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || "http://localhost:9001/",
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || "https://accessories-ercom.vercel.app",
    },
  },
});
