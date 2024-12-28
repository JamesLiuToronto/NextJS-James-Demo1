// DeleteModal.tsx
'use client';

import { Post } from '../app/(main)/share-types/post-schema';
import { deletePost } from '@/components/PostActions';
import DeleteModal from '@/components/DeleteModal';



interface DeletePostModalProps {
  post: Post;
  onDelete: (postId: number) => void;
}


const DeletePostModal = ({ post, onDelete }: DeletePostModalProps) => {
  const handleDeleteFunction = async (deleteId: number) => {
    await deletePost(deleteId);
    onDelete(deleteId);
  };

  return (
    <DeleteModal
      deleteId={Number(post.id)}
      titleDescription={`Are you sure you want to delete the post titled "${post.title}"?`}
      handleDeleteFunction={handleDeleteFunction}
    />
  );
};


export default DeletePostModal;