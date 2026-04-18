<script setup lang="ts">
import type { IconName } from '~/types/landing';

defineProps<{
  icon?: IconName;
  num?: string;
  romanIndex?: number;
  title: string;
  desc: string;
  variant?: 'editorial' | 'numbered' | 'lifestyle';
}>();
</script>

<template>
  <div class="feat" :class="`feat--${variant ?? 'editorial'}`">
    <CommonNumeralIndex
      v-if="romanIndex !== undefined"
      :value="romanIndex"
      format="roman"
      class="feat-roman"
    />
    <CommonIconLine v-if="icon" :name="icon" :size="variant === 'lifestyle' ? 36 : 32" class="feat-icon" />
    <div v-if="num" class="feat-num">{{ num }}</div>
    <div class="feat-body">
      <div class="feat-title">{{ title }}</div>
      <div class="feat-desc">{{ desc }}</div>
    </div>
    <span class="feat-rule" />
  </div>
</template>

<style scoped>
.feat { background: transparent; transition: background 0.3s ease; position: relative; }
.feat-rule {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}
.feat:hover .feat-rule { transform: scaleX(1); }

/* Editorial: stacked w/ roman numeral, icon, title, desc */
.feat--editorial {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 44px 32px 36px;
  background: var(--bg);
}
.feat--editorial:hover { background: var(--card); }
.feat--editorial .feat-roman { font-size: 1.6rem; opacity: 0.85; }
.feat--editorial .feat-icon { color: var(--mid); }
.feat--editorial .feat-title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text);
}
.feat--editorial .feat-desc {
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  color: var(--smoke);
  line-height: 1.55;
}

/* Numbered: stacked w/ big number */
.feat--numbered {
  padding: 48px 36px;
  background: var(--card);
}
.feat--numbered .feat-num {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 3.5rem;
  color: color-mix(in srgb, var(--accent) 28%, transparent);
  line-height: 1;
  margin-bottom: 16px;
}
.feat--numbered .feat-title {
  font-family: var(--font-condensed);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text);
  margin-bottom: 10px;
}
.feat--numbered .feat-desc {
  font-family: var(--font-condensed);
  font-size: 0.9rem;
  color: var(--smoke);
  line-height: 1.6;
}

/* Lifestyle (used inside dark banner) */
.feat--lifestyle {
  padding: 32px 28px;
  background: rgba(241, 236, 224, 0.025);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}
.feat--lifestyle:hover { background: rgba(241, 236, 224, 0.06); }
.feat--lifestyle .feat-icon { color: var(--brass-light, var(--accent-2)); }
.feat--lifestyle .feat-title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.15rem;
  color: #f5f0e8;
}
.feat--lifestyle .feat-desc {
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  color: rgba(245, 240, 232, 0.6);
  line-height: 1.55;
}
</style>
