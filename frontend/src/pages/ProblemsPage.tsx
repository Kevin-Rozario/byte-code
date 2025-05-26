import { useProblemStore } from "@/stores/problemStore";
import { useEffect } from "react";

const ProblemsPage = () => {
  const problems = useProblemStore((state) => state.problems);
  const getAllProblems = useProblemStore((state) => state.getAllProblems);
  const isProblemsLoading = useProblemStore((state) => state.isProblemsLoading);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {problems.length > 0 ? (
        <div>
          {problems.map((problem) => (
            <div key={problem.id}>
              <h1>{problem.title}</h1>
              <p>{problem.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No problems found</div>
      )}
    </>
  );
};

export default ProblemsPage;
