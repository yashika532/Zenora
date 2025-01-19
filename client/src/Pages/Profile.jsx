import React, { useState, useEffect } from 'react';
import Sidebar from '../Component/Sidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
  const calculateDaysAgo = (createdDate) => {
    const createdAt = new Date(createdDate);
    const now = new Date();
    const differenceInTime = now - createdAt;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays === 0 ? 'Today' : `${differenceInDays} days ago`;
  };
  
  const { id } = useParams();

  const [profile, setProfile] = useState([]);
  const [videoData, setVideoData] = useState([]);

  const fetchProfileData = async () => {
    axios.get(`http://localhost:8000/api/${id}/channel`)
      .then((response) => {
        setProfile(response.data);
        setVideoData(response.data.videos);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="profile bg-black flex box-border p-4 w-full text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="profile-page flex-1 ml-2 p-4">
        {/* Profile Header */}
        <div className="profile-top-section flex items-center mb-12 p-6 rounded-lg bg-gradient-to-r from-[#005c97] to-[#00d4ff] shadow-lg transition-transform duration-500 hover:scale-105 relative">
          <div className="profile-avatar-img mr-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s"
              alt="Your Image"
              className="w-44 h-44 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div className="profile-About ml-8 text-white">
            <h1 className="text-4xl font-extrabold tracking-wide mb-2">
              {profile?.videos?.[0]?.user?.fullName || 'UserName'}
            </h1>
            <p className="text-lg italic">
              {profile?.videos?.[0]?.user?.userName || 'No username added'}
            </p>
            <div className="profile-stats mt-4 flex space-x-10">
              <div className="subscribers">
                <p className="text-2xl font-bold">1M</p>
                <p className="text-sm">Subscribers</p>
              </div>
              <div className="videos">
                <p className="text-2xl font-bold">{profile?.videos?.length}</p>
                <p className="text-sm">Videos</p>
              </div>
            </div>
          </div>

          {/* User Edit Icon */}
          <FaUserEdit 
            size={28} 
            className="absolute bottom-4 right-4 cursor-pointer text-white"
          />
        </div>

        {/* User's Videos Section */}
        <div className="videos-section">
          <h2 className="text-3xl font-semibold mb-6 text-[#00d4ff]">Your Videos</h2>

          {/* Gradient Line */}
          <div className="h-0.5 bg-gradient-to-r from-[#005c97] to-[#00d4ff] rounded-full mb-10"></div>

          {/* Video Thumbnails Grid */}
          <div className="video-thumbnails grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {videoData?.map((video, index) => (
              <Link
                key={index}
                to={`/watch/${video?._id}`}
                className="youtube-video relative bg-gray-900 p-4 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300 hover:border-gradient-to-r from-[#005c97] to-[#00d4ff] hover:shadow-[0_0_15px_5px_rgba(0,212,255,0.6)] hover:scale-105"
              >
                {/* Thumbnail */}
                <div className="relative box-border h-48 mb-4 overflow-hidden rounded-md">
                  <img
                    src={video?.thumbnail || 'default-thumbnail.jpg'}
                    alt={video?.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
                  {/* Timing label */}
                  <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#005c97] to-[#00d4ff] text-white text-xs px-2 py-1 rounded shadow-md">
                    28:05
                  </div>
                </div>

                {/* Video Metadata */}
                <div>
                  <h3 className="font-semibold text-lg">{video?.title}</h3>
                  <div className="flex flex-row justify-around">
                    <p className="text-gray-400 text-sm mr-32 mt-1">{video?.user?.userName}</p>
                    <p className="text-gray-400 text-sm mt-1"> {calculateDaysAgo(video?.user?.createdAt)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
