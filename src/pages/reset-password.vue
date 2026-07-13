<script setup lang="ts">
import { useResetPasswordMutation } from '~/composables/useAuthMutation';

useHead({
  title: 'Đặt lại mật khẩu — IRONMAN',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});

const route = useRoute();
const router = useRouter();
const token = computed(() => (route.query.token as string) || '');

const newPassword = ref('');
const confirm = ref('');
const error = ref('');
const done = ref(false);
const showPw = reactive({ new: false, confirm: false });
const { mutate: reset, isPending } = useResetPasswordMutation();

function submit() {
  error.value = '';
  if (newPassword.value.length < 6) { error.value = 'Mật khẩu tối thiểu 6 ký tự'; return; }
  if (newPassword.value !== confirm.value) { error.value = 'Xác nhận mật khẩu không khớp'; return; }
  reset(
    { token: token.value, newPassword: newPassword.value },
    {
      onSuccess: () => {
        done.value = true;
        setTimeout(() => router.push('/login'), 2000);
      },
      onError: (e: any) => { error.value = e?.data?.message || 'Đặt lại mật khẩu thất bại'; },
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
        <p class="text-[0.9rem] text-mid mt-3">Tạo mật khẩu mới</p>
      </div>

      <div v-if="done" class="text-center">
        <i class="bx bx-check-circle text-olive text-[3rem]" />
        <p class="text-mid mt-3">Đổi mật khẩu thành công. Đang chuyển tới đăng nhập...</p>
      </div>

      <div v-else-if="!token" class="text-center text-oxblood text-[0.9rem]">
        Liên kết không hợp lệ hoặc thiếu token.
      </div>

      <form v-else class="space-y-5" @submit.prevent="submit">
        <div>
          <label class="block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Mật khẩu mới</label>
          <div class="relative">
            <input v-model="newPassword" :type="showPw.new ? 'text' : 'password'" required class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 pr-10 box-border focus:outline-none focus:border-accent" />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-accent cursor-pointer flex items-center justify-center" @click="showPw.new = !showPw.new">
              <i class="bx text-[1.1rem]" :class="showPw.new ? 'bx-show' : 'bx-hide'" />
            </button>
          </div>
        </div>
        <div>
          <label class="block font-condensed text-[0.7rem] font-semibold tracking-[2px] uppercase text-smoke mb-1.5">Xác nhận mật khẩu</label>
          <div class="relative">
            <input v-model="confirm" :type="showPw.confirm ? 'text' : 'password'" required class="w-full bg-surface border border-rule text-text font-body text-[0.88rem] py-2.5 px-3.5 pr-10 box-border focus:outline-none focus:border-accent" />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-accent cursor-pointer flex items-center justify-center" @click="showPw.confirm = !showPw.confirm">
              <i class="bx text-[1.1rem]" :class="showPw.confirm ? 'bx-show' : 'bx-hide'" />
            </button>
          </div>
        </div>
        <p v-if="error" class="text-[0.82rem] text-oxblood">{{ error }}</p>
        <button
          type="submit"
          :disabled="isPending"
          class="w-full bg-accent text-on-accent border-0 font-condensed text-[0.82rem] font-semibold tracking-[3px] uppercase py-3.5 cursor-pointer transition-all duration-300 hover:enabled:-translate-y-px disabled:opacity-60"
        >
          {{ isPending ? 'Đang xử lý...' : 'Đặt lại mật khẩu' }}
        </button>
      </form>
    </div>
  </div>
</template>
