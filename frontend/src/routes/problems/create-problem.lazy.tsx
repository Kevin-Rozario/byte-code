import { createLazyFileRoute } from "@tanstack/react-router";
import CreateProblemPage from "@/pages/CreateProblemPage";

export const Route = createLazyFileRoute("/problems/create-problem")({
  component: CreateProblemPage,
});
