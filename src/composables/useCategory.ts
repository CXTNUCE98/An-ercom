import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export const useCategoriesQuery = () => {
  const { isAuthenticated, getAuthHeaders } = useAuth();

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await $anErcom("/categories", {
        headers: getAuthHeaders(),
      });
      return res as unknown as any[];
    },
    enabled: isAuthenticated,
  });
};

export const useCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { getAuthHeaders } = useAuth();

  const createCategory = useMutation({
    mutationFn: (data: any) =>
      $anErcom("/categories", {
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
      $anErcom(`/categories/${id}`, {
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
      $anErcom(`/categories/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { createCategory, updateCategory, deleteCategory };
};
