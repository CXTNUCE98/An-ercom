<script setup lang="ts">
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { checkoutService } from '~/features/checkout/services/checkoutService';
import type { PaymentMethod } from '~/features/checkout/types';
import {
  useAddressesQuery,
  useAddressMutations,
  type Address,
  type AddressInput,
} from '~/composables/useAddresses';
import { useNotifications } from '~/composables/notifications';
import { formatPrice } from '~/shared/utils/format';

useHead({ title: 'Thanh Toán — IRONMAN' });

const cart = useCartStore();
const router = useRouter();
const { isAuthenticated, getAuthHeaders } = useAuth();
const { notify } = useNotifications();

// ─── Sổ địa chỉ ───────────────────────────────────────────────────────────
const { data: addressData, isPending: addrLoading } = useAddressesQuery();
const addresses = computed(() => addressData.value ?? []);
const { create: createAddr } = useAddressMutations();

const selectedId = ref<string | null>(null);

// Tự chọn địa chỉ mặc định của user khi danh sách tải xong (fallback: địa chỉ đầu).
watchEffect(() => {
  const list = addresses.value;
  if (!list.length) {
    selectedId.value = null;
    return;
  }
  // Nếu lựa chọn hiện tại không còn hợp lệ thì chọn lại.
  if (!selectedId.value || !list.some((a) => a.id === selectedId.value)) {
    selectedId.value = (list.find((a) => a.isDefault) ?? list[0]).id;
  }
});

const selectedAddress = computed(() =>
  addresses.value.find((a) => a.id === selectedId.value) ?? null,
);

function fullAddress(a: Address) {
  return [a.line, a.wardName, a.provinceName].filter(Boolean).join(', ');
}

// ─── Form thêm địa chỉ mới (ngay tại checkout) ───────────────────────────────
const showNewForm = ref(false);
const newAddr = ref<AddressInput>({
  fullName: '', phone: '', line: '', provinceCode: '', wardCode: '', isDefault: false,
});
function openNewForm() {
  newAddr.value = {
    fullName: '', phone: '', line: '', provinceCode: '', wardCode: '',
    isDefault: addresses.value.length === 0,
  };
  showNewForm.value = true;
}
function saveNewAddress() {
  const f = newAddr.value;
  if (!f.fullName || !f.phone || !f.line || !f.provinceCode || !f.wardCode) {
    notify('warning', 'Vui lòng nhập đủ thông tin địa chỉ');
    return;
  }
  createAddr.mutate(f, {
    onSuccess: (created: any) => {
      showNewForm.value = false;
      if (created?.id) selectedId.value = created.id; // chọn luôn địa chỉ vừa thêm
      notify('success', 'Đã thêm địa chỉ');
    },
    onError: (e: any) => notify('error', e?.data?.message || 'Thêm địa chỉ thất bại'),
  });
}

// ─── Thanh toán ─────────────────────────────────────────────────────────────
const paymentMethod = ref<PaymentMethod>('COD');
const note = ref('');
const submitting = ref(false);

const paymentMethods = [
  { value: 'COD', label: 'Thanh toán khi nhận hàng (COD)', icon: 'bx-money' },
  { value: 'BANK_TRANSFER', label: 'Chuyển khoản ngân hàng', icon: 'bx-building' },
  { value: 'MOMO', label: 'Ví MoMo', icon: 'bx-wallet' },
] as const;

