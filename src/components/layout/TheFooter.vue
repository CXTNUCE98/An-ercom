<script setup lang="ts">
import {
  FOOTER_CATEGORIES,
  FOOTER_SUPPORT,
  FOOTER_CONTACT,
} from '~/constants/landing';

const socials = ['FB', 'IG', 'YT', 'TT'];
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="footer-top">
      <div>
        <div class="f-brand">IRON<span>MAN</span></div>
        <p class="f-tagline">
          Phụ kiện không chỉ là đồ vật — đó là câu chuyện của một người đàn ông đích thực.
        </p>
      </div>

      <div class="f-col">
        <h4>Danh Mục</h4>
        <ul>
          <li v-for="i in FOOTER_CATEGORIES" :key="i.path">
            <a :href="i.path">{{ i.name }}</a>
          </li>
        </ul>
      </div>

      <div class="f-col">
        <h4>Hỗ Trợ</h4>
        <ul>
          <li v-for="i in FOOTER_SUPPORT" :key="i.name">
            <a :href="i.path">{{ i.name }}</a>
          </li>
        </ul>
      </div>

      <div class="f-col">
        <h4>Liên Hệ</h4>
        <ul>
          <li v-for="i in FOOTER_CONTACT" :key="i.name">
            <a :href="i.path">{{ i.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="f-copy">
        © {{ year }} IRONMAN. Tất cả quyền được bảo lưu. | MST: 0123456789
      </div>
      <div class="f-socials">
        <span v-for="s in socials" :key="s" class="f-social">{{ s }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #0a0a0a;
  color: rgba(245, 240, 232, 0.8);
  padding: 64px 56px 32px;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 32px;
}

.f-brand {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 5px;
  color: var(--accent-2);
  margin-bottom: 14px;
}
.f-brand span { color: #f8f5ef; }

.f-tagline {
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.65;
  color: rgba(245, 240, 232, 0.5);
  max-width: 280px;
}

.f-col h4 {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent-2);
  margin-bottom: 18px;
}
.f-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0; padding: 0;
}
.f-col a {
  color: rgba(245, 240, 232, 0.55);
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  transition: color 0.25s;
}
.f-col a:hover { color: #fff; }

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.f-copy {
  font-size: 0.72rem;
  color: rgba(245, 240, 232, 0.3);
  letter-spacing: 0.5px;
}
.f-socials { display: flex; gap: 12px; }
.f-social {
  width: 34px; height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: var(--font-condensed);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(245, 240, 232, 0.55);
  cursor: pointer;
  transition: all 0.25s;
}
.f-social:hover {
  border-color: var(--accent-2);
  color: var(--accent-2);
}

@media (max-width: 900px) {
  .site-footer { padding: 48px 24px 24px; }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
}
</style>
