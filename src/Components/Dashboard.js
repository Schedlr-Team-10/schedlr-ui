import React from 'react';

const Dashboard = () => {
  const posts = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg',
      description: 'Loving the new vibes this season!',
      platforms: ['LinkedIn', 'Pinterest'],
      date: '2024-10-28T14:30:00',
    },
    {
      id: 2,
      image: 'https://wallpapers.com/images/hd/hiking-4000-x-6000-background-4ibzqltjjt8eri6g.jpg',
      description: 'Exploring new horizons.',
      platforms: ['LinkedIn'],
      date: '2024-10-27T09:45:00',
    },
  ];

  return (
    <div className="userdash min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Dashboard</h1>

      <div className="space-y-8 w-full max-w-3xl">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden w-full flex"
          >
            {/* Separate Image Container */}
            <div className="w-1/2">
              <img 
                src={post.image} 
                alt="Post" 
                className="w-full h-[400px] object-cover rounded-l-lg" 
              />
            </div>

            {/* Separate Description Container */}
            <div className="w-1/2 p-6 flex flex-col justify-start items-start space-y-4">
              {/* Post Description */}
              <p className="text-lg text-gray-800 font-medium leading-relaxed">
                {post.description}
              </p>

              {/* Uploaded On Text */}
              <p className="text-sm text-gray-600">Uploaded on:</p>

              {/* Platform Tags */}
              <div className="flex flex-wrap gap-2">
                {post.platforms.map((platform, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              {/* Upload Time */}
              <div className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()} at{' '}
                {new Date(post.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
