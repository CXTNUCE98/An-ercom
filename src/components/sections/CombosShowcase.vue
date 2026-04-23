<script setup lang="ts">
import { computed } from 'vue';
import { RESOLVED_COMBOS } from '~/constants/combos';
import { formatPrice } from '~/shared/utils/format';

const combos = RESOLVED_COMBOS;
const bestCombo = computed(() => combos[0]);
const restCombos = computed(() => combos.slice(1));

// Shared class strings
const comboCard =
  'group relative flex flex-col overflow-hidden bg-surface border border-rule transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_4px_20px_color-mix(in_srgb,#000_5%,transparent)] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_color-mix(in_srgb,#000_16%,transparent),0_0_0_1px_color-mix(in_srgb,var(--accent)_30%,transparent)] before:content-[""] before:absolute before:inset-0 before:border before:border-accent before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-300 before:z-[3] hover:before:opacity-50';

const visualOverlay =
  'absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,#000_15%,transparent)_0%,transparent_30%,color-mix(in_srgb,#000_50%,transparent)_100%)]';

const comboBadgeBase =
  'absolute top-4 left-4 inline-flex items-center gap-1.5 py-[7px] px-3.5 font-condensed text-[0.7rem] font-bold tracking-[2.5px] uppercase text-[#fbf6ea] z-[2] border border-[color-mix(in_srgb,#fff_25%,transparent)] backdrop-blur-[8px]';

function badgeVariantClass(v?: string) {
  if (v === 'gold') return 'bg-gradient-to-br from-accent to-[var(--accent-2)] text-ink';
  if (v === 'olive') return 'bg-olive';
  if (v === 'oxblood') return 'bg-oxblood';
  return '';
}

const stackChip =
  'w-[42px] h-[42px] rounded-full bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] backdrop-blur-[10px] border border-[color-mix(in_srgb,var(--accent)_50%,transparent)] flex items-center justify-center text-accent relative transition-transform duration-300 group-hover:ml-0 group-hover:-translate-y-0.5';

const comboPricing =
  'relative grid grid-cols-[1fr_auto] max-[720px]:grid-cols-1 gap-4 items-center p-[18px] border border-rule-strong overflow-hidden bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_12%,var(--card))_0%,var(--card)_60%)] before:content-[""] before:absolute before:top-[-1px] before:right-[-1px] before:w-1/2 before:h-full before:pointer-events-none before:bg-[radial-gradient(80%_100%_at_100%_0%,color-mix(in_srgb,var(--accent)_30%,transparent),transparent)]';

const priceRow =
  'flex items-baseline justify-between gap-2 font-condensed [&>span:first-child]:text-[0.7rem] [&>span:first-child]:tracking-[2px] [&>span:first-child]:uppercase [&>span:first-child]:text-smoke [&>span:first-child]:font-medium';

const savePill =
  'relative w-[76px] h-[76px] rounded-full text-[#fbf6ea] flex flex-col items-center justify-center font-condensed tracking-[1px] -rotate-[8deg] transition-transform duration-400 group-hover:rotate-0 group-hover:scale-105 max-[720px]:justify-self-end bg-[radial-gradient(circle,var(--oxblood)_0%,color-mix(in_srgb,var(--oxblood)_80%,#000)_100%)] shadow-[0_4px_16px_color-mix(in_srgb,var(--oxblood)_40%,transparent),inset_0_0_0_2px_color-mix(in_srgb,#fff_25%,transparent)]';

const ctaText =
  'inline-flex items-center gap-1.5 font-condensed text-[0.78rem] font-bold uppercase tracking-[2.5px] text-accent transition-[gap] duration-300 group-hover:gap-3';
</script>

