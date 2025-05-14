import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['pending', 'in_progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

export const TaskFormDataSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TaskFormData = z.infer<typeof TaskFormDataSchema>;
