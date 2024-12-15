'use client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <Button variant="outline"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md w-full"
      type="submit"
    >
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}
