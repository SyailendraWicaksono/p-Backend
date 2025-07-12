import { z } from 'zod';

export const createProjectIdeaSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  adminId: z.number(),
});

export const updateProjectIdeaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
