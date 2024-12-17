// DeleteModal.tsx
'use client';

import React, { useState } from 'react';
import { Post } from '../app/(main)/share-types/post-schema';
import { deletePost } from '@/components/PostActions';

interface DeleteModalProps {
  post: Post;
  onDelete: (postId: number) => void;
}

const DeleteModal = ({ post , onDelete}: DeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(Number(post.id));
      onDelete(Number(post.id));
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs ml-2"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the post titled "{post.title}"?</p>
            <div className="mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;