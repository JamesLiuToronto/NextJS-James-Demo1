import AuthTabs from '@/components/auth/AuthTabs';
import Image from 'next/image';
import logo from '@/img/logo.webp';

export function AuthPage() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden relative">
          <div className="flex items-center justify-center p-8 md:w-1/2 bg-gray-200">
            <Image src={logo} alt="OceanPeak" width={300} height={300} className="object-contain" />
          </div>
          <div className="flex items-center justify-center p-8 md:w-1/2">
            <AuthTabs />
          </div>
          <div className="absolute inset-y-0 left-1/2 w-4 bg-gray-300 transform -translate-x-1/2 flex flex-col items-center justify-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full mb-4"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full mb-4"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full mb-4"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full mb-4"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full mb-4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  

export default AuthPage;