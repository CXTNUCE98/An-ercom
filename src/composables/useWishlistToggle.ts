import { useWishlistQuery, useWishlistMutations } from './useWishlist';
import { useAuth } from './useAuth';
import { useNotifications } from './notifications';

/**
 * Logic bật/tắt yêu thích dùng chung cho mọi nơi (homepage, product card...).
 * - Chưa đăng nhập → điều hướng sang /login kèm redirect về trang hiện tại.
 * - Đã đăng nhập → toggle + toast phản hồi.
 * Trả về helper `isInWishlist(id)` (reactive) và `toggle(id)`.
 */
export function useWishlistToggle() {
  const { isAuthenticated } = useAuth();
  const route = useRoute();
  const { notify } = useNotifications();

  // Chỉ query khi đã đăng nhập (query nội bộ đã tự gate theo auth).
  const { data: wishlist } = useWishlistQuery();
  const { add, remove } = useWishlistMutations();

  const wishlistIds = computed(
    () => new Set((wishlist.value ?? []).map((w) => w.product.id)),
  );

  const isInWishlist = (productId: string) => wishlistIds.value.has(productId);

  function toggle(productId: string) {
    if (!isAuthenticated.value) {
      navigateTo({ path: '/login', query: { redirect: route.fullPath } });
      return;
    }
    if (isInWishlist(productId)) {
      remove.mutate(productId, {
        onSuccess: () => notify('info', 'Đã bỏ khỏi danh sách yêu thích'),
        onError: (e: any) => notify('error', e?.data?.message || 'Thao tác thất bại'),
      });
    } else {
      add.mutate(productId, {
        onSuccess: () => notify('success', 'Đã thêm vào yêu thích'),
        onError: (e: any) => notify('error', e?.data?.message || 'Thao tác thất bại'),
      });
    }
  }

  return { isInWishlist, toggle, isPending: computed(() => add.isPending.value || remove.isPending.value) };
}
