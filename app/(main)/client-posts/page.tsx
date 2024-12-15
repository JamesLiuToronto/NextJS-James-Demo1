"use client";

import BackButton from '@/components/BackButton';
import PostsPagination from '@/components/PostsPagination';
import { usePosts } from './components/usePosts';
import PostsTable from '@/components/PostsTable';


const PostsPage = () => {
  const { posts, error, isLoading } = usePosts();

  if (isLoading) {
    console.log('loading triggered');
    return <div>Loading... wait</div>;
  }

  if (error) {
    return <div>Error loading posts: {String(error)}</div>;
  } 
  
  return (
    <>
      <BackButton text='Go Back' link='/' />
      <PostsTable posts={posts} postUrl='/client-posts/edit'/>
      <PostsPagination />
    </>
  );
};

export default PostsPage;