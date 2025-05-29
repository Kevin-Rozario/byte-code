import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axiosInstance from "@/lib/config/axios";
import toast from "react-hot-toast";

interface IUser {
  id: string;
  email: string;
  userName: string;
  fullName: string;
  isEmailVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
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
  identifier: string;
  password: string;
}

interface ISignup {
  email: string;
  password: string;
  userName: string;
  fullName: string;
}

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

          if (response.status === 200 && response.data.data) {
            set({ isAuthenticated: true, user: response.data.data });
            toast.success("Signed in successfully!");
          } else {
            set({ isAuthenticated: false, user: null });
            toast.error(
              response.data.message ||
                "Unable to sign in. Please check your credentials!",
            );
          }
        } catch (error) {
          set({ isAuthenticated: false, user: null });
          console.error("Error signing in:", error);
          toast.error("Failed to sign in.");
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
          if (response.status === 200 && response.data.data) {
            set({ isAuthenticated: true, user: response.data.data });
            toast.success("Account created successfully!");
          } else {
            set({ isAuthenticated: false, user: null });
            toast.error(
              "Account created but unable to sign in automatically. Please try signing in.",
            );
          }
        } catch (error) {
          set({ isAuthenticated: false, user: null });
          console.error("Error signing up:", error);
          toast.error("Failed to sign up.");
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
          console.error("Error signing out:", error);
          toast.error("Failed to sign out.");
        } finally {
          set({ isSigningOut: false, isLoadingAuth: false });
        }
      },

      getCurrentUser: async () => {
        set({ isLoadingAuth: true });
        try {
          const response = await axiosInstance.get("/api/v1/auth/profile");
          if (response.status === 200 && response.data) {
            set({ isAuthenticated: true, user: response.data.data });
          } else {
            set({ isAuthenticated: false, user: null });
          }
        } catch (error) {
          set({ isAuthenticated: false, user: null });
          console.error("Error getting current user:", error);
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
