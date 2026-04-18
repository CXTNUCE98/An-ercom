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
  <div class="min-h-screen flex items-center justify-center px-4 bg-slate-950 text-slate-300">
    <div class="max-w-md w-full glass-card p-10 bg-slate-900 border border-slate-800 rounded-sm">
      <div v-if="isSuccess" class="text-center">
        <h2 class="text-2xl font-bold font-heading text-amber-500 mb-4">Đăng Ký Thành Công</h2>
        <p class="mb-8">Chào mừng quý ông gia nhập cộng đồng.</p>
        <NuxtLink to="/login" class="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 uppercase tracking-widest text-sm">Đăng Nhập</NuxtLink>
      </div>

      <div v-else>
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold font-heading text-amber-500 uppercase tracking-widest mb-2">GENTLEMEN</h2>
          <p class="text-sm">Gia nhập cộng đồng quý ông đích thực</p>
        </div>

        <form class="space-y-5" @submit.prevent="handleRegister">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Họ và tên</label>
            <input v-model="registerData.fullName" type="text" required class="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Email</label>
            <input v-model="registerData.email" type="email" required class="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Mật khẩu</label>
            <input v-model="registerData.password" type="password" required class="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" />
          </div>

          <button type="submit" :disabled="isPending" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 uppercase tracking-widest text-sm mt-8">
            <span v-if="!isPending">Đăng ký</span>
            <span v-else>Đang xử lý...</span>
          </button>
        </form>

        <div class="mt-8 text-center text-sm">
          <p>Đã có tài khoản? <NuxtLink to="/login" class="text-amber-500 hover:underline">Đăng nhập</NuxtLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-heading {
  font-family: 'Playfair Display', serif;
}
</style>
