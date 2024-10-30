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
import "./Insight.css";

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
        // Fetch views data only for Pinterest
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
    { name: "Posts", reactions: 4000, postComments: 2400, views: 2400 },
    { name: "Posts", reactions: 3000, postComments: 2210, views: 2290 },
    { name: "Posts", reactions: 2000, postComments: 2290, views: 2000 },
  ];

  return (
    <div className="insi">
    <div className="insights-container">
      <h2 >Analytics Insights</h2>
      <div className="platform-selector">
        <label htmlFor="platform">Select Platform: </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="LinkedIn">LinkedIn</option>
          <option value="Pinterest">Pinterest</option>
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter</option>
        </select>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h3>Post Reactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{ value: "Posts", position: "insideBottom", offset: -5 }}
                tick={false}
              />
              <YAxis
                label={{ value: "Likes", angle: -90, position: "insideLeft" }}
                tick={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reactions"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Post Comments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{ value: "Posts", position: "insideBottom", offset: -5 }}
                tick={false}
              />
              <YAxis
                label={{ value: "Comments", angle: -90, position: "insideLeft" }}
                tick={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="postComments"
                stroke="#ffc658"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {platform === "Pinterest" && (
          <div className="chart">
            <h3>Post Views</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{ value: "Posts", position: "insideBottom", offset: -5 }}
                  tick={false}
                />
                <YAxis
                  label={{ value: "Views", angle: -90, position: "insideLeft" }}
                  tick={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#d0ed57"
                  activeDot={{ r: 8 }}
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
