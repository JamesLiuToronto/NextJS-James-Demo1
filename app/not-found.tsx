import Link from 'next/link';
import Image from 'next/image';
import logo from '@/img/logo.webp';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Image src={logo} alt="OceanPeak" width={150} height={150} className="mb-8" />
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">Go back to Home</Link>
    </div>
  );
};

export default NotFound;