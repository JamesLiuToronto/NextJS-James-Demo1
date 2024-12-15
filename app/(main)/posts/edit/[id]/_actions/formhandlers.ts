'use server';

import { DataFormState } from '@/types/data-types';
import { Post, postSchema } from '../../../../share-types/post-schema'; // Adjust the import path as necessary
import { convertZodErrors } from '@/utils/form';
import PostServiceAxios from '@/components/PostServiceAxios';
import { revalidatePath } from 'next/cache';

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
    const response = await PostServiceAxios.updatePost(formData);
    revalidatePath('/posts');
    return { successMsg: 'Post added successfully!', data: response };
  } catch (error) {
    console.error('Failed to update post:', error);
    return { errors: { form: 'Failed to update post' } };
  }
};


