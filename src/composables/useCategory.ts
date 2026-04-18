import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export const useCategoriesQuery = () => {
  const { isAuthenticated, getAuthHeaders } = useAuth();

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await $practiceMathApi("/categories", {
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
      $practiceMathApi("/categories", {
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
      $practiceMathApi(`/categories/${id}`, {
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
      $practiceMathApi(`/categories/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { createCategory, updateCategory, deleteCategory };
};
