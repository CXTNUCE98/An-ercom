<script setup lang="ts">
import { useCatalogStore } from '~/features/catalog/stores/useCatalogStore';
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { formatPrice } from '~/shared/utils/format';

const route = useRoute();
const catalog = useCatalogStore();
const cart = useCartStore();

const slug = route.params.slug as string;
const product = catalog.getProduct(slug);
const related = catalog.getRelatedProducts(slug, 4);

if (!product) {
  throw createError({ statusCode: 404, message: 'Sản phẩm không tồn tại' });
}

useHead({ title: `${product!.name} — IRONMAN` });

const gallery = computed(() => {
  const imgs = product!.images.filter(Boolean);
  if (imgs.length >= 3) return imgs;
  const base = imgs[0];
  if (!base) return [];
  const variants = [
    base,
    `${base}${base.includes('?') ? '&' : '?'}sat=-30`,
    `${base}${base.includes('?') ? '&' : '?'}blur=0&sat=20`,
    `${base}${base.includes('?') ? '&' : '?'}flip=h`,
  ];
  return Array.from(new Set([...imgs, ...variants])).slice(0, 4);
});

const angleLabels = ['Mặt chính', 'Cạnh bên', 'Mặt sau', 'Chi tiết'];

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
function openLightbox(i: number) {
  lightboxIndex.value = i;
  lightboxOpen.value = true;
}
function closeLightbox() { lightboxOpen.value = false; }
function nextImg() {
  lightboxIndex.value = (lightboxIndex.value + 1) % gallery.value.length;
}
function prevImg() {
  lightboxIndex.value = (lightboxIndex.value - 1 + gallery.value.length) % gallery.value.length;
}
watch(lightboxOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '';
});

const activeIdx = ref(0);
const qty = ref(1);
const addedToast = ref(false);
function addToCart() {
  cart.addItem(product!, qty.value);
  addedToast.value = true;
  setTimeout(() => (addedToast.value = false), 2000);
}

const ratingBreakdown = computed(() => {
  const r = product!.ratingBreakdown ?? {};
  const base = product!.rating;
  return {
    quality:    r.quality    ?? Math.min(5, base + 0.1),
    design:     r.design     ?? Math.max(0, base - 0.1),
    durability: r.durability ?? Math.min(5, base + 0.05),
    value:      r.value      ?? Math.max(0, base - 0.2),
  };
});

const highlights = computed(() => {
  if (product!.highlights?.length) return product!.highlights;
  return product!.specs.slice(0, 4).map((s) => `${s.label}: ${s.value}`);
});

const videoUrl = computed(() => product!.videoUrl ?? '');

const rbLabels: Record<string, string> = {
  quality: 'Chất liệu',
  design: 'Thiết kế',
  durability: 'Độ bền',
  value: 'Giá trị',
};

const eyebrowCls =
  'inline-block font-condensed text-[0.7rem] font-bold tracking-[4px] uppercase text-accent mb-2.5';
const vblockHead = 'mb-7 max-w-[720px]';
</script>

