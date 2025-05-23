import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  userName: z.string().min(3, "Username must be at least 3 characters long"),
  fullName: z.string().min(3, "Name must be at least 3 characters long"),
});
