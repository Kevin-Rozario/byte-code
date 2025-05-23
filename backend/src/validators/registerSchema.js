import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({
    invalid_type_error: "Enter a valid email",
  }),
  password: z.string().min({
    message: "Password must be at least 6 characters",
    min: 6,
  }),
  fullName: z.string().min({
    message: "Name must be at least 2 characters",
    min: 2,
  }),
  userName: z.string().min({
    message: "Username must be at least 2 characters",
    min: 2,
  }),
});