async function submit() {
  // Đặt hàng yêu cầu đăng nhập (BE gắn đơn với userId).
  if (!isAuthenticated.value) {
    await router.push({ path: '/login', query: { redirect: '/checkout' } });
    return;
  }
  if (cart.items.length === 0) {
    notify('warning', 'Giỏ hàng trống');
    return;
  }
  const addr = selectedAddress.value;
  if (!addr) {
    notify('warning', 'Vui lòng chọn hoặc thêm địa chỉ giao hàng');
    return;
  }

  submitting.value = true;
  try {
    const confirmation = await checkoutService.placeOrder(
      {
        shippingAddress: `${addr.fullName} | ${fullAddress(addr)}`,
        phone: addr.phone,
        note: note.value,
        paymentMethod: paymentMethod.value,
      },
      cart.items,
      getAuthHeaders(),
      cart.appliedPromo?.code,
    );
    cart.clearCart();
    await router.push({
      path: '/order-success',
      query: {
        id: confirmation.orderId,
        total: String(confirmation.total),
        items: String(confirmation.itemCount),
        delivery: confirmation.estimatedDelivery,
      },
    });
  } catch (e: any) {
    notify('error', e?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại');
  } finally {
    submitting.value = false;
  }
}

// Shared class strings
const fieldLabel = 'block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5';
const fieldInput = 'w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent';
const summaryLineBase = 'flex justify-between text-[0.85rem] text-mid py-1';
</script>
<template>
  <main class="min-h-screen pt-[100px] px-gutter pb-lg max-[900px]:pt-[90px] max-[900px]:px-6 max-[900px]:pb-[60px]">
    <h1 class="font-display text-[2.4rem] font-bold text-text m-0 mb-10">Thanh Toán</h1>

    <div v-if="cart.items.length === 0 && !submitting" class="text-center py-[60px] text-smoke">
      <p>Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.</p>
      <NuxtLink
        to="/#products"
        class="inline-block mt-4 bg-accent text-on-accent font-condensed text-[0.75rem] tracking-[3px] uppercase no-underline py-3 px-7"
      >Quay Lại Mua Sắm</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-[1fr_380px] gap-12 max-[900px]:grid-cols-1">
      <form class="max-[900px]:order-2" @submit.prevent="submit">
        <!-- ─── Địa chỉ giao hàng ─── -->
        <fieldset class="border-0 p-0 m-0 mb-8">
          <legend class="font-display text-[1.2rem] font-bold text-text mb-5">Địa chỉ giao hàng</legend>

          <div v-if="addrLoading" class="flex flex-col gap-3">
            <div v-for="i in 2" :key="i" class="h-24 border border-rule bg-card/50 animate-pulse" />
          </div>

          <!-- Chưa có địa chỉ nào -->
          <div
            v-else-if="!addresses.length && !showNewForm"
            class="border border-rule bg-card p-6 text-center"
          >
            <i class="bx bx-map text-[2.4rem] text-accent/40" />
            <p class="text-mid mt-2 mb-4">Bạn chưa có địa chỉ giao hàng nào.</p>
            <button type="button" class="btn-gold" @click="openNewForm">Thêm địa chỉ</button>
          </div>

          <!-- Danh sách địa chỉ để chọn -->
          <div v-else-if="!showNewForm" class="flex flex-col gap-3">
            <label
              v-for="a in addresses"
              :key="a.id"
              class="flex items-start gap-3 p-4 border cursor-pointer transition-all duration-250"
              :class="selectedId === a.id ? 'border-accent bg-mix-accent-8' : 'border-rule hover:border-accent'"
            >
              <input v-model="selectedId" type="radio" :value="a.id" name="addr" class="mt-1 accent-[var(--accent)]" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-display text-[1rem] font-bold text-text">{{ a.fullName }}</span>
                  <span class="text-[0.82rem] text-mid">{{ a.phone }}</span>
                  <span
                    v-if="a.isDefault"
                    class="font-condensed text-[0.58rem] tracking-[1.5px] uppercase text-on-accent bg-accent rounded-full px-2 py-0.5"
                  >Mặc định</span>
                </div>
                <p class="text-[0.85rem] text-smoke m-0 mt-1 leading-relaxed">{{ fullAddress(a) }}</p>
              </div>
            </label>

            <button
              type="button"
              class="self-start mt-1 font-condensed text-[0.75rem] tracking-[1.5px] uppercase text-accent hover:underline cursor-pointer flex items-center gap-1"
              @click="openNewForm"
            >
              <i class="bx bx-plus" /> Thêm địa chỉ mới
            </button>
          </div>

          <!-- Form thêm địa chỉ mới -->
          <div v-else class="border border-rule bg-card p-5">
            <h3 class="font-display text-[1.05rem] font-bold m-0 mb-4">Thêm địa chỉ mới</h3>
            <CommonAddressForm v-model="newAddr" />
            <div class="flex gap-3 mt-5">
              <button
                type="button"
                :disabled="createAddr.isPending.value"
                class="btn-gold disabled:opacity-60"
                @click="saveNewAddress"
              >
                {{ createAddr.isPending.value ? 'Đang lưu...' : 'Lưu địa chỉ' }}
              </button>
              <button
                v-if="addresses.length"
                type="button"
                class="btn-outline"
                @click="showNewForm = false"
              >Huỷ</button>
            </div>
          </div>
        </fieldset>

        <!-- ─── Ghi chú ─── -->
        <fieldset class="border-0 p-0 m-0 mb-8">
          <div class="mb-4">
            <label :class="fieldLabel">Ghi chú</label>
            <textarea v-model="note" rows="3" placeholder="Ghi chú cho đơn hàng (tuỳ chọn)" :class="fieldInput" />
          </div>
        </fieldset>

        <!-- ─── Thanh toán ─── -->
        <fieldset class="border-0 p-0 m-0 mb-8">
          <legend class="font-display text-[1.2rem] font-bold text-text mb-5">Phương thức thanh toán</legend>
          <div class="flex flex-col gap-2">
            <label
              v-for="pm in paymentMethods"
              :key="pm.value"
              :class="[
                'flex items-center gap-3 py-3.5 px-4 border cursor-pointer text-[0.88rem] transition-all duration-250',
                paymentMethod === pm.value
                  ? 'border-accent text-text bg-mix-accent-8'
                  : 'border-rule text-mid hover:border-accent',
                '[&_input]:hidden [&_i]:text-accent [&_i]:text-[1.2rem]',
              ]"
            >
              <input v-model="paymentMethod" type="radio" :value="pm.value" name="payment" />
              <i class="bx" :class="pm.icon" />
              {{ pm.label }}
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full bg-accent text-on-accent border-0 font-condensed text-[0.85rem] font-semibold tracking-[3px] uppercase py-4 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:enabled:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <i v-if="submitting" class="bx bx-loader-alt bx-spin" />
          {{ submitting ? 'Đang xử lý...' : 'Đặt Hàng' }}
        </button>
      </form>

      <div class="bg-card border border-rule p-7 self-start sticky top-[100px] max-[900px]:order-1 max-[900px]:static">
        <h2 class="font-display text-[1.1rem] font-bold text-text m-0 mb-5">Đơn hàng của bạn</h2>
        <div v-for="item in cart.items" :key="item.productId" class="flex justify-between items-start py-2 gap-3">
          <div class="flex flex-col">
            <span class="text-[0.85rem] text-text">{{ item.name }}</span>
            <span class="text-[0.72rem] text-smoke">× {{ item.quantity }}</span>
          </div>
          <span class="font-condensed text-[0.85rem] font-semibold text-text whitespace-nowrap">{{ formatPrice((item.salePrice ?? item.price) * item.quantity) }}</span>
        </div>
        <div class="h-px bg-rule my-3" />
        <div :class="summaryLineBase">
          <span>Tạm tính</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>
        <div v-if="cart.appliedPromo" :class="[summaryLineBase, '!text-olive']">
          <span>{{ cart.appliedPromo.label }}</span>
          <span>-{{ formatPrice(cart.discount) }}</span>
        </div>
        <div :class="summaryLineBase">
          <span>Vận chuyển</span>
          <span class="text-olive">Miễn phí</span>
        </div>
        <div class="h-px bg-rule my-3" />
        <div class="flex justify-between py-1 font-display text-[1.1rem] font-bold text-text">
          <span>Tổng cộng</span>
          <span>{{ formatPrice(cart.total) }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
