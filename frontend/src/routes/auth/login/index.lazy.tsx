import { createLazyFileRoute } from "@tanstack/react-router";
import LoginRouteComponent from "@/pages/LoginPage";

export const Route = createLazyFileRoute("/auth/login/")({
  component: LoginRouteComponent,
});