<template>
  <section
    id="combos"
    class="relative overflow-hidden py-lg px-gutter sm:py-md bg-[radial-gradient(120%_60%_at_50%_0%,color-mix(in_srgb,var(--accent)_6%,transparent),transparent_60%),var(--bg)] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:opacity-50 before:bg-[linear-gradient(color-mix(in_srgb,var(--accent)_4%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--accent)_4%,transparent)_1px,transparent_1px)] before:bg-[length:56px_56px]"
  >
    <!-- Editorial header -->
    <div class="relative mx-auto mb-12 max-w-[920px] px-4 text-center">
      <p
        class="m-0 font-display font-semibold leading-[1.35] text-text text-[clamp(1.25rem,2.4vw,1.75rem)] tracking-[0.01em]"
      >
        Dành cho người đàn ông đã đi qua thành công —
        <span class="text-accent">nơi mỗi phụ kiện là một dấu ấn của sự từng trải và vị thế.</span>
      </p>
      <span class="mx-auto mt-6 block h-px w-16 bg-accent opacity-70" />
    </div>

    <!-- Best Combo banner — horizontal full-width -->
    <article
      v-if="bestCombo"
      :key="bestCombo.id"
      :class="[comboCard, 'mx-auto mb-8 max-w-[1280px] min-[900px]:grid min-[900px]:grid-cols-[1.2fr_1fr] min-[900px]:items-stretch']"
    >
      <NuxtLink :to="`/combos/${bestCombo.slug}`" class="absolute inset-0 z-[4] indent-[-9999px]" />

      <!-- Visual -->
      <div class="relative overflow-hidden bg-card min-[900px]:h-full">
        <div class="relative overflow-hidden aspect-[4/5] min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:min-h-[480px]">
          <img
            :src="bestCombo.heroImage"
            :alt="bestCombo.name"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div :class="visualOverlay" />
        </div>

        <div
          v-if="bestCombo.badge"
          :class="[comboBadgeBase, badgeVariantClass(bestCombo.badgeVariant)]"
        >
          <i class="bx bxs-bookmark-star text-[0.85rem]" />
          {{ bestCombo.badge }}
        </div>

        <div class="absolute bottom-4 left-4 z-[2] flex items-center gap-2">
          <div
            v-for="(it, i) in bestCombo.items"
            :key="it.product.id"
            :class="stackChip"
            :style="{ marginLeft: `${i * -10}px`, zIndex: 10 - i }"
          >
            <CommonIconLine :name="it.product.icon" :size="22" />
          </div>
          <div class="ml-3 flex flex-col font-condensed text-[0.7rem] font-semibold uppercase leading-none tracking-[2px] text-[#fbf6ea]">
            <span class="mb-0.5 font-display text-[1.4rem] font-extrabold text-[var(--accent-2)]">{{ bestCombo.items.length }}</span>
            món
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="flex flex-1 flex-col gap-[18px] p-6 min-[900px]:py-8 min-[900px]:px-9">
        <div class="flex items-center justify-between gap-3">
          <span class="font-condensed text-[0.65rem] font-semibold uppercase tracking-[3px] text-accent">
            {{ bestCombo.occasion.split('·')[0].trim() }}
          </span>
          <span v-if="bestCombo.isLimited" class="inline-flex items-center gap-1 font-condensed text-[0.7rem] font-bold uppercase tracking-[1.5px] text-oxblood">
            <i class="bx bxs-flame animate-pulse" /> Còn {{ bestCombo.stock }} sets
          </span>
        </div>

        <h3 class="m-0 font-display font-bold leading-[1.15] text-text text-[clamp(1.3rem,2.4vw,1.7rem)]">
          {{ bestCombo.name }}
        </h3>

        <ul class="m-0 flex list-none flex-col gap-2 border-y border-dashed border-rule py-3 px-0">
          <li
            v-for="it in bestCombo.items"
            :key="it.product.id"
            class="grid grid-cols-[18px_1fr_auto] items-center gap-2.5"
          >
            <i class="bx bx-plus-medical text-[0.8rem] text-accent" />
            <div class="flex min-w-0 flex-col">
              <span class="truncate text-[0.86rem] font-medium leading-[1.3] text-text">{{ it.product.name }}</span>
              <span v-if="it.note" class="font-condensed text-[0.74rem] tracking-[0.5px] text-smoke">{{ it.note }}</span>
            </div>
            <span class="whitespace-nowrap font-condensed text-[0.8rem] font-semibold text-mid">
              {{ formatPrice(it.product.salePrice ?? it.product.price) }}
            </span>
          </li>
        </ul>

        <div :class="comboPricing">
          <div class="relative flex flex-col gap-1">
            <div :class="priceRow">
              <span>Mua lẻ</span>
              <span class="text-smoke line-through text-[0.92rem]">{{ formatPrice(bestCombo.originalPrice) }}</span>
            </div>
            <div :class="[priceRow, '[&>span:first-child]:!text-oxblood']">
              <span>Bạn tiết kiệm</span>
              <span class="font-bold text-[0.9rem] text-oxblood">
                − {{ formatPrice(bestCombo.savings) }}
              </span>
            </div>
            <div :class="[priceRow, 'mt-1 items-center border-t border-rule pt-2']">
              <span class="!text-[0.72rem] !text-accent !font-bold">Giá Combo</span>
              <span class="font-display font-extrabold leading-none tracking-[-0.5px] text-accent text-[clamp(1.4rem,3vw,1.9rem)]">
                {{ formatPrice(bestCombo.comboPrice) }}
              </span>
            </div>
          </div>
          <div :class="savePill">
            <strong class="font-display text-[1.2rem] font-extrabold leading-none">−{{ bestCombo.savingsPercent }}%</strong>
            <span class="mt-0.5 text-[0.55rem] uppercase tracking-[2px] opacity-85">tiết kiệm</span>
          </div>
        </div>

        <ul class="m-0 flex list-none flex-col gap-1.5 p-0">
          <li v-for="p in bestCombo.perks.slice(0, 3)" :key="p" class="flex items-center gap-2 text-[0.82rem] leading-[1.4] text-mid">
            <i class="bx bx-check text-[0.95rem] text-accent" /> {{ p }}
          </li>
        </ul>

        <div class="mt-auto flex items-center justify-between gap-3 border-t border-rule pt-4">
          <span :class="ctaText">
            Khám Phá Combo
            <i class="bx bx-right-arrow-alt text-[1.2rem]" />
          </span>
          <span class="inline-flex items-center gap-1 font-condensed text-[0.68rem] uppercase tracking-[1.5px] text-smoke">
            <i class="bx bx-shield-quarter" /> Bảo hành chính hãng
          </span>
        </div>
      </div>
    </article>

    <!-- Other combos -->
    <div class="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:[grid-auto-rows:1fr]">
      <article
        v-for="combo in restCombos"
        :key="combo.id"
        :class="comboCard"
      >
        <NuxtLink :to="`/combos/${combo.slug}`" class="absolute inset-0 z-[4] indent-[-9999px]" />

        <div class="relative overflow-hidden bg-card">
          <div class="relative overflow-hidden aspect-[16/10]">
            <img
              :src="combo.heroImage"
              :alt="combo.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div :class="visualOverlay" />
          </div>

          <div
            v-if="combo.badge"
            :class="[comboBadgeBase, badgeVariantClass(combo.badgeVariant)]"
          >
            <i class="bx bxs-bookmark-star text-[0.85rem]" />
            {{ combo.badge }}
          </div>

          <div class="absolute bottom-4 left-4 z-[2] flex items-center gap-2">
            <div
              v-for="(it, i) in combo.items"
              :key="it.product.id"
              :class="stackChip"
              :style="{ marginLeft: `${i * -10}px`, zIndex: 10 - i }"
            >
              <CommonIconLine :name="it.product.icon" :size="22" />
            </div>
            <div class="ml-3 flex flex-col font-condensed text-[0.7rem] font-semibold uppercase leading-none tracking-[2px] text-[#fbf6ea]">
              <span class="mb-0.5 font-display text-[1.4rem] font-extrabold text-[var(--accent-2)]">{{ combo.items.length }}</span>
              món
            </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-[18px] p-6">
          <div class="flex items-center justify-between gap-3">
            <span class="font-condensed text-[0.65rem] font-semibold uppercase tracking-[3px] text-accent">
              {{ combo.occasion.split('·')[0].trim() }}
            </span>
            <span v-if="combo.isLimited" class="inline-flex items-center gap-1 font-condensed text-[0.7rem] font-bold uppercase tracking-[1.5px] text-oxblood">
              <i class="bx bxs-flame animate-pulse" /> Còn {{ combo.stock }} sets
            </span>
          </div>

          <h3 class="m-0 font-display font-bold leading-[1.15] text-text text-[clamp(1.3rem,2.4vw,1.7rem)]">
            {{ combo.name }}
          </h3>

          <ul class="m-0 flex list-none flex-col gap-2 border-y border-dashed border-rule py-3 px-0">
            <li
              v-for="it in combo.items"
              :key="it.product.id"
              class="grid grid-cols-[18px_1fr_auto] items-center gap-2.5"
            >
              <i class="bx bx-plus-medical text-[0.8rem] text-accent" />
              <div class="flex min-w-0 flex-col">
                <span class="truncate text-[0.86rem] font-medium leading-[1.3] text-text">{{ it.product.name }}</span>
                <span v-if="it.note" class="font-condensed text-[0.74rem] tracking-[0.5px] text-smoke">{{ it.note }}</span>
              </div>
              <span class="whitespace-nowrap font-condensed text-[0.8rem] font-semibold text-mid">
                {{ formatPrice(it.product.salePrice ?? it.product.price) }}
              </span>
            </li>
          </ul>

          <div :class="comboPricing">
            <div class="relative flex flex-col gap-1">
              <div :class="priceRow">
                <span>Mua lẻ</span>
                <span class="text-smoke line-through text-[0.92rem]">{{ formatPrice(combo.originalPrice) }}</span>
              </div>
              <div :class="[priceRow, '[&>span:first-child]:!text-oxblood']">
                <span>Bạn tiết kiệm</span>
                <span class="font-bold text-[0.9rem] text-oxblood">
                  − {{ formatPrice(combo.savings) }}
                </span>
              </div>
              <div :class="[priceRow, 'mt-1 items-center border-t border-rule pt-2']">
                <span class="!text-[0.72rem] !text-accent !font-bold">Giá Combo</span>
                <span class="font-display font-extrabold leading-none tracking-[-0.5px] text-accent text-[clamp(1.4rem,3vw,1.9rem)]">
                  {{ formatPrice(combo.comboPrice) }}
                </span>
              </div>
            </div>
            <div :class="savePill">
              <strong class="font-display text-[1.2rem] font-extrabold leading-none">−{{ combo.savingsPercent }}%</strong>
              <span class="mt-0.5 text-[0.55rem] uppercase tracking-[2px] opacity-85">tiết kiệm</span>
            </div>
          </div>

          <ul class="m-0 flex list-none flex-col gap-1.5 p-0">
            <li v-for="p in combo.perks.slice(0, 3)" :key="p" class="flex items-center gap-2 text-[0.82rem] leading-[1.4] text-mid">
              <i class="bx bx-check text-[0.95rem] text-accent" /> {{ p }}
            </li>
          </ul>

          <div class="mt-auto flex items-center justify-between gap-3 border-t border-rule pt-4">
            <span :class="ctaText">
              Khám Phá Combo
              <i class="bx bx-right-arrow-alt text-[1.2rem]" />
            </span>
            <span class="inline-flex items-center gap-1 font-condensed text-[0.68rem] uppercase tracking-[1.5px] text-smoke">
              <i class="bx bx-shield-quarter" /> Bảo hành chính hãng
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- Trust strip -->
    <div class="relative mx-auto mt-15 grid max-w-[1280px] grid-cols-1 gap-3 border-y border-rule py-6 px-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <div v-for="trust in [
        { icon: 'bx-package', text: 'Hộp gỗ phôi · Khắc tên miễn phí' },
        { icon: 'bx-medal', text: 'Bảo hành chính hãng đầy đủ' },
        { icon: 'bx-time-five', text: 'Giao 2h nội thành · 24h toàn quốc' },
        { icon: 'bx-credit-card', text: 'Trả góp 0% — qua thẻ tín dụng' }
      ]" :key="trust.text" class="flex items-center gap-2.5 font-condensed text-[0.78rem] font-medium uppercase tracking-[1.5px] text-mid">
        <i class="bx text-[1.4rem] text-accent" :class="trust.icon" /> {{ trust.text }}
      </div>
    </div>
  </section>
</template>
