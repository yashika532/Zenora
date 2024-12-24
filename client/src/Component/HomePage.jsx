import React from 'react';
import {Link} from 'react-router-dom'
const HomePage = () => {
  return (
    <div className='flex overflow-x-scroll space-x-4 px-10 py-12 hide-scrollbar'>
      {/* Card with thumbnail, profile, and metadata */}
      <Link to = {'/watch/1'} className='youtube-video text-white flex-shrink-0 w-96 h-80 bg-gray-800 p-4 rounded-md'>
        {/* Thumbnail */}
        <div className="w-full relative box-border h-48 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" 
            alt="Beautiful Landscape Thumbnail" 
            className="w-full h-full object-cover rounded-md"
          />
          {/* Timing label */}
          <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
            28:05
          </div>
        </div>

        {/* Profile and Video Metadata */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s" 
            alt="Profile" 
            className='w-10 h-10 rounded-full'
          />
          {/* Video Title and Metadata */}
          <div className="text-sm">
            <div className="font-semibold text-lg truncate">Sample Video Title</div>
            <div className="text-gray-400 text-sm">Channel Name</div>
            <div className="text-gray-400 text-sm">1.2M views • 2 days ago</div>
          </div>
        </div>
      </Link>

      <Link to = {'/watch/1'} className='youtube-video text-white flex-shrink-0 w-96 h-80 bg-gray-800 p-4 rounded-md'>
        {/* Thumbnail */}
        <div className="w-full relative box-border h-48 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" 
            alt="Beautiful Landscape Thumbnail" 
            className="w-full h-full object-cover rounded-md"
          />
          {/* Timing label */}
          <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
            28:05
          </div>
        </div>

        {/* Profile and Video Metadata */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s" 
            alt="Profile" 
            className='w-10 h-10 rounded-full'
          />
          {/* Video Title and Metadata */}
          <div className="text-sm">
            <div className="font-semibold text-lg truncate">Sample Video Title</div>
            <div className="text-gray-400 text-sm">Channel Name</div>
            <div className="text-gray-400 text-sm">1.2M views • 2 days ago</div>
          </div>
        </div>
      </Link>


      <Link to = {'/watch/1'} className='youtube-video text-white flex-shrink-0 w-96 h-80 bg-gray-800 p-4 rounded-md'>
        {/* Thumbnail */}
        <div className="w-full relative box-border h-48 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" 
            alt="Beautiful Landscape Thumbnail" 
            className="w-full h-full object-cover rounded-md"
          />
          {/* Timing label */}
          <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
            28:05
          </div>
        </div>

        {/* Profile and Video Metadata */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s" 
            alt="Profile" 
            className='w-10 h-10 rounded-full'
          />
          {/* Video Title and Metadata */}
          <div className="text-sm">
            <div className="font-semibold text-lg truncate">Sample Video Title</div>
            <div className="text-gray-400 text-sm">Channel Name</div>
            <div className="text-gray-400 text-sm">1.2M views • 2 days ago</div>
          </div>
        </div>
      </Link>

      <Link to = {'/watch/1'} className='youtube-video text-white flex-shrink-0 w-96 h-80 bg-gray-800 p-4 rounded-md'>
        {/* Thumbnail */}
        <div className="w-full relative box-border h-48 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" 
            alt="Beautiful Landscape Thumbnail" 
            className="w-full h-full object-cover rounded-md"
          />
          {/* Timing label */}
          <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
            28:05
          </div>
        </div>

        {/* Profile and Video Metadata */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByVjBTwRINSOePwmji3EYb_8pNugi8IYQsw&s" 
            alt="Profile" 
            className='w-10 h-10 rounded-full'
          />
          {/* Video Title and Metadata */}
          <div className="text-sm">
            <div className="font-semibold text-lg truncate">Sample Video Title</div>
            <div className="text-gray-400 text-sm">Channel Name</div>
            <div className="text-gray-400 text-sm">1.2M views • 2 days ago</div>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default HomePage;
