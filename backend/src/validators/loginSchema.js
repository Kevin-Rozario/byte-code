import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    invalid_type_error: "Enter a valid email",
  }),
  password: z.string().min({
    message: "Password must be at least 8 characters",
    min: 8,
  }),
});
