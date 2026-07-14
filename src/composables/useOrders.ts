import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useAuth } from './useAuth';

export type OrderStatus =
  | 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';

export interface MyOrderItem {
  id: string;
  quantity: number;
  price: number;
  product: { id: string; name: string; slug: string; images: string[]; brand: string } | null;
}

export interface MyOrder {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  shippingAddress: string;
  phone: string;
  note?: string | null;
  paymentMethod: string;
  createdAt: string;
  items: MyOrderItem[];
}

export interface MyOrdersResponse {
  items: MyOrder[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

import type { MaybeRefOrGetter } from 'vue';
import { toValue } from 'vue';

/** Đơn hàng của tôi — GET /orders/my */
export const useMyOrdersQuery = (enabled?: MaybeRefOrGetter<boolean>) => {
  const { isAuthenticated, getAuthHeaders } = useAuth();

  return useQuery({
    queryKey: ['my-orders'],
    queryFn: async (): Promise<MyOrdersResponse> => {
      const res = await $anErcom('/orders/my', {
        query: { page: 1, pageSize: 50 },
        headers: getAuthHeaders(),
      });
      return res as unknown as MyOrdersResponse;
    },
    enabled: computed(() => {
      const isAuth = toValue(isAuthenticated);
      const isEnabled = enabled !== undefined ? toValue(enabled) : true;
      return isAuth && isEnabled;
    }),
  });
};

/** Huỷ đơn của tôi — PATCH /orders/:id/cancel (chỉ khi PENDING/CONFIRMED). */
export const useCancelOrderMutation = () => {
  const { getAuthHeaders } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      return $anErcom(`/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
    },
  });
};

/** Đơn có thể huỷ (chưa giao). */
export const CANCELLABLE_STATUSES: OrderStatus[] = ['PENDING', 'CONFIRMED'];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: 'Chờ xác nhận',
  CONFIRMED: 'Đã xác nhận',
  SHIPPING: 'Đang giao',
  DELIVERED: 'Đã giao',
  CANCELLED: 'Đã huỷ',
};

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  COD: 'Thanh toán khi nhận (COD)',
  BANK_TRANSFER: 'Chuyển khoản',
  MOMO: 'Ví MoMo',
};
