import { z } from "zod";

export const signinSchema = z.object({
  identifier: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
