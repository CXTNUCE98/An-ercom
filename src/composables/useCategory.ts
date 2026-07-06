import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export const useCategoriesQuery = () => {
  // Dữ liệu công khai: khách chưa đăng nhập vẫn phải load được → không gate auth.
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await $anErcom("/product-categories");
      return res as unknown as any[];
    },
  });
};

export const useCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { getAuthHeaders } = useAuth();

  const createCategory = useMutation({
    mutationFn: (data: any) =>
      $anErcom("/product-categories", {
        method: "POST",
        body: data,
        headers: getAuthHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      $anErcom(`/product-categories/${id}`, {
        method: "PATCH",
        body: data,
        headers: getAuthHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) =>
      $anErcom(`/product-categories/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { createCategory, updateCategory, deleteCategory };
};
