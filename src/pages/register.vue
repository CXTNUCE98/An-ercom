<script setup lang="ts">
import { useRegisterMutation } from '~/composables/useAuthMutation';

definePageMeta({
  layout: 'default',
});

const registerData = reactive({
  email: '',
  password: '',
  fullName: '',
});

const { mutate: register, isPending, isSuccess } = useRegisterMutation();

const handleRegister = () => {
  register(registerData, {
    onSuccess: () => { isSuccess.value = true; }
  });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-20 bg-bg text-text">
    <div class="max-w-md w-full bg-card border border-rule p-10">
      <div v-if="isSuccess" class="text-center">
        <i class="bx bx-check-circle text-olive text-[3rem]" />
        <h2 class="font-display text-[1.6rem] font-bold text-text mt-3 mb-3">Đăng Ký Thành Công</h2>
        <p class="text-mid mb-8">Tài khoản đã được tạo. Đăng nhập để bắt đầu mua sắm.</p>
        <NuxtLink
          to="/login"
          class="inline-block bg-accent text-on-accent no-underline font-condensed text-[0.82rem] font-semibold tracking-[3px] uppercase py-3 px-8"
        >Đăng Nhập</NuxtLink>
      </div>

      <div v-else>
        <div class="text-center mb-8">
          <NuxtLink to="/" class="font-display font-extrabold text-accent no-underline text-[1.6rem] tracking-[6px]">
            IRON<span class="text-text">MAN</span>
          </NuxtLink>
          <p class="text-[0.9rem] text-mid mt-3">Tạo tài khoản để mua sắm và theo dõi đơn</p>
        </div>

        <form class="space-y-5" @submit.prevent="handleRegister">
          <div>
            <label class="block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Họ và tên</label>
            <input
              v-model="registerData.fullName"
              type="text"
              required
              class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label class="block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Email</label>
            <input
              v-model="registerData.email"
              type="email"
              required
              class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label class="block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Mật khẩu</label>
            <input
              v-model="registerData.password"
              type="password"
              required
              class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 transition-colors duration-250 box-border focus:outline-none focus:border-accent"
            />
          </div>

          <button
            type="submit"
            :disabled="isPending"
            class="w-full bg-accent text-on-accent border-0 font-condensed text-[0.82rem] font-semibold tracking-[3px] uppercase py-3.5 cursor-pointer transition-all duration-300 hover:enabled:-translate-y-px disabled:opacity-60"
          >
            {{ isPending ? 'Đang xử lý...' : 'Đăng Ký' }}
          </button>
        </form>

        <div class="mt-8 text-center text-[0.85rem] text-mid">
          Đã có tài khoản?
          <NuxtLink to="/login" class="text-accent hover:underline">Đăng nhập</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

