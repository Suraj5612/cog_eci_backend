import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2),
  middleName: z.string().optional(),
  lastName: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  mobile: z.string().min(10),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});
