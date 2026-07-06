import { useQuery } from '@tanstack/vue-query';
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

/** Đơn hàng của tôi — GET /orders/my */
export const useMyOrdersQuery = () => {
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
    enabled: isAuthenticated,
  });
};

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