<template>
  <main
    v-if="product"
    class="pt-[90px] px-gutter pb-lg max-w-[1280px] mx-auto max-[720px]:px-6 max-[720px]:pb-md"
  >
    <!-- Breadcrumb -->
    <nav class="flex items-center flex-wrap gap-2 font-condensed text-[0.7rem] tracking-[2px] uppercase text-smoke mb-8 [&_a]:text-smoke [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-250 hover:[&_a]:text-accent">
      <NuxtLink to="/">Trang Chủ</NuxtLink>
      <span>/</span>
      <NuxtLink to="/#products">Sản Phẩm</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/#cat-${product.categorySlug}`">{{ product.categoryName }}</NuxtLink>
      <span>/</span>
      <span class="text-text">{{ product.name }}</span>
    </nav>

    <!-- Top: Gallery + Buy box -->
    <section class="grid grid-cols-1 min-[900px]:grid-cols-[1.15fr_1fr] gap-8 min-[900px]:gap-14 min-[900px]:items-start mb-lg">
      <!-- Gallery -->
      <div class="flex flex-col gap-3.5">
        <div
          class="group relative bg-card border border-rule p-3.5 cursor-zoom-in overflow-hidden"
          @click="openLightbox(activeIdx)"
        >
          <CommonProductMedia
            :src="gallery[activeIdx] || product.images[0]"
            :alt="product.name"
            aspect="1/1"
            :placeholder-icon="product.icon"
            :icon-size="160"
          />
          <span
            v-if="product.salePrice"
            class="absolute top-[22px] left-[22px] z-[2] bg-oxblood text-[#fbf6ea] font-condensed text-[0.78rem] font-bold tracking-[1.5px] py-1 px-3"
          >
            −{{ Math.round((1 - product.salePrice / product.price) * 100) }}%
          </span>
          <span
            v-if="product.isLuxury"
            class="absolute top-[22px] right-[22px] z-[2] bg-gradient-to-br from-accent to-[var(--accent-2)] text-ink font-condensed text-[0.72rem] font-bold tracking-[2px] uppercase py-[5px] px-3 inline-flex items-center gap-1"
          >
            <i class="bx bxs-crown" /> Luxury
          </span>
          <button
            aria-label="Phóng to"
            class="absolute bottom-[22px] left-1/2 -translate-x-1/2 translate-y-2 opacity-0 bg-[color-mix(in_srgb,var(--ink)_88%,transparent)] text-[#fbf6ea] font-condensed text-[0.7rem] tracking-[2px] uppercase py-2 px-3.5 border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] inline-flex items-center gap-2 transition-all duration-300 cursor-pointer z-[3] group-hover:opacity-100 group-hover:translate-y-0 [&_i]:text-[var(--accent-2)] [&_i]:text-base"
          >
            <i class="bx bx-search-alt-2" />
            <span>Bấm xem chi tiết góc cạnh</span>
          </button>
        </div>

        <div v-if="gallery.length > 1" class="grid grid-cols-4 gap-2.5">
          <button
            v-for="(img, i) in gallery"
            :key="i"
            :class="[
              'group relative aspect-square bg-card border overflow-hidden cursor-pointer p-0 transition-all duration-300 hover:border-accent',
              activeIdx === i
                ? 'border-accent shadow-[0_0_0_2px_color-mix(in_srgb,var(--accent)_30%,transparent)]'
                : 'border-rule',
            ]"
            @click="activeIdx = i"
          >
            <img
              :src="img"
              :alt="`${product.name} ${i + 1}`"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
            />
            <span class="absolute inset-x-0 bottom-0 text-center text-[#fbf6ea] font-condensed text-[0.6rem] tracking-[1.5px] uppercase pt-4 px-1.5 pb-1.5 bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--ink)_85%,transparent))]">
              {{ angleLabels[i] || `Góc ${i + 1}` }}
            </span>
          </button>
        </div>
      </div>

      <!-- Info / Buy -->
      <aside class="flex flex-col gap-[18px] sticky top-24 max-[900px]:static">
        <div class="flex gap-3.5">
          <span class="font-condensed text-[0.7rem] font-bold tracking-[3px] uppercase text-accent">{{ product.brand }}</span>
          <span class="font-condensed text-[0.7rem] font-medium tracking-[3px] uppercase text-smoke">{{ product.categoryName }}</span>
        </div>

        <h1 class="font-display font-bold text-text m-0 leading-[1.1] tracking-[-0.5px] text-[clamp(1.6rem,3.6vw,2.4rem)]">
          {{ product.name }}
        </h1>

        <div class="flex items-center gap-2 flex-wrap">
          <div class="flex gap-0.5 text-accent">
            <i
              v-for="n in 5"
              :key="n"
              class="bx"
              :class="n <= Math.round(product.rating) ? 'bxs-star' : 'bx-star'"
            />
          </div>
          <span class="font-display text-base font-bold text-text">{{ product.rating }}</span>
          <span class="text-[0.85rem] text-smoke">· {{ product.reviewCount }} đánh giá</span>
        </div>

        <div class="py-4 border-y border-rule flex flex-col gap-1.5">
          <div class="flex items-baseline gap-3.5 flex-wrap">
            <span
              v-if="product.salePrice"
              class="font-display font-extrabold text-accent tracking-[-0.5px] text-[clamp(1.8rem,4vw,2.4rem)]"
            >{{ formatPrice(product.salePrice) }}</span>
            <span
              :class="product.salePrice
                ? 'font-display text-[1.05rem] font-medium text-smoke line-through'
                : 'font-display text-[1.4rem] font-bold text-text'"
            >{{ formatPrice(product.price) }}</span>
          </div>
          <div v-if="product.salePrice" class="inline-flex items-center gap-1.5 text-[0.85rem] text-oxblood">
            <i class="bx bxs-offer text-[1.05rem]" />
            Tiết kiệm <strong class="font-bold">{{ formatPrice(product.price - product.salePrice) }}</strong>
          </div>
        </div>

        <p class="text-[0.95rem] leading-[1.75] text-mid m-0">{{ product.description }}</p>

        <ul class="list-none m-0 p-0 flex flex-col gap-1.5">
          <li v-for="h in highlights" :key="h" class="flex items-center gap-2 text-[0.88rem] text-text">
            <i class="bx bx-check text-accent text-[1.05rem]" /> {{ h }}
          </li>
        </ul>

        <div class="flex gap-3.5 items-center">
          <div class="flex items-stretch border border-rule-strong [&>button]:w-11 [&>button]:h-12 [&>button]:bg-transparent [&>button]:border-0 [&>button]:text-text [&>button]:text-[1.2rem] [&>button]:cursor-pointer [&>button]:transition-colors [&>button]:duration-250 hover:[&>button]:text-accent hover:[&>button]:bg-mix-accent-8">
            <button aria-label="Giảm" @click="qty = Math.max(1, qty - 1)">−</button>
            <span class="min-w-11 flex items-center justify-center font-condensed font-semibold border-x border-rule-strong">{{ qty }}</span>
            <button aria-label="Tăng" @click="qty++">+</button>
          </div>
          <button
            class="relative overflow-hidden flex-1 flex items-center justify-center gap-2.5 bg-accent text-on-accent border-0 font-condensed text-[0.82rem] font-bold tracking-[3px] uppercase py-3.5 px-5 cursor-pointer transition-all duration-300 ease hover:bg-[var(--accent-2)] hover:-translate-y-px after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(120deg,transparent_30%,color-mix(in_srgb,#fff_30%,transparent),transparent_70%)] after:-translate-x-full after:transition-transform after:duration-600 hover:after:translate-x-full"
            @click="addToCart"
          >
            <i class="bx bx-shopping-bag" />
            Thêm Vào Giỏ
          </button>
        </div>

        <Transition name="fade">
          <div v-if="addedToast" class="inline-flex items-center gap-2 bg-olive text-[#fbf6ea] font-condensed text-[0.78rem] tracking-[1.5px] uppercase py-2.5 px-3.5">
            <i class="bx bx-check" /> Đã thêm vào giỏ hàng
          </div>
        </Transition>

        <ul class="list-none m-0 pt-4 grid grid-cols-2 gap-2.5 border-t border-rule [&>li]:flex [&>li]:items-center [&>li]:gap-2 [&>li]:font-condensed [&>li]:text-[0.7rem] [&>li]:tracking-[1.5px] [&>li]:uppercase [&>li]:text-mid [&_i]:text-accent [&_i]:text-[1.05rem]">
          <li><i class="bx bx-shield-quarter" /> Chính hãng 100%</li>
          <li><i class="bx bx-refresh" /> Đổi trả 30 ngày</li>
          <li><i class="bx bx-package" /> Giao 2h nội thành</li>
          <li><i class="bx bx-credit-card" /> Trả góp 0%</li>
        </ul>
      </aside>
    </section>

    <!-- Vertical content stack -->
    <section class="flex flex-col gap-md mb-lg">
      <!-- Angles -->
      <article id="angles" class="border-t border-rule pt-sm">
        <header :class="vblockHead">
          <span :class="eyebrowCls">Chi Tiết Từng Góc</span>
          <h2 class="font-display font-bold text-text m-0 mb-3 leading-[1.1] text-[clamp(1.6rem,3.4vw,2.4rem)]">
            Nhìn Cận. Soi Kỹ. Yên Tâm.
          </h2>
          <p class="text-mid text-[0.95rem] leading-[1.7] m-0">
            Mỗi góc cạnh được chụp tại studio. Bấm vào ảnh bất kỳ để phóng to,
            xoay chuyển và quan sát đường may, chất liệu, ánh sáng phản chiếu.
          </p>
        </header>
        <div class="grid grid-cols-2 min-[720px]:grid-cols-4 gap-3">
          <button
            v-for="(img, i) in gallery"
            :key="`a-${i}`"
            class="group relative aspect-[4/5] bg-card border border-rule cursor-pointer overflow-hidden p-0 transition-all duration-300 hover:border-accent"
            @click="openLightbox(i)"
          >
            <img
              :src="img"
              :alt="`${product.name} - ${angleLabels[i] || i + 1}`"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.06]"
            />
            <div class="absolute left-0 right-0 bottom-0 flex items-center gap-2 py-3 px-3.5 text-[#fbf6ea] font-condensed tracking-[1.5px] text-[0.7rem] uppercase bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--ink)_85%,transparent))]">
              <span class="text-[var(--accent-2)] font-bold">0{{ i + 1 }}</span>
              <span class="flex-1">{{ angleLabels[i] || `Góc ${i + 1}` }}</span>
              <i class="bx bx-fullscreen text-[var(--accent-2)] text-base" />
            </div>
          </button>
        </div>
      </article>

      <!-- Video review -->
      <article id="video" class="border-t border-rule pt-sm">
        <header :class="vblockHead">
          <span :class="eyebrowCls">Video Review</span>
          <h2 class="font-display font-bold text-text m-0 mb-3 leading-[1.1] text-[clamp(1.6rem,3.4vw,2.4rem)]">
            Trên Tay &amp; Cảm Nhận
          </h2>
          <p class="text-mid text-[0.95rem] leading-[1.7] m-0">
            Xem trực tiếp bằng video chuyên gia thay vì chỉ nhìn ảnh tĩnh.
          </p>
        </header>

        <div class="relative bg-ink aspect-[16/9] border border-rule-strong overflow-hidden">
          <iframe
            v-if="videoUrl"
            :src="videoUrl"
            title="Product review video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full border-0"
          />
          <div v-else class="relative w-full h-full grid grid-cols-1 min-[720px]:grid-cols-[1.3fr_1fr]">
            <div class="relative bg-card overflow-hidden">
              <img :src="product.images[0] || ''" :alt="product.name" class="w-full h-full object-cover opacity-60" />
              <button
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full text-on-accent border-[3px] border-[#fbf6ea] flex items-center justify-center cursor-pointer text-[2.2rem] bg-[color-mix(in_srgb,var(--accent)_92%,transparent)] animate-pulse-ring"
              >
                <i class="bx bx-play" />
              </button>
            </div>
            <div class="p-7 flex flex-col justify-center gap-2.5 text-[#fbf6ea]">
              <span :class="[eyebrowCls, '!text-[var(--accent-2)]']">Coming Soon</span>
              <h3 class="font-display text-[1.3rem] m-0 text-[#fbf6ea]">Video review đang được biên tập</h3>
              <p class="text-[0.9rem] leading-[1.7] m-0 text-[color-mix(in_srgb,#fbf6ea_70%,transparent)]">
                Đội ngũ chuyên gia của IRONMAN đang quay clip on-hand cho mẫu
                này. Đăng ký nhận thông báo để xem đầu tiên.
              </p>
            </div>
          </div>
        </div>
      </article>

      <!-- Specs -->
      <article id="specs" class="border-t border-rule pt-sm">
        <header :class="vblockHead">
          <span :class="eyebrowCls">Thông Số Kỹ Thuật</span>
          <h2 class="font-display font-bold text-text m-0 leading-[1.1] text-[clamp(1.6rem,3.4vw,2.4rem)]">
            Số Liệu — Không Chém Gió.
          </h2>
        </header>
        <dl class="m-0">
          <div
            v-for="s in product.specs"
            :key="s.label"
            class="grid grid-cols-[35%_1fr] gap-4 py-3.5 border-b border-rule"
          >
            <dt class="font-condensed text-[0.78rem] font-bold tracking-[2px] uppercase text-accent m-0">{{ s.label }}</dt>
            <dd class="m-0 text-[0.95rem] text-text leading-[1.5]">{{ s.value }}</dd>
          </div>
          <div class="grid grid-cols-[35%_1fr] gap-4 py-3.5 border-b border-rule">
            <dt class="font-condensed text-[0.78rem] font-bold tracking-[2px] uppercase text-accent m-0">Tồn kho</dt>
            <dd class="m-0 text-[0.95rem] text-text leading-[1.5]">{{ product.stock }} sản phẩm</dd>
          </div>
          <div class="grid grid-cols-[35%_1fr] gap-4 py-3.5 border-b border-rule">
            <dt class="font-condensed text-[0.78rem] font-bold tracking-[2px] uppercase text-accent m-0">Bảo hành</dt>
            <dd class="m-0 text-[0.95rem] text-text leading-[1.5]">Theo chính sách hãng + IRONMAN 12 tháng</dd>
          </div>
        </dl>
      </article>

      <!-- Rating breakdown -->
      <article id="rating" class="border-t border-rule pt-sm">
        <header :class="vblockHead">
          <span :class="eyebrowCls">Đánh Giá Chi Tiết</span>
          <h2 class="font-display font-bold text-text m-0 mb-3 leading-[1.1] text-[clamp(1.6rem,3.4vw,2.4rem)]">
            {{ product.rating }}<span class="text-smoke text-[0.5em] font-medium ml-1">/5</span>
          </h2>
          <p class="text-mid text-[0.95rem] leading-[1.7] m-0">
            Tổng hợp từ {{ product.reviewCount }} khách hàng đã mua sản phẩm.
          </p>
        </header>
        <div class="flex flex-col gap-3.5">
          <div
            v-for="(val, key) in ratingBreakdown"
            :key="key"
            class="grid grid-cols-[110px_1fr_36px] items-center gap-3.5"
          >
            <span class="font-condensed text-[0.78rem] tracking-[1.5px] uppercase text-mid">{{ rbLabels[key] || key }}</span>
            <div class="h-1.5 bg-card rounded-full overflow-hidden border border-rule">
              <span
                class="block h-full bg-gradient-to-r from-accent to-[var(--accent-2)] transition-[width] duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                :style="{ width: `${(val / 5) * 100}%` }"
              />
            </div>
            <span class="font-display text-[0.95rem] font-bold text-text text-right">{{ val.toFixed(1) }}</span>
          </div>
        </div>
      </article>
    </section>

    <!-- Related -->
    <section v-if="related.length" class="pt-md border-t border-rule">
      <header class="mb-7 flex items-end justify-between gap-6">
        <div>
          <span :class="eyebrowCls">Có Thể Bạn Thích</span>
          <h2 class="font-display font-bold text-text m-0 leading-[1.1] text-[clamp(1.6rem,3.4vw,2.4rem)]">
            Cùng Phong Cách
          </h2>
        </div>
        <NuxtLink
          to="/#products"
          class="font-condensed text-[0.78rem] font-bold tracking-[2.5px] uppercase text-accent no-underline whitespace-nowrap pb-1.5 border-b border-rule-strong hover:text-[var(--accent-2)]"
        >Xem tất cả →</NuxtLink>
      </header>
      <div class="grid grid-cols-2 min-[720px]:grid-cols-4 gap-4">
        <NuxtLink
          v-for="rp in related"
          :key="rp.id"
          :to="`/products/${rp.slug}`"
          class="bg-card border border-rule no-underline text-inherit transition-all duration-300 hover:border-accent hover:-translate-y-[3px] hover:shadow-[0_14px_30px_color-mix(in_srgb,#000_8%,transparent)]"
        >
          <CommonProductMedia
            :src="rp.images[0] || undefined"
            :alt="rp.name"
            aspect="3/4"
            :placeholder-icon="rp.icon"
            :icon-size="56"
          />
          <div class="p-3.5">
            <span class="font-condensed text-[0.65rem] tracking-[2px] uppercase text-accent">{{ rp.categoryName }}</span>
            <h3 class="font-display text-[0.95rem] font-semibold text-text m-0 mt-1 mb-1.5 leading-[1.3]">{{ rp.name }}</h3>
            <span class="font-display font-bold text-accent text-[0.95rem]">{{ formatPrice(rp.salePrice ?? rp.price) }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-6 backdrop-blur-[10px] bg-[color-mix(in_srgb,#000_92%,transparent)]"
          @click.self="closeLightbox"
        >
          <button
            aria-label="Đóng"
            class="absolute top-6 right-6 w-12 h-12 rounded-full text-[#fbf6ea] text-[1.6rem] cursor-pointer flex items-center justify-center transition-all duration-250 bg-[color-mix(in_srgb,#fff_12%,transparent)] border border-[color-mix(in_srgb,#fff_25%,transparent)] hover:bg-oxblood hover:border-oxblood hover:rotate-90"
            @click="closeLightbox"
          >
            <i class="bx bx-x" />
          </button>
          <button
            aria-label="Trước"
            class="absolute top-1/2 -translate-y-1/2 left-6 max-[720px]:left-3 w-14 h-14 max-[720px]:w-11 max-[720px]:h-11 rounded-full text-[#fbf6ea] text-[2rem] max-[720px]:text-[1.5rem] cursor-pointer flex items-center justify-center transition-all duration-250 bg-[color-mix(in_srgb,#fff_10%,transparent)] border border-[color-mix(in_srgb,#fff_25%,transparent)] hover:bg-accent hover:border-accent hover:text-on-accent"
            @click="prevImg"
          >
            <i class="bx bx-chevron-left" />
          </button>
          <figure class="lb-figure m-0 max-w-[min(1100px,90vw)] max-h-[86vh] flex flex-col items-center gap-3.5">
            <img
              :src="gallery[lightboxIndex]"
              :alt="product.name"
              class="max-w-full max-h-[78vh] object-contain bg-card p-3.5 border border-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
            />
            <figcaption class="flex items-center gap-3.5 text-[#fbf6ea] font-condensed text-[0.78rem] tracking-[2px] uppercase">
              <span class="text-[var(--accent-2)] font-bold">{{ String(lightboxIndex + 1).padStart(2, '0') }} / {{ String(gallery.length).padStart(2, '0') }}</span>
              <span>{{ product.name }} — {{ angleLabels[lightboxIndex] || `Góc ${lightboxIndex + 1}` }}</span>
            </figcaption>
          </figure>
          <button
            aria-label="Tiếp"
            class="absolute top-1/2 -translate-y-1/2 right-6 max-[720px]:right-3 w-14 h-14 max-[720px]:w-11 max-[720px]:h-11 rounded-full text-[#fbf6ea] text-[2rem] max-[720px]:text-[1.5rem] cursor-pointer flex items-center justify-center transition-all duration-250 bg-[color-mix(in_srgb,#fff_10%,transparent)] border border-[color-mix(in_srgb,#fff_25%,transparent)] hover:bg-accent hover:border-accent hover:text-on-accent"
            @click="nextImg"
          >
            <i class="bx bx-chevron-right" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
