<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import {
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from '~/composables/useAuthMutation';
import {
  useMyOrdersQuery,
  ORDER_STATUS_LABEL,
  PAYMENT_METHOD_LABEL,
  type OrderStatus,
} from '~/composables/useOrders';
import { useWishlistQuery, useWishlistMutations } from '~/composables/useWishlist';
import {
  useAddressesQuery,
  useAddressMutations,
  type Address,
  type AddressInput,
} from '~/composables/useAddresses';
import { useNotifications } from '~/composables/notifications';
import { formatPrice } from '~/shared/utils/format';

useHead({
  title: 'Tài khoản — IRONMAN',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});

const router = useRouter();
const route = useRoute();
const { isAuthenticated, user, logout, fetchUserProfile, updateUserLocal } = useAuth();

// Guard: chưa đăng nhập → về login
if (import.meta.client && !isAuthenticated.value) {
  router.replace({ path: '/login', query: { redirect: '/account' } });
}

onMounted(() => {
  if (isAuthenticated.value && !user.value?.createdAt) fetchUserProfile();
});

const showLogoutConfirm = ref(false);
function handleLogout() {
  showLogoutConfirm.value = true;
}
function confirmLogout() {
  showLogoutConfirm.value = false;
  logout();
}

type Tab = 'orders' | 'wishlist' | 'addresses' | 'profile';
const VALID_TABS: Tab[] = ['orders', 'wishlist', 'addresses', 'profile'];
const tab = ref<Tab>('profile');

const navItems: { key: Tab; label: string; icon: string }[] = [
  { key: 'profile', label: 'Hồ sơ', icon: 'bx-user' },
  { key: 'addresses', label: 'Sổ địa chỉ', icon: 'bx-map' },
  { key: 'orders', label: 'Đơn hàng', icon: 'bx-package' },
  { key: 'wishlist', label: 'Yêu thích', icon: 'bx-heart' },
];

// Neo tới form đổi mật khẩu (nằm trong tab Hồ sơ)
const passwordSection = ref<HTMLElement | null>(null);
function scrollToPassword() {
  nextTick(() => {
    passwordSection.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// Đồng bộ tab + section từ query (?tab=profile&section=password)
watch(
  () => route.query,
  (q) => {
    const qt = q.tab as string | undefined;
    if (qt && VALID_TABS.includes(qt as Tab)) tab.value = qt as Tab;
    if (q.section === 'password') {
      tab.value = 'profile';
      scrollToPassword();
    }
  },
  { immediate: true },
);

// Chữ cái đầu cho avatar
const initial = computed(() => {
  const s = user.value?.fullName || user.value?.email || '?';
  return s.trim().charAt(0).toUpperCase();
});
const memberSince = computed(() => {
  if (!user.value?.createdAt) return '';
  return new Date(user.value.createdAt).toLocaleDateString('vi-VN', {
    month: 'long', year: 'numeric',
  });
});

// ─── Wishlist ─────────────────────────────────────────────────────────────
const { data: wishlistData, isPending: wishlistLoading } = useWishlistQuery();
const wishlist = computed(() => wishlistData.value ?? []);
const { remove: removeWish } = useWishlistMutations();

// ─── Đơn hàng ─────────────────────────────────────────────────────────────
const { data: ordersData, isPending: ordersLoading } = useMyOrdersQuery();
const orders = computed(() => ordersData.value?.items ?? []);

// Badge theo trạng thái: [text, bg, border]
const statusBadge: Record<OrderStatus, string> = {
  PENDING: 'text-amber-700 bg-amber-500/10 border-amber-500/30',
  CONFIRMED: 'text-blue-700 bg-blue-500/10 border-blue-500/30',
  SHIPPING: 'text-accent bg-mix-accent-10 border-accent/30',
  DELIVERED: 'text-olive bg-mix-olive-10 border-olive/30',
  CANCELLED: 'text-oxblood bg-mix-oxblood-10 border-oxblood/30',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}
function shortId(id: string) {
  return id.slice(0, 8).toUpperCase();
}

// ─── Sổ địa chỉ ─────────────────────────────────────────────────────────────
const { data: addressData, isPending: addressLoading } = useAddressesQuery(computed(() => tab.value === 'addresses'));
const addresses = computed(() => addressData.value ?? []);
const { create: createAddr, update: updateAddr, remove: removeAddr } = useAddressMutations();

const { notify } = useNotifications();

const emptyAddr = (): AddressInput => ({
  fullName: '', phone: '', line: '', provinceCode: '', wardCode: '', isDefault: false,
});
const addrForm = ref<AddressInput>(emptyAddr());
const editingId = ref<string | null>(null);
const showAddrForm = ref(false);
const savingAddr = computed(() => createAddr.isPending.value || updateAddr.isPending.value);

function openAddrCreate() {
  addrForm.value = emptyAddr();
  editingId.value = null;
  showAddrForm.value = true;
}
function openAddrEdit(a: Address) {
  addrForm.value = {
    fullName: a.fullName, phone: a.phone, line: a.line,
    provinceCode: a.provinceCode, wardCode: a.wardCode, isDefault: a.isDefault,
  };
  editingId.value = a.id;
  showAddrForm.value = true;
}
function cancelAddr() {
  showAddrForm.value = false;
  editingId.value = null;
}
function saveAddress() {
  const f = addrForm.value;
  if (!f.fullName || !f.phone || !f.line || !f.provinceCode || !f.wardCode) {
    notify('warning', 'Vui lòng nhập đủ họ tên, SĐT, địa chỉ, tỉnh/thành và phường/xã');
    return;
  }
  const isEditing = !!editingId.value;
  const body = { ...f };
  const opts = {
    onSuccess: () => {
      showAddrForm.value = false;
      editingId.value = null;
      notify('success', isEditing ? 'Đã cập nhật địa chỉ' : 'Đã thêm địa chỉ');
    },
    onError: (e: any) => notify('error', e?.data?.message || 'Lưu địa chỉ thất bại'),
  };
  if (editingId.value) updateAddr.mutate({ id: editingId.value, body }, opts);
  else createAddr.mutate(body, opts);
}
function setDefaultAddr(a: Address) {
  if (a.isDefault) return;
  updateAddr.mutate(
    { id: a.id, body: { isDefault: true } },
    { onSuccess: () => notify('success', 'Đã đặt địa chỉ mặc định') },
  );
}
function deleteAddr(a: Address) {
  if (import.meta.client && !window.confirm('Xoá địa chỉ này?')) return;
  removeAddr.mutate(a.id, {
    onSuccess: () => notify('success', 'Đã xoá địa chỉ'),
    onError: (e: any) => notify('error', e?.data?.message || 'Xoá địa chỉ thất bại'),
  });
}
function fullAddress(a: Address) {
  return [a.line, a.wardName, a.provinceName].filter(Boolean).join(', ');
}

// ─── Hồ sơ ────────────────────────────────────────────────────────────────
const profileForm = reactive({ fullName: '', phone: '', address: '' });
const profileMsg = ref('');
watchEffect(() => {
  if (user.value) {
    profileForm.fullName = user.value.fullName ?? '';
    profileForm.phone = (user.value as any).phone ?? '';
    profileForm.address = (user.value as any).address ?? '';
  }
});

const { mutate: updateProfile, isPending: savingProfile } = useUpdateProfileMutation();
function saveProfile() {
  profileMsg.value = '';
  updateProfile(
    { ...profileForm },
    {
      onSuccess: (data: any) => {
        if (data) updateUserLocal(data);
        profileMsg.value = 'Đã lưu thông tin';
      },
      onError: (e: any) => { profileMsg.value = e?.data?.message || 'Lưu thất bại'; },
    },
  );
}

// ─── Đổi mật khẩu ───────────────────────────────────────────────────────────
const pwForm = reactive({ oldPassword: '', newPassword: '', confirm: '' });
const showPw = reactive({ old: false, new: false, confirm: false });
const pwMsg = ref('');
const pwError = ref(false);
const { mutate: changePassword, isPending: savingPw } = useChangePasswordMutation();
function submitPassword() {
  pwMsg.value = '';
  pwError.value = false;
  if (pwForm.newPassword.length < 6) {
    pwError.value = true; pwMsg.value = 'Mật khẩu mới tối thiểu 6 ký tự'; return;
  }
  if (pwForm.newPassword !== pwForm.confirm) {
    pwError.value = true; pwMsg.value = 'Xác nhận mật khẩu không khớp'; return;
  }
  changePassword(
    { oldPassword: pwForm.oldPassword, newPassword: pwForm.newPassword },
    {
      onSuccess: () => {
        pwMsg.value = 'Đổi mật khẩu thành công';
        pwForm.oldPassword = pwForm.newPassword = pwForm.confirm = '';
      },
      onError: (e: any) => { pwError.value = true; pwMsg.value = e?.data?.message || 'Đổi mật khẩu thất bại'; },
    },
  );
}

// ─── style tokens dùng chung ─────────────────────────────────────────────────
const fieldLabel = 'block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5';
const fieldInput = 'w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent';
</script>

<template>
  <main class="min-h-screen bg-bg text-text pt-[110px] pb-lg max-[900px]:pt-[92px]">
    <!-- Hero band -->
    <div class="relative overflow-hidden border-b border-rule bg-card/40">
      <div
        class="pointer-events-none absolute inset-0 opacity-60"
        :style="{ background: 'radial-gradient(120% 140% at 85% -20%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 55%)' }"
      />
      <div class="relative px-gutter py-10 max-[900px]:px-6 max-[900px]:py-8">
        <span class="eyebrow">Không gian riêng</span>
        <div class="flex items-end justify-between flex-wrap gap-4 mt-2">
          <h1 class="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.05] m-0">
            Tài Khoản
          </h1>
          <p class="font-condensed text-[0.8rem] tracking-[2px] uppercase text-smoke mb-1">
            Xin chào, <span class="text-accent">{{ user?.fullName || user?.email }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="px-gutter mt-8 max-[900px]:px-6 grid grid-cols-[280px_1fr] gap-8 items-start max-[980px]:grid-cols-1 max-[980px]:gap-6">
      <!-- ═══ SIDEBAR ═══ -->
      <aside class="max-[980px]:contents">
        <!-- Profile card -->
        <div class="card-luxury bg-card !p-0 overflow-hidden max-[980px]:order-1">
          <div
            class="p-6 flex flex-col items-center text-center border-b border-rule"
            :style="{ background: 'linear-gradient(160deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent)' }"
          >
            <div class="w-18 h-18 rounded-full flex-center font-display text-[1.8rem] font-bold text-on-accent bg-accent shadow-lg">
              {{ initial }}
            </div>
            <h2 class="font-display text-[1.15rem] font-bold mt-3 mb-0 leading-tight break-word">
              {{ user?.fullName || 'Khách hàng' }}
            </h2>
            <p class="text-[0.8rem] text-smoke m-0 mt-0.5 break-word">{{ user?.email }}</p>
            <span
              v-if="user?.role"
              class="mt-2 inline-block font-condensed text-[0.6rem] tracking-[2px] uppercase text-accent border border-accent/40 rounded-full px-2.5 py-0.5"
            >
              {{ user.role === 'ADMIN' ? 'Quản trị' : 'Thành viên' }}
            </span>
            <p v-if="memberSince" class="text-[0.68rem] text-smoke m-0 mt-2">Tham gia từ {{ memberSince }}</p>
          </div>

          <!-- Nav -->
          <nav class="p-2 max-[980px]:flex max-[980px]:overflow-x-auto max-[980px]:p-2">
            <button
              v-for="item in navItems"
              :key="item.key"
              class="w-full flex items-center gap-3 px-4 py-3 font-condensed text-[0.82rem] tracking-[1.5px] uppercase cursor-pointer border-l-2 transition-all duration-250 text-left max-[980px]:w-auto max-[980px]:whitespace-nowrap max-[980px]:border-l-0 max-[980px]:border-b-2"
              :class="tab === item.key
                ? 'border-accent text-accent bg-mix-accent-8'
                : 'border-transparent text-mid hover:text-text hover:bg-card-alt/50'"
              @click="tab = item.key"
            >
              <i :class="`bx ${item.icon} text-[1.1rem]`" />
              <span>{{ item.label }}</span>
            </button>
          </nav>

          <div class="p-2 border-t border-rule max-[980px]:hidden">
            <button
              class="w-full flex items-center gap-3 px-4 py-3 font-condensed text-[0.82rem] font-bold tracking-[1.5px] uppercase cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              @click="handleLogout"
            >
              <i class="bx bx-log-out text-[1.1rem]" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        <!-- Quick stats -->
        <div class="grid grid-cols-3 gap-2 mt-4 max-[980px]:order-2 max-[980px]:mt-0">
          <div class="card-luxury bg-card !p-3 text-center">
            <p class="font-display text-[1.4rem] font-bold text-accent m-0 leading-none">{{ orders.length }}</p>
            <p class="font-condensed text-[0.6rem] tracking-[1.5px] uppercase text-smoke m-0 mt-1">Đơn hàng</p>
          </div>
          <div class="card-luxury bg-card !p-3 text-center">
            <p class="font-display text-[1.4rem] font-bold text-accent m-0 leading-none">{{ wishlist.length }}</p>
            <p class="font-condensed text-[0.6rem] tracking-[1.5px] uppercase text-smoke m-0 mt-1">Yêu thích</p>
          </div>
          <div class="card-luxury bg-card !p-3 text-center">
            <p class="font-display text-[1.4rem] font-bold text-accent m-0 leading-none">{{ addresses.length }}</p>
            <p class="font-condensed text-[0.6rem] tracking-[1.5px] uppercase text-smoke m-0 mt-1">Địa chỉ</p>
          </div>
        </div>

        <!-- Mobile logout -->
        <button
          class="hidden max-[980px]:flex max-[980px]:order-3 items-center justify-center gap-2 btn-outline !text-red-600 !border-red-600/50 hover:!bg-red-600 hover:!text-white"
          @click="handleLogout"
        >
          <i class="bx bx-log-out text-[1.1rem]" />
          Đăng xuất
        </button>
      </aside>

      <!-- ═══ CONTENT ═══ -->
      <section class="min-w-0 max-[980px]:order-4">
        <!-- ─── ORDERS ─── -->
        <div v-if="tab === 'orders'">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="font-display text-[1.5rem] font-bold m-0">Đơn hàng của tôi</h2>
            <span class="hairline flex-1" />
          </div>

          <div v-if="ordersLoading" class="flex flex-col gap-4">
            <div v-for="i in 2" :key="i" class="card-luxury bg-card h-32 animate-pulse opacity-50" />
          </div>

          <div v-else-if="!orders.length" class="card-luxury bg-card flex flex-col items-center text-center py-16">
            <i class="bx bx-package text-[3rem] text-accent/40" />
            <p class="text-mid mt-3 mb-0">Bạn chưa có đơn hàng nào.</p>
            <NuxtLink to="/#products" class="btn-gold mt-5 no-underline">Mua sắm ngay</NuxtLink>
          </div>

          <div v-else class="flex flex-col gap-4">
            <article
              v-for="o in orders"
              :key="o.id"
              class="card-luxury bg-card !p-0 overflow-hidden hover:border-accent transition-colors"
            >
              <div class="flex items-center justify-between flex-wrap gap-2 px-5 py-4 bg-card-alt/40 border-b border-rule">
                <div class="flex items-baseline gap-3">
                  <span class="font-mono font-bold text-text">#{{ shortId(o.id) }}</span>
                  <span class="text-[0.78rem] text-smoke">{{ formatDate(o.createdAt) }}</span>
                </div>
                <span
                  class="font-condensed text-[0.68rem] font-bold tracking-[1.5px] uppercase border rounded-full px-3 py-1"
                  :class="statusBadge[o.status]"
                >
                  {{ ORDER_STATUS_LABEL[o.status] }}
                </span>
              </div>
              <div class="px-5 py-4 flex flex-col gap-3">
                <div v-for="item in o.items" :key="item.id" class="flex items-center gap-3">
                  <CommonProductMedia
                    :src="item.product?.images?.[0]"
                    :alt="item.product?.name"
                    aspect="1/1"
                    :icon-size="22"
                    class="w-14 h-14 flex-shrink-0 border border-rule"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-[0.88rem] text-text truncate m-0">{{ item.product?.name ?? 'Sản phẩm đã xoá' }}</p>
                    <p class="text-[0.72rem] text-smoke m-0 mt-0.5">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                  </div>
                  <span class="text-[0.88rem] font-semibold text-text whitespace-nowrap">{{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between px-5 py-4 border-t border-rule">
                <span class="font-condensed text-[0.72rem] tracking-[1px] uppercase text-smoke">
                  {{ PAYMENT_METHOD_LABEL[o.paymentMethod] ?? o.paymentMethod }}
                </span>
                <span class="font-display text-[1.15rem] font-bold text-accent">{{ formatPrice(o.totalPrice) }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- ─── WISHLIST ─── -->
        <div v-else-if="tab === 'wishlist'">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="font-display text-[1.5rem] font-bold m-0">Sản phẩm yêu thích</h2>
            <span class="hairline flex-1" />
          </div>

          <div v-if="wishlistLoading" class="grid grid-cols-2 min-[720px]:grid-cols-3 gap-4">
            <div v-for="i in 3" :key="i" class="card-luxury bg-card h-64 animate-pulse opacity-50" />
          </div>

          <div v-else-if="!wishlist.length" class="card-luxury bg-card flex flex-col items-center text-center py-16">
            <i class="bx bx-heart text-[3rem] text-accent/40" />
            <p class="text-mid mt-3 mb-0">Chưa có sản phẩm yêu thích.</p>
            <NuxtLink to="/#products" class="btn-gold mt-5 no-underline">Khám phá sản phẩm</NuxtLink>
          </div>

          <div v-else class="grid grid-cols-2 min-[720px]:grid-cols-3 gap-4">
            <div
              v-for="w in wishlist"
              :key="w.id"
              class="card-luxury bg-card !p-0 group relative overflow-hidden hover:border-accent transition-colors"
            >
              <NuxtLink :to="`/products/${w.product.slug}`" class="no-underline text-inherit block card-media-hover">
                <CommonProductMedia :src="w.product.images?.[0]" :alt="w.product.name" aspect="3/4" :icon-size="44" />
                <div class="p-3">
                  <span class="font-condensed text-[0.6rem] tracking-[2px] uppercase text-accent">{{ w.product.brand }}</span>
                  <h3 class="font-display text-[0.92rem] font-semibold text-text m-0 my-1 leading-[1.3] line-clamp-2">{{ w.product.name }}</h3>
                  <span class="font-display font-bold text-accent text-[0.95rem]">{{ formatPrice(w.product.salePrice ?? w.product.price) }}</span>
                </div>
              </NuxtLink>
              <button
                aria-label="Bỏ yêu thích"
                class="absolute top-2 right-2 w-8 h-8 rounded-full bg-bg/85 backdrop-blur text-oxblood flex-center cursor-pointer border border-rule hover:bg-oxblood hover:text-white transition-colors"
                @click="removeWish.mutate(w.product.id)"
              >
                <i class="bx bxs-heart text-[0.9rem]" />
              </button>
            </div>
          </div>
        </div>

        <!-- ─── ADDRESSES ─── -->
        <div v-else-if="tab === 'addresses'">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="font-display text-[1.5rem] font-bold m-0">Sổ địa chỉ</h2>
            <span class="hairline flex-1" />
            <button v-if="!showAddrForm" class="btn-ghost-gold !py-2 !px-4 whitespace-nowrap" @click="openAddrCreate">
              <i class="bx bx-plus" /> Thêm mới
            </button>
          </div>

          <!-- Form thêm / sửa -->
          <div v-if="showAddrForm" class="card-luxury bg-card mb-6">
            <h3 class="font-display text-[1.1rem] font-bold m-0 mb-4">
              {{ editingId ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới' }}
            </h3>
            <CommonAddressForm v-model="addrForm" />
            <div class="flex gap-3 mt-5">
              <button :disabled="savingAddr" class="btn-gold disabled:opacity-60" @click="saveAddress">
                {{ savingAddr ? 'Đang lưu...' : 'Lưu địa chỉ' }}
              </button>
              <button class="btn-outline" @click="cancelAddr">Huỷ</button>
            </div>
          </div>

          <!-- Danh sách -->
          <div v-if="addressLoading" class="flex flex-col gap-4">
            <div v-for="i in 2" :key="i" class="card-luxury bg-card h-28 animate-pulse opacity-50" />
          </div>
          <div v-else-if="!addresses.length && !showAddrForm" class="card-luxury bg-card flex flex-col items-center text-center py-16">
            <i class="bx bx-map text-[3rem] text-accent/40" />
            <p class="text-mid mt-3 mb-0">Chưa có địa chỉ giao hàng.</p>
            <button class="btn-gold mt-5" @click="openAddrCreate">Thêm địa chỉ đầu tiên</button>
          </div>
          <div v-else class="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
            <article
              v-for="a in addresses"
              :key="a.id"
              class="card-luxury bg-card relative flex flex-col"
              :class="a.isDefault ? 'border-accent' : ''"
            >
              <span
                v-if="a.isDefault"
                class="absolute top-4 right-4 font-condensed text-[0.6rem] tracking-[1.5px] uppercase text-on-accent bg-accent rounded-full px-2.5 py-0.5"
              >
                Mặc định
              </span>
              <div class="flex items-center gap-2 pr-20">
                <span class="font-display text-[1.05rem] font-bold">{{ a.fullName }}</span>
              </div>
              <p class="text-[0.85rem] text-mid m-0 mt-0.5">{{ a.phone }}</p>
              <p class="text-[0.85rem] text-smoke m-0 mt-2 leading-relaxed flex-1">{{ fullAddress(a) }}</p>
              <div class="flex items-center gap-4 mt-4 pt-3 border-t border-rule">
                <button
                  v-if="!a.isDefault"
                  class="font-condensed text-[0.7rem] tracking-[1.5px] uppercase text-accent hover:underline cursor-pointer"
                  @click="setDefaultAddr(a)"
                >
                  Đặt mặc định
                </button>
                <button class="font-condensed text-[0.7rem] tracking-[1.5px] uppercase text-mid hover:text-text cursor-pointer" @click="openAddrEdit(a)">
                  Sửa
                </button>
                <button class="font-condensed text-[0.7rem] tracking-[1.5px] uppercase text-oxblood hover:underline cursor-pointer ml-auto" @click="deleteAddr(a)">
                  Xoá
                </button>
              </div>
            </article>
          </div>
        </div>

        <!-- ─── PROFILE (gồm cả Đổi mật khẩu) ─── -->
        <div v-else-if="tab === 'profile'" class="grid grid-cols-2 gap-6 items-start max-[820px]:grid-cols-1">
          <!-- Cột trái: Thông tin cá nhân -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <h2 class="font-display text-[1.5rem] font-bold m-0 whitespace-nowrap">Thông tin cá nhân</h2>
              <span class="hairline flex-1" />
            </div>
            <div class="card-luxury bg-card h-full">
              <div class="mb-4">
                <label :class="fieldLabel">Email</label>
                <input :value="user?.email" type="email" disabled :class="[fieldInput, 'opacity-60 cursor-not-allowed']" />
              </div>
              <div class="mb-4">
                <label :class="fieldLabel">Họ và tên</label>
                <input v-model="profileForm.fullName" type="text" :class="fieldInput" />
              </div>
              <div class="mb-4">
                <label :class="fieldLabel">Số điện thoại</label>
                <input v-model="profileForm.phone" type="tel" :class="fieldInput" />
              </div>
              <div class="mb-4">
                <label :class="fieldLabel">Địa chỉ</label>
                <input v-model="profileForm.address" type="text" :class="fieldInput" />
              </div>
              <p v-if="profileMsg" class="text-[0.82rem] text-olive mb-3">{{ profileMsg }}</p>
              <button :disabled="savingProfile" class="btn-gold disabled:opacity-60" @click="saveProfile">
                {{ savingProfile ? 'Đang lưu...' : 'Lưu thay đổi' }}
              </button>
            </div>
          </div>

          <!-- Cột phải: Đổi mật khẩu -->
          <div ref="passwordSection" class="scroll-mt-[120px]">
            <div class="flex items-center gap-3 mb-6">
              <i class="bx bx-lock-alt text-[1.3rem] text-accent" />
              <h2 class="font-display text-[1.5rem] font-bold m-0 whitespace-nowrap">Đổi mật khẩu</h2>
              <span class="hairline flex-1" />
            </div>
            <div class="card-luxury bg-card h-full">
            <div class="mb-4">
              <label :class="fieldLabel">Mật khẩu hiện tại</label>
              <div class="relative">
                <input v-model="pwForm.oldPassword" :type="showPw.old ? 'text' : 'password'" :class="[fieldInput, 'pr-10']" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-accent cursor-pointer flex items-center justify-center" @click="showPw.old = !showPw.old">
                  <i class="bx text-[1.1rem]" :class="showPw.old ? 'bx-show' : 'bx-hide'" />
                </button>
              </div>
            </div>
            <div class="mb-4">
              <label :class="fieldLabel">Mật khẩu mới</label>
              <div class="relative">
                <input v-model="pwForm.newPassword" :type="showPw.new ? 'text' : 'password'" :class="[fieldInput, 'pr-10']" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-accent cursor-pointer flex items-center justify-center" @click="showPw.new = !showPw.new">
                  <i class="bx text-[1.1rem]" :class="showPw.new ? 'bx-show' : 'bx-hide'" />
                </button>
              </div>
            </div>
            <div class="mb-4">
              <label :class="fieldLabel">Xác nhận mật khẩu mới</label>
              <div class="relative">
                <input v-model="pwForm.confirm" :type="showPw.confirm ? 'text' : 'password'" :class="[fieldInput, 'pr-10']" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-accent cursor-pointer flex items-center justify-center" @click="showPw.confirm = !showPw.confirm">
                  <i class="bx text-[1.1rem]" :class="showPw.confirm ? 'bx-show' : 'bx-hide'" />
                </button>
              </div>
            </div>
            <p v-if="pwMsg" class="text-[0.82rem] mb-3" :class="pwError ? 'text-oxblood' : 'text-olive'">{{ pwMsg }}</p>
            <button :disabled="savingPw" class="btn-gold disabled:opacity-60" @click="submitPassword">
              {{ savingPw ? 'Đang xử lý...' : 'Đổi mật khẩu' }}
            </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>

  <!-- Popup Confirm Logout -->
  <div v-if="showLogoutConfirm" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showLogoutConfirm = false"></div>
    
    <!-- Modal content -->
    <div class="relative bg-surface border border-rule w-full max-w-[400px] p-6 shadow-2xl animate-fade-in animate-duration-200">
      <h3 class="font-display text-[1.4rem] font-bold text-text mb-3 m-0">Đăng xuất</h3>
      <p class="font-body text-[0.95rem] text-mid mb-6 m-0 leading-relaxed">
        Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình?
      </p>
      
      <div class="flex items-center gap-3 justify-end">
        <button
          class="btn-outline flex-1 sm:flex-none text-[0.8rem] py-2 px-6"
          @click="showLogoutConfirm = false"
        >
          Hủy
        </button>
        <button
          class="btn-primary bg-red-600 hover:bg-red-700 flex-1 sm:flex-none text-[0.8rem] py-2 px-6"
          @click="confirmLogout"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
</template>

