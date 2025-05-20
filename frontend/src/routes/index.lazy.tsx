import { createLazyFileRoute } from "@tanstack/react-router";
import HomePageRouteComponent from "@/pages/HomePage";

export const Route = createLazyFileRoute("/")({
  component: HomePageRouteComponent,
});
