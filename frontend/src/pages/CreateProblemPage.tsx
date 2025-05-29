import ProblemForm from "@/components/ProblemForm/ProblemForm";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { Code, Home } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CreateProblemPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated || !authUser) {
    navigate({ to: "/" });
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/">
                    <Home className="w-10 h-10 text-purple-400" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex items-center gap-4">
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
      </div>
      <ProblemForm />
    </div>
  );
};

export default CreateProblemPage;
