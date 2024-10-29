import axios from 'axios';

export const getPostReactions = () => {
    return axios.get('/api/impressions');
};

// export const getPostEngagement = () => {
//     return axios.get('/api/engagement');
// };

// export const getVideoViews = () => {
//     return axios.get('/api/videoViews');
// };

export const getPostComments = () => {
    return axios.get('/api/videoViews');
};

export const getPageFollowers = () => {
    return axios.get('/api/followers');
};
