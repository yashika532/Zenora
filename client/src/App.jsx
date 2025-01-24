import React, { useEffect } from 'react'
import './App.css'
import Navbar from './Component/Navbar'
import Home from './Pages/Home'
import {Route , Routes} from "react-router-dom" //its useful for single page 
import Video from './Component/Video'
import Profile from './Pages/Profile'
import VideoUpload from './Pages/VideoUpload'
import LoginSignup from './Pages/LoginSignup'
import axios from 'axios'
import Note from './Component/Note'
function App() {
  //  useEffect(()=>{
  //      axios.get('http://localhost:8000/api/allVideo').then(res=>{
  //       console.log(res);
  //      }).catch(err=>{
  //       console.log(err);
  //      })
  //  },[])

  return (
    <>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/watch/:id" element={<Video/>}/>
      <Route path = "/user/:id" element = {<Profile/>}/>
      <Route path = "/:id/upload" element = {<VideoUpload/>}/>
      <Route path = "/login" element = {<LoginSignup/>}/>
      <Route path = "/notes" element = {<Note/>}/>
     </Routes>
    </>
  )
}

export default App
