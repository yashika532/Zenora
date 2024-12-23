import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaSearch } from "react-icons/fa";

const Video = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      setComments([
        ...comments,
        { user: "User", content: commentInput, time: new Date().toLocaleTimeString() },
      ]);
      setCommentInput(""); // Clear the input field
    }
  };

  const suggestions = [
    {
      id: 1,
      title: "Suggested Video 1",
      description: "Cosmos Adventure",
      views: "10M views",
      time: "2 days ago",
      thumbnail: "https://via.placeholder.com/120",
    },
    {
      id: 2,
      title: "Suggested Video 2",
      description: "Galactic Views",
      views: "5M views",
      time: "1 week ago",
      thumbnail: "https://via.placeholder.com/120",
    },
    {
      id: 3,
      title: "Suggested Video 3",
      description: "Astronomical Wonders",
      views: "3M views",
      time: "5 days ago",
      thumbnail: "https://via.placeholder.com/120",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row p-8 gap-10">
        {/* Video Section */}
        <div className="lg:w-3/4">
          <video
            src="https://media.istockphoto.com/id/690855882/video/in-the-search-for-the-exoplanet-flight-in-outer-space-between-different-planets.mp4?s=mp4-640x640-is&k=20&c=2ShX9M1Us3JL22M808qBhziMRPcg6ee34Z9gbnWRWu4="
            controls
            autoPlay
            muted
            className="w-full rounded-lg"
          ></video>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Exploring the Cosmos</h2>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Cosmos Explorer</h3>
                  <p className="text-sm text-gray-400">1.2M subscribers</p>
                </div>
                <button className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 cursor-pointer border-none outline-none bg-gradient-to-r from-[#005c97] to-[#00d4ff] ">
                  Subscribe
                </button>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <FaThumbsUp
                    onClick={handleLike}
                    className="cursor-pointer text-xl text-gray-300 hover:text-blue-500"
                  />
                  <span>{likes}</span>
                </div>
                <div className="divider w-0 h-8 border border-white"></div>
                <div className="flex items-center gap-1">
                  <FaThumbsDown
                    onClick={handleDislike}
                    className="cursor-pointer text-xl text-gray-300 hover:text-red-500"
                  />
                  <span>{dislikes}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-400">
              Explore the beauty of the galaxy with this mesmerizing journey
              through the cosmos.
            </p>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>

            {/* Comment Input */}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                placeholder="Add a comment..."
              />
              <button
                onClick={handleCommentSubmit}
                className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-blue-400 hover:to-blue-900"
              >
                Post
              </button>
            </div>

            {/* Display Comments */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-semibold">{comment.user}</span>
                    <span className="text-xs text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-gray-300 mt-2">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="lg:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Up Next</h3>
          <div className="flex flex-col gap-4">
            {suggestions.map((video) => (
              <div
                key={video.id}
                className="flex items-start bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-32 h-20 rounded-md object-cover"
                />
                <div className="ml-3">
                  <h4 className="text-white font-medium leading-snug">
                    {video.title}
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">
                    {video.description}
                  </p>
                  <span className="text-gray-500 text-xs">
                    {video.views} • {video.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
