import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useAuth } from './useAuth';

export interface ProductReview {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  user: { id: string; fullName: string; avatar?: string | null } | null;
}

interface ReviewsResponse {
  items: ProductReview[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Đánh giá đã duyệt của 1 sản phẩm — GET /reviews/product/:id */
export const useProductReviewsQuery = (productId: Ref<string>) => {
  return useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: async (): Promise<ReviewsResponse> => {
      const res = await $anErcom(`/reviews/product/${productId.value}`, {
        query: { page: 1, pageSize: 20 },
      });
      return res as unknown as ReviewsResponse;
    },
    enabled: computed(() => !!productId.value),
  });
};

/** Gửi đánh giá — POST /reviews (yêu cầu đăng nhập + đã mua). */
export const useCreateReviewMutation = () => {
  const { getAuthHeaders } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { productId: string; rating: number; comment?: string }) =>
      $anErcom('/reviews', {
        method: 'POST',
        body,
        headers: getAuthHeaders(),
      }),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['product-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['product', vars.productId] });
    },
  });
};
