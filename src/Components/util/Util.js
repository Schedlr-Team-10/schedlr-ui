import axios from 'axios';
import { REACT_APP_API_INTEGRATION_URL } from "./Constants";

// API to fetch user info
export const fetchUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${REACT_APP_API_INTEGRATION_URL}/myProfile/userInfo?userId=${userId}`);
    return response.data; // Returns the user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Handle error in the component
  }
};

// API to fetch post history
export const fetchPostHistory = async (userId) => {
  try {
    const response = await axios.get(`${REACT_APP_API_INTEGRATION_URL}/schedlr/posthistory?userId=${userId}`);
    return response.data; // Returns the array of post images
  } catch (error) {
    console.error('Error fetching post history:', error);
    throw error; // Handle error in the component
  }
};

// API to change the user's password
export const changePassword = async (userId, newPassword) => {
  try {
    console.log("checking password auth : "+ userId+" : "+ newPassword);
    const response = await axios.post(
      `${REACT_APP_API_INTEGRATION_URL}/myProfile/changePassword`,
      {
        password: newPassword,
        userId: userId,
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error; // Handle error in the component
  }
};

export const LinkedAuth = async(code, state, userid)=> {
  const payload = {
    code: code,
    state: state,
    userId: userid
  };

  fetch(`${REACT_APP_API_INTEGRATION_URL}/linkedin/authCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from backend:', data);
    })
    .catch((error) => {
      console.error('Error calling backend:', error);
    });
}

// API to send LinkedIn authorization code to the backend
export const sendLinkedInCode = async (code, state, userId) => {
  try {
    const response = await axios.post(`${REACT_APP_API_INTEGRATION_URL}/linkedin/authCode`, {
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


export const saveOrUpdateInfluencer = async (influencerId, linkedinProfile, pinterestProfile, twitterProfile, pricePerPhoto) => {
  const url = `${REACT_APP_API_INTEGRATION_URL}/influencers/saveOrUpdate?influencerId=${influencerId}&linkedinProfile=${linkedinProfile}&pinterestProfile=${pinterestProfile}&twitterProfile=${twitterProfile}&pricePerPhoto=${pricePerPhoto}`;

  try {
    const response = await fetch(url, {
      method: 'POST', // Specify the method (POST)
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      alert('Influencer saved/updated successfully!');
      console.log('Response:', result);
    } else {
      alert('Failed to save/update influencer!');
      console.log('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error occurred while calling API:', error);
    alert('Error occurred while saving/updating influencer!');
  }
};


export const checkCollaborationCode = async (code) => {
  try {
      const response = await fetch(`${REACT_APP_API_INTEGRATION_URL}/influencers/checkCollabCode?code=${encodeURIComponent(code)}`, {
          method: 'GET',
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.text(); // Ensure we fetch the response as text
      const influencerId = parseInt(data, 10); // Parse the response to an integer
      console.log("Influencer ID:", influencerId);
      return influencerId; // Return the parsed integer
  } catch (error) {
      console.error("Error checking collaboration code:", error);
      throw error; // Re-throw the error for the caller to handle
  }
};
