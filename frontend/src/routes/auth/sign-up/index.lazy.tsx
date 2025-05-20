import { createLazyFileRoute } from "@tanstack/react-router";
import SignUpPageRouteComponent from "@/pages/SignUpPage";

export const Route = createLazyFileRoute("/auth/sign-up/")({
  component: SignUpPageRouteComponent,
});
