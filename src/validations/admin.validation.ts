import { z } from 'zod';

export const registerAdminSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// ✅ Tambahkan schema validasi untuk update admin
export const updateAdminSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional()
});