import { createFileRoute } from "@tanstack/react-router";
import ListProblemsPageRouteComponent from "@/pages/ListProblemsPage";

export const Route = createFileRoute("/problems/")({
  component: ListProblemsPageRouteComponent,
});
