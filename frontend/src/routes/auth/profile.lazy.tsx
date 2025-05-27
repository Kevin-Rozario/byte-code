import { createLazyFileRoute } from "@tanstack/react-router";
import UserProfilePage from "@/pages/ProfilePage";

export const Route = createLazyFileRoute("/auth/profile")({
  component: UserProfilePage,
});
