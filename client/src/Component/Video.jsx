import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Video = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [videoUrl, setVideoURL] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const fetchVideoById = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/videoById/${id}`);
      setData(response?.data?.video);
      setVideoURL(response?.data?.video?.videoLink);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const getCommentByVideoId = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/commentApi/comment/${id}`);
      setComments(response?.data?.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
  }, [id]);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) {
      toast.warn("Comment cannot be empty");
      return;
    }

    const newComment = {
      user: { userName: "User" },  // This should be replaced with actual user data
      message: commentInput,
      createdAt: new Date().toISOString(),
    };

    // Optimistically update the UI
    setComments([...comments, newComment]);
    setCommentInput("");

    try {
      await axios.post(
        `http://localhost:8000/commentApi/comment`,
        { message: commentInput, video: id },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error("Please Login First");
      // Rollback optimistic update on failure
      setComments(comments.filter(comment => comment !== newComment));
      setCommentInput(commentInput);  // Restore the input value
    }
  };

  const suggestions = [
    { id: 1, title: "Suggested Video 1", description: "Cosmos Adventure", views: "10M views", time: "2 days ago", thumbnail: "https://via.placeholder.com/120" },
    { id: 2, title: "Suggested Video 2", description: "Galactic Views", views: "5M views", time: "1 week ago", thumbnail: "https://via.placeholder.com/120" },
    { id: 3, title: "Suggested Video 3", description: "Astronomical Wonders", views: "3M views", time: "5 days ago", thumbnail: "https://via.placeholder.com/120" },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col lg:flex-row p-8 gap-10">
        <div className="lg:w-3/4">
          {data && <video
            src={videoUrl}
            controls
            autoPlay
            muted
            className="w-full h-[600px] rounded-lg"
          ></video>}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{data?.title}</h2>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <Link to={`/user/${data?.user?._id}`} className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" alt="Profile" className="w-full h-full object-cover" />
                </Link>
                <div>
                  <h3 className="font-medium">{data?.user?.userName}</h3>
                  <p className="text-sm text-gray-400">1.2M subscribers</p>
                </div>
                <button className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 cursor-pointer border-none outline-none bg-gradient-to-r from-[#005c97] to-[#00d4ff]">Subscribe</button>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <FaThumbsUp onClick={handleLike} className="cursor-pointer text-xl text-gray-300 hover:text-blue-500" />
                  <span>{likes}</span>
                </div>
                <div className="divider w-0 h-8 border border-white"></div>
                <div className="flex items-center gap-1">
                  <FaThumbsDown onClick={handleDislike} className="cursor-pointer text-xl text-gray-300 hover:text-red-500" />
                  <span>{dislikes}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-400">{data?.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                placeholder="Add a comment..."
              />
              <button onClick={handleCommentSubmit} className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-blue-400 hover:to-blue-900">Post</button>
            </div>

            <div className="space-y-4">
              {comments.map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-semibold">{item?.user?.userName || "Unknown"}</span>
                    <span className="text-xs text-gray-400">{new Date(item?.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-300 mt-2">{item?.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Up Next</h3>
          <div className="flex flex-col gap-4">
            {suggestions.map((video) => (
              <div key={video.id} className="flex items-start bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition">
                <img src={video.thumbnail} alt={video.title} className="w-32 h-20 rounded-md object-cover" />
                <div className="ml-3">
                  <h4 className="text-white font-medium leading-snug">{video.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{video.description}</p>
                  <span className="text-gray-500 text-xs">{video.views} • {video.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Video;
