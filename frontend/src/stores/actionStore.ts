import { create } from "zustand";
import axiosInstance from "@/lib/config/axios";
import toast from "react-hot-toast";

interface IActionStoreState {
  isDeletingProblem: boolean;
  onDeleteProblem: (id: string) => Promise<void>;
}

export const useActionStore = create<IActionStoreState>()((set) => ({
  isDeletingProblem: false,
  onDeleteProblem: async (id: string) => {
    try {
      set({ isDeletingProblem: true });
      const response = await axiosInstance.delete(
        `/api/v1/problems/delete-problem/${id}`,
      );
      if (response.status === 200 && response.data.data) {
        set({ isDeletingProblem: false });
        toast.success("Problem deleted successfully.");
      } else {
        toast.error("Failed to delete problem.");
      }
    } catch (error) {
      console.error("Error deleting problem:", error);
      toast.error("Failed to delete problem.");
    } finally {
      set({ isDeletingProblem: false });
    }
  },
}));
