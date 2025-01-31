// import React, { useState, useEffect } from "react";
// import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
// import { FaNoteSticky } from "react-icons/fa6";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { API_KEY } from "../data.js";

// const Video = () => {
//   const { id } = useParams();
//   const [backendData, setBackendData] = useState(null);
//   const [youtubeData, setYoutubeData] = useState(null);
//   const [videoUrl, setVideoURL] = useState("");
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [commentInput, setCommentInput] = useState("");
//   const [subscribe, setSubscribe] = useState(false);
//   const [channel, setChannel] = useState(null);

//   // Fetch video data from your backend
//   const fetchVideoById = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/videoById/${id}`,
//         { withCredentials: true }
//       );
//       setChannel(response?.data?.video?.user?._id);
//       setBackendData(response?.data?.video);
//       setVideoURL(response?.data?.video?.videoLink);
//     } catch (error) {
//       console.error("Error fetching video:", error);
//       toast.error("Error fetching video data.");
//     }
//   };

//   // Fetch comments from your backend
//   const getCommentByVideoId = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/commentApi/comment/${id}`
//       );
//       setComments(response?.data?.comments);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//       toast.error("Error fetching comments.");
//     }
//   };

//   // Fetch likes from your backend
//   const getLikes = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/${id}/getLike`
//       );
//       setLikes(response.data.likes);
//     } catch (error) {
//       console.error("Error fetching likes:", error);
//     }
//   };

//   // Fetch dislikes from your backend
//   const getDislikes = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/${id}/getDislike`
//       );
//       setDislikes(response.data.dislikes);
//     } catch (error) {
//       console.error("Error fetching dislikes:", error);
//     }
//   };

//   // Fetch subscription status from your backend
//   const getSubscriptionStatus = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/subscription/status/${channel}`,
//         { withCredentials: true }
//       );
//       setSubscribe(response?.data?.isSubcribed);
//     } catch (error) {
//       console.error("Error fetching subscription status:", error);
//     }
//   };

//   // Fetch video data from YouTube API
//   const fetchVideoDataFromYouTube = async () => {
//     try {
//       const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`;
//       const response = await fetch(videoDetailsUrl);
//       const data = await response.json();
//       const video = data.items[0];

//       setYoutubeData({
//         title: video.snippet.title,
//         description: video.snippet.description,
//         videoLink: `https://www.youtube.com/watch?v=${id}`,
//       });

//       setLikes(video.statistics.likeCount || 0);
//       setDislikes(video.statistics.dislikeCount || 0);
//     } catch (error) {
//       console.error("Error fetching YouTube video data:", error);
//     }
//   };

//   // Handle like action
//   const handleLike = async () => {
//     try {
//       await axios.post(`http://localhost:8000/api/${id}/like`);
//       setLikes((prevLikes) => prevLikes + 1);
//     } catch (error) {
//       console.error("Error liking video:", error);
//       toast.error("Failed to like the video. Please try again.");
//     }
//   };

//   // Handle subscribe action
//   const handleSubscribe = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/subscription/subscribe`,
//         { channelId: channel },
//         { withCredentials: true }
//       );
//       setSubscribe(true);
//       toast.success("Successfully subscribed!");
//     } catch (error) {
//       console.error("Error subscribing:", error);
//       toast.error("An error occurred while subscribing.");
//     }
//   };

//   // Handle unsubscribe action
//   const handleUnsubscribe = async () => {
//     try {
//       await axios.delete(`http://localhost:8000/api/subscription/unsubscribe`, {
//         data: { channelId: channel },
//         withCredentials: true,
//       });
//       setSubscribe(false);
//       toast.success("Successfully unsubscribed!");
//     } catch (error) {
//       console.error("Error unsubscribing:", error);
//       toast.error("An error occurred while unsubscribing.");
//     }
//   };

//   // Handle dislike action
//   const handleDislike = async () => {
//     try {
//       await axios.post(`http://localhost:8000/api/${id}/dislike`);
//       setDislikes((prevDislikes) => prevDislikes + 1);
//     } catch (error) {
//       console.error("Error disliking video:", error);
//       toast.error("Failed to dislike the video. Please try again.");
//     }
//   };

