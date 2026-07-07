import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

/** Tỉnh/thành — khớp GET /locations/provinces ở BE. */
export interface Province {
  code: string;
  name: string;
}

/** Phường/xã — khớp GET /locations/provinces/:code/wards ở BE. */
export interface Ward {
  code: string;
  name: string;
  provinceCode: string;
}

// Dữ liệu hành chính gần như bất biến → cache rất lâu, không refetch.
const STALE = 1000 * 60 * 60 * 24; // 24h

/** Danh sách tỉnh/thành (dùng chung cho mọi form địa chỉ). */
export const useProvincesQuery = () =>
  useQuery({
    queryKey: ['locations', 'provinces'],
    queryFn: async (): Promise<Province[]> => {
      const res = await $anErcom('/locations/provinces');
      return res as unknown as Province[];
    },
    staleTime: STALE,
    gcTime: STALE,
  });

/**
 * Danh sách phường/xã theo mã tỉnh. Truyền ref mã tỉnh; tự refetch khi đổi tỉnh,
 * và chỉ chạy khi đã chọn tỉnh.
 */
export const useWardsQuery = (provinceCode: Ref<string | undefined | null>) =>
  useQuery({
    queryKey: ['locations', 'wards', provinceCode],
    queryFn: async (): Promise<Ward[]> => {
      const res = await $anErcom(`/locations/provinces/${provinceCode.value}/wards`);
      return res as unknown as Ward[];
    },
    enabled: computed(() => !!provinceCode.value),
    staleTime: STALE,
    gcTime: STALE,
  });
