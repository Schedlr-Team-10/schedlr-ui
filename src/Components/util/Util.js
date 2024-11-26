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
    console.log("checking password auth : "+ userId+" : "+ newPassword);
    const response = await axios.post(
      "http://localhost:8081/myProfile/changePassword",
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

  fetch('http://localhost:8081/linkedin/authCode', {
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


export const saveOrUpdateInfluencer = async (influencerId, linkedinProfile, pinterestProfile, twitterProfile, pricePerPhoto) => {
  const url = `http://localhost:8081/influencers/saveOrUpdate?influencerId=${influencerId}&linkedinProfile=${linkedinProfile}&pinterestProfile=${pinterestProfile}&twitterProfile=${twitterProfile}&pricePerPhoto=${pricePerPhoto}`;

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