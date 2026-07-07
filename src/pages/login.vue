<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoginMutation } from '~/composables/useAuthMutation';
import { useNotifications } from '~/composables/notifications';

definePageMeta({
  layout: 'default',
});

const loginData = reactive({
  email: '',
  password: '',
});

const showPassword = ref(false);

const router = useRouter();
const route = useRoute();
const { notify } = useNotifications();
const { mutate: login, isPending } = useLoginMutation();

const getErrorMessage = (err: unknown) =>
  (err as any)?.data?.message ||
  (err as any)?.response?._data?.message ||
  (err as any)?.message ||
  'Đăng nhập thất bại';

const handleLogin = () => {
  login(
    { email: loginData.email, password: loginData.password },
    {
      onSuccess: () => {
        notify('success', 'Đăng nhập thành công');
        const redirect = (route.query.redirect as string) || '/';
        router.push(redirect);
      },
      onError: (err) => {
        notify('error', getErrorMessage(err));
      },
    }
  );
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-20 bg-bg text-text">
    <div class="max-w-md w-full bg-card border border-rule p-10">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="font-display font-extrabold text-accent no-underline text-[1.6rem] tracking-[6px]">
          IRON<span class="text-text">MAN</span>
        </NuxtLink>
        <p class="text-[0.9rem] text-mid mt-3">Đăng nhập để mua sắm và theo dõi đơn hàng</p>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">
        <div>
          <label class="block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Email</label>
          <input
            v-model="loginData.email"
            type="email"
            required
            class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label class="block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Mật khẩu</label>
          <div class="relative">
            <input
              v-model="loginData.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 pr-10 transition-colors duration-250 box-border focus:outline-none focus:border-accent"
              placeholder="••••••••"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-accent cursor-pointer flex items-center justify-center"
              @click="showPassword = !showPassword"
            >
              <i class="bx text-[1.1rem]" :class="showPassword ? 'bx-show' : 'bx-hide'" />
            </button>
          </div>
        </div>

        <div class="text-right">
          <NuxtLink to="/forgot-password" class="text-[0.8rem] text-accent hover:underline">Quên mật khẩu?</NuxtLink>
        </div>

        <button
          type="submit"
          :disabled="isPending"
          class="w-full bg-accent text-on-accent border-0 font-condensed text-[0.82rem] font-semibold tracking-[3px] uppercase py-3.5 cursor-pointer transition-all duration-300 hover:enabled:-translate-y-px disabled:opacity-60"
        >
          {{ isPending ? 'Đang xử lý...' : 'Đăng Nhập' }}
        </button>
      </form>

      <div class="mt-8 text-center text-[0.85rem] text-mid">
        Chưa có tài khoản?
        <NuxtLink to="/register" class="text-accent hover:underline">Đăng ký</NuxtLink>
      </div>
    </div>
  </div>
</template>

