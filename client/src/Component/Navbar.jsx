import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaMicrophone } from 'react-icons/fa';
import { MdVideoCall, MdOutlineCamera } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [userPic, setUserPic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/auth/logout', {}, { withCredentials: true });
      localStorage.clear();
      toast.success('User Logged out!');
      setIsLoggedIn(false);
      setTimeout(() => {
        window.location.reload();
      });
     
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${isScrolled ? 'bg-black bg-opacity-70' : 'bg-[#1f1d1d]'} p-3 shadow-md h-20 max-w-screen sticky top-0 transition-colors duration-300 z-10`}>
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4">
          <MdOutlineCamera className="text-blue-500 text-3xl" />
          <h1 className="text-white text-2xl font-bold">Zenora</h1>
        </Link>

        <div className="flex items-center space-x-4 w-full ml-[16%]">
          <div className="flex items-center bg-[#181818] px-3 py-1 border-2 border-gray-400 rounded-full w-full max-w-2xl">
            <input type="text" placeholder="Search" className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full" />
            <button className="flex items-center justify-center text-white bg-gradient-to-r from-[#007bff] to-[#6EC1E4] hover:from-blue-400 hover:to-[#6EC1E4] px-4 py-2 rounded-full ml-2 w-40 h-10">
              <FaSearch size={16} />
            </button>
          </div>
          <button className="flex items-center justify-center text-white hover:text-gray-300">
            <FaMicrophone size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-6 mr-6">
          <Link to="/1/upload" className="text-white hover:text-gray-300">
            <MdVideoCall size={40} />
          </Link>
          <button className="text-white hover:text-gray-300">
            <FaBell size={24} />
          </button>

          <div className="relative group">
            <img src={userPic} alt="User" className="ml-5 h-14 max-w-14 rounded-full object-cover border-2 border-gray-500" />
            <div className="absolute top-14 -right-9 bg-[#1f1d1ddf] w-32 z-20 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
              <div className="px-4 py-2 cursor-pointer hover:bg-gray-900" onClick={handleProfile}>Profile</div>
              {!isLoggedIn ? (
                <Link to='/login'>
                  <div className='px-4 py-2 cursor-pointer hover:bg-gray-900'>
                    Login
                  </div>
                </Link>
              ) : (
                <div className="px-4 py-2 cursor-pointer hover:bg-gray-900" onClick={handleLogout}>Logout</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
