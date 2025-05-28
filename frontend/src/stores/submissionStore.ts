import { create } from "zustand";
import axiosInstance from "@/lib/config/axios";
import toast from "react-hot-toast";

export interface ISubmission {
  id: string;
  problemId: string;
  userId: string;
  sourceCode: string;
  language: string;
  stdin: string;
  stdout: string;
  stderr: string;
  compileOuput: string;
  status: string;
  memory: string[] | null;
  time: string[] | null;
  createdAt: string;
  updatedAt: string;
}

interface ISubmissionStore {
  isLoading: boolean;
  submissionsByUser: ISubmission[];
  submissionsCountForProblem: number;
  submissionsForProblemByUser: ISubmission[];
  getSubmissionsByUser: () => Promise<void>;
  getSubmissionsForProblemByUser: (problemId: string) => Promise<void>;
  getSubmissionsCountForProblem: (problemId: string) => Promise<void>;
}

export const useSubmissionStore = create<ISubmissionStore>((set) => ({
  isLoading: false,
  submissionsByUser: [],
  submissionsForProblemByUser: [],
  submissionsCountForProblem: 0,

  getSubmissionsByUser: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        "/api/v1/submissions/get-all-submissions",
      );
      if (response.status === 200 && response.data) {
        set({ submissionsByUser: response.data.data });
        toast.success("Submissions fetched successfully.");
      } else {
        toast.error("Failed to fetch submissions.");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to fetch submissions.");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionsForProblemByUser: async (problemId: string) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        `/api/v1/submissions/get-problem/${problemId}`,
      );
      if (response.status === 200 && response.data) {
        set({ submissionsForProblemByUser: response.data.data });
        toast.success("Submission fetched successfully.");
      } else {
        toast.error("Failed to fetch submission.");
      }
    } catch (error) {
      console.error("Error fetching submission:", error);
      toast.error("Failed to fetch submission.");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionsCountForProblem: async (problemId: string) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        `/api/v1/submissions/get-submission-count/${problemId}`,
      );
      if (response.status === 200 && response.data) {
        set({ submissionsCountForProblem: response.data.data });
        toast.success("Submission count fetched successfully.");
      } else {
        toast.error("Failed to fetch submission count.");
      }
    } catch (error) {
      console.error("Error fetching submission count:", error);
      toast.error("Failed to fetch submission count.");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSubmissionStore;
