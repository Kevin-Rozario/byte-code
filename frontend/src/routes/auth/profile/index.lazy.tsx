import { createLazyFileRoute } from "@tanstack/react-router";
import ProfilePageRouteComponent from "@/pages/ProfilePage";

export const Route = createLazyFileRoute("/auth/profile/")({
  component: ProfilePageRouteComponent,
});
