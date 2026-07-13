import { ref, computed, onMounted } from "vue";

/** Thông tin người dùng trả về từ BE (/auth/me). */
export interface User {
  id: string;
  email: string;
  role: string;
  fullName?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt?: string;
}

// Token storage key
const TOKEN_KEY = "accessToken";
const PROFILE_KEY = "userProfile";

// Helper to decode JWT
function parseJwt(token: string) {
  try {
    if (!import.meta.client) return null;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Kiểm tra token đã hết hạn / không hợp lệ (chỉ tin cậy ở phía client).
function isTokenExpired(token: string | null): boolean {
  if (!token || token === "undefined") return true;
  // Trên server không giải mã được (parseJwt trả null) → không coi là hết hạn
  // để tránh phá vỡ trạng thái SSR; việc dọn dẹp sẽ diễn ra ở client.
  if (!import.meta.client) return false;

  const decoded = parseJwt(token);
  if (!decoded) return true; // decode lỗi → token hỏng
  if (!decoded.exp) return false; // không có claim exp → coi như còn hạn
  return decoded.exp * 1000 <= Date.now();
}

export function useAuth() {
  // Use useCookie for token persistence (works on SSR and Client)
  const accessToken = useCookie<string | null>(TOKEN_KEY, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    default: () => null,
  });

  const user = useState<User | null>("auth_user", () => null);
  const isFetchingProfile = useState<boolean>(
    "auth_isFetchingProfile",
    () => false
  );

  // Kiểm tra token hợp lệ: không rỗng, khác "undefined" và chưa hết hạn.
  const isAuthenticated = computed(
    () =>
      !!accessToken.value &&
      accessToken.value !== "undefined" &&
      !isTokenExpired(accessToken.value)
  );

  // Helper to save profile to cache
  const saveProfileToCache = (userData: User) => {
    if (import.meta.client) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(userData));
    }
  };

  // Helper to get profile from cache
  const getProfileFromCache = (): User | null => {
    if (!import.meta.client) return null;
    const cached = localStorage.getItem(PROFILE_KEY);
    if (!cached) return null;
    try {
      return JSON.parse(cached);
    } catch {
      return null;
    }
  };

  /**
   * Update user state locally and in cache
   */
  const updateUserLocal = (userData: User) => {
    user.value = userData;
    saveProfileToCache(userData);
  };

  /**
   * Get auth headers for API requests
   */
  const getAuthHeaders = (): HeadersInit => {
    // Chỉ trả về header Authorization nếu token thực sự hợp lệ
    if (!accessToken.value || accessToken.value === "undefined") {
      return {};
    }

    return {
      Authorization: `Bearer ${accessToken.value}`,
    };
  };

  /**
   * Fetch full user profile from API
   */
  const fetchUserProfile = async (force = false) => {
    if (!isAuthenticated.value || (isFetchingProfile.value && !force)) return;

    try {
      isFetchingProfile.value = true;
      const data = await $anErcom("/auth/me", {
        headers: getAuthHeaders(),
      });

      const updatedUser = data as unknown as User;
      user.value = updatedUser;
      saveProfileToCache(updatedUser);
    } catch (error) {
      console.log("Failed to fetch user profile", error);
      // Nếu lỗi 401 thì logout
      if ((error as any)?.statusCode === 401) {
        logout();
      }
    } finally {
      isFetchingProfile.value = false;
    }
  };

  // Initial state from token (client-side only)
  const initUserFromToken = () => {
    if (import.meta.client && accessToken.value) {
      // Trước mắt decode token để lấy thông tin cơ bản
      const decoded = parseJwt(accessToken.value);
      if (decoded) {
        const cachedProfile = getProfileFromCache();
        const userId = decoded.sub || decoded.id;

        // Ưu tiên dùng cache profile nếu có và khớp ID
        if (cachedProfile && cachedProfile.id === userId) {
          user.value = cachedProfile;
        } else {
          // Fallback nhẹ nếu chưa load profile
          if (!user.value) {
            user.value = {
              id: userId,
              email: decoded.email,
              role: decoded.role || "USER",
            } as User;
          }
        }
      }
    }
  };

  /**
   * Login user and update auth state
   */
  const login = (token: string) => {
    if (!token || token === "undefined") {
      console.warn("Attempted to login with invalid token");
      return;
    }

    // useCookie updates the cookie automatically
    accessToken.value = token;

    // Legacy support: remove from localStorage if it exists to avoid confusion?
    // Or keep for sync? Let's just rely on cookie.

    initUserFromToken();
    fetchUserProfile(true);
  };

  /**
   * Logout user and clear auth state
   */
  const logout = () => {
    if (import.meta.client) {
      localStorage.removeItem(PROFILE_KEY);
      // Also remove local token if it exists (for clean migration)
      localStorage.removeItem(TOKEN_KEY);
    }
    accessToken.value = null; // Clears cookie
    user.value = null;
  };

  /**
   * Check if user is authenticated
   */
  const checkAuth = () => {
    // With headers/cookies, we check access token directly
    return isAuthenticated.value;
  };

  // Initialize
  if (import.meta.client) {
    // Migration: If no cookie but localStorage has token, set cookie
    const localToken = localStorage.getItem(TOKEN_KEY);
    if (!accessToken.value && localToken && localToken !== "undefined") {
      accessToken.value = localToken;
    }

    // Token còn tồn tại nhưng đã hết hạn/hỏng → dọn dẹp, không gọi /auth/me.
    if (accessToken.value && isTokenExpired(accessToken.value)) {
      logout();
    } else if (accessToken.value) {
      initUserFromToken();
      // Optionally fetch profile in background
      if (!isFetchingProfile.value && (!user.value || !user.value.createdAt)) {
        fetchUserProfile();
      }
    }
  }

  return {
    // State
    isAuthenticated,
    accessToken: computed(() => accessToken.value),
    user: computed(() => user.value),

    // Methods
    login,
    logout,
    checkAuth,
    getAuthHeaders,
    fetchUserProfile,
    updateUserLocal,
  };
}
