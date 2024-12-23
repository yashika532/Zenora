import React from 'react'
import Sidebar from '../Component/Sidebar'
import HomePage from '../Component/HomePage'

const Home = () => {
  return (
    <div className='flex w-full box-border bg-black '>
      <Sidebar/>
      <HomePage/>
    </div>
  )
}

export default Home