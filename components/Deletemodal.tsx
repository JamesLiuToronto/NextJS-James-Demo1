import { useState } from "react";
import { Button } from "./ui/button";
import { DeleteModalPropType } from "@/types/delete-modal-prop-type";

const DeleteModal = ({ deleteId, titleDescription, handleDeleteFunction }: DeleteModalPropType) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleDelete = async () => {
      try {
        await handleDeleteFunction(deleteId);
        setIsOpen(false);
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    };
  
    return (
      <>
        <Button
          variant='link'
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs ml-2"
          onClick={() => setIsOpen(true)}
        >
          Delete
        </Button>
  
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg">
              <h2 className="text-xl mb-4">Confirm Delete</h2>
              <p>{titleDescription}</p>
              <div className="mt-4">
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleDelete}
                >
                  Yes
                </Button>
                <Button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default DeleteModal;