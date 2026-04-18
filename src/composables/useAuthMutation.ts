import { useMutation } from "@tanstack/vue-query";
import { useAuth } from "./useAuth";

/**
 * Mutation cho việc đăng nhập
 */
export const useLoginMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (body: any) => {
      const data = (await $practiceMathApi("/auth/login", {
        method: "POST",
        body,
      })) as { accessToken: string };

      return data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        login(data.accessToken);
      }
    },
  });
};

/**
 * Mutation cho việc đăng ký
 */
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      return await $practiceMathApi("/auth/register", {
        method: "POST",
        body,
      });
    },
  });
};

/**
 * Mutation cập nhật thông tin cá nhân
 */
/**
 * Mutation cập nhật thông tin cá nhân
 */
export const useUpdateProfileMutation = () => {
  const { getAuthHeaders } = useAuth();

  return useMutation({
    mutationFn: async (body: any) => {
      return await $practiceMathApi("/users/profile", {
        method: "PATCH",
        body,
        headers: getAuthHeaders(),
      });
    },
  });
};

/**
 * Mutation đổi mật khẩu
 */
export const useChangePasswordMutation = () => {
  const { getAuthHeaders } = useAuth();

  return useMutation({
    mutationFn: async (body: any) => {
      return await $practiceMathApi("/users/password", {
        method: "PATCH",
        body,
        headers: getAuthHeaders(),
      });
    },
  });
};
