import { ref, computed, onMounted } from "vue";
import type { User } from "~/types/practice-math";

// Token storage key
const TOKEN_KEY = "accessToken";
const PROFILE_KEY = "userProfile";

// Helper to decode JWT
function parseJwt(token: string) {
  try {
    if (!process.client) return null;

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

  // Kiểm tra token hợp lệ (không rỗng và không phải chuỗi "undefined")
  const isAuthenticated = computed(
    () => !!accessToken.value && accessToken.value !== "undefined"
  );

  // Helper to save profile to cache
  const saveProfileToCache = (userData: User) => {
    if (process.client) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(userData));
    }
  };

  // Helper to get profile from cache
  const getProfileFromCache = (): User | null => {
    if (!process.client) return null;
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
      const data = await $practiceMathApi("/auth/me", {
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
    if (process.client && accessToken.value) {
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
    if (process.client) {
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
  if (process.client) {
    // Migration: If no cookie but localStorage has token, set cookie
    const localToken = localStorage.getItem(TOKEN_KEY);
    if (!accessToken.value && localToken && localToken !== "undefined") {
      accessToken.value = localToken;
    }

    if (accessToken.value) {
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
