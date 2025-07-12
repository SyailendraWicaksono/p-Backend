import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6)
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).optional()
});
