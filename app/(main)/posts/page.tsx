import PostsTable from '@/components/PostsTable';
import BackButton from '@/components/BackButton';
import PostsPagination from '@/components/PostsPagination';
import { fetchPosts } from '@/components/PostActions';




const PostsPage = async () => {
  return (
    <>
      <BackButton text='Go Back' link='/' />
      <PostsTable posts={await fetchPosts()}/>
      <PostsPagination />
    </>
  );
};

export default PostsPage;
