"use client"

import Link from 'next/link';
import { FaSignInAlt, FaChevronLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Page() {

  const router = useRouter();

  const handleLoginClick = (e: React.FormEvent) =>{
    e.preventDefault();
    //เอา email/password ไปตรวจสอบ
    //เปิดไปหน้า /dashboard
    router.push('/dashboard');
  }

  return (
    <>    
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4 relative">
        <Link href="/" className="absolute top-6 left-6 text-white hover:text-gray-200 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <FaChevronLeft className="text-xl" />
            <span className="font-medium hidden sm:block">Back to Home</span>
          </div>
        </Link>
        
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-sm backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.01]">
          <div className="flex flex-col items-center mb-6">
            <FaSignInAlt className="text-5xl text-indigo-600 mb-2" />
            <h1 className="text-3xl font-bold text-gray-900">Log In</h1>
          </div>

          <form className="space-y-4" onSubmit={handleLoginClick}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Enter your email" 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Enter your password" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don{"'"}t have an account?{' '}
            <Link href="/register">
              <span className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300 cursor-pointer">
                Register here
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}