import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Video from './Component/Video';
import Profile from './Pages/Profile';
import VideoUpload from './Pages/VideoUpload';
import LoginSignup from './Pages/LoginSignup';
import TryVideo from './Component/TryVideo';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Video/>} /> 
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path = '/test' element = {<TryVideo/>}/>
        
      </Routes>
    </>
  );
}

export default App;
