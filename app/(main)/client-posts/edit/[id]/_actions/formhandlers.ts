'use server';

import { DataFormState } from '@/types/data-types';

import { convertZodErrors } from '@/utils/form';
import { revalidatePath } from 'next/cache';
import { Post, postSchema } from '@/app/(main)/share-types/post-schema';
import { updatePost } from '../../../components/PostActions';

export const formHandlerAction = async (
  formData: Post
): Promise<DataFormState | undefined> => {

  const validated = postSchema.safeParse(formData);
  console.log('validated:', validated);
  if (!validated.success) {
    
    const errors = convertZodErrors(validated.error);
    console.log(errors);
    return {
      errors,
    };
  } 

  console.log('Data is valid:', validated.data);
  try {
    const response = await updatePost(formData);
    revalidatePath('/posts');
    return { successMsg: 'Post added successfully!', data: response };
  } catch (error) {
    console.error('Failed to update post:', error);
    return { errors: { form: 'Failed to update post' } };
  }
};


