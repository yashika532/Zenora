import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaMicrophone } from 'react-icons/fa';
import { MdVideoCall, MdOutlineCamera } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [userPic, setUserPic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s");
  const [isScrolled, setIsScrolled] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/user/1');
  };

  const onclickOfPopUpOption = (button) => {
    if (button === "login") {
      setLogin(true); // Set login state to true
    } else if (button === "logout") {
      setLogin(false); // Set login state to false
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isScrolled ? 'bg-black bg-opacity-70' : 'bg-[#1f1d1d]'
      } p-3 shadow-md h-20 max-w-full sticky top-0 transition-colors duration-300 z-10`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Icon and Logo Section */}
        <Link to="/" className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MdOutlineCamera className="text-blue-500 text-3xl" />
            <h1 className="text-white text-2xl font-bold">Zenora</h1>
          </div>
        </Link>

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
          <Link to="/1/upload" className="text-white hover:text-gray-300">
            <MdVideoCall size={40} />
          </Link>
          <button className="text-white hover:text-gray-300">
            <FaBell size={24} />
          </button>

          {/* User Icon with Hover Dropdown */}
          <div className="relative group">
            <div className="flex items-center">
              <img
                src={userPic}
                alt="User"
                className="ml-5 h-14 max-w-14 rounded-full object-cover border-2 border-gray-500"
              />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-14 -right-9 bg-[#1f1d1ddf] w-32 z-20 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
              <div className="px-4 py-2 cursor-pointer hover:bg-gray-900" onClick={handleProfile}>Profile</div>
              {!login && (
                <div className="px-4 py-2 cursor-pointer hover:bg-gray-900" onClick={() => onclickOfPopUpOption("login")}>Login</div>
              )}
              {login && (
                <div className="px-4 py-2 cursor-pointer hover:bg-gray-900" onClick={() => onclickOfPopUpOption("logout")}>Logout</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
