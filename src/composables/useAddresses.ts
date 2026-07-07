import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useAuth } from './useAuth';

/** Địa chỉ giao hàng — khớp model Address ở BE (2 cấp: Tỉnh → Phường/xã). */
export interface Address {
  id: string;
  fullName: string;
  phone: string;
  line: string;
  provinceCode: string;
  provinceName: string;
  wardCode: string;
  wardName: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Payload gửi lên BE — chỉ mã tỉnh/phường, BE tự resolve tên. */
export interface AddressInput {
  fullName: string;
  phone: string;
  line: string;
  provinceCode: string;
  wardCode: string;
  isDefault?: boolean;
}

import type { MaybeRefOrGetter } from 'vue';
import { toValue } from 'vue';

/** Sổ địa chỉ của tôi — GET /addresses */
export const useAddressesQuery = (enabled?: MaybeRefOrGetter<boolean>) => {
  const { isAuthenticated, getAuthHeaders } = useAuth();
  return useQuery({
    queryKey: ['addresses'],
    queryFn: async (): Promise<Address[]> => {
      const res = await $anErcom('/addresses', { headers: getAuthHeaders() });
      return res as unknown as Address[];
    },
    enabled: computed(() => {
      const isAuth = toValue(isAuthenticated);
      const isEnabled = enabled !== undefined ? toValue(enabled) : true;
      return isAuth && isEnabled;
    }),
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
