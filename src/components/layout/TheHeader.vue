<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/landing';
import { useScrolled } from '~/composables/useScrolled';

const { isScrolled } = useScrolled(20);
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
      <button class="icon-btn" aria-label="Tìm kiếm">
        <i class="bx bx-search" />
      </button>
      <button class="icon-btn" aria-label="Giỏ hàng">
        <i class="bx bx-shopping-bag" />
      </button>
      <CommonThemeToggle />
    </div>
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
  gap: 32px;
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
}
.icon-btn:hover { color: var(--accent); }

@media (max-width: 900px) {
  .site-nav { grid-template-columns: auto auto; padding: 14px 24px; gap: 16px; }
  .nav-links { display: none; }
}
</style>
