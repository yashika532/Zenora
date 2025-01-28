import React from 'react';
import { Link } from 'react-router-dom';

const calculateDaysAgo = (createdDate) => {
  const createdAt = new Date(createdDate);
  const now = new Date();
  const differenceInTime = now - createdAt;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays === 0 ? 'Today' : `${differenceInDays} days ago`;
};

// Helper function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};

const VideoCard = ({ id, thumbnail, title, username, profilePic, time, createdAt }) => {
  console.log(id)
  return (
    <Link
      to={`/watch/${id}`}
      className="youtube-video relative bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300 hover:border-gradient-to-r from-[#005c97] to-[#00d4ff] hover:shadow-[0_0_15px_5px_rgba(0,212,255,0.6)] hover:scale-105 text-white sm:w-80 md:w-96 h-[360px]"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={`${title} thumbnail`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {time}
        </div>
      </div>

      {/* Profile and Video Metadata */}
      <div className="flex items-center space-x-4">
        <img
          src={profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s"}
          alt={`${username}'s profile`}
          className="w-14 h-14 rounded-full object-cover border-2 border-white"
        />
        <div className="text-sm">
          <div className="font-bold text-lg truncate" title={title}>
            {truncateText(title, 15)} {/* Truncate title to 40 characters */}
          </div>
          <div className="text-gray-400 text-sm truncate" title={username}>
            {truncateText(username, 25)} {/* Truncate username to 25 characters */}
          </div>
          <div className="text-gray-500 text-sm">{calculateDaysAgo(createdAt)}</div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
