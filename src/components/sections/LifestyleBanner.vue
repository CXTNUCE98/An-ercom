<script setup lang="ts">
import { LIFESTYLE_FEATURES } from '~/constants/landing';
</script>

<template>
  <section class="lifestyle">
    <div class="ls-content">
      <div class="ls-tag">Quà tặng ý nghĩa</div>
      <h2 class="ls-title">
        Món quà<br>
        <em>Sang trọng</em>
      </h2>
      <p class="ls-desc">
        Nhân dịp Ngày Của Cha, giảm 15% toàn bộ đồng hồ và Zippo. Tặng kèm hộp quà cao cấp và thiệp viết tay miễn phí.
      </p>
      <AppButton variant="copper">Chọn Quà Ngay →</AppButton>
    </div>

    <div class="ls-features">
      <ItemsFeatureItem v-for="f in LIFESTYLE_FEATURES" :key="f.title" :icon="f.icon" :title="f.title" :desc="f.desc"
        variant="lifestyle" />
    </div>
  </section>
</template>

<style scoped>
.lifestyle {
  margin: 0 56px 80px;
  padding: 72px 64px;
  background: #0a0a0a;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.lifestyle::before,
.lifestyle::after {
  content: '';
  position: absolute;
  border-radius: 50%;
}

.lifestyle::before {
  right: -80px;
  top: -80px;
  width: 320px;
  height: 320px;
  border: 1px solid color-mix(in srgb, var(--accent-2) 20%, transparent);
}

.lifestyle::after {
  right: -20px;
  top: -20px;
  width: 200px;
  height: 200px;
  border: 1px solid color-mix(in srgb, var(--accent-2) 12%, transparent);
}

.ls-tag {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent-2);
  margin-bottom: 16px;
}

.ls-title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4.5vw, 4rem);
  font-weight: 900;
  color: #f5f0e8;
  line-height: 1;
  margin-bottom: 20px;
}

.ls-title em {
  font-style: italic;
  color: var(--accent-2);
}

.ls-desc {
  color: rgba(245, 240, 232, 0.65);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 460px;
}

.ls-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 900px) {
  .lifestyle {
    margin: 0 24px 60px;
    padding: 48px 32px;
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