//   // Handle comment submission
//   const handleCommentSubmit = async () => {
//     if (!commentInput.trim()) {
//       toast.warn("Comment cannot be empty");
//       return;
//     }

//     const newComment = {
//       user: { userName: "User" },
//       message: commentInput,
//       createdAt: new Date().toISOString(),
//     };

//     setComments([...comments, newComment]);
//     setCommentInput("");

//     try {
//       await axios.post(
//         `http://localhost:8000/commentApi/comment`,
//         { message: commentInput, video: id },
//         { withCredentials: true }
//       );
//     } catch (error) {
//       toast.error("Please Login First");
//       setComments(comments.filter((comment) => comment !== newComment));
//       setCommentInput(commentInput);
//     }
//   };

//   useEffect(() => {
//     fetchVideoById();
//     getCommentByVideoId();
//     getLikes();
//     getDislikes();
//     fetchVideoDataFromYouTube();
//   }, [id]);

//   useEffect(() => {
//     if (channel) {
//       getSubscriptionStatus();
//     }
//   }, [channel]);

//   const suggestions = [
//     {
//       id: 1,
//       title: "Suggested Video 1",
//       description: "Cosmos Adventure",
//       views: "10M views",
//       time: "2 days ago",
//       thumbnail:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s",
//     },
//     {
//       id: 2,
//       title: "Suggested Video 2",
//       description: "Galactic Views",
//       views: "5M views",
//       time: "1 week ago",
//       thumbnail:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s",
//     },
//     {
//       id: 3,
//       title: "Suggested Video 3",
//       description: "Astronomical Wonders",
//       views: "3M views",
//       time: "5 days ago",
//       thumbnail:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s",
//     },
//   ];

//   return (
//     <div className="bg-black text-white min-h-screen">
//       <div className="flex flex-col lg:flex-row p-8 gap-10">
//         <div className="lg:w-3/4">
//           {!backendData ? (
//             <iframe
//               className="w-full h-[600px]"
//               src={`https://www.youtube.com/embed/${id}`}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//             />
//           ) : (
//             <div className="w-full h-[600px]">
//               <video
//                 src={videoUrl}
//                 controls
//                 autoPlay
//                 muted
//                 className="w-full h-[600px] rounded-lg"
//               ></video>
//             </div>
//           )}

//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">
//               {youtubeData?.title || backendData?.title}
//             </h2>
//             <p className="text-sm text-gray-400 mt-2">
//               {youtubeData?.description || backendData?.description}
//             </p>
//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center gap-4">
//                 <Link
//                   to={`/user/${backendData?.user?._id}`}
//                   className="w-12 h-12 rounded-full overflow-hidden"
//                 >
//                   <img
//                     src={
//                       backendData?.user?.profilePic ||
//                       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s"
//                     }
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </Link>
//                 <div>
//                   <h3 className="font-medium">
//                     {backendData?.user?.userName || "User"}
//                   </h3>
//                   <p className="text-sm text-gray-400">
//                     {backendData?.subscriberCount}
//                   </p>
//                 </div>
//                 {!subscribe ? (
//                   <button
//                     className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 cursor-pointer border-none outline-none bg-gradient-to-r from-[#005c97] to-[#00d4ff]"
//                     onClick={handleSubscribe}
//                   >
//                     Subscribe
//                   </button>
//                 ) : (
//                   <button
//                     className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 cursor-pointer border-none outline-none bg-gradient-to-r from-[#005c97] to-[#00d4ff]"
//                     onClick={handleUnsubscribe}
//                   >
//                     Unsubscribe
//                   </button>
//                 )}
//               </div>
//               <div className="flex gap-4">
//                 <div className="flex items-center gap-1">
//                   <FaThumbsUp
//                     onClick={handleLike}
//                     className="cursor-pointer text-xl text-gray-300 hover:text-blue-500"
//                   />
//                   <span>{likes}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <FaThumbsDown
//                     onClick={handleDislike}
//                     className="cursor-pointer text-xl text-gray-300 hover:text-blue-500"
//                   />
//                   <span>{dislikes}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-4">Comments</h3>
//             <div className="flex items-center gap-4 mb-4">
//               <input
//                 type="text"
//                 value={commentInput}
//                 onChange={(e) => setCommentInput(e.target.value)}
//                 className="flex-1 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400"
//                 placeholder="Add a comment..."
//               />
//               <button
//                 onClick={handleCommentSubmit}
//                 className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-blue-400 hover:to-blue-900"
//               >
//                 Post
//               </button>
//             </div>

