import { watch } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useCartStore } from '~/features/cart/stores/useCartStore';
import { cartSyncService } from '~/features/cart/services/cartSyncService';

/**
 * Gắn giỏ hàng với user đang đăng nhập + đồng bộ lên BE:
 * - Chưa đăng nhập → giỏ 'guest' (localStorage).
 * - Đăng nhập → gộp giỏ khách lên BE, lấy giỏ BE làm nguồn chuẩn.
 * - Trong lúc đăng nhập → mọi thay đổi giỏ được debounce đẩy lên BE.
 * - Đăng xuất → quay lại giỏ 'guest'.
 */
export default defineNuxtPlugin(() => {
  const { user, getAuthHeaders } = useAuth();
  const cart = useCartStore();

  let pushTimer: ReturnType<typeof setTimeout> | null = null;
  let stopPush: (() => void) | null = null;
  let syncing = false; // chặn đẩy ngược khi vừa nạp giỏ từ BE

  function startPushWatcher() {
    if (stopPush) return;
    stopPush = watch(
      () => cart.items,
      () => {
        if (syncing) return;
        if (pushTimer) clearTimeout(pushTimer);
        pushTimer = setTimeout(() => {
          cartSyncService.replace(cart.items, getAuthHeaders()).catch(() => {
            // Lỗi mạng → giữ giỏ localStorage, thử lại ở lần đổi kế tiếp.
          });
        }, 800);
      },
      { deep: true },
    );
  }

  function stopPushWatcher() {
    if (stopPush) { stopPush(); stopPush = null; }
    if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
  }

  watch(
    () => user.value?.id,
    async (id) => {
      if (id) {
        // Lấy giỏ khách trước khi đổi owner (setOwner sẽ xoá giỏ khách).
        const guestItems = cart.getGuestItems();
        cart.setOwner(`u:${id}`);
        try {
          syncing = true;
          const merged = await cartSyncService.merge(guestItems, getAuthHeaders());
          cart.replaceItems(merged);
        } catch {
          // BE lỗi → dùng giỏ localStorage đã gộp cục bộ.
        } finally {
          syncing = false;
        }
        startPushWatcher();
      } else {
        stopPushWatcher();
        cart.setOwner(null);
      }
    },
    { immediate: true },
  );
});
