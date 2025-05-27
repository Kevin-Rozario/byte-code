import { createLazyFileRoute } from "@tanstack/react-router";
import SolveProblemPageRouteComponent from "@/pages/SolveProblemPage";

export const Route = createLazyFileRoute("/problems/problem/$id/")({
  component: SolveProblemPageRouteComponent,
});
