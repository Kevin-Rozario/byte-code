import { create } from "zustand";
import axiosInstance from "@/lib/config/axios";

export interface IExecuteInput {
  sourceCode: string;
  languageId: number | undefined;
  stdin: string[];
  expectedOutputs: string[];
  problemId: string;
}

export interface ITestCaseOutput {
  id: string;
  submissionId: string;
  testCase: number;
  passed: boolean;
  stdout: string;
  expected: string;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IExecuteOutput {
  id: string;
  userId: string;
  problemId: string;
  sourceCode: string;
  language: string;
  stdin: string;
  stdout: string[];
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string[];
  time: string[];
  createdAt: Date;
  updatedAt: Date;
  testCases: ITestCaseOutput[];
}

interface IExecuteStore {
  isExecuting: boolean;
  submission: IExecuteOutput | null;
  error: string | null;
  executeCode: (input: IExecuteInput) => Promise<void>;
}

export const useExecuteStore = create<IExecuteStore>((set) => ({
  isExecuting: false,
  submission: null,
  error: null,

  executeCode: async ({
    sourceCode,
    languageId,
    stdin,
    expectedOutputs,
    problemId,
  }: IExecuteInput) => {
    set({ isExecuting: true, error: null, submission: null });

    try {
      const response = await axiosInstance.post<{
        data: { submission: IExecuteOutput };
      }>("/api/v1/code/execute", {
        sourceCode,
        languageId,
        stdin,
        expectedOutputs,
        problemId,
      });

      if (response.status === 200 && response.data?.data?.submission) {
        set({ submission: response.data.data.submission });
      } else {
        set({ error: "Execution failed: No submission data received." });
      }
    } catch (error) {
      console.error("Error executing code:", error);
    } finally {
      set({ isExecuting: false });
    }
  },
}));
