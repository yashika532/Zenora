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
    <div className='flex flex-wrap overflow-x-auto space-x-4 p-4 sm:px-10 sm:py-12 hide-scrollbar'>
      {
        data?.map((item, ind) => (
          <Link 
            key={item._id}
            to={`/watch/${item._id}`} 
            className='youtube-video text-white flex-shrink-0 w-full sm:w-96 h-80 bg-gray-800 p-4 rounded-md mb-4 sm:mb-0'
          >
            {/* Thumbnail */}
            <div className="w-full relative box-border h-48 mb-4">
              <img 
                src={item.thumbnail}
                alt="Beautiful Landscape Thumbnail" 
                className="w-full h-full object-cover rounded-md"
              />
              <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
                28:05
              </div>
            </div>
    
            {/* Profile and Video Metadata */}
            <div className="flex items-center space-x-4">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s" 
                alt="Profile" 
                className='w-10 h-10 rounded-full'
              />
              <div className="text-sm">
                <div className="font-semibold text-lg truncate">{item.title}</div>
                <div className="text-gray-400 text-sm">{item.user.userName}</div>
                <div className="text-gray-400 text-sm">{calculateDaysAgo(item.createdAt)}</div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default HomePage;
