import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const VideoUpload = () => {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: null,
    videoLinkName: "",
    thumbnail: null,
    thumbnailName: "",
    videoType: ""
  });

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value
    });
  };

  const uploadImage = async (event, type) => {
    const files = event.target.files;
    if (files.length > 0) {
      const fileName = files[0].name;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'Zenora');

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/douk0nfuv/${type}/upload`,
          data
        );
        const Data_url = response.data.url;
        const fieldType = type === "image" ? "thumbnail" : "videoLink";

        setInputField({
          ...inputField,
          [fieldType]: Data_url,
          [`${fieldType}Name`]: fileName
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleVideoUpload = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/video',
        inputField,
        { withCredentials: true }
      );
      // console.log(response.data);
      setInputField(false);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("userId");
    if (!isLogin) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="backdrop-blur-lg bg-[#00d4ff]/20 border border-white/40 shadow-2xl rounded-2xl p-10 w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
          Upload Your Video
        </h1>

        <form className="space-y-8" onSubmit={handleVideoUpload}>
          <div>
            <label htmlFor="title" className="block text-xl font-semibold text-white mb-2">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none focus:ring-4 focus:ring-[#00d4ff] transition-all"
              placeholder="Enter an engaging title"
              value={inputField.title}
              onChange={(e) => handleOnChangeInput(e, "title")}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-xl font-semibold text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none focus:ring-4 focus:ring-[#00d4ff] transition-all"
              placeholder="Write a compelling description"
              value={inputField.description}
              onChange={(e) => handleOnChangeInput(e, "description")}
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <label htmlFor="thumbnail" className="text-xl font-semibold text-white mb-4">
              Upload Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={(e) => uploadImage(e, "image")}
              className="hidden"
            />
            <label
              htmlFor="thumbnail"
              className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-[#005c97] hover:to-[#00d4ff] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Select Thumbnail
            </label>
            {inputField.thumbnailName && (
              <p className="text-sm text-gray-200 mt-2">Selected File: {inputField.thumbnailName}</p>
            )}
            <p className="text-sm text-gray-200 mt-2">JPG, PNG formats accepted</p>
          </div>

          <div>
            <label htmlFor="category" className="block text-xl font-semibold text-white mb-2">
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none focus:ring-4 focus:ring-[#00d4ff] transition-all"
              value={inputField.videoType}
              onChange={(e) => handleOnChangeInput(e, "videoType")}
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          <div className="flex flex-col items-center text-center">
            <label htmlFor="video" className="text-xl font-semibold text-white mb-4">
              Upload Video
            </label>
            <input
              type="file"
              id="video"
              accept="video/*"
              className="hidden"
              onChange={(e) => uploadImage(e, "video")}
            />
            <label
              htmlFor="video"
              className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-[#005c97] hover:to-[#00d4ff] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Select Video
            </label>
            {inputField.videoLinkName && (
              <p className="text-sm text-gray-200 mt-2">Selected File: {inputField.videoLinkName}</p>
            )}
            <p className="text-sm text-gray-200 mt-2">MP4, MOV, webm formats accepted</p>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-[#005c97] hover:to-[#00d4ff] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Upload Video
            </button>

            <Link
              to="/"
              className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-[#005c97] hover:to-[#00d4ff] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;
