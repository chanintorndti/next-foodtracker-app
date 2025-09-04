"use client"

// pages/dashboard.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaChevronLeft, FaSignOutAlt, FaUser } from 'react-icons/fa';
import profile from './../images/profile.png';

// Mock Data
const MOCK_FOOD_DATA = [
    { id: 1, date: '2025-09-01', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Pork Stir-fry', meal: 'Dinner' },
  { id: 2, date: '2025-09-01', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Grilled Chicken', meal: 'Lunch' },
  { id: 3, date: '2025-09-02', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Salad', meal: 'Breakfast' },
  { id: 4, date: '2025-09-02', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Spaghetti', meal: 'Dinner' },
  { id: 5, date: '2025-09-03', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Sushi', meal: 'Lunch' },
  { id: 6, date: '2025-09-03', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Soup', meal: 'Dinner' },
  { id: 7, date: '2025-09-04', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Pizza', meal: 'Lunch' },
  { id: 8, date: '2025-09-04', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Taco', meal: 'Dinner' },
  { id: 9, date: '2025-09-05', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Burger', meal: 'Lunch' },
  { id: 10, date: '2025-09-05', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Pancakes', meal: 'Breakfast' },
  { id: 11, date: '2025-09-06', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Noodles', meal: 'Lunch' },
  { id: 12, date: '2025-09-06', imageUrl: 'https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698474_1280.jpg', foodName: 'Steak', meal: 'Dinner' },

  ];

const MOCK_USER_DATA = {
  fullName: 'John Doe',
  profileImageUrl: 'https://via.placeholder.com/150/9F2A66/FFFFFF?text=JD',
};

const ITEMS_PER_PAGE = 7;

export default function Page() {
  const [foodData, setFoodData] = useState(MOCK_FOOD_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(MOCK_FOOD_DATA);
  const user = MOCK_USER_DATA; // ในแอปจริงจะใช้ context หรือ global state เพื่อจัดการข้อมูลผู้ใช้

  useEffect(() => {
    const result = foodData.filter(item =>
      item.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, foodData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleEdit = (id: number) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    const updatedData = foodData.filter(item => item.id !== id);
    setFoodData(updatedData);
    console.log(`Delete item with ID: ${id}`);
  };

  const handleLogout = () => {
    console.log("User logged out");
    // ในแอปจริงจะทำการลบ token หรือ session และเปลี่ยนเส้นทางไปหน้า login
    // router.push('/login');
  };

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 rounded-md transition-colors duration-200 ${
            currentPage === i
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center p-4">
        {/* User Profile and Logout */}
        <div className="absolute top-6 right-6 flex items-center space-x-4">
          <Link href="/profile" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-300">
            <Image
              src={profile}
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

        <Link href="/" className="absolute top-6 left-6 text-white hover:text-gray-200 transition-colors duration-300 hidden sm:flex items-center gap-2">
          <FaChevronLeft className="text-xl" />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-5xl backdrop-blur-sm mt-12 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-4xl font-bold text-gray-900">Your Food Diary</h1>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search by food name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Link href="/addfood">
                <button className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <FaPlus />
                  <span>Add Food</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Food</th>
                  <th className="py-3 px-6 text-left">Meal</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{item.date}</td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <Image
                            src={item.imageUrl}
                            alt={item.foodName}
                            width={40}
                            height={40}
                            className="rounded-xl mr-2 w-30 h-20 object-cover"
                          />
                          <span className="font-medium">{item.foodName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">{item.meal}</td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No food items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              {renderPaginationButtons()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

