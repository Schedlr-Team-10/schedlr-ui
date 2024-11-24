import React, { useState, useEffect } from "react";
import {
  getPostReactions,
  getPostComments,
  getPageFollowers,
} from "./util/analyticsService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Insights = () => {
  const [platform, setPlatform] = useState("LinkedIn");
  const [analyticsData, setAnalyticsData] = useState({
    postReactions: [],
    postComments: [],
    postViews: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reactionData = await getPostReactions(platform);
        const postCommentsData = await getPostComments(platform);
        const viewsData = platform === "Pinterest" ? await getPageFollowers(platform) : [];

        setAnalyticsData({
          postReactions: reactionData.data,
          postComments: postCommentsData.data,
          postViews: viewsData.data || [],
        });
      } catch (error) {
        console.error("Error fetching analytics data", error);
      }
    };
    fetchData();
  }, [platform]);

  const sampleData = [
    { name: "Post 1", reactions: 4000, postComments: 2400, views: 2400 },
    { name: "Post 2", reactions: 3000, postComments: 2210, views: 2290 },
    { name: "Post 3", reactions: 2000, postComments: 2290, views: 2000 },
    { name: "Post 4", reactions: 3100, postComments: 2810, views: 2490 },
    { name: "Post 5", reactions: 2200, postComments: 2990, views: 3000 },
  ];

  return (
    <div className="bg-gradient-to-br min-h-screen py-10 px-4">
      {/* Container */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-6">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Analytics Insights
        </h2>

        {/* Platform Selector */}
        <div className="flex justify-center items-center mb-8">
          <label
            htmlFor="platform"
            className="mr-3 text-lg font-medium text-gray-600"
          >
            Select Platform:
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="border border-indigo-400 rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="LinkedIn">LinkedIn</option>
            <option value="Pinterest">Pinterest</option>
            <option value="Twitter">Twitter</option>
          </select>
        </div>

        {/* Charts Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Post Reactions Chart */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
              Post Reactions
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Posts",
                    position: "insideBottom",
                    offset: -5,
                  }}
                  tick={false}
                />
                <YAxis
                  label={{
                    value: "Reactions",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  tick={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="reactions"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Post Comments Chart */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
              Post Comments
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Posts",
                    position: "insideBottom",
                    offset: -5,
                  }}
                  tick={false}
                />
                <YAxis
                  label={{
                    value: "Comments",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  tick={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="postComments"
                  stroke="#ec4899"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Post Views Chart (Pinterest Only) */}
          {platform === "Pinterest" && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
                Post Views
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    label={{
                      value: "Posts",
                      position: "insideBottom",
                      offset: -5,
                    }}
                    tick={false}
                  />
                  <YAxis
                    label={{
                      value: "Views",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    tick={false}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#22c55e"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;
