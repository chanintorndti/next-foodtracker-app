"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserEdit, FaChevronLeft, FaSignOutAlt, FaSave } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Mock Data for a logged-in user
const MOCK_USER_DATA = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  gender: 'male',
  profileImageUrl: 'https://cdn.pixabay.com/photo/2021/07/15/07/50/newborn-6467762_640.jpg',
};

type GenderType = '' | 'male' | 'female' | 'other';

export default function Profile() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<GenderType>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load mock user data when the component mounts
  useEffect(() => {
    setFullName(MOCK_USER_DATA.fullName);
    setEmail(MOCK_USER_DATA.email);
    setGender(MOCK_USER_DATA.gender as GenderType);
    setProfileImage(MOCK_USER_DATA.profileImageUrl);
  }, []);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to an API
    const updatedUserData = {
      fullName,
      email,
      password, // Note: For a real app, never send plain text password. Use secure methods.
      gender,
      profileImage,
    };
    console.log('Saving updated user data:', updatedUserData);

    // Redirect to dashboard after saving
    router.push('/dashboard');
  };

  const handleLogout = () => {
    console.log("User logged out");
    // In a real app, you would clear auth token and redirect to login page
    router.push('/login');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 relative">
        {/* User Info & Logout Button */}
        <div className="absolute top-6 right-6 flex items-center space-x-4">
          <Link href="/profile" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-300">
            <Image
              src={profileImage || 'https://cdn.pixabay.com/photo/2021/07/15/07/50/newborn-6467762_640.jpg'}
              alt={fullName}
              width={40}
              height={40}
              className="rounded-full shadow-lg border-2 border-white"
            />
            <span className="font-medium hidden sm:block">{fullName}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>

        {/* Back to Dashboard Link */}
        <Link href="/dashboard" className="absolute top-6 left-6 text-white hover:text-gray-200 transition-colors duration-300 hidden sm:flex items-center gap-2">
          <FaChevronLeft className="text-xl" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.01]">
          <div className="flex flex-col items-center mb-6">
            <FaUserEdit className="text-5xl text-indigo-600 mb-2" />
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Leave blank to keep current password"
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                id="gender" 
                name="gender" 
                value={gender}
                onChange={(e) => setGender(e.target.value as GenderType)}
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
              className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaSave />
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}