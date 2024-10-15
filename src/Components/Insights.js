import React, { useState, useEffect } from 'react';
import { getPageImpressions, getPostEngagement, getVideoViews, getPageFollowers } from './api/analyticsService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Insight.css'; 

const Insights = () => {
    const [platform, setPlatform] = useState('LinkedIn'); 
    const [analyticsData, setAnalyticsData] = useState({
        pageImpressions: [],
        postEngagement: [],
        videoViews: [],
        pageFollowers: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const impressionsData = await getPageImpressions(platform);
                const engagementData = await getPostEngagement(platform);
                const videoViewsData = await getVideoViews(platform);
                const followersData = await getPageFollowers(platform);

                setAnalyticsData({
                    pageImpressions: impressionsData.data,
                    postEngagement: engagementData.data,
                    videoViews: videoViewsData.data,
                    pageFollowers: followersData.data,
                });
            } catch (error) {
                console.error("Error fetching analytics data", error);
            }
        };
        fetchData();
    }, [platform]); 


    // Sample insights data (have to remove afterwards)
    const sampleData = [
        { name: 'Jan', impressions: 4000, engagement: 2400, videoViews: 2400, followers: 2400 },
        { name: 'Feb', impressions: 3000, engagement: 1398, videoViews: 2210, followers: 2290 },
        { name: 'Mar', impressions: 2000, engagement: 9800, videoViews: 2290, followers: 2000 },
        { name: 'Apr', impressions: 2780, engagement: 3908, videoViews: 2000, followers: 2181 },
        { name: 'May', impressions: 1890, engagement: 4800, videoViews: 2181, followers: 2500 },
        { name: 'Jun', impressions: 2390, engagement: 3800, videoViews: 2500, followers: 2700 },
        { name: 'Jul', impressions: 3490, engagement: 4300, videoViews: 3000, followers: 3500 },
    ];

    return (
        <div className="insights-container">
            <h1>Analytics Insights</h1>
            <div className="platform-selector">
                <label htmlFor="platform">Select Platform: </label>
                <select
                    id="platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                </select>
            </div>

            <div className="charts-container">
                <div className="chart">
                    <h2>Page Impressions</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sampleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="impressions" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart">
                    <h2>Post Engagement</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sampleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="engagement" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart">
                    <h2>Video Views</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sampleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="videoViews" stroke="#ffc658" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart">
                    <h2>Page Followers</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sampleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="followers" stroke="#d0ed57" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Insights;
