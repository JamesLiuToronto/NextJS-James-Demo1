
"use client";

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createPost, deletePost, fetchPost, fetchPosts, updatePost } from './PostActions';
import { Post } from '../../share-types/post-schema';

export function usePosts() {
  const queryClient = useQueryClient();

  // Query for fetching all posts
  const postsQuery = useQuery({
    queryKey: ["client-posts"],
    queryFn: fetchPosts,
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-posts"] });
    },
  });

  //Update contact mutation
  const updatePostMutation = useMutation({
    mutationFn: ({ data }: { data: Post }) =>
      updatePost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-posts"] });
    },
  });

  // Delete contact mutation
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-posts"] });
    },
  });


  return {
    // Queries
    posts: postsQuery.data ?? [],
    isLoading: postsQuery.isLoading,
    error: postsQuery.error,

    // Mutations
    createPost: createPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,

    // Mutation states
    isCreating: createPostMutation.isIdle,
    isUpdating: updatePostMutation.isIdle,
    isDeleting: deletePostMutation.isIdle,
  };
}

// Hook for fetching a single post
export function usePost(id: string) {
  const queryClient = useQueryClient();
  const postId = Number(id); // Convert string to number
  const postQuery = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });
  return {
    post: postQuery.data,
    error: postQuery.error,
    isLoading: postQuery.isLoading,
  };
}