//             <div className="space-y-4">
//               {comments?.map((comment, index) => (
//                 <div key={index} className="bg-gray-800 p-4 rounded-lg">
//                   <p className="text-sm font-medium">
//                     {comment.user?.userName}
//                   </p>
//                   <p className="mt-2">{comment.message}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="lg:w-1/4">
//           <h3 className="text-xl font-semibold">Recommended Videos</h3>
//           <div className="flex flex-col gap-4">
//             {suggestions.map((video) => (
//               <div
//                 key={video.id}
//                 className="flex items-start bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
//               >
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   className="w-32 h-20 rounded-md object-cover"
//                 />
//                 <div className="ml-3">
//                   <h4 className="text-white font-medium leading-snug">
//                     {video.title}
//                   </h4>
//                   <p className="text-gray-400 text-sm mt-1">
//                     {video.description}
//                   </p>
//                   <span className="text-gray-500 text-xs">
//                     {video.views} • {video.time}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Video;

import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_KEY } from "../data.js";

const Video = () => {
  const { id } = useParams();
  const [backendData, setBackendData] = useState(null);
  const [youtubeData, setYoutubeData] = useState(null);
  const [videoUrl, setVideoURL] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [channel, setChannel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Fetch video data from your backend
  const fetchVideoById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/videoById/${id}`,
        { withCredentials: true }
      );
      setChannel(response?.data?.video?.user?._id);
      setBackendData(response?.data?.video);
      setVideoURL(response?.data?.video?.videoLink);
      setLikes(response?.data?.video?.likes || 0);
      setDislikes(response?.data?.video?.dislikes || 0);
      setComments(response?.data?.video?.comments || []);
    } catch (error) {
      console.error("Error fetching video:", error);
      toast.error("Error fetching video data.");
      // If backend data is null, fetch from YouTube API
      fetchVideoDataFromYouTube();
    }
  };

  // Fetch video data from YouTube API
  const fetchVideoDataFromYouTube = async () => {
    try {
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`;
      const response = await fetch(videoDetailsUrl);
      const data = await response.json();
      const video = data.items[0];

      setYoutubeData({
        title: video.snippet.title,
        description: video.snippet.description,
        videoLink: `https://www.youtube.com/watch?v=${id}`,
        channelTitle: video.snippet.channelTitle,
        channelId: video.snippet.channelId,
        thumbnail: video.snippet.thumbnails.default.url,
      });

      setLikes(video.statistics.likeCount || 0);
      setDislikes(video.statistics.dislikeCount || 0);

      // Fetch YouTube comments
      fetchYouTubeComments();
    } catch (error) {
      console.error("Error fetching YouTube video data:", error);
    }
  };

  // Fetch YouTube comments
  const fetchYouTubeComments = async () => {
    try {
      const commentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&key=${API_KEY}`;
      const response = await fetch(commentsUrl);
      const data = await response.json();

      const comments = data.items.map((item) => ({
        user: {
          userName: item.snippet.topLevelComment.snippet.authorDisplayName,
        },
        message: item.snippet.topLevelComment.snippet.textDisplay,
        createdAt: item.snippet.topLevelComment.snippet.publishedAt,
      }));

      setComments(comments);
    } catch (error) {
      console.error("Error fetching YouTube comments:", error);
    }
  };

  // Fetch recommendations from your backend
  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/recommendations`,
        { withCredentials: true }
      );
      setRecommendations(response?.data?.videos || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Handle like action
  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:8000/api/${id}/like`);
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error("Error liking video:", error);
      toast.error("Failed to like the video. Please try again.");
    }
  };

  // Handle dislike action
  const handleDislike = async () => {
    try {
      await axios.post(`http://localhost:8000/api/${id}/dislike`);
      setDislikes((prevDislikes) => prevDislikes + 1);
    } catch (error) {
      console.error("Error disliking video:", error);
      toast.error("Failed to dislike the video. Please try again.");
    }
  };

  // Handle subscribe action
  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/subscription/subscribe`,
        { channelId: channel },
        { withCredentials: true }
      );
      setSubscribe(true);
      toast.success("Successfully subscribed!");
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("An error occurred while subscribing.");
    }
  };

  // Handle unsubscribe action
  const handleUnsubscribe = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/subscription/unsubscribe`, {
        data: { channelId: channel },
        withCredentials: true,
      });
      setSubscribe(false);
      toast.success("Successfully unsubscribed!");
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast.error("An error occurred while unsubscribing.");
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) {
      toast.warn("Comment cannot be empty");
      return;
    }

    const newComment = {
      user: { userName: "User" },
      message: commentInput,
      createdAt: new Date().toISOString(),
    };

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
      setComments(comments.filter((comment) => comment !== newComment));
      setCommentInput(commentInput);
    }
  };

  useEffect(() => {
    fetchVideoById();
    fetchRecommendations();
  }, [id]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col lg:flex-row p-8 gap-10">
        <div className="lg:w-3/4">
          {!backendData ? (
            <iframe
              className="w-full h-[600px]"
              src={`https://www.youtube.com/embed/${id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-[600px]">
              <video
                src={videoUrl}
                controls
                autoPlay
                muted
                className="w-full h-[600px] rounded-lg"
              ></video>
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-xl font-semibold">
              {youtubeData?.title || backendData?.title}
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              {youtubeData?.description || backendData?.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <Link
                  to={`/channel/${youtubeData?.channelId || backendData?.user?._id}`}
                  className="w-12 h-12 rounded-full overflow-hidden"
                >
                  <img
                    src={
                      youtubeData?.thumbnail ||
                      backendData?.user?.profilePic ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div>
                  <h3 className="font-medium">
                    {youtubeData?.channelTitle || backendData?.user?.userName || "User"}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {backendData?.subscriberCount || "YouTube Channel"}
                  </p>
                </div>
                {!subscribe ? (
                  <button
                    className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 cursor-pointer border-none outline-none bg-gradient-to-r from-[#005c97] to-[#00d4ff]"
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </button>
                ) : (
                  <button
                    className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 cursor-pointer border-none outline-none bg-gradient-to-r from-[#005c97] to-[#00d4ff]"
                    onClick={handleUnsubscribe}
                  >
                    Unsubscribe
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <FaThumbsUp
                    onClick={handleLike}
                    className="cursor-pointer text-xl text-gray-300 hover:text-blue-500"
                  />
                  <span>{likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaThumbsDown
                    onClick={handleDislike}
                    className="cursor-pointer text-xl text-gray-300 hover:text-blue-500"
                  />
                  <span>{dislikes}</span>
                </div>
              </div>
            </div>
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
              <button
                onClick={handleCommentSubmit}
                className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#005c97] to-[#00d4ff] hover:from-blue-400 hover:to-blue-900"
              >
                Post
              </button>
            </div>

            <div className="space-y-4">
              {comments?.map((comment, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm font-medium">
                    {comment.user?.userName}
                  </p>
                  <p className="mt-2">{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/4">
          <h3 className="text-xl font-semibold">Recommended Videos</h3>
          <div className="flex flex-col gap-4">
            {recommendations.map((video) => (
              <div
                key={video._id}
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
      <ToastContainer />
    </div>
  );
};

export default Video;