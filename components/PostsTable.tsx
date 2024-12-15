import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import Link from 'next/link';
import { Post } from '../app/(main)/share-types/post-schema';

  
  interface PostsTableProps {
    posts: Post[];
    limit?: number;
    title?: string;
  }
  
  

  const PostsTable = ({ posts, limit, title }: PostsTableProps) => {
    // Sort the posts array in descending order based on the date
    const sortedPosts: Post[] = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  
    // Filter the posts based on the limit prop
    const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;
  
    return (
      <div className='mt-10'>
        <div className='flex justify-between items-center mb-4'>
        <h3 className='text-2xl font-semibold'>{title ? title : 'Posts'}</h3>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'>
          Add Post
        </button>
      </div>
      <Table className="border border-slate-200 shadow-lg">
          <TableCaption>A list of recent posts</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className='hidden md:table-cell'>Author</TableHead>
              <TableHead className='text-right hidden md:table-cell'>
                Date
              </TableHead>
              <TableHead>View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  {post.author}
                </TableCell>
                <TableCell className='text-right hidden md:table-cell'>
                  {post.date}
                </TableCell>
                <TableCell>
                  <Link href={`/posts/edit/${post.id}`}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'>
                      Edit
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default PostsTable;
