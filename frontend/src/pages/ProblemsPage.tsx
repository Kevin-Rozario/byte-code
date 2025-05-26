import { useProblemStore } from "@/stores/problemStore";
import { useEffect } from "react";

const ProblemsPage = () => {
  const problems = useProblemStore((state) => state.problems);
  const getAllProblems = useProblemStore((state) => state.getAllProblems);
  const isProblemsLoading = useProblemStore((state) => state.isProblemsLoading);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  console.log(problems);

  return <div>ProblemsPage</div>;
};

export default ProblemsPage;
