import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

const SolveProblemPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return <>{authUser ? "" : navigate({ to: "/auth/sign-in" })}</>;
};

export default SolveProblemPage;
