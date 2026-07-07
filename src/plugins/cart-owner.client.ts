import { watch } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useCartStore } from '~/features/cart/stores/useCartStore';

/**
 * Gắn giỏ hàng với user đang đăng nhập:
 * - Chưa đăng nhập → giỏ 'guest'
 * - Đăng nhập → giỏ 'u:<userId>' (giỏ khách được gộp vào lần đầu)
 * - Đăng xuất → quay lại giỏ 'guest'
 */
export default defineNuxtPlugin(() => {
  const { user } = useAuth();
  const cart = useCartStore();

  watch(
    () => user.value?.id,
    (id) => cart.setOwner(id ? `u:${id}` : null),
    { immediate: true },
  );
});
