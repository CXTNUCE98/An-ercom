<script setup lang="ts">
const pillars = [
  { icon: 'belt', title: 'Da Ý Thượng Hạng', desc: 'Full-grain vegetable-tanned — mỗi miếng da mang dấu thời gian riêng.' },
  { icon: 'watch', title: 'Movement Nhật Bản', desc: 'Seiko, Miyota, Orient — chính xác từng giây, bền bỉ hàng thập kỷ.' },
  { icon: 'engrave', title: 'Khắc Tay Tinh Xảo', desc: 'Laser CNC & thủ công — từng nét khắc kể câu chuyện của bạn.' },
] as const;
</script>

<template>
  <section class="py-[var(--sp-xl)] px-[var(--gutter)] bg-[var(--surface)]">
    <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[var(--sp-lg)] items-center">
      <div class="order-2 lg:order-1">
        <div class="flex items-center gap-3.5 mb-6">
          <span class="w-8 h-px bg-[var(--accent)]" />
          <span class="font-condensed text-[0.7rem] font-semibold tracking-[4px] uppercase text-[var(--accent)]">Câu chuyện chế tác</span>
        </div>
        <h2 class="font-display font-bold leading-[1.1] text-[var(--text)] m-0 mb-7 text-[clamp(2rem,4vw,3.2rem)]">
          Chất liệu thật.<br />
          <em class="italic text-[var(--accent)]">Tay nghề thật.</em>
        </h2>
        <p class="font-body text-[0.95rem] leading-[1.8] text-mid max-w-[520px] mb-11">
          Mỗi sản phẩm IRONMAN đều đi qua ít nhất 12 bước kiểm định — từ nguồn nguyên liệu,
          đường chỉ, đến cách đóng gói. Chúng tôi tin rằng phụ kiện tốt không cần quảng cáo —
          bạn sẽ cảm nhận được ngay khi cầm trên tay.
        </p>

        <div class="flex flex-col gap-7">
          <div v-for="p in pillars" :key="p.title" class="flex items-start gap-5">
            <CommonIconLine :name="(p.icon as any)" :size="36" />
            <div>
              <h3 class="font-display text-[1.05rem] font-semibold text-[var(--text)] m-0 mb-1.5">{{ p.title }}</h3>
              <p class="text-[0.85rem] text-smoke leading-[1.6] m-0">{{ p.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center order-1 lg:order-2">
        <div class="w-full max-w-[420px] border border-[var(--rule-strong)] p-3.5 bg-[var(--card)]">
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
