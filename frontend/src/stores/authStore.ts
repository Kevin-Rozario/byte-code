import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

interface IUserState {
  authUser: {
    id: string;
    name: string;
    email: string;
  } | null;
  signin: (data: ISignin) => Promise<void>;
  signup: (data: ISignup) => Promise<void>;
  signout: () => Promise<void>;
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

const useAuthStore = create<IUserState>((set) => ({
  authUser: null,
  signin: async (data: ISignin) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/login", data);
      set({ authUser: response.data });
      toast.success("Signed in successfully");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  },
  signup: async (data: ISignup) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/register", data);
      set({ authUser: response.data });
      toast.success("Signed up successfully");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  },
  signout: async () => {
    try {
      await axiosInstance.post("/api/v1/auth/logout");
      set({ authUser: null });
      toast.success("Signed out successfully");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/profile");
      set({ authUser: response.data });
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  },
}));

export { useAuthStore };
