import PostsTable from '@/components/PostsTable';
import BackButton from '@/components/BackButton';
import PostsPagination from '@/components/PostsPagination';
import { fetchPosts } from '@/components/PostActions';




const PostsPage = async () => {
  const posts = await fetchPosts();
  console.log('in page Posts:', posts);
  return (
    <>
      <BackButton text='Go Back' link='/' />
      <PostsTable title='Posts' posts={posts} baseUrl='/posts/edit'/>
      <PostsPagination />
    </>
  );
};

export default PostsPage;
