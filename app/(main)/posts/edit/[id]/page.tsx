'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/BackButton';
import {useEffect, useRef, useState } from 'react';
import { use } from 'react';
import { Post, postSchema } from '../../../share-types/post-schema';
import { formHandlerAction } from './_actions/formhandlers';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { fetchPost } from '@/components/PostActions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';



interface PostEditPageProps {
  params: Promise<{ id: string }>;
}

const PostEditPage = ({ params }: PostEditPageProps) => {
  const { toast } = useToast();
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const fetchedPost = await fetchPost(Number(id));
        setPost(fetchedPost);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };
    fetchPostData();
  }, [id]);



  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      id: '0',
      title: '',
      body: '',
      author: '',
      date: '' ,
      comments: [],
    },
  });

  useEffect(() => {
    console.log('caleed');
    if (post) {
      if (!post?.comments){
        post.comments = [];
     }
      form.reset(post);
    }
  }, [post, form]);

  //const [errors, setErrors] = useState({});


 

  const handleFormSubmit = async (data: Post) => {

    // Ensure comments is an array
    if (!data.comments) {
      data.comments = [];
    }
    
    const result = await formHandlerAction(data);
    const { errors, successMsg } = result || {};

    if (errors) {
      toast({ title: 'error', description: 'Error' });
    } else if (successMsg) {
      toast({
        title: 'Post has been updated successfully',
        description: `Updated by ${data.author} on ${data.date}`,
      });
      form.reset();
      redirect(`/posts`) // Navigate to the new post page
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  
  return (
    <>
      <BackButton text='Back to Posts' link='/posts' />
      
      <h3 className='text-2xl mb-4'>Edit Post</h3>
      
      <Form {...form}>

      <form onSubmit={form.handleSubmit(handleFormSubmit)} ref={formRef} className='space-y-8'>
        <Input type="hidden" {...form.register('id')} />
        <Input type="hidden" {...form.register('comments')} />
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                Title
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                Body
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='author'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                Author
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                Date
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton/>
      </form>
    </Form>
    
    </>
  );
};

export default PostEditPage;