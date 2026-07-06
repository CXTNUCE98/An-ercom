<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoginMutation } from '~/composables/useAuthMutation';

definePageMeta({
  layout: 'default',
});

const loginData = reactive({
  email: '',
  password: '',
});

const router = useRouter();
const route = useRoute();
const { mutate: login, isPending, error } = useLoginMutation();

const errorMessage = computed(
  () => (error.value as any)?.data?.message || 'Đăng nhập thất bại',
);

const handleLogin = () => {
  login(
    { email: loginData.email, password: loginData.password },
    {
      onSuccess: () => {
        const redirect = (route.query.redirect as string) || '/';
        router.push(redirect);
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
          <input
            v-model="loginData.password"
            type="password"
            required
            class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent"
            placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="text-[0.82rem] text-oxblood">
          {{ errorMessage }}
        </p>

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

