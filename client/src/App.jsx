import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Video from './Component/Video';
import Profile from './Pages/Profile';
import VideoUpload from './Pages/VideoUpload';
import LoginSignup from './Pages/LoginSignup';
import axios from 'axios';
import Note from './Component/Note';
import VideoCard from './Component/VideoCard';

function App() {
  const [videos, setVideos] = useState([]);

  // Fetch data from the backend on page load
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/allVideo')
      .then((res) => {
        setVideos(res.data.videos); // Store the videos in state
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/watch/:id" element={<Video videos={videos} />} /> {/* Pass videos to Video */}
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </>
  );
}

export default App;
