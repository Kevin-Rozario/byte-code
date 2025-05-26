import { create } from "zustand";
import axiosInstance from "@/lib/config/axios";
import { toast } from "sonner";

const problemStore = (set) => ({
  problems: [],
  solvedProblems: [],
  problem: null,
  isProblemsLoading: false,
  isProblemLoading: false,

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const response = await axiosInstance.get(
        "/api/v1/problems/get-all-problems",
      );
      if (response.status === 200 && response.data) {
        set({ problems: response.data.data });
        toast.success(
          response.data.message || "Problems fetched successfully.",
        );
      }
    } catch (error: any) {
      console.error("Error fetching problems:", error);
      toast.error(error.message || "Failed to fetch problems.");
    } finally {
      set({ isProblemsLoading: false });
    }
  },
  getProblemById: async () => {},
  updateProblemById: async () => {},
  deleteProblemById: async () => {},
  getSolvedProblems: async () => {},
});

const useProblemStore = create()(problemStore);

export { useProblemStore };
