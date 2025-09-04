"use client"

import { useState, useRef, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit, FaChevronLeft, FaSignOutAlt, FaSave } from 'react-icons/fa';

// Mock Data
const MOCK_FOOD_DATA = [
  { id: 1, date: '2025-09-01', imageUrl: 'https://cdn.pixabay.com/photo/2020/06/02/18/10/noodles-5252012_640.jpg', foodName: 'Pork Stir-fry', meal: 'Dinner' },
  { id: 2, date: '2025-09-01', imageUrl: 'https://cdn.pixabay.com/photo/2020/06/02/18/10/noodles-5252012_640.jpg', foodName: 'Grilled Chicken', meal: 'Lunch' },
  { id: 3, date: '2025-09-02', imageUrl: 'https://cdn.pixabay.com/photo/2020/06/02/18/10/noodles-5252012_640.jpg', foodName: 'Salad', meal: 'Breakfast' },
  { id: 4, date: '2025-09-02', imageUrl: 'https://cdn.pixabay.com/photo/2020/06/02/18/10/noodles-5252012_640.jpg', foodName: 'Spaghetti', meal: 'Dinner' },
  { id: 5, date: '2025-09-03', imageUrl: 'https://cdn.pixabay.com/photo/2020/06/02/18/10/noodles-5252012_640.jpg', foodName: 'Sushi', meal: 'Lunch' },
];

const MOCK_USER_DATA = {
  fullName: 'John Doe',
  profileImageUrl: 'https://cdn.pixabay.com/photo/2021/07/15/07/50/newborn-6467762_640.jpg',
};

type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export default function Page({params}:{params:Promise<{id:string}>}) {
  const router = useRouter();
  const { id } = use(params);
  const user = MOCK_USER_DATA;

  const [foodName, setFoodName] = useState('');
  const [mealType, setMealType] = useState<MealType>('Breakfast');
  const [date, setDate] = useState('');
  const [foodImage, setFoodImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call to fetch data by ID
      const foodItem = MOCK_FOOD_DATA.find(item => item.id.toString() === id);
      if (foodItem) {
        setFoodName(foodItem.foodName);
        setMealType(foodItem.meal as MealType);
        setDate(foodItem.date);
        setFoodImage(foodItem.imageUrl);
      }
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoodImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFoodItem = {
      id: id,
      foodName,
      mealType,
      date,
      foodImage,
    };
    console.log('Saving updated food item:', updatedFoodItem);

    router.push('/dashboard');
  };

  const handleLogout = () => {
    console.log("User logged out");
    router.push('/login');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center p-4 relative">
        <div className="absolute top-6 right-6 flex items-center space-x-4">
          <Link href="/profile" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-300">
            <Image
              src={user.profileImageUrl}
              alt={user.fullName}
              width={40}
              height={40}
              className="rounded-full shadow-lg border-2 border-white"
            />
            <span className="font-medium hidden sm:block">{user.fullName}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>

        <Link href="/dashboard" className="absolute top-6 left-6 text-white hover:text-gray-200 transition-colors duration-300 hidden sm:flex items-center gap-2">
          <FaChevronLeft className="text-xl" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>

        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-lg backdrop-blur-sm mt-12 mb-8">
          <div className="flex flex-col items-center mb-6">
            <FaEdit className="text-5xl text-indigo-600 mb-2" />
            <h1 className="text-3xl font-bold text-gray-900">Edit Food Item</h1>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
              <input 
                type="text" 
                id="foodName" 
                name="foodName" 
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                required
              />
            </div>
            
            <div>
              <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-1">Meal</label>
              <select
                id="mealType"
                name="mealType"
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Picture</label>
              <div 
                className="w-32 h-32 rounded-lg border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer transition-colors duration-200 hover:border-indigo-500 mx-auto"
                onClick={handleImageClick}
              >
                {foodImage ? (
                  <Image 
                    src={foodImage}
                    alt="Food Preview"
                    width={128}
                    height={128}
                    objectFit="cover"
                    className="rounded-lg"
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
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}