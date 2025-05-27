// import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";

const authUser = {
  id: "1",
  email: "j3Yt8@example.com",
  role: "ADMIN",
  isEmailVerified: true,
  fullName: "test",
  userName: "test",
};

const SolveProblemPage = () => {
  // const authUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return <>{authUser ? "hello" : navigate({ to: "/auth/sign-in" })}</>;
};

export default SolveProblemPage;
