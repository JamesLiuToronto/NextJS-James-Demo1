
'use client';
import React, { useState } from 'react';
import GenericTable from './GenericTable';
import formatDateToYYYYMMDD from '@/lib/date-utils';
import { Post } from '@/app/(main)/share-types/post-schema';

interface PostsTableProps {
  title: string;
  limit?: number;
  posts: Post[];
  baseUrl: string;
}

const PostsTable = ({ title, limit, posts, baseUrl }: PostsTableProps) => {
  const [postList, setPostList] = useState(posts);

  const handleDelete = (id: string) => {
    setPostList(postList.filter(post => post.id !== id));
  };

  const headerList = ['Title', 'Author', 'Date'];

  return (
    <GenericTable
      title={title}
      limit={limit}
      dataList={postList}
      headerList={headerList}
      baseUrl={baseUrl}
      handleDelete={handleDelete}
      formatDate={formatDateToYYYYMMDD}
    />
  );
};

export default PostsTable;