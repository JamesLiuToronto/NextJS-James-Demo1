"use client";

import BackButton from '@/components/BackButton';
import PostsPagination from '@/components/PostsPagination';
import { usePosts } from './components/usePosts';
import PostsTable from './components/PostsTable';


const PostsPage = () => {
  const { posts, error, isLoading } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts: {String(error)}</div>;
  } 
  
  return (
    <>
      <BackButton text='Go Back' link='/' />
      <PostsTable posts={posts}/>
      <PostsPagination />
    </>
  );
};

export default PostsPage;