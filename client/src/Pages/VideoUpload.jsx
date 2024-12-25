import React from 'react';

const VideoUpload = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {/* Form Card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
          Upload Your Video
        </h1>
        
        <form className="space-y-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-xl font-semibold text-white mb-2">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none focus:ring-4 focus:ring-[#00d4ff] transition-all"
              placeholder="Enter an engaging title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xl font-semibold text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none focus:ring-4 focus:ring-[#00d4ff] transition-all"
              placeholder="Write a compelling description"
            ></textarea>
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col items-center text-center">
            <label htmlFor="thumbnail" className="text-xl font-semibold text-white mb-4">
              Upload Thumbnail
            </label>
            <input type="file" id="thumbnail" accept="image/*" className="hidden" />
            <label
              htmlFor="thumbnail"
              className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-[#005c97] hover:to-[#00d4ff] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Select Thumbnail
            </label>
            <p className="text-sm text-gray-200 mt-2">JPG, PNG formats accepted</p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-xl font-semibold text-white mb-2">
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder--300 border border-white/30 outline-none focus:ring-4 focus:ring-[#00d4ff] transition-all"
            >
              <option value="" disabled selected>
                Choose a category
              </option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          {/* Video Upload */}
          <div className="flex flex-col items-center text-center">
            <label htmlFor="video" className="text-xl font-semibold text-white mb-4">
              Upload Video
            </label>
            <input type="file" id="video" accept="video/*" className="hidden" />
            <label
              htmlFor="video"
              className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-[#005c97] hover:to-[#00d4ff] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Select Video
            </label>
            <p className="text-sm text-gray-200 mt-2">MP4, MOV formats accepted</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-[#005c97] hover:to-[#00d4ff] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Upload Video
            </button>
            
            {/* Home Button with New Style */}
            <button
              type="button"
              className="bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-[#005c97] hover:to-[#00d4ff] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;
