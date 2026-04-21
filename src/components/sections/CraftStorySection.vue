<script setup lang="ts">
const pillars = [
  { icon: 'belt', title: 'Da Ý Thượng Hạng', desc: 'Full-grain vegetable-tanned — mỗi miếng da mang dấu thời gian riêng.' },
  { icon: 'watch', title: 'Movement Nhật Bản', desc: 'Seiko, Miyota, Orient — chính xác từng giây, bền bỉ hàng thập kỷ.' },
  { icon: 'engrave', title: 'Khắc Tay Tinh Xảo', desc: 'Laser CNC & thủ công — từng nét khắc kể câu chuyện của bạn.' },
] as const;
</script>

<template>
  <section class="craft">
    <div class="craft-inner">
      <div class="craft-text">
        <div class="eyebrow">
          <span class="rule" />
          <span>Câu chuyện chế tác</span>
        </div>
        <h2 class="craft-title">
          Chất liệu thật.<br />
          <em>Tay nghề thật.</em>
        </h2>
        <p class="craft-desc">
          Mỗi sản phẩm IRONMAN đều đi qua ít nhất 12 bước kiểm định — từ nguồn nguyên liệu,
          đường chỉ, đến cách đóng gói. Chúng tôi tin rằng phụ kiện tốt không cần quảng cáo —
          bạn sẽ cảm nhận được ngay khi cầm trên tay.
        </p>

        <div class="pillars">
          <div v-for="p in pillars" :key="p.title" class="pillar">
            <CommonIconLine :name="(p.icon as any)" :size="36" />
            <div>
              <h3>{{ p.title }}</h3>
              <p>{{ p.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="craft-visual">
        <div class="craft-frame">
          <CommonProductMedia
            aspect="4/5"
            placeholder-icon="engrave"
            :icon-size="140"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.craft {
  padding: var(--sp-xl) var(--gutter);
  background: var(--surface);
}
.craft-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--sp-lg);
  align-items: center;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}
.eyebrow .rule { width: 32px; height: 1px; background: var(--accent); }
.eyebrow span:last-child {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
}

.craft-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--text);
  margin: 0 0 28px;
}
.craft-title em {
  font-style: italic;
  color: var(--accent);
}

.craft-desc {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--mid);
  max-width: 520px;
  margin-bottom: 44px;
}

.pillars { display: flex; flex-direction: column; gap: 28px; }
.pillar {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}
.pillar h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 6px;
}
.pillar p {
  font-size: 0.85rem;
  color: var(--smoke);
  line-height: 1.6;
  margin: 0;
}

.craft-visual { display: flex; justify-content: center; }
.craft-frame {
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--rule-strong);
  padding: 14px;
  background: var(--card);
}

@media (max-width: 900px) {
  .craft-inner { grid-template-columns: 1fr; }
  .craft-visual { order: -1; }
}
</style>
