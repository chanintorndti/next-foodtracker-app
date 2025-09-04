"use client"

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserPlus, FaChevronLeft } from 'react-icons/fa';

export default function Page() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4 relative">
        <Link href="/" className="absolute top-6 left-6 text-white hover:text-gray-200 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <FaChevronLeft className="text-xl" />
            <span className="font-medium hidden sm:block">Back to Home</span>
          </div>
        </Link>
        
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.01]">
          <div className="flex flex-col items-center mb-6">
            <FaUserPlus className="text-5xl text-indigo-600 mb-2" />
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Enter your full name" 
              />
            </div>
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
                placeholder="Create a password" 
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                id="gender" 
                name="gender" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <div 
                className="w-28 h-28 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer transition-colors duration-200 hover:border-indigo-500 mx-auto"
                onClick={handleImageClick}
              >
                {profileImage ? (
                  <Image 
                    src={profileImage}
                    alt="Profile Preview"
                    width={112}
                    height={112}
                    objectFit="cover"
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm text-center">Click to <br /> upload</span>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login">
              <span className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300 cursor-pointer">
                Login here
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}