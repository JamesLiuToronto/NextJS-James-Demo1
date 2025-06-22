import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string(),
  status: z.enum(['todo', 'in-progress', 'done', 'canceled']),
  priority: z.enum(['low', 'medium', 'high']),
  label: z.enum(['bug', 'feature', 'enhancement', 'documentation']),
  archived: z.boolean(),
  createdAt: z.date(),
})

export type Task = z.infer<typeof taskSchema>

export const tasks = {
  status: {
    enumValues: ['todo', 'in-progress', 'done', 'canceled'] as const,
  },
  priority: {
    enumValues: ['low', 'medium', 'high'] as const,
  },
  label: {
    enumValues: ['bug', 'feature', 'enhancement', 'documentation'] as const,
  },
} 