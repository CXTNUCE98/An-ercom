export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    // Show message to user
    if (process.client) {
      ElMessage.warning('Vui lòng đăng nhập để tiếp tục');
    }
    // Redirect to home page (login modal will handle auth)
    return navigateTo(`/?redirect=${to.fullPath}`);
  }
});
