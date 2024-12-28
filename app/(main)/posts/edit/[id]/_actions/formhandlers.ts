'use server';

import { DataFormState } from '@/types/data-types';

import { convertZodErrors } from '@/utils/form';
import { revalidatePath } from 'next/cache';
import { createPost, updatePost } from '@/components/PostActions';
import { Post, postSchema } from '@/app/(main)/share-types/post-schema';

export const formHandlerAction = async (
  formData: Post,
  isUpdate: boolean
): Promise<DataFormState | undefined> => {

  console.log('validated date:', formData.date);

  const validated = postSchema.safeParse(formData);
  
  if (!validated.success) {
    
    const errors = convertZodErrors(validated.error);
    console.log(errors);
    return {
      errors,
    };
  } 
  
  try {
    const response = isUpdate? await updatePost(formData): await createPost(formData);
    revalidatePath('/posts');
    return { successMsg: 'Post added successfully!', data: response };
  } catch (error) {
    console.error('Failed to update post:', error);
    return { errors: { form: 'Failed to update post' } };
  }
};




