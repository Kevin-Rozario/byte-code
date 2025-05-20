import { createLazyFileRoute } from "@tanstack/react-router";
import SignupPageRouteComponent from "@/pages/SignupPage";

export const Route = createLazyFileRoute("/auth/signup/")({
  component: SignupPageRouteComponent,
});
