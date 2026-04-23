<script setup lang="ts">
import { COMBO_BY_SLUG, resolveCombo } from '~/constants/combos';
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { formatPrice } from '~/shared/utils/format';

const route = useRoute();
const slug = route.params.slug as string;
const raw = COMBO_BY_SLUG[slug];

if (!raw) {
  throw createError({ statusCode: 404, message: 'Combo không tồn tại' });
}

const combo = resolveCombo(raw);
const cart = useCartStore();
const addedToast = ref(false);

useHead({
  title: `${combo.name} — IRONMAN Combo`,
  meta: [{ name: 'description', content: combo.tagline }],
});

function addComboToCart() {
  combo.items.forEach((it) => cart.addItem(it.product, 1));
  addedToast.value = true;
  setTimeout(() => (addedToast.value = false), 2200);
}

const eyebrowCls =
  'inline-block font-condensed text-[0.72rem] font-semibold tracking-[4px] uppercase text-accent mb-4';

function badgeVariantClass(v?: string) {
  if (v === 'gold') return 'bg-gradient-to-br from-accent to-[var(--accent-2)] text-[#0a0a0a]';
  if (v === 'olive') return 'bg-olive text-[#fbf6ea]';
  if (v === 'oxblood') return 'bg-oxblood text-[#fbf6ea]';
  return '';
}
</script>

