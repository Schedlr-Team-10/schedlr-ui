import axios from 'axios';

// API to fetch user info
export const fetchUserInfo = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8081/myProfile/userInfo?userId=${userId}`);
    return response.data; // Returns the user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Handle error in the component
  }
};

// API to fetch post history
export const fetchPostHistory = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8081/schedlr/posthistory?userId=${userId}`);
    return response.data; // Returns the array of post images
  } catch (error) {
    console.error('Error fetching post history:', error);
    throw error; // Handle error in the component
  }
};

// API to change the user's password
export const changePassword = async (userId, newPassword) => {
  try {
    const response = await axios.post('http://localhost:8081/myProfile/changePassword', {
      password: newPassword,
      userId,
    });
    return response.status === 200; // Return success status
  } catch (error) {
    console.error('Error changing password:', error);
    throw error; // Handle error in the component
  }
};

// API to send LinkedIn authorization code to the backend
export const sendLinkedInCode = async (code, state, userId) => {
  try {
    const response = await axios.post('http://localhost:8081/linkedin/authCode', {
      code,
      state,
      userId,
    });
    return response.data; // Returns the backend response
  } catch (error) {
    console.error('Error sending code to backend:', error);
    throw error; // Handle error in the component
  }
};


