import { useMutation } from "@tanstack/vue-query";
import { useAuth } from "./useAuth";

/**
 * Mutation cho việc đăng nhập
 */
export const useLoginMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (body: any) => {
      const data = (await $anErcom("/auth/login", {
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
      return await $anErcom("/auth/register", {
        method: "POST",
        body,
      });
    },
  });
};

/**
 * Mutation yêu cầu đặt lại mật khẩu
 */
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (body: { email: string }) =>
      await $anErcom("/auth/forgot-password", { method: "POST", body }),
  });
};

/**
 * Mutation đặt lại mật khẩu bằng token
 */
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (body: { token: string; newPassword: string }) =>
      await $anErcom("/auth/reset-password", { method: "POST", body }),
  });
};

/**
 * Mutation cập nhật thông tin cá nhân
 */
export const useUpdateProfileMutation = () => {
  const { getAuthHeaders } = useAuth();

  return useMutation({
    mutationFn: async (body: any) => {
      return await $anErcom("/users/profile", {
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
      return await $anErcom("/users/password", {
        method: "PATCH",
        body,
        headers: getAuthHeaders(),
      });
    },
  });
};
