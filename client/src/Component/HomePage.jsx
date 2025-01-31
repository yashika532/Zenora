import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';
import { API_KEY } from '../data.js';

const HomePage = ({ category }) => {
  const [data, setData] = useState([]); // Data from backend
  const [apiData, setApiData] = useState([]); // Data from YouTube API
  const [combinedData, setCombinedData] = useState([]); // Combined data for rendering
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  // Fetch data from the YouTube API
  const fetchData = async () => {
    try {
      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoListUrl);
      const apiResponse = await response.json();
      setApiData(apiResponse.items);
      console.log(apiResponse.items)
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error);
    }
  };

  // Fetch data from the backend
  const fetchBackendData = async () => {
    try {
      const url = category
        ? `http://localhost:8000/api/videos?category=${category}`
        : 'http://localhost:8000/api/allVideo';
      const response = await axios.get(url);
      setData(response.data.videos);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchBackendData();
  }, [category]);

  useEffect(() => {
    setCombinedData([...apiData , ...data]);
    setLoading(false); 
  }, [data, apiData]);

  return (
    <div className="flex flex-wrap justify-start gap-8 p-8 sm:p-8 bg-black">
      {loading ? (
        <div>Loading...</div> 
      ) : (
           combinedData.map((item, index) => (
          <VideoCard
            key={index}
            id={item?.id || item?._id}
            thumbnail={item?.snippet?.thumbnails?.high?.url || item?.thumbnail}
            title={item?.snippet?.title || item?.title}
            username={item?.snippet?.channelTitle || item?.user?.userName}
            profilePic={item?.user?.profilePic}
            time={item?.contentDetails?.duration || '28:04'}
            createdAt={item?.snippet?.publishedAt || item?.createdAt}
          />
        ))
      )}
    </div>
  );
};

export default HomePage;
