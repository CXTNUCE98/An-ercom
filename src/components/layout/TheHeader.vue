<script setup lang="ts">
import { useScrolled } from '~/composables/useScrolled';
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { useAuth } from '~/composables/useAuth';
import { useWishlistQuery } from '~/composables/useWishlist';
import { catalogService } from '~/features/catalog/services/catalogService';
import { formatPrice } from '~/shared/utils/format';
import type { CatalogProduct } from '~/types/landing';

const { isScrolled } = useScrolled(20);
const cart = useCartStore();
const { isAuthenticated, user, logout } = useAuth();
const drawerOpen = ref(false);
const router = useRouter();
const route = useRoute();

// Số sản phẩm yêu thích — hiện badge cạnh mục "Yêu thích" trong dropdown.
const { data: wishlistData } = useWishlistQuery();
const wishlistCount = computed(() => wishlistData.value?.length ?? 0);

// ─── User dropdown ──────────────────────────────────────────────────────────
const userMenuOpen = ref(false);
let userMenuTimer: ReturnType<typeof setTimeout> | null = null;

// Tên hiển thị ngắn gọn + chữ cái đầu cho avatar
const displayName = computed(() => user.value?.fullName || user.value?.email?.split('@')[0] || 'Tài khoản');
const userInitial = computed(() => {
  const s = user.value?.fullName || user.value?.email || '?';
  return s.trim().charAt(0).toUpperCase();
});

const accountMenu = [
  { label: 'Hồ sơ',      icon: 'bx-user',    to: '/account?tab=profile',   key: 'profile' },
  { label: 'Sổ địa chỉ', icon: 'bx-map',     to: '/account?tab=addresses', key: 'addresses' },
  { label: 'Đơn hàng',   icon: 'bx-package', to: '/account?tab=orders',    key: 'orders' },
  { label: 'Yêu thích',  icon: 'bx-heart',   to: '/account?tab=wishlist',  key: 'wishlist' },
];

function openUserMenu() {
  if (userMenuTimer) { clearTimeout(userMenuTimer); userMenuTimer = null; }
  userMenuOpen.value = true;
}
function scheduleCloseUserMenu() {
  if (userMenuTimer) clearTimeout(userMenuTimer);
  userMenuTimer = setTimeout(() => { userMenuOpen.value = false; }, 160);
}
function closeUserMenu() {
  if (userMenuTimer) { clearTimeout(userMenuTimer); userMenuTimer = null; }
  userMenuOpen.value = false;
}
function goAccount(to: string) {
  closeUserMenu();
  router.push(to);
}

const showLogoutConfirm = ref(false);
function handleLogout() {
  closeUserMenu();
  showLogoutConfirm.value = true;
}
async function confirmLogout() {
  showLogoutConfirm.value = false;
  logout();
  await router.push('/');
}

const searchOpen = ref(false);
const searchQuery = ref('');
const searchLoading = ref(false);
const searchResults = ref<CatalogProduct[]>([]);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

function toggleSearch() {
  searchOpen.value = !searchOpen.value;
  if (!searchOpen.value) {
    searchQuery.value = '';
    searchResults.value = [];
  }
}

function closeSearch() {
  searchOpen.value = false;
  searchQuery.value = '';
  searchResults.value = [];
}

watch(searchQuery, (newVal) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  if (!newVal.trim()) {
    searchResults.value = [];
    return;
  }
  searchTimeout = setTimeout(async () => {
    searchLoading.value = true;
    try {
      const res = await catalogService.listProducts({ search: newVal.trim() }, 'newest', 1, 5);
      searchResults.value = res.items;
    } catch (e) {
      console.error(e);
    } finally {
      searchLoading.value = false;
    }
  }, 300);
});

