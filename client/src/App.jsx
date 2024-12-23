import React from 'react'
import './App.css'
import Navbar from './Component/Navbar'
import Home from './Pages/Home'
import {Route , Routes} from "react-router-dom" //its useful for single page 
import Video from './Component/Video'
function App() {


  return (
    <>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/watch/:id" element={<Video/>}/>
     </Routes>
    </>
  )
}

export default App
