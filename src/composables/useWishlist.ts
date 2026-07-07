import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useAuth } from './useAuth';

export interface WishlistProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number | null;
  images: string[];
  rating: number;
  categorySlug?: string | null;
  categoryName?: string | null;
}

export interface WishlistEntry {
  id: string;
  createdAt: string;
  product: WishlistProduct;
}

import type { MaybeRefOrGetter } from 'vue';
import { toValue } from 'vue';

/** Danh sách yêu thích của tôi — GET /wishlist */
export const useWishlistQuery = (enabled?: MaybeRefOrGetter<boolean>) => {
  const { isAuthenticated, getAuthHeaders } = useAuth();
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async (): Promise<WishlistEntry[]> => {
      const res = await $anErcom('/wishlist', { headers: getAuthHeaders() });
      return res as unknown as WishlistEntry[];
    },
    enabled: computed(() => {
      const isAuth = toValue(isAuthenticated);
      const isEnabled = enabled !== undefined ? toValue(enabled) : true;
      return isAuth && isEnabled;
    }),
  });
};

/** Toggle 1 sản phẩm trong wishlist. */
export const useWishlistMutations = () => {
  const { getAuthHeaders } = useAuth();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: (productId: string) =>
      $anErcom(`/wishlist/${productId}`, { method: 'POST', headers: getAuthHeaders() }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const remove = useMutation({
    mutationFn: (productId: string) =>
      $anErcom(`/wishlist/${productId}`, { method: 'DELETE', headers: getAuthHeaders() }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  return { add, remove };
};
