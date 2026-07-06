import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useAuth } from './useAuth';

/** Địa chỉ giao hàng — khớp model Address ở BE. */
export interface Address {
  id: string;
  fullName: string;
  phone: string;
  line: string;
  ward?: string | null;
  district?: string | null;
  province: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddressInput {
  fullName: string;
  phone: string;
  line: string;
  ward?: string;
  district?: string;
  province: string;
  isDefault?: boolean;
}

/** Sổ địa chỉ của tôi — GET /addresses */
export const useAddressesQuery = () => {
  const { isAuthenticated, getAuthHeaders } = useAuth();
  return useQuery({
    queryKey: ['addresses'],
    queryFn: async (): Promise<Address[]> => {
      const res = await $anErcom('/addresses', { headers: getAuthHeaders() });
      return res as unknown as Address[];
    },
    enabled: isAuthenticated,
  });
};

/** Thêm / sửa / xoá / đặt mặc định địa chỉ. */
export const useAddressMutations = () => {
  const { getAuthHeaders } = useAuth();
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['addresses'] });

  const create = useMutation({
    mutationFn: (body: AddressInput) =>
      $anErcom('/addresses', { method: 'POST', body, headers: getAuthHeaders() }),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<AddressInput> }) =>
      $anErcom(`/addresses/${id}`, { method: 'PATCH', body, headers: getAuthHeaders() }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) =>
      $anErcom(`/addresses/${id}`, { method: 'DELETE', headers: getAuthHeaders() }),
    onSuccess: invalidate,
  });

  return { create, update, remove };
};
