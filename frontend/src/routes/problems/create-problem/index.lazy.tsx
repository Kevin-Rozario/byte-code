import { createLazyFileRoute } from "@tanstack/react-router";
import CreateProblemPageRouteComponent from "@/pages/CreateProblemPage";

export const Route = createLazyFileRoute("/problems/create-problem/")({
  component: CreateProblemPageRouteComponent,
});
