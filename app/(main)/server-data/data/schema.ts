import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

// API Response Schema
export const apiResponseSchema = z.object({
  data: z.array(taskSchema),
  pagination: z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalCount: z.number(),
    pageSize: z.number(),
  }),
  filters: z.object({
    appliedFilters: z.object({
      search: z.string().optional(),
      status: z.array(z.string()).optional(),
      priority: z.array(z.string()).optional(),
      label: z.array(z.string()).optional(),
    }),
  }),
})

export type ApiResponse = z.infer<typeof apiResponseSchema>

// API Request Parameters Schema
export const apiRequestSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
  sortBy: z.enum(['id', 'title', 'status', 'priority', 'label']).default('id'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().optional(),
  status: z.array(z.string()).optional(),
  priority: z.array(z.string()).optional(),
  label: z.array(z.string()).optional(),
})

export type ApiRequest = z.infer<typeof apiRequestSchema>



