import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';
import { API_KEY } from '../data.js';

const HomePage = ({category}) => {
  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const fetchData = async () => {
    try {
      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
       
      const response = await fetch(videoListUrl);
      const apiResponse = await response.json();
      setApiData(apiResponse.items);
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
    }
  };

  const fetchBackendData = async () => {
    try {
      const url = category
        ? `http://localhost:8000/api/videos?category=${category}`
        : 'http://localhost:8000/api/allVideo';
      const response = await axios.get(url);
      setData(response.data.videos);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBackendData();
  }, [category]);

  useEffect(() => {
    setCombinedData([...data, ...apiData]);
  }, [data, apiData]);

  return (
    <div className="flex flex-wrap justify-start gap-8 p-8 sm:p-8 bg-black">
      
      {apiData?.map((item, index) => (
        <VideoCard
          key={index}
          id={item?.id || item?._id}
          thumbnail={item?.snippet?.thumbnails?.high?.url || item?.thumbnail}
          title={item?.snippet?.title || item?.title}
          username={item?.snippet?.channelTitle || item?.user?.userName}
          profilePic={item?.user?.profilePic}
          time={item?.contentDetails?.duration || "28:04"}
          createdAt={item?.snippet?.publishedAt || item?.createdAt}
        />
      ))}
   
      {data?.map((item, index) => (
        <VideoCard
          key={index}
          id={item?.id || item?._id}
          thumbnail={item?.snippet?.thumbnails?.high?.url || item?.thumbnail}
          title={item?.snippet?.title || item?.title}
          username={item?.snippet?.channelTitle || item?.user?.userName}
          profilePic={item?.user?.profilePic}
          time={item?.contentDetails?.duration || "28:04"}
          createdAt={item?.snippet?.publishedAt || item?.createdAt}
        />
      ))}
    </div>
  );
};

export default HomePage;
