import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface IUser {
  id: string;
  email: string;
  userName: string;
  name: string;
  // Add any other user properties your backend returns
}

interface IUserState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoadingAuth: boolean;
  isSigningIn: boolean;
  isSigningUp: boolean;
  isSigningOut: boolean;
  signin: (data: ISignin) => Promise<void>;
  signup: (data: ISignup) => Promise<void>;
  signout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

interface ISignin {
  email: string;
  password: string;
}

interface ISignup {
  email: string;
  password: string;
  userName: string;
  name: string;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI!,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAuthStore = create<IUserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoadingAuth: true,
      isSigningIn: false,
      isSigningUp: false,
      isSigningOut: false,

      signin: async (data: ISignin) => {
        set({ isSigningIn: true, isLoadingAuth: true });
        try {
          const response = await axiosInstance.post("/api/v1/auth/login", data);
          if (response.status === 200 && response.data) {
            set({ isAuthenticated: true, user: response.data.user });
            toast.success("Signed in successfully!");
          }
        } catch (error) {
          set({ isAuthenticated: false, user: null });
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data) {
              toast.error(
                (axiosError.response.data as any).message ||
                  "Unable to sign in. Please check your credentials!",
              );
            } else if (axiosError.request) {
              toast.error(
                "No response from server. Please check your internet connection.",
              );
            } else {
              toast.error("An unexpected error occurred during sign-in.");
            }
          } else {
            toast.error("An unknown error occurred.");
          }
        } finally {
          set({ isSigningIn: false, isLoadingAuth: false });
        }
      },

      signup: async (data: ISignup) => {
        set({ isSigningUp: true, isLoadingAuth: true });
        try {
          const response = await axiosInstance.post(
            "/api/v1/auth/register",
            data,
          );
          if (response.status === 200 && response.data) {
            set({ isAuthenticated: true, user: response.data.user });
            toast.success("Account created and signed in successfully!");
          }
        } catch (error) {
          set({ isAuthenticated: false, user: null });
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data) {
              toast.error(
                (axiosError.response.data as any).message ||
                  "Unable to sign up. Please try again!",
              );
            } else if (axiosError.request) {
              toast.error(
                "No response from server. Please check your internet connection.",
              );
            } else {
              toast.error("An unexpected error occurred during sign-up.");
            }
          } else {
            toast.error("An unknown error occurred.");
          }
        } finally {
          set({ isSigningUp: false, isLoadingAuth: false });
        }
      },

      signout: async () => {
        set({ isSigningOut: true, isLoadingAuth: true });
        try {
          const response = await axiosInstance.post("/api/v1/auth/logout");
          if (response.status === 200) {
            set({ isAuthenticated: false, user: null });
            toast.success("Signed out successfully!");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data) {
              toast.error(
                (axiosError.response.data as any).message ||
                  "Unable to sign out. Please try again!",
              );
            } else {
              toast.error("An error occurred during sign-out.");
            }
          } else {
            toast.error("An unknown error occurred.");
          }
        } finally {
          set({ isSigningOut: false, isLoadingAuth: false });
        }
      },

      getCurrentUser: async () => {
        set({ isLoadingAuth: true });
        try {
          const response = await axiosInstance.get("/api/v1/auth/profile");
          if (response.status === 200 && response.data) {
            set({ isAuthenticated: true, user: response.data.user });
          } else {
            set({ isAuthenticated: false, user: null });
          }
        } catch (error) {
          set({ isAuthenticated: false, user: null });
        } finally {
          set({ isLoadingAuth: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
);

export { useAuthStore };
