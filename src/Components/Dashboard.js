import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [profileData, setProfileData] = useState({ name: '', email: '', profileViews: 0, postImpressions: 0 });

  useEffect(() => {
    const fetchPostHistory = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8081/schedlr/posthistory?userId=${userId}`);
        const data = response.data;

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

    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8081/myProfile/userInfo?userId=${userId}`);
        const { username, email, profileViews, postImpressions } = response.data;
        setProfileData({ name: username, email, profileViews, postImpressions });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchPostHistory();
    fetchProfileData();
  }, []);

  return (
    <div className="dashboard min-h-screen flex bg-gray-50 px-52">
      {/* Left Side: Profile Details */}
      <div className="w-1/4 h-screen sticky top-0 space-y-6 p-6">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-6 overflow-hidden">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full mx-auto w-24 h-24 mb-4"
          />
          <h2 className="text-center text-xl font-bold truncate">{profileData.name || 'User Name'}</h2>
          <p className="text-center text-gray-600 truncate">{profileData.email || 'user@example.com'}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Profile Views: <span className="font-semibold">{profileData.profileViews}</span>
            </p>
            <p className="text-sm text-gray-600">
              Post Impressions: <span className="font-semibold">{profileData.postImpressions}</span>
            </p>
          </div>
        </div>

        {/* Create a New Post Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Create a New Post</h3>
          <Link to="/createpost">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-10 rounded">
            Create Post
          </button></Link>
        </div>
      </div>

      {/* Right Side: Post History */}
      <div className="w-3/4 overflow-y-auto p-6 space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex"
          >
            {/* Separate Image Container */}
            <div className="w-1/2">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-[300px] object-cover rounded-l-lg"
              />
            </div>

            {/* Separate Description Container */}
            <div className="w-1/2 p-6 flex flex-col justify-start items-start space-y-4">
              {/* Post Description */}
              <p className="text-lg text-gray-800 font-medium leading-relaxed">
                {post.description}
              </p>

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
