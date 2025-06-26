import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftCircle } from 'lucide-react'
import logo from '@/img/logo.webp'

export default function ProfilePage() {
  // Mock user data (replace with real user/session data as needed)
  const user = {
    name: 'James Liu',
    email: 'jamesliucontact@gmail.com',
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
      <div className="bg-white shadow-md rounded-3xl p-8 w-full max-w-md flex flex-col items-center relative">
        <h1 className="text-2xl font-bold mb-2">Profile</h1>
        {/* Oceanpeak Logo - static import, 100x100 size */}
        <div className="flex justify-center items-center w-full mb-8">
          <Image
            src={logo}
            alt="Oceanpeak Logo"
            width={100}
            height={100}
            className="rounded-xl object-contain"
          />
        </div>
        <div className="mb-2 w-full text-center">
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div className="mb-12 w-full text-center">
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        {/* Go Back Button at bottom right of card */}
        <div className="absolute right-6 bottom-6 flex flex-col items-end">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-base font-medium">
            <ArrowLeftCircle className="w-6 h-6" />
            <span>Go Back</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 