import { create } from "zustand";
import axiosInstance from "@/lib/config/axios";
import { toast } from "sonner";

interface IProblem {
  title: string;
  description: string;
  difficulty: string;
  constraints: string;
  hints?: string;
  editorial?: string;
  tags: string[];
  testCases: { input: string; output: string }[];
  codeSnippets: { [key: string]: string };
  referenceSolutions: { [key: string]: string };
  examples: {
    [key: string]: {
      input: string;
      output: string;
      explanation?: string;
    };
  };
}

interface IProblemState {
  problems: IProblem[] | [];
  solvedProblems: IProblem[] | [];
  problem: IProblem | null;
  isProblemsLoading: boolean;
  isProblemLoading: boolean;

  getAllProblems: () => Promise<void>;
  getProblemById: (id: string) => Promise<void>;
  getSolvedProblems: () => Promise<void>;
}

const useProblemStore = create<IProblemState>()((set) => ({
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

  getProblemById: async (id: string) => {
    try {
      set({ isProblemLoading: true });
      const response = await axiosInstance.get(
        `/api/v1/problems/get-problem/${id}`,
      );
      if (response.status === 200 && response.data) {
        set({ problem: response.data.data });
        toast.success(response.data.message || "Problem fetched successfully.");
      }
    } catch (error: any) {
      console.error("Error fetching problem:", error);
      toast.error(error.message || "Failed to fetch problem.");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const response = await axiosInstance.get(
        "/api/v1/problems/get-solved-problems",
      );
      if (response.status === 200 && response.data) {
        set({ solvedProblems: response.data.data });
        toast.success(
          response.data.message || "Solved problems fetched successfully.",
        );
      }
    } catch (error: any) {
      console.error("Error fetching solved problems:", error);
      toast.error(error.message || "Failed to fetch solved problems.");
    } finally {
      set({ isProblemsLoading: false });
    }
  },
}));

export { useProblemStore };
