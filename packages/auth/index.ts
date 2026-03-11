import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// 1. Описываем структуру пользователя из твоего API
export interface User {
  sub: string;
  email: string;
  role: "BROKER" | "DRIVER" | "ADMIN";
  iat: number;
  exp: number;
}

// 2. Реактивное состояние
const accessToken = ref<string | null>(localStorage.getItem("jony_at"));
const refreshToken = ref<string | null>(localStorage.getItem("jony_rt"));

const user = computed<User | null>(() => {
  if (!accessToken.value) return null;
  try {
    return jwtDecode<User>(accessToken.value);
  } catch {
    return null;
  }
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.loadboard.asia/api/v1",
});

authApi.interceptors.request.use((config) => {
  if (accessToken.value) {
    config.headers.Authorization = `Bearer ${accessToken.value}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Jony, access token expired. Attempting refresh...");

        const res = await axios.post(`${authApi.defaults.baseURL}/refresh`, {
          refreshToken: refreshToken.value,
        });

        const newAccessToken = res.data.accessToken;

        accessToken.value = newAccessToken;
        localStorage.setItem("jony_at", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed. Redirecting to login.");
        accessToken.value = null;
        refreshToken.value = null;
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const useAuth = () => {
  const login = (data: { accessToken: string; refreshToken: string }) => {
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    localStorage.setItem("jony_at", data.accessToken);
    localStorage.setItem("jony_rt", data.refreshToken);
  };

  const loginWithGoogle = async (googleCredential: string) => {
    try {
      const { data } = await authApi.post("/auth/google", {
        token: googleCredential,
      });

      login(data);
      return true;
    } catch (error) {
      console.error("Google Auth Failed:", error);
      return false;
    }
  };

  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.clear();
    window.location.href = "/login";
  };

  return {
    accessToken,
    user,
    isAuthenticated: computed(() => !!accessToken.value),
    hasRole: (role: string) => user.value?.role === role,
    login,
    logout,
    loginWithGoogle,
  };
};
