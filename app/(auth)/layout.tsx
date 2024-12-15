import { Toaster } from "@/components/ui/toaster";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-[100vh] flex items-center justify-center relative'>
      {children}
      <Toaster />
    </div>
  );
};

export default AuthLayout;
