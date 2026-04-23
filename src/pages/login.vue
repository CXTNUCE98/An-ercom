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
const { mutate: login, isPending, error } = useLoginMutation();

const handleLogin = () => {
  login(
    { email: loginData.email, password: loginData.password },
    { onSuccess: () => router.push('/') }
  );
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-slate-950 text-slate-300">
    <div class="max-w-md w-full glass-card p-10 bg-slate-900 border border-slate-800 rounded-sm">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold font-display text-amber-500 uppercase tracking-widest mb-2">GENTLEMEN</h2>
        <p class="text-sm">Đăng nhập để trải nghiệm đặc quyền</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Email</label>
            <input v-model="loginData.email" type="email" required class="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" placeholder="email@example.com" />
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400">Mật khẩu</label>
            </div>
            <input v-model="loginData.password" type="password" required class="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" placeholder="••••••••" />
          </div>
        </div>

        <button type="submit" :disabled="isPending" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 uppercase tracking-widest text-sm transition-colors mt-8">
          <span v-if="!isPending">Đăng nhập</span>
          <span v-else>Đang xử lý...</span>
        </button>
      </form>

      <div class="mt-8 text-center text-sm">
        <p>Chưa có tài khoản? <NuxtLink to="/register" class="text-amber-500 hover:underline">Đăng ký</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

