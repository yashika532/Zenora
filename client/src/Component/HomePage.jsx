import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Utility function to calculate "days ago"
const calculateDaysAgo = (createdDate) => {
  const createdAt = new Date(createdDate);
  const now = new Date();
  const differenceInTime = now - createdAt;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays === 0 ? 'Today' : `${differenceInDays} days ago`;
};

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/allVideo')
      .then(res => {
        setData(res.data.videos);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-start gap-8 p-8 sm:p-8 bg-black">
      {
        data?.map((item , ind) => (
          <Link 
            key={item?._id}
            to={`/watch/${item._id}`} 
            className="youtube-video relative bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300 hover:border-gradient-to-r from-[#005c97] to-[#00d4ff] hover:shadow-[0_0_15px_5px_rgba(0,212,255,0.6)] hover:scale-105 text-white sm:w-80 md:w-96"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg">
              <img 
                src={item?.thumbnail}
                alt="Thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                28:05
              </div>
            </div>
    
            {/* Profile and Video Metadata */}
            <div className="flex items-center space-x-4">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s" 
                alt="Profile" 
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
              />
              <div className="text-sm">
                <div className="font-bold text-lg truncate">{item?.title}</div>
                <div className="text-gray-400 text-sm">{item?.user.userName}</div>
                <div className="text-gray-500 text-sm">{calculateDaysAgo(item?.createdAt)}</div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default HomePage;
