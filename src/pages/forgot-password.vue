<script setup lang="ts">
import { useForgotPasswordMutation } from '~/composables/useAuthMutation';

useHead({ title: 'Quên mật khẩu — IRONMAN' });

const email = ref('');
const submitted = ref(false);
const devToken = ref('');
const { mutate: forgot, isPending } = useForgotPasswordMutation();

function submit() {
  forgot(
    { email: email.value },
    {
      onSuccess: (res: any) => {
        submitted.value = true;
        // Ở môi trường dev, BE trả token để test (chưa tích hợp email).
        if (res?.token) devToken.value = res.token;
      },
    },
  );
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-20 bg-bg text-text">
    <div class="max-w-md w-full bg-card border border-rule p-10">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="font-display font-extrabold text-accent no-underline text-[1.6rem] tracking-[6px]">
          IRON<span class="text-text">MAN</span>
        </NuxtLink>
        <p class="text-[0.9rem] text-mid mt-3">Đặt lại mật khẩu</p>
      </div>

      <div v-if="submitted" class="text-center">
        <i class="bx bx-mail-send text-olive text-[3rem]" />
        <p class="text-mid mt-3 mb-4">
          Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi.
        </p>
        <div v-if="devToken" class="bg-surface border border-rule p-3 text-left mb-4">
          <p class="text-[0.72rem] text-smoke mb-1">Token (chỉ hiện ở môi trường dev):</p>
          <NuxtLink :to="`/reset-password?token=${devToken}`" class="text-accent text-[0.8rem] break-all hover:underline">
            {{ devToken }}
          </NuxtLink>
        </div>
        <NuxtLink to="/login" class="text-accent hover:underline text-[0.85rem]">← Về đăng nhập</NuxtLink>
      </div>

      <form v-else class="space-y-5" @submit.prevent="submit">
        <div>
          <label class="block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 box-border focus:outline-none focus:border-accent"
            placeholder="email@example.com"
          />
        </div>
        <button
          type="submit"
          :disabled="isPending"
          class="w-full bg-accent text-on-accent border-0 font-condensed text-[0.82rem] font-semibold tracking-[3px] uppercase py-3.5 cursor-pointer transition-all duration-300 hover:enabled:-translate-y-px disabled:opacity-60"
        >
          {{ isPending ? 'Đang gửi...' : 'Gửi yêu cầu' }}
        </button>
        <div class="text-center text-[0.85rem]">
          <NuxtLink to="/login" class="text-accent hover:underline">← Về đăng nhập</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
