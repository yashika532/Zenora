import React, { useState, useEffect } from 'react';
import Sidebar from '../Component/Sidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
  const { id } = useParams();
  
  const [profile, setProfile] = useState({});
  const [videoData, setVideoData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [inputField, setInputField] = useState({ fullName: "", profilePic: "" });
  const [fullName, setFullName] = useState("Your Name");
  const [profilePic, setProfilePic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s");

  const calculateDaysAgo = (createdDate) => {
    const createdAt = new Date(createdDate);
    const now = new Date();
    const differenceInTime = now - createdAt;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays === 0 ? 'Today' : `${differenceInDays} days ago`;
  };

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value
    });
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/${id}/channel`);
      setProfile(response.data);
      setVideoData(response.data.videos || []);
      const user = response.data.videos?.[0]?.user || {};
      setFullName(user.fullName || "Your Name");
      setProfilePic(user.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s");
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'Zenora');

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/douk0nfuv/image/upload`,
          data
        );
        setInputField({
          ...inputField,
          profilePic: response.data.url
        });
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  const handleEditClick = () => setIsEditModalOpen(true);

  const handleModalClose = () => setIsEditModalOpen(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/auth/${id}/update`, inputField);
      setProfile(response.data);
      setFullName(response.data.fullName);
      setProfilePic(response.data.profilePic);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="profile bg-black flex box-border p-4 w-full text-white min-h-screen">
      <Sidebar />
      <div className="profile-page flex-1 ml-2 p-4">
        <div className="profile-top-section flex items-center mb-12 p-6 rounded-lg bg-gradient-to-r from-[#005c97] to-[#00d4ff] shadow-lg transition-transform duration-500 hover:scale-105 relative">
          <div className="profile-avatar-img mr-6">
            <img
              src={profilePic}
              alt="Profile"
              className="w-44 h-44 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div className="profile-About ml-8 text-white">
            <h1 className="text-4xl font-extrabold tracking-wide mb-2">{fullName}</h1>
            <p className="text-lg italic">
              {profile?.videos?.[0]?.user?.userName || 'No username added'}
            </p>
            <div className="profile-stats mt-4 flex space-x-10">
              <div className="subscribers">
                <p className="text-2xl font-bold">1M</p>
                <p className="text-sm">Subscribers</p>
              </div>
              <div className="videos">
                <p className="text-2xl font-bold">{videoData.length}</p>
                <p className="text-sm">Videos</p>
              </div>
            </div>
          </div>
          <FaUserEdit 
            size={28} 
            className="absolute bottom-4 right-4 cursor-pointer text-white"
            onClick={handleEditClick}
          />
        </div>

        {isEditModalOpen && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] p-6 rounded-lg text-white w-128 h-128 shadow-lg">
              <div className="flex justify-center mb-4">
                {inputField.profilePic ? (
                  <img
                    src={inputField.profilePic}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center bg-white/20 text-white">
                    No Image
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-4 text-white text-center">Edit Profile</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-white">Full Name</label>
                  <input
                    type="text"
                    value={inputField.fullName}
                    onChange={(e) => handleOnChangeInput(e, 'fullName')}
                    className="w-full px-3 py-2 bg-white/20 border border-white rounded text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-white">Profile Picture</label>
                  <input
                    type="file"
                    onChange={uploadImage}
                    className="w-full px-3 py-2 bg-white/20 border border-white rounded text-white"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="videos-section">
          <h2 className="text-3xl font-semibold mb-6 text-[#00d4ff]">Your Videos</h2>
          <div className="h-0.5 bg-gradient-to-r from-[#005c97] to-[#00d4ff] rounded-full mb-10"></div>
          <div className="video-thumbnails grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {videoData.map((video, index) => (
              <Link
                key={index}
                to={`/watch/${video._id}`}
                className="youtube-video relative bg-gray-900 p-4 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300 hover:border-gradient-to-r from-[#005c97] to-[#00d4ff] hover:shadow-[0_0_15px_5px_rgba(0,212,255,0.6)] hover:scale-105"
              >
                <div className="relative box-border h-48 mb-4 overflow-hidden rounded-md">
                  <img
                    src={video.thumbnail || 'default-thumbnail.jpg'}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
                  <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#005c97] to-[#00d4ff] text-white text-xs px-2 py-1 rounded shadow-md">
                    28:05
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <div className="flex flex-row justify-around">
                    <p className="text-gray-400 text-sm mr-32 mt-1">{video.user?.userName}</p>
                    <p className="text-gray-400 text-sm mt-1">{calculateDaysAgo(video.user?.createdAt)}</p>
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
