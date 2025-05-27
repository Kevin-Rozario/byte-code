import { createFileRoute } from "@tanstack/react-router";
import ListProblemsPage from "@/pages/ListProblemsPage";

export const Route = createFileRoute("/problems/")({
  component: ListProblemsPage,
});
