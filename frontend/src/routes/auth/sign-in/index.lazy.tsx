import { createLazyFileRoute } from "@tanstack/react-router";
import SignInRouteComponent from "@/pages/SignInPage";

export const Route = createLazyFileRoute("/auth/sign-in/")({
  component: SignInRouteComponent,
});