<template>
  <main class="bg-bg text-text">
    <!-- Hero Banner -->
    <section class="relative min-h-[92vh] max-[900px]:min-h-[70vh] flex items-end pt-[100px] px-gutter pb-md overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img :src="combo.heroImage" :alt="combo.name" class="w-full h-full object-cover saturate-[0.92]" />
        <div
          class="absolute inset-0"
          :style="{
            background:
              'linear-gradient(180deg, color-mix(in srgb, #000 40%, transparent) 0%, color-mix(in srgb, #000 20%, transparent) 40%, color-mix(in srgb, #000 85%, transparent) 100%), linear-gradient(90deg, color-mix(in srgb, #000 65%, transparent), transparent 60%)',
          }"
        />
      </div>

      <div class="relative z-[2] max-w-[720px] text-[#fbf6ea]">
        <nav class="flex items-center gap-2 font-condensed text-[0.7rem] tracking-[2px] uppercase mb-7 text-[color-mix(in_srgb,#fbf6ea_70%,transparent)] [&_a]:text-[color-mix(in_srgb,#fbf6ea_70%,transparent)] [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-250 hover:[&_a]:text-[var(--accent-2)]">
          <NuxtLink to="/">Trang Chủ</NuxtLink>
          <span>/</span>
          <NuxtLink to="/#combos">Combo</NuxtLink>
          <span>/</span>
          <span class="text-[var(--accent-2)]">{{ combo.name }}</span>
        </nav>

        <div
          v-if="combo.badge"
          :class="[
            'inline-flex items-center gap-1.5 py-2 px-4 font-condensed text-[0.72rem] font-bold tracking-[3px] uppercase mb-5 border border-[color-mix(in_srgb,#fff_30%,transparent)] backdrop-blur-[8px]',
            badgeVariantClass(combo.badgeVariant),
          ]"
        >
          <i class="bx bxs-bookmark-star" /> {{ combo.badge }}
        </div>

        <h1 class="font-display font-extrabold leading-none tracking-[-1px] m-0 mb-[18px] text-[#fbf6ea] text-[clamp(2.6rem,7vw,5.6rem)] [text-shadow:0_4px_40px_rgba(0,0,0,0.3)]">
          {{ combo.name }}
        </h1>
        <p class="font-display italic text-[var(--accent-2)] leading-[1.4] m-0 mb-8 text-[clamp(1rem,2vw,1.4rem)]">
          {{ combo.tagline }}
        </p>

        <div class="flex flex-wrap gap-x-7 gap-y-[18px] pt-6 border-t border-[color-mix(in_srgb,#fbf6ea_20%,transparent)]">
          <div v-for="(m, i) in [
            { i: 'bx-collection', t: `${combo.items.length} sản phẩm chọn lọc` },
            { i: 'bxs-star', t: combo.occasion },
            { i: 'bx-package', t: `Còn ${combo.stock} sets` },
          ]" :key="i" class="inline-flex items-center gap-2 font-condensed text-[0.8rem] tracking-[2px] uppercase text-[color-mix(in_srgb,#fbf6ea_85%,transparent)]">
            <i class="bx text-[var(--accent-2)] text-[1.15rem]" :class="m.i" />
            <span>{{ m.t }}</span>
          </div>
        </div>

        <div class="absolute bottom-10 left-gutter flex flex-col items-center gap-2.5 font-condensed text-[0.65rem] tracking-[3px] uppercase text-[color-mix(in_srgb,#fbf6ea_70%,transparent)]">
          <span>Cuộn xuống</span>
          <span class="w-px h-10 bg-[linear-gradient(180deg,var(--accent-2),transparent)] animate-scroll-line" />
        </div>
      </div>
    </section>

    <!-- Story + Pricing -->
    <section class="grid grid-cols-1 min-[900px]:grid-cols-[1.4fr_1fr] gap-10 min-[900px]:gap-20 min-[900px]:items-start max-w-[1280px] mx-auto py-lg px-gutter">
      <div>
        <span :class="eyebrowCls">Câu chuyện bộ sưu tập</span>
        <h2 class="font-display font-bold leading-[1.1] text-text m-0 mb-5 text-[clamp(1.8rem,4vw,2.8rem)]">
          Thiết kế bởi người biết bạn cần gì.
        </h2>
        <p class="text-[1.05rem] leading-[1.85] text-mid m-0 mb-8 font-light">{{ combo.story }}</p>

        <ul class="list-none m-0 p-0 grid grid-cols-1 min-[600px]:grid-cols-2 gap-3">
          <li v-for="p in combo.perks" :key="p" class="flex items-center gap-2.5 text-[0.92rem] text-text">
            <i class="bx bx-check-circle text-accent text-[1.25rem]" />
            {{ p }}
          </li>
        </ul>
      </div>

      <!-- Sticky pricing card -->
      <aside
        class="sticky top-24 max-[900px]:static border border-rule-strong p-7 flex flex-col gap-5 shadow-[0_8px_40px_color-mix(in_srgb,#000_10%,transparent)]"
        :style="{ background: 'linear-gradient(145deg, color-mix(in srgb, var(--accent) 8%, var(--surface)) 0%, var(--surface) 70%)' }"
      >
        <div class="flex flex-col gap-2">
          <span :class="eyebrowCls">Giá trọn bộ</span>
          <div class="font-display font-extrabold text-accent leading-none tracking-[-1px] text-[clamp(2.2rem,5vw,3.2rem)]">
            {{ formatPrice(combo.comboPrice) }}
          </div>
          <div class="flex items-center gap-3 mt-1">
            <span class="font-condensed text-base text-smoke line-through">{{ formatPrice(combo.originalPrice) }}</span>
            <span class="inline-block py-[3px] px-2.5 bg-oxblood text-[#fbf6ea] font-condensed text-[0.72rem] font-bold tracking-[1.5px]">
              −{{ combo.savingsPercent }}%
            </span>
          </div>
          <div class="inline-flex items-center gap-1.5 mt-2 text-[0.88rem] text-oxblood">
            <i class="bx bxs-offer text-[1.1rem]" />
            Bạn tiết kiệm <strong class="font-bold">{{ formatPrice(combo.savings) }}</strong>
          </div>
        </div>

        <button
          class="relative overflow-hidden flex items-center justify-center gap-2.5 bg-accent text-on-accent border-0 py-[18px] px-7 font-condensed text-[0.85rem] font-bold tracking-[3px] uppercase cursor-pointer transition-all duration-300 ease hover:bg-[var(--accent-2)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--accent)_40%,transparent)] after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(120deg,transparent_30%,color-mix(in_srgb,#fff_30%,transparent),transparent_70%)] after:-translate-x-full after:transition-transform after:duration-600 hover:after:translate-x-full [&_i]:text-[1.3rem]"
          @click="addComboToCart"
        >
          <i class="bx bx-shopping-bag" />
          Mua Trọn Bộ
        </button>

        <Transition name="fade">
          <div v-if="addedToast" class="flex items-center gap-2 py-3 px-3.5 bg-olive text-[#fbf6ea] font-condensed text-[0.78rem] tracking-[1.5px] uppercase">
            <i class="bx bx-check-circle" />
            Đã thêm {{ combo.items.length }} sản phẩm vào giỏ
          </div>
        </Transition>

        <div class="grid grid-cols-2 gap-2.5 pt-4 border-t border-rule [&>div]:flex [&>div]:items-center [&>div]:gap-1.5 [&>div]:font-condensed [&>div]:text-[0.68rem] [&>div]:tracking-[1.5px] [&>div]:uppercase [&>div]:text-mid [&_i]:text-accent [&_i]:text-base">
          <div><i class="bx bx-shield-quarter" /> Chính hãng 100%</div>
          <div><i class="bx bx-refresh" /> Đổi trả 30 ngày</div>
          <div><i class="bx bx-package" /> Giao 2h nội thành</div>
          <div><i class="bx bx-credit-card" /> Trả góp 0%</div>
        </div>
      </aside>
    </section>

    <!-- Items breakdown -->
    <section class="max-w-[1280px] mx-auto px-gutter pb-lg">
      <header class="text-center mb-12">
        <span :class="eyebrowCls">Gồm có</span>
        <h2 class="font-display font-bold text-text m-0 text-[clamp(1.8rem,4vw,2.8rem)]">
          {{ combo.items.length }} Sản Phẩm — Chất Lượng Chọn Lọc
        </h2>
      </header>

      <div class="grid grid-cols-1 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(it, i) in combo.items"
          :key="it.product.id"
          :to="`/products/${it.product.slug}`"
          class="group relative bg-surface border border-rule no-underline text-inherit flex flex-col overflow-hidden transition-all duration-350 ease hover:-translate-y-1 hover:border-accent hover:shadow-[0_16px_40px_color-mix(in_srgb,#000_10%,transparent)]"
        >
          <div class="absolute top-3.5 left-3.5 z-[2] w-9 h-9 rounded-full bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] backdrop-blur-[8px] border border-accent text-accent font-condensed text-[0.8rem] font-bold tracking-[1px] flex items-center justify-center">
            0{{ i + 1 }}
          </div>
          <div class="bg-card">
            <CommonProductMedia
              :src="it.product.images[0]"
              :alt="it.product.name"
              aspect="1/1"
              :placeholder-icon="it.product.icon"
              :icon-size="80"
            />
          </div>
          <div class="p-5 flex flex-col gap-2">
            <span class="font-condensed text-[0.68rem] font-semibold tracking-[2.5px] uppercase text-accent">
              {{ it.product.categoryName }} · {{ it.product.brand }}
            </span>
            <h3 class="font-display text-[1.15rem] font-semibold text-text m-0 leading-[1.25]">{{ it.product.name }}</h3>
            <p v-if="it.note" class="text-[0.85rem] text-smoke italic m-0">{{ it.note }}</p>
            <div class="flex items-center justify-between mt-2.5 pt-3.5 border-t border-dashed border-rule">
              <span class="font-display text-[1.05rem] font-bold text-accent">
                {{ formatPrice(it.product.salePrice ?? it.product.price) }}
              </span>
              <span class="font-condensed text-[0.72rem] tracking-[2px] uppercase text-smoke transition-colors duration-300 group-hover:text-accent">
                Xem chi tiết →
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Gift banner -->
    <section
      class="relative py-lg px-gutter text-[#fbf6ea] text-center overflow-hidden"
      :style="{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, var(--ink)), var(--ink))' }"
    >
      <div
        aria-hidden="true"
        class="absolute inset-0 pointer-events-none opacity-70"
        :style="{
          background:
            'radial-gradient(30% 40% at 20% 30%, color-mix(in srgb, var(--accent) 25%, transparent), transparent), radial-gradient(30% 40% at 80% 70%, color-mix(in srgb, var(--accent) 20%, transparent), transparent)',
        }"
      />
      <div class="relative max-w-[720px] mx-auto">
        <span :class="[eyebrowCls, '!text-[var(--accent-2)]']">Dịch vụ quà tặng</span>
        <h2 class="font-display font-bold text-[#fbf6ea] m-0 mb-5 leading-[1.15] text-[clamp(1.8rem,4vw,2.8rem)]">
          Hộp Gỗ Phôi · Khắc Tên · Thiệp Viết Tay
        </h2>
        <p class="text-[1.02rem] leading-[1.85] font-light m-0 text-[color-mix(in_srgb,#fbf6ea_80%,transparent)]">
          Mỗi bộ combo đều được đóng trong hộp gỗ phôi tự nhiên, khắc laser tên
          người nhận. Đính kèm thiệp viết tay theo đúng ý bạn — biến món quà
          thành kỷ vật.
        </p>
      </div>
    </section>
  </main>
</template>
