import { createLazyFileRoute } from "@tanstack/react-router";
import SolveProblemPage from "@/pages/SolveProblemPage";

export const Route = createLazyFileRoute("/problems/problem/$id")({
  component: SolveProblemPage,
});
