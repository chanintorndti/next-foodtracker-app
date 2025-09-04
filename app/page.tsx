import Image from 'next/image';
import Link from 'next/link';
import foodbanner from './images/foodbanner.jpg';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center text-center p-4">
        <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-2xl backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 animate-pulse">
            Welcome to Food Tracker
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 font-medium mb-6">
            Track your meal!!! 🥗
          </p>
          <div className="mb-10">
            <Image
              src={foodbanner}
              alt="Food Tracker Logo"
              width={350}
              height={350}
              className="rounded-xl mx-auto shadow-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <span className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-110 cursor-pointer">
                Register
              </span>
            </Link>
            <Link href="/login">
              <span className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-full shadow-lg hover:bg-gray-300 transition duration-300 transform hover:scale-110 cursor-pointer">
                Login
              </span>
            </Link>
          </div>
          <p className="text-sm text-gray-700 mb-6 mt-10">
            Created by NinniN DTI-SAU
            <br />
            Copyright &copy; 2025 Southeast Asia University
          </p>
        </div>
      </div>
    </>
  );
}