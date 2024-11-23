import axios from 'axios';

export const getPostReactions = () => {
    return axios.get('/api/impressions');
};

export const getPostComments = () => {
    return axios.get('/api/videoViews');
};

export const getPageFollowers = () => {
    return axios.get('/api/followers');
};
