<script setup lang="ts">
import { HERO_STATS } from '~/constants/landing';
</script>

<template>
  <section class="hero">
    <span class="hero-rail">EST. 2015 · Issue N°27 · Xuân Hè 2025</span>

    <div class="hero-left">
      <div class="hero-eyebrow">
        <span class="rule" />
        <span class="text">Bộ sưu tập mới · Spring/Summer Edition</span>
      </div>

      <h1 class="hero-title">
        IRON<span class="hero-accent">MAN</span>
      </h1>
      <p class="hero-tag">
        <em>for the man</em><br />
        <em>who knows.</em>
      </p>

      <p class="hero-sub">
        Một chiếc đồng hồ. Một chiếc Zippo. Một chiếc ví đã mòn cạnh.
        Phụ kiện không nói thay được con người, nhưng đủ để hé lộ bạn là ai.
      </p>

      <div class="hero-actions">
        <AppButton variant="brass">Khám Phá Lookbook</AppButton>
        <AppButton variant="link">Đặt lịch tư vấn 1-1 →</AppButton>
      </div>

      <div class="hero-stats">
        <template v-for="(s, i) in HERO_STATS" :key="s.label">
          <div class="stat">
            <div class="stat-num">{{ s.value }}<sup>{{ s.suffix }}</sup></div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
          <span v-if="i < HERO_STATS.length - 1" class="stat-dot">·</span>
        </template>
      </div>
    </div>

    <div class="hero-right">
      <div class="grid-bg" aria-hidden="true" />

      <div class="hero-frame">
        <CommonProductMedia
          aspect="3/4"
          placeholder-icon="watch"
          :icon-size="240"
        >
          <span class="frame-counter">01 / 04</span>
          <span class="frame-caption">Sea-Master · Steel &amp; Leather</span>
          <span class="frame-credit">Photo · Studio Ironman</span>
        </CommonProductMedia>
      </div>

      <CommonScrollCue label="Cuộn xuống" class="hero-cue" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  padding-top: 80px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  position: relative;
  overflow: hidden;
}

.hero-rail {
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--accent);
  z-index: 4;
}
@media (max-width: 900px) { .hero-rail { display: none; } }

/* LEFT */
.hero-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 56px 80px 80px;
  position: relative;
}
.hero-left::after {
  content: '';
  position: absolute;
  right: 0; top: 12%; bottom: 12%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, var(--rule) 30%, var(--rule) 70%, transparent);
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  animation: ironman-fade-up 0.7s ease 0.15s both;
}
.hero-eyebrow .rule { width: 32px; height: 1px; background: var(--accent); }
.hero-eyebrow .text {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(4.5rem, 10vw, 10rem);
  line-height: 0.86;
  letter-spacing: -2px;
  margin: 0 0 12px;
  color: var(--text);
  animation: ironman-fade-up 0.7s ease 0.3s both;
}
.hero-accent { color: var(--accent); }

.hero-tag {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.4vw, 2.1rem);
  line-height: 0.95;
  color: var(--mid);
  margin: 0 0 36px;
  animation: ironman-fade-up 0.7s ease 0.4s both;
}
.hero-tag em { font-style: italic; }
.hero-tag em:last-child { color: var(--accent); }

.hero-sub {
  font-family: var(--font-condensed);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: var(--mid);
  max-width: 460px;
  margin-bottom: 44px;
  animation: ironman-fade-up 0.7s ease 0.5s both;
}

.hero-actions {
  display: flex;
  gap: 22px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 56px;
  animation: ironman-fade-up 0.7s ease 0.6s both;
}

.hero-stats {
  display: flex;
  align-items: flex-end;
  gap: 22px;
  padding-top: 28px;
  border-top: 1px solid var(--rule);
  animation: ironman-fade-up 0.7s ease 0.75s both;
}
.stat-num {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}
.stat-num sup {
  font-size: 0.85rem;
  color: var(--accent);
  margin-left: 2px;
}
.stat-label {
  font-family: var(--font-condensed);
  font-size: 0.68rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--smoke);
  margin-top: 6px;
}
.stat-dot {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--accent);
  margin: 0 4px 4px;
}

/* RIGHT */
.hero-right {
  position: relative;
  background: var(--card);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 56px 60px;
  overflow: hidden;
}

.grid-bg {
  position: absolute;
  inset: -40px;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 6%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 6%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
}

.hero-frame {
  position: relative;
  width: 100%;
  max-width: 460px;
  z-index: 2;
  border: 1px solid var(--rule-strong);
  padding: 14px;
  background: var(--surface);
  animation: ironman-fade-up 0.9s ease 0.55s both;
  box-shadow:
    -22px 22px 0 -1px var(--card-alt),
    -22px 22px 0 0 var(--rule-strong);
}

.frame-counter {
  position: absolute;
  top: 22px; right: 22px;
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 3px;
  color: var(--accent);
  z-index: 3;
}
.frame-caption {
  position: absolute;
  bottom: 22px; left: 22px;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--text);
  z-index: 3;
}
.frame-credit {
  position: absolute;
  bottom: 22px; right: 22px;
  font-family: var(--font-condensed);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--smoke);
  z-index: 3;
}

.hero-cue {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .hero-left { padding: 100px 24px 60px; }
  .hero-left::after { display: none; }
  .hero-right { padding: 40px 24px 100px; }
  .hero-frame { box-shadow: none; }
  .stat-dot { display: none; }
  .hero-stats { flex-wrap: wrap; gap: 24px; }
}
</style>
