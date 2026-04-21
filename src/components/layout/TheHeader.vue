<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/landing';
import { useScrolled } from '~/composables/useScrolled';
import { useCartStore } from '~/features/cart/stores/useCartStore';

const { isScrolled } = useScrolled(20);
const cart = useCartStore();
const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="site-nav" :class="{ 'is-scrolled': isScrolled }">
    <NuxtLink to="/" class="nav-logo">
      IRON<span>MAN</span>
    </NuxtLink>

    <ul class="nav-links">
      <li v-for="item in NAV_ITEMS" :key="item.path">
        <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
      </li>
    </ul>

    <div class="nav-actions">
      <NuxtLink to="/products" class="icon-btn" aria-label="Tìm kiếm">
        <i class="bx bx-search" />
      </NuxtLink>
      <NuxtLink to="/cart" class="icon-btn cart-btn" aria-label="Giỏ hàng">
        <i class="bx bx-shopping-bag" />
        <span v-if="cart.count > 0" class="cart-badge">{{ cart.count }}</span>
      </NuxtLink>
      <CommonThemeToggle />
      <button class="icon-btn mobile-toggle" aria-label="Menu" @click="mobileMenuOpen = !mobileMenuOpen">
        <i class="bx" :class="mobileMenuOpen ? 'bx-x' : 'bx-menu'" />
      </button>
    </div>

    <Transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-menu" @click="mobileMenuOpen = false">
        <NuxtLink v-for="item in NAV_ITEMS" :key="item.path" :to="item.path" class="mobile-link">
          {{ item.name }}
        </NuxtLink>
        <NuxtLink to="/products" class="mobile-link">Tất Cả Sản Phẩm</NuxtLink>
        <NuxtLink to="/cart" class="mobile-link">
          Giỏ Hàng
          <span v-if="cart.count > 0" class="mobile-badge">{{ cart.count }}</span>
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 40px;
  padding: 16px 56px;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: padding 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}
.site-nav.is-scrolled {
  padding: 12px 56px;
  border-bottom-color: var(--rule);
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 5px;
  color: var(--accent);
  text-decoration: none;
}
.nav-logo span { color: var(--text); }

.nav-links {
  display: flex;
  justify-content: center;
  gap: 28px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links a {
  font-family: var(--font-condensed);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--mid);
  text-decoration: none;
  position: relative;
  padding-bottom: 3px;
  transition: color 0.25s;
}
.nav-links a::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  height: 1px; width: 0;
  background: var(--accent);
  transition: width 0.3s;
}
.nav-links a:hover { color: var(--accent); }
.nav-links a:hover::after { width: 100%; }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-btn {
  background: transparent;
  border: none;
  color: var(--mid);
  font-size: 1.15rem;
  cursor: pointer;
  padding: 6px;
  transition: color 0.25s;
  text-decoration: none;
  position: relative;
}
.icon-btn:hover { color: var(--accent); }

.cart-btn { position: relative; }
.cart-badge {
  position: absolute;
  top: -2px; right: -6px;
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-condensed);
  font-size: 0.6rem;
  font-weight: 700;
  min-width: 16px; height: 16px;
  border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  line-height: 1;
}

.mobile-toggle { display: none; }

.mobile-menu {
  position: absolute;
  top: 100%; left: 0; right: 0;
  background: var(--surface);
  border-bottom: 1px solid var(--rule);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-link {
  font-family: var(--font-condensed);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--mid);
  text-decoration: none;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.25s;
}
.mobile-link:hover { color: var(--accent); }
.mobile-badge {
  background: var(--accent);
  color: var(--on-accent);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 900px) {
  .site-nav { grid-template-columns: auto auto; padding: 14px 24px; gap: 16px; }
  .nav-links { display: none; }
  .mobile-toggle { display: block; }
}
</style>
