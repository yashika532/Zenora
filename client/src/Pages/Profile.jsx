import React from 'react';
import Sidebar from '../Component/Sidebar';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="profile bg-black flex box-border p-4 w-full text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="profile-page flex-1 ml-16 p-4">
        {/* Profile Header */}
        <div className="profile-top-section flex items-center mb-12 p-6 rounded-lg bg-gradient-to-r from-[#005c97] to-[#00d4ff] shadow-lg transition-transform duration-500 hover:scale-105">
          <div className="profile-avatar-img mr-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s"
              alt="Your Image"
              className="w-44 h-44 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div className="profile-About text-white">
            <h1 className="text-4xl font-extrabold tracking-wide mb-2">Yashika Jain</h1>
            <p className="text-lg italic">Your Channel Description</p>
            <div className="profile-stats mt-4 flex space-x-10">
              <div className="subscribers">
                <p className="text-2xl font-bold">1M</p>
                <p className="text-sm">Subscribers</p>
              </div>
              <div className="videos">
                <p className="text-2xl font-bold">200</p>
                <p className="text-sm">Videos</p>
              </div>
            </div>
          </div>
        </div>

        {/* User's Videos Section */}
        <div className="videos-section">
          <h2 className="text-3xl font-semibold mb-6 text-[#00d4ff]">Your Videos</h2>

          {/* Gradient Line */}
          <div className="h-0.5 bg-gradient-to-r from-[#005c97] to-[#00d4ff] rounded-full mb-10"></div>

          {/* Video Thumbnails Grid */}
          <div className="video-thumbnails grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Video Template with Glow Border */}
            <Link
              to={'/watch/1'}
              className="youtube-video relative bg-gray-900 p-4 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300 hover:border-gradient-to-r from-[#005c97] to-[#00d4ff] hover:shadow-[0_0_15px_5px_rgba(0,212,255,0.6)] hover:scale-105"
            >
              {/* Thumbnail */}
              <div className="relative box-border h-48 mb-4 overflow-hidden rounded-md">
                <img
                  src="https://plus.unsplash.com/premium_photo-1710119487743-48959c984d45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Beautiful Landscape Thumbnail"
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
                <h3 className="font-semibold text-lg truncate">Sample Video Title</h3>
                <p className="text-gray-400 text-sm">Channel Name</p>
                <p className="text-gray-400 text-sm">1.2M views • 2 days ago</p>
              </div>
            </Link>

            {/* Another Video with Glow Border */}
            <Link
              to={'/watch/2'}
              className="youtube-video relative bg-gray-900 p-4 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300 hover:border-gradient-to-r from-[#005c97] to-[#00d4ff] hover:shadow-[0_0_15px_5px_rgba(0,212,255,0.6)] hover:scale-105"
            >
              {/* Thumbnail */}
              <div className="relative box-border h-48 mb-4 overflow-hidden rounded-md">
                <img
                  src="https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww"
                  alt="Beautiful Landscape Thumbnail"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
                {/* Timing label */}
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#005c97] to-[#00d4ff] text-white text-xs px-2 py-1 rounded shadow-md">
                  15:30
                </div>
              </div>

              {/* Video Metadata */}
              <div>
                <h3 className="font-semibold text-lg truncate">Another Video Title</h3>
                <p className="text-gray-400 text-sm">Channel Name</p>
                <p className="text-gray-400 text-sm">800K views • 1 week ago</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
