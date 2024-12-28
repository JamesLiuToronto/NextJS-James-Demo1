import { z } from 'zod';

export const postSchema = z.object({
  id: z.string({ message: 'ID is required' }).min(1, 'ID is required, min 1 character'),
  title: z
    .string({ message: 'Title is required' })
   // .url('Link must be a valid URL'),
   .min(5, 'Title min is 5 characters')
   .max(50, 'Title max is 50 characters'),
  body: z
    .string({ message: 'Body is required' })
    .min(5, 'Body min is 5 characters'),
  author: z
    .string({ message: 'Author is required' })
   // .url('Author must be a valid URL'),
   .min(5, 'Author min is 5 characters')
   .max(20, 'Author max is 20 characters'),  
   date: z
    .date({ message: 'Date is required' }),
   // .url('Author must be a valid URL'),
      
  comments: z.array(z.object({
      id: z.string({ message: 'ID is required' }).min(1, 'ID is required, min 1 character'),  
      username: z.string({ message: 'username is required' }).min(1, 'username min is 1 character'),
      text: z.string({ message: 'Text is required' }).min(1, 'Text min is 1 character')
    })).nullable()
});

export type Post = z.infer<typeof postSchema>;


  
 