import React from 'react';

const Dashboard = () => {
  const posts = [
    {
      id: 1,
      image: 'https://www.wallsnapy.com/img_gallery/smile-kajal-agarwal-hd-picture-5673635.jpg',
      description: 'Loving the new vibes this season!',
      platforms: ['LinkedIn', 'Instagram'],
      likes: 120,
      comments: 34,
      date: '2024-10-28',
    },
    {
      id: 2,
      image: 'https://www.wallsnapy.com/img_gallery/smile-kajal-agarwal-hd-images-789860.png',
      description: 'Exploring new horizons.',
      platforms: ['Twitter'],
      likes: 85,
      comments: 21,
      date: '2024-10-27',
    },
  ];

  return (
    <div className="userdash min-h-screen p-4 flex flex-col">
      <h1 className="text-2xl text-black font-bold ">User Dashboard</h1>
      <div className="space-y-8 w-full max-w-2xl">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden w-full flex">
            <img src={post.image} alt="Post" className="w-1/2 h-[400px] object-cover" />
            <div className="p-6 w-1/2 flex flex-col justify-start text-left">
              <p className="text-gray-800 font-semibold mb-4">{post.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.platforms.map((platform, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Likes: {post.likes}</span>
                <span>Comments: {post.comments}</span>
              </div>
              <div className="text-xs text-gray-500">{post.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
