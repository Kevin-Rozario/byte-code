import { create } from "zustand";
import axiosInstance from "@/lib/config/axios";

interface IExecuteInput {
  sourceCode: string;
  languageId: number;
  stdin: string;
  expectedOutputs: string;
  problemId: string;
}

interface ITestCaseOutput {
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
  executeCode: (input: IExecuteInput) => Promise<void>;
}

export const useExecuteStore = create<IExecuteStore>((set) => ({
  isExecuting: false,
  submission: null,
  executeCode: async ({
    sourceCode,
    languageId,
    stdin,
    expectedOutputs,
    problemId,
  }: IExecuteInput) => {
    try {
      set({ isExecuting: true });

      // print for test purpose
      console.log(
        "Submission:",
        JSON.stringify({
          sourceCode,
          languageId,
          stdin,
          expectedOutputs,
          problemId,
        }),
      );

      const reponse = await axiosInstance.post("/api/v1/code/execute", {
        sourceCode,
        languageId,
        stdin,
        expectedOutputs,
        problemId,
      });
      if (reponse.status === 200 && reponse.data) {
        set({ submission: reponse.data.data });
      }
      set({ submission: reponse.data.data });
    } catch (error) {
      console.error("Error executing code:", error);
    }
  },
}));
