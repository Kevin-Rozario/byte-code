import { useEffect } from "react";
import { Code } from "lucide-react";
import ProblemsTable from "@/components/ProblemsTable/ProblemTable";
import { useProblemStore } from "@/stores/problemStore";

const ProblemsPage = () => {
//   const problems = useProblemStore((state) => state.problems);
  const getAllProblems = useProblemStore((state) => state.getAllProblems);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Code className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Problem Explorer
              </h1>
              <p className="text-slate-400 text-base">
                Discover coding challenges • Track your progress • Build your
                skills
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <ProblemsTable problems={problems} /> */}
      <ProblemsTable />
    </div>
  );
};

export default ProblemsPage;
