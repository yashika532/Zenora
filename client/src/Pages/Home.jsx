import React, { useState } from 'react';
import Sidebar from '../Component/Sidebar';
import HomePage from '../Component/HomePage';

const Home = () => {
  const [category, setCategory] = useState(0);

  return (
    <div className='flex w-full box-border bg-black'>
      <Sidebar category={category} setCategory={setCategory}/>
      <HomePage category={category} />
    </div>
  );
};

export default Home;
