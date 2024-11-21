import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ProgressTracker from './marketplace/ProgressTracker';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch post history when component mounts
    const fetchPostHistory = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:8081/schedlr/posthistory?userId=${userId}`);
        const data = response.data;

        // Map and sort the response data by date in descending order
        const formattedPosts = data
          .map(post => ({
            id: post.postId,
            image: `data:image/jpeg;base64,${post.image}`, // assuming the image is Base64
            description: post.description,
            platforms: [
              post.linkedinPostId ? 'LinkedIn' : null,
              post.pinterestPostId ? 'Pinterest' : null,
              post.twitterPostId ? 'Twitter' : null,
              post.fbPostId ? 'Facebook' : null,
            ].filter(Boolean), // filter out null values
            date: post.postUploadDate,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching post history:', error);
      }
    };

    fetchPostHistory();
  }, []);

  return (
    <div className="userdash min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8"></h1>
      {/* <ProgressTracker/> */}
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
