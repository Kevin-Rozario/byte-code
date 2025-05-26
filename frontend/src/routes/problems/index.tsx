import { createFileRoute } from "@tanstack/react-router";
import ProblemsPageRouteComponent from "@/pages/ProblemsPage";

export const Route = createFileRoute("/problems/")({
  component: ProblemsPageRouteComponent,
});
