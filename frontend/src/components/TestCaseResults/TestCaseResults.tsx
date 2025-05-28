import {
  CheckCircle,
  TestTube,
  XCircle,
  Clock,
  MemoryStick,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export interface ISubmissionResultProps {
  id: string;
  submissionId: string;
  testCase: number;
  passed: boolean;
  stdin: string;
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

const TestCaseResults = ({
  testResults,
}: {
  testResults: ISubmissionResultProps[] | null;
}) => {
  return (
    <div className="h-[calc(50vh-280px)] px-6 pb-6 overflow-y-auto no-scrollbar">
      <div className="space-y-4">
        {testResults?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-slate-400">
            <TestTube className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">Run your code to see results</p>
          </div>
        ) : (
          testResults?.map((testCase, index) => (
            <Card key={index} className="p-4 bg-slate-800 border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-200">
                  Test Case {index + 1}
                </h4>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs font-semibold">
                    <Clock className="w-6 h-6 mr-1" />
                    {testCase.time}
                  </Badge>
                  <Badge className="text-xs font-semibold">
                    <MemoryStick className="w-6 h-6 mr-1" />
                    {testCase.memory}
                  </Badge>
                  {testCase.passed && (
                    <CheckCircle className="w-8 h-8 text-emerald-400 drop-shadow-lg mr-2 ml-2" />
                  )}
                  {!testCase.passed && (
                    <XCircle className="w-8 h-8 text-red-400 drop-shadow-lg mr-2 ml-2" />
                  )}
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-slate-400">Input:</span>
                  <div className="mt-1 p-2 bg-slate-900 border border-slate-600 rounded text-xs font-mono text-slate-300">
                    {testCase.stdin}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-medium text-slate-400">
                      Your Output:
                    </span>
                    <div
                      className={`mt-1 p-2 bg-slate-900 border border-slate-600 rounded text-xs font-mono ${testCase.passed ? "text-green-500" : "text-red-500"}`}
                    >
                      {testCase.stdout}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-slate-400">
                      Expected:
                    </span>
                    <div className="mt-1 p-2 bg-slate-900 border border-slate-600 rounded text-xs font-mono text-green-500">
                      {testCase.expected}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TestCaseResults;
