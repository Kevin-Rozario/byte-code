import { create } from "zustand";
import axiosInstance from "@/lib/config/axios";
import toast from "react-hot-toast";

export interface IProblem {
  id: string;
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
  solvedBy: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITestCase {
  input: string;
  output: string;
}

interface IProblemState {
  problems: IProblem[] | [];
  createdProblems: IProblem[] | [];
  solvedProblems: IProblem[] | [];
  problem: IProblem | null;
  isProblemsLoading: boolean;
  isProblemLoading: boolean;

  getAllProblems: () => Promise<void>;
  getProblemById: (id: string) => Promise<void>;
  getSolvedProblems: () => Promise<void>;
  getCreatedProblems: () => Promise<void>;
}

const useProblemStore = create<IProblemState>()((set) => ({
  problems: [],
  solvedProblems: [],
  createdProblems: [],
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
        toast.success("Problems fetched successfully.");
      }
    } catch (error: any) {
      console.error("Error fetching problems:", error);
      toast.error("Failed to fetch problems.");
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
        toast.success("Problem fetched successfully.");
      }
    } catch (error: any) {
      console.error("Error fetching problem:", error);
      toast.error("Failed to fetch problem.");
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
        toast.success("Solved problems fetched successfully.");
      }
    } catch (error: any) {
      console.error("Error fetching solved problems:", error);
      toast.error("Failed to fetch solved problems.");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getCreatedProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const response = await axiosInstance.get(
        "/api/v1/problems/get-created-problems",
      );
      if (response.status === 200 && response.data) {
        set({ createdProblems: response.data.data });
      }
    } catch (error: any) {
      console.error("Error fetching created problems:", error);
      toast.error("Failed to fetch created problems.");
    } finally {
      set({ isProblemsLoading: false });
    }
  },
}));

export { useProblemStore };
