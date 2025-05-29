import axios from "axios";
import { router } from "@/main";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI!,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// to handle renew tokens logic with refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.get("/api/v1/auth/refresh-token");
        console.log("response", response.data.data);
        if (response.status === 200 && response.data.data) {
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error during refresh token renewal:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.navigate({ to: "/auth/sign-in" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
