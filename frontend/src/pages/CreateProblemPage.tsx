import ProblemForm from "@/components/ProblemForm/ProblemForm";
import { Code } from "lucide-react";

const CreateProblemPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Create Problem
              </h1>
              <p className="text-slate-400 text-sm">
                Design a new coding challenge
              </p>
            </div>
          </div>
        </div>
      </div>
      <ProblemForm />
    </div>
  );
};

export default CreateProblemPage;
