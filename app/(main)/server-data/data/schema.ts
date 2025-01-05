import { boolean, z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  archived: z.boolean().default(false),
  createdAt: z.date({ message: 'createDate is required' }),
    updatedAt: z.date({ message: 'updateDate is required' })
  })

export type Task = z.infer<typeof taskSchema>