const QUICK_LINKS = [
  { label: 'Trang Chủ',     hash: '#top',      icon: 'bx-home-alt' },
  { label: 'Sản Phẩm',      hash: '#products', icon: 'bx-diamond' },
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

// Reusable utility class strings
const iconBtn =
  'relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-transparent border border-transparent text-mid text-[1.2rem] cursor-pointer no-underline rounded-full transition-all duration-250 hover:text-accent hover:border-rule hover:bg-mix-accent-8';

const drawerLink =
  'relative grid grid-cols-[34px_22px_1fr_auto] items-center gap-[14px] py-4 px-7 no-underline font-display text-[1.05rem] text-text border-b border-rule opacity-0 translate-x-5 animate-fade-up-x transition-[background,padding-left] duration-300 hover:bg-mix-accent-6 hover:pl-9 before:content-[\'\'] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-accent before:scale-y-0 before:origin-top before:transition-transform before:duration-300 hover:before:scale-y-100 [&_.arrow]:text-smoke [&_.arrow]:opacity-0 [&_.arrow]:-translate-x-1.5 [&_.arrow]:transition-all [&_.arrow]:duration-300 hover:[&_.arrow]:opacity-100 hover:[&_.arrow]:translate-x-0 hover:[&_.arrow]:text-accent';
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 px-gutter max-w-screen box-border border-b border-transparent transition-[padding,border-color,background] duration-300 backdrop-blur-[14px] backdrop-saturate-150"
    :style="{
      background: isScrolled
        ? 'color-mix(in srgb, var(--bg) 94%, transparent)'
        : 'color-mix(in srgb, var(--bg) 85%, transparent)'
    }"
    :class="[isScrolled ? 'border-b-rule py-1.5 sm:py-2' : 'py-3.5 sm:py-5']"
  >
    <a
      href="#top"
      class="font-display font-extrabold text-accent no-underline leading-none min-w-0 flex-shrink whitespace-nowrap tracking-[2.5px] sm:tracking-[3.5px] transition-[font-size,letter-spacing] duration-300"
      :class="isScrolled
        ? 'text-[1.05rem] sm:text-[1.15rem] lg:text-[1.3rem] lg:tracking-[4px]'
        : 'text-[1.15rem] sm:text-[1.3rem] lg:text-[1.6rem] lg:tracking-[6px]'"
      @click.prevent="goTo('#top')"
    >
      IRON<span class="text-text">MAN</span>
    </a>

    <div class="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 flex-shrink-0">
      <button type="button" :class="iconBtn" aria-label="Tìm sản phẩm" @click="toggleSearch">
        <i class="bx" :class="searchOpen ? 'bx-x' : 'bx-search-alt'" />
      </button>
      <button type="button" :class="iconBtn" aria-label="Giỏ hàng" @click="cart.openDrawer()">
        <i class="bx bx-shopping-bag" />
        <span
          v-if="cart.count > 0"
          class="absolute top-0.5 right-0.5 bg-oxblood text-[#fbf6ea] font-condensed text-[0.58rem] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center leading-none border-2 border-bg"
        >{{ cart.count }}</span>
      </button>
      <!-- Chưa đăng nhập → link tới trang đăng nhập -->
      <NuxtLink
        v-if="!isAuthenticated"
        to="/login"
        :class="iconBtn"
        aria-label="Đăng nhập"
      >
        <i class="bx bx-user" />
      </NuxtLink>

      <!-- Đã đăng nhập → tên user + dropdown khi hover -->
      <div
        v-else
        class="relative"
        @mouseenter="openUserMenu"
        @mouseleave="scheduleCloseUserMenu"
      >
        <NuxtLink
          to="/account?tab=profile"
          class="flex items-center gap-2 h-9 sm:h-10 lg:h-11 pl-1.5 pr-1.5 sm:pr-3 rounded-full border border-transparent no-underline text-mid cursor-pointer transition-all duration-250 hover:text-accent hover:border-rule hover:bg-mix-accent-8"
          :class="userMenuOpen ? 'text-accent border-rule bg-mix-accent-8' : ''"
          aria-label="Tài khoản"
          :aria-expanded="userMenuOpen"
        >
          <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-center font-display text-[0.85rem] font-bold text-on-accent bg-accent flex-shrink-0">
            {{ userInitial }}
          </span>
          <span class="hidden sm:block max-w-[130px] truncate font-condensed text-[0.82rem] font-semibold tracking-[0.5px]">
            {{ displayName }}
          </span>
          <i class="bx bx-chevron-down hidden sm:block text-[1rem] transition-transform duration-250" :class="userMenuOpen ? 'rotate-180' : ''" />
        </NuxtLink>

        <Transition name="fade">
          <div
            v-if="userMenuOpen"
            class="absolute top-full right-0 mt-2 w-60 bg-bg border border-rule rounded-lg overflow-hidden z-[105]"
            :style="{ boxShadow: '0 18px 45px color-mix(in srgb, #000 22%, transparent)' }"
            @mouseenter="openUserMenu"
            @mouseleave="scheduleCloseUserMenu"
          >
            <div class="px-4 py-3.5 border-b border-rule bg-mix-accent-6">
              <p class="font-display text-[0.95rem] font-bold text-text m-0 truncate">{{ user?.fullName || 'Khách hàng' }}</p>
              <p class="font-body text-[0.75rem] text-smoke m-0 mt-0.5 truncate">{{ user?.email }}</p>
            </div>
            <nav class="py-1.5">
              <button
                v-for="item in accountMenu"
                :key="item.to"
                type="button"
                class="w-full flex items-center gap-3 px-4 py-2.5 font-condensed text-[0.82rem] tracking-[1px] text-mid bg-transparent border-0 cursor-pointer text-left transition-colors duration-200 hover:bg-mix-accent-8 hover:text-accent"
                @click="goAccount(item.to)"
              >
                <i class="bx text-[1.1rem] text-accent" :class="item.icon" />
                <span>{{ item.label }}</span>
                <span
                  v-if="item.key === 'wishlist' && wishlistCount > 0"
                  class="ml-auto min-w-5 h-5 px-1.5 rounded-full bg-accent text-on-accent font-condensed text-[0.65rem] font-bold flex items-center justify-center leading-none"
                >{{ wishlistCount }}</span>
              </button>
            </nav>
            <div class="border-t border-rule py-1.5">
              <button
                type="button"
                class="w-full flex items-center gap-3 px-4 py-2.5 font-condensed text-[0.82rem] font-bold tracking-[1px] text-oxblood bg-transparent border-0 cursor-pointer text-left transition-colors duration-200 hover:bg-mix-oxblood-10"
                @click="handleLogout"
              >
                <i class="bx bx-log-out text-[1.1rem]" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <CommonThemeToggle />
      <button :class="iconBtn" aria-label="Mở menu" @click="drawerOpen = true">
        <i class="bx bx-menu" />
      </button>
    </div>

    <Transition name="fade">
      <div
        v-if="drawerOpen"
        class="fixed inset-0 z-[100]"
        @click="drawerOpen = false"
      />
    </Transition>

    <div v-if="searchOpen" class="fixed inset-0 z-[101]" @click="closeSearch" />

    <Transition name="fade">
      <div v-if="searchOpen" class="absolute top-full left-0 right-0 bg-bg border-b border-rule px-gutter py-5 shadow-xl z-[102] flex flex-col items-center">
        <div class="relative w-full max-w-[600px]">
          <i class="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-[1.2rem] text-smoke" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            class="w-full bg-surface border border-rule text-text font-body text-[1rem] py-3 pl-11 pr-4 focus:outline-none focus:border-accent"
            autofocus
          />
        </div>
        <div v-if="searchQuery" class="w-full max-w-[600px] mt-4 flex flex-col">
          <div v-if="searchLoading" class="text-center text-smoke text-[0.85rem] py-4">Đang tìm kiếm...</div>
          <div v-else-if="searchResults.length === 0" class="text-center text-smoke text-[0.85rem] py-4">Không tìm thấy sản phẩm nào.</div>
          <div v-else class="flex flex-col border border-rule bg-card">
            <NuxtLink
              v-for="p in searchResults"
              :key="p.id"
              :to="`/products/${p.slug}`"
              class="flex items-center gap-4 p-3 border-b border-rule last:border-b-0 hover:bg-surface no-underline transition-colors"
              @click="closeSearch"
            >
              <div class="w-12 h-12 flex-shrink-0 border border-rule overflow-hidden bg-surface">
                <CommonProductMedia 
                  :src="p.images?.[0]" 
                  :alt="p.name" 
                  aspect="1/1" 
                  :placeholder-icon="(p.icon as any)"
                  :icon-size="24"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-[0.95rem] font-display font-medium text-text truncate">{{ p.name }}</div>
                <div class="text-[0.85rem] font-condensed font-medium text-accent mt-0.5">{{ formatPrice(p.salePrice ?? p.price) }}</div>
              </div>
            </NuxtLink>
            <div class="p-3 bg-surface border-t border-rule text-center">
              <NuxtLink :to="`/#products`" class="text-[0.8rem] text-mid hover:text-accent font-condensed tracking-[1px] uppercase no-underline" @click="closeSearch">
                Xem tất cả sản phẩm
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="slide-right">
      <aside
        v-if="drawerOpen"
        class="fixed top-0 right-0 h-screen w-[min(88vw,380px)] bg-bg border-l border-rule-strong z-[101] flex flex-col"
        :style="{ boxShadow: '-20px 0 60px color-mix(in srgb, #000 30%, transparent)' }"
        @click.stop
      >
        <div class="flex items-start justify-between py-7 px-7 pb-5 border-b border-rule">
          <div class="flex flex-col gap-1 font-display text-[1.4rem] font-extrabold tracking-[5px] text-accent leading-none">
            IRON<span class="text-text">MAN</span>
            <em class="font-display italic text-[0.72rem] tracking-[1px] text-smoke font-normal">for the man who knows.</em>
          </div>
          <button
            :class="iconBtn"
            class="-mt-1"
            aria-label="Đóng"
            @click="drawerOpen = false"
          >
            <i class="bx bx-x" />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-4">
          <a
            v-for="(link, i) in QUICK_LINKS"
            :key="link.hash"
            href="#"
            :class="drawerLink"
            :style="{ animationDelay: `${0.05 * i + 0.1}s` }"
            @click.prevent="goTo(link.hash)"
          >
            <span class="font-condensed text-[0.7rem] tracking-[2px] text-accent font-bold">0{{ i + 1 }}</span>
            <i class="bx text-[1.15rem] text-accent" :class="link.icon" />
            <span class="tracking-[0.5px]">{{ link.label }}</span>
            <i class="bx bx-right-arrow-alt arrow text-[1.3rem]" />
          </a>
        </nav>

        <div class="py-6 px-7 pt-6 border-t border-rule flex flex-col gap-4.5">
          <div class="flex flex-col gap-1">
            <span class="font-condensed text-[0.68rem] font-semibold tracking-[3px] uppercase text-accent">Hotline 24/7</span>
            <a href="tel:18001234" class="font-display text-[1.5rem] font-bold text-text no-underline tracking-[1px]">1800 1234</a>
          </div>
          <div class="flex gap-2.5">
            <a v-for="s in [
              { label: 'Facebook', icon: 'bxl-facebook' },
              { label: 'Instagram', icon: 'bxl-instagram' },
              { label: 'Zalo', icon: 'bx-chat' },
              { label: 'TikTok', icon: 'bxl-tiktok' },
            ]" :key="s.label" href="#" :aria-label="s.label" class="w-[38px] h-[38px] border border-rule-strong text-accent flex items-center justify-center text-[1.1rem] no-underline rounded-full transition-all duration-300 hover:bg-accent hover:text-on-accent hover:-translate-y-0.5">
              <i class="bx" :class="s.icon" />
            </a>
          </div>
        </div>
      </aside>
    </Transition>

    <!-- Popup xác nhận Đăng xuất -->
    <Transition name="fade">
      <div v-if="showLogoutConfirm" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showLogoutConfirm = false" />
        <div class="relative bg-surface border border-rule w-full max-w-[400px] p-6 shadow-2xl">
          <h3 class="font-display text-[1.4rem] font-bold text-text mb-3 m-0">Đăng xuất</h3>
          <p class="font-body text-[0.95rem] text-mid mb-6 m-0 leading-relaxed">
            Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình?
          </p>
          <div class="flex items-center gap-3 justify-end">
            <button class="btn-outline text-[0.8rem] py-2 px-6" @click="showLogoutConfirm = false">Hủy</button>
            <button class="btn-primary bg-red-600 hover:bg-red-700 text-[0.8rem] py-2 px-6" @click="confirmLogout">Đăng xuất</button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
