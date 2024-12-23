import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaMicrophone } from 'react-icons/fa';
import { MdVideoCall, MdOutlineCamera } from 'react-icons/md';
import { IoReorderThreeOutline } from 'react-icons/io5';

function Navbar({setSidebarFunc,sidebar}) {
  const [userPic, setUserPic] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const sidebarFunc=()=>{
    setSidebarFunc(!sidebar);
  }

  return (
    <nav className="bg-[#1f1d1d] p-3 shadow-md h-20 max-w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Icon and Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MdOutlineCamera className="text-blue-500 text-3xl" />
            <h1 className="text-white text-2xl font-bold">Zenora</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 w-full ml-[16%]">
          <div className="flex items-center bg-[#181818] px-3 py-1 border-2 border-gray-400 rounded-full w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
            />
            <button className="flex items-center justify-center text-white bg-gradient-to-r from-[#007bff] to-[#6EC1E4] hover:from-blue-400 hover:to-[#6EC1E4] px-4 py-2 rounded-full ml-2 w-40 h-10">
              <FaSearch size={16} />
            </button>
          </div>

          {/* Microphone Button */}
          <button className="flex items-center justify-center text-white hover:text-gray-300">
            <FaMicrophone size={20} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 mr-6">
          <button className="text-white hover:text-gray-300">
            <MdVideoCall size={40} />
          </button>
          <button className="text-white hover:text-gray-300">
            <FaBell size={24} />
          </button>

          {/* User Icon */}
          <div className="relative">
            {userPic ? (
              <img
                src={userPic}
                alt="User"
                className="w-12 h-12 rounded-full cursor-pointer object-cover"
                onClick={toggleDropdown}
              />
            ) : (
              <FaUserCircle
                size={32}
                className="text-gray-300 hover:text-white cursor-pointer"
                onClick={toggleDropdown}
              />
            )}

{showDropdown && (
  <div className="absolute top-14 -right-9 bg-[#1f1d1ddf] w-32 z-20 text-white">
    <div className="px-4 py-2 cursor-pointer hover:bg-gray-900">Profile</div>
    <div className="px-4 py-2 cursor-pointer hover:bg-gray-900">Login</div>
    <div className="px-4 py-2 cursor-pointer hover:bg-gray-900">Logout</div>
  </div>
)}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
