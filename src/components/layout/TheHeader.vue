<script setup lang="ts">
import { useScrolled } from '~/composables/useScrolled';
import { useCartStore } from '~/features/cart/stores/useCartStore';

const { isScrolled } = useScrolled(20);
const cart = useCartStore();
const drawerOpen = ref(false);
const router = useRouter();
const route = useRoute();

const QUICK_LINKS = [
  { label: 'Trang Chủ',     hash: '#top',      icon: 'bx-home-alt' },
  { label: 'Combo Nổi Bật', hash: '#combos',   icon: 'bx-gift' },
  { label: 'Sản Phẩm',      hash: '#products', icon: 'bx-diamond' },
  { label: 'Câu Chuyện',    hash: '#story',    icon: 'bx-book-open' },
  { label: 'Liên Hệ',       hash: '#contact',  icon: 'bx-phone' },
];

async function goTo(hash: string) {
  drawerOpen.value = false;
  if (route.path !== '/') {
    await router.push({ path: '/', hash });
  } else {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (hash === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

watch(drawerOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '';
});
</script>

<template>
  <header class="site-nav" :class="{ 'is-scrolled': isScrolled }">
    <a href="#top" class="nav-logo" @click.prevent="goTo('#top')">
      IRON<span>MAN</span>
    </a>

    <div class="nav-actions">
      <a href="#products" class="icon-btn" aria-label="Tìm sản phẩm" @click.prevent="goTo('#products')">
        <i class="bx bx-search-alt" />
      </a>
      <NuxtLink to="/cart" class="icon-btn cart-btn" aria-label="Giỏ hàng">
        <i class="bx bx-shopping-bag" />
        <span v-if="cart.count > 0" class="cart-badge">{{ cart.count }}</span>
      </NuxtLink>
      <CommonThemeToggle />
    </div>

    <Transition name="fade">
      <div
        v-if="drawerOpen"
        class="drawer-backdrop"
        @click="drawerOpen = false"
      />
    </Transition>

    <Transition name="slide-right">
      <aside v-if="drawerOpen" class="drawer" @click.stop>
        <div class="drawer-head">
          <div class="drawer-brand">
            IRON<span>MAN</span>
            <em>for the man who knows.</em>
          </div>
          <button
            class="icon-btn drawer-close"
            aria-label="Đóng"
            @click="drawerOpen = false"
          >
            <i class="bx bx-x" />
          </button>
        </div>

        <nav class="drawer-links">
          <a
            v-for="(link, i) in QUICK_LINKS"
            :key="link.hash"
            href="#"
            class="drawer-link"
            :style="{ animationDelay: `${0.05 * i + 0.1}s` }"
            @click.prevent="goTo(link.hash)"
          >
            <span class="idx">0{{ i + 1 }}</span>
            <i class="bx" :class="link.icon" />
            <span class="lbl">{{ link.label }}</span>
            <i class="bx bx-right-arrow-alt arrow" />
          </a>
        </nav>

        <div class="drawer-foot">
          <div class="hotline">
            <span class="eyebrow-gold">Hotline 24/7</span>
            <a href="tel:18001234">1800 1234</a>
          </div>
          <div class="social">
            <a href="#" aria-label="Facebook"><i class="bx bxl-facebook" /></a>
            <a href="#" aria-label="Instagram"><i class="bx bxl-instagram" /></a>
            <a href="#" aria-label="Zalo"><i class="bx bx-chat" /></a>
            <a href="#" aria-label="TikTok"><i class="bx bxl-tiktok" /></a>
          </div>
        </div>
      </aside>
    </Transition>
  </header>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px var(--gutter, 24px);
  max-width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  border-bottom: 1px solid transparent;
  transition: padding 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}
.site-nav.is-scrolled {
  padding: 8px var(--gutter, 24px);
  border-bottom-color: var(--rule);
  background: color-mix(in srgb, var(--bg) 94%, transparent);
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: var(--accent);
  text-decoration: none;
  line-height: 1;
  min-width: 0;
  flex-shrink: 1;
  white-space: nowrap;
}
.nav-logo span { color: var(--text); }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.icon-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--mid);
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: none;
  border-radius: 50%;
  transition: all 0.25s ease;
}
.icon-btn:hover {
  color: var(--accent);
  border-color: var(--rule);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.cart-badge {
  position: absolute;
  top: 2px; right: 2px;
  background: var(--oxblood);
  color: #fbf6ea;
  font-family: var(--font-condensed);
  font-size: 0.58rem;
  font-weight: 700;
  min-width: 16px; height: 16px; padding: 0 4px;
  border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  line-height: 1;
  border: 2px solid var(--bg);
}

/* Drawer */
.drawer-backdrop {
  position: fixed; inset: 0;
  background: color-mix(in srgb, #000 55%, transparent);
  backdrop-filter: blur(6px);
  z-index: 100;
}
.drawer {
  position: fixed;
  top: 0; right: 0;
  height: 100vh;
  width: min(88vw, 380px);
  background: var(--bg);
  border-left: 1px solid var(--rule-strong);
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px color-mix(in srgb, #000 30%, transparent);
}
.drawer-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 28px 28px 20px;
  border-bottom: 1px solid var(--rule);
}
.drawer-brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 5px;
  color: var(--accent);
  line-height: 1;
}
.drawer-brand span { color: var(--text); }
.drawer-brand em {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.72rem;
  letter-spacing: 1px;
  color: var(--smoke);
  font-weight: 400;
}
.drawer-close { margin-top: -4px; }

.drawer-links {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}
.drawer-link {
  display: grid;
  grid-template-columns: 34px 22px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 16px 28px;
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--text);
  border-bottom: 1px solid var(--rule);
  position: relative;
  opacity: 0;
  transform: translateX(20px);
  animation: drawer-in 0.45s ease forwards;
  transition: background 0.25s, padding-left 0.3s;
}
.drawer-link::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease;
}
.drawer-link:hover {
  background: color-mix(in srgb, var(--accent) 6%, transparent);
  padding-left: 36px;
}
.drawer-link:hover::before { transform: scaleY(1); }
.drawer-link .idx {
  font-family: var(--font-condensed);
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--accent);
  font-weight: 700;
}
.drawer-link i { color: var(--accent); font-size: 1.15rem; }
.drawer-link .lbl { letter-spacing: 0.5px; }
.drawer-link .arrow {
  color: var(--smoke);
  font-size: 1.3rem;
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.3s;
}
.drawer-link:hover .arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--accent);
}

.drawer-foot {
  padding: 24px 28px 32px;
  border-top: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.hotline {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.eyebrow-gold {
  font-family: var(--font-condensed);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
}
.hotline a {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  letter-spacing: 1px;
}
.social {
  display: flex;
  gap: 10px;
}
.social a {
  width: 38px; height: 38px;
  border: 1px solid var(--rule-strong);
  color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.25s;
  border-radius: 50%;
}
.social a:hover {
  background: var(--accent);
  color: var(--on-accent);
  transform: translateY(-2px);
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.2, 1);
}
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

@keyframes drawer-in {
  to { opacity: 1; transform: translateX(0); }
}

@media (min-width: 480px) {
  .site-nav { gap: 12px; }
  .nav-logo { font-size: 1.3rem; letter-spacing: 3.5px; }
  .nav-actions { gap: 4px; }
  .icon-btn { width: 40px; height: 40px; }
}

@media (min-width: 900px) {
  .site-nav { gap: 16px; }
  .nav-logo { font-size: 1.6rem; letter-spacing: 6px; }
  .nav-actions { gap: 6px; }
  .icon-btn { width: 44px; height: 44px; }
}
</style>
