import React from "react";
import {
  FaHome,
  FaVideo,
  FaWifi,
  FaUserCircle,
  FaHistory,
  FaPlayCircle,
  FaClock,
  FaThumbsUp,
  FaLayerGroup,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen p-3 shadow-lg bg-black group">
      {/* Sidebar container */}
      <div className="flex flex-col items-center w-16 group-hover:w-52 h-full transition-all duration-300 overflow-hidden">
        {/* Top Part */}
        <div className="w-full">
          {/* Home Option */}
          <SidebarItem
            icon={<FaHome />}
            label="Home"
          />
          {/* Shorts Option */}
          <SidebarItem
            icon={<FaVideo />}
            label="Shorts"
          />
          {/* Subscription Option */}
          <SidebarItem
            icon={<FaWifi />}
            label="Subscription"
          />
        </div>
        <hr className="border-gray-700 my-4 w-full" />
        {/* Mid Part */}
        <div className="w-full">
          <SidebarItem
            icon={<FaUserCircle />}
            label="Your Channel"
          />
          <SidebarItem
            icon={<FaHistory />}
            label="History"
          />
          <SidebarItem
            icon={<FaLayerGroup />}
            label="Playlist"
          />
          <SidebarItem
            icon={<FaPlayCircle />}
            label="Your Videos"
          />
          <SidebarItem
            icon={<FaClock />}
            label="Watch Later"
          />
          <SidebarItem
            icon={<FaThumbsUp />}
            label="Liked Videos"
          />
        </div>
        <hr className="border-gray-700 my-4 w-full" />
      </div>
    </div>
  );
};

// SidebarItem Component
const SidebarItem = ({ icon, label }) => {
  return (
    <div
      className="flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1E73BE] hover:via-blue-400 hover:to-[#007bff]"
    >
      <div className="bg-gradient-to-r from-blue-400 to-[#6EC1E4] p-2 rounded-full">
        {icon}
      </div>
      <span className="text-gray-300 text-sm hidden group-hover:block">
        {label}
      </span>
    </div>
  );
};

export default Sidebar;
