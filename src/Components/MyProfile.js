import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("userId", userid);

    try {
      const response = await axios.post(
        "http://localhost:8081/myProfile/uploadProfilePic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileImage(response.data.imageUrl);
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const id = localStorage.getItem("userId");
      setUserid(id);
      try {
        const response = await axios.get(
          `http://localhost:8081/myProfile/userInfo?userId=${id}`
        );
        setUserName(response.data.username);
        setEmail(response.data.email);
        if (response.data.profileImageUrl) {
          setProfileImage(response.data.profileImageUrl);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <img
            src={profileImage}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-blue-400 shadow-md"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {userName || "User Name"}
          </h1>
          <p className="text-gray-500">{email || "user@example.com"}</p>
          <label
            htmlFor="profilePicture"
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md cursor-pointer transition-all"
          >
            Upload Profile Pic
          </label>
          <input
            id="profilePicture"
            type="file"
            className="hidden"
            onChange={handleProfilePictureUpload}
          />
          <div className="w-full mt-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Website Completion
            </label>
            <div className="w-full bg-gray-300 rounded-full h-5">
              <div
                className="bg-green-500 h-5 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                style={{ width: "80%" }}
              >
                80%
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Reset Password */}
        <div className="space-y-6">
          {/* Social Media Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-xl p-8">
            <h1 className="text-xl font-bold mb-6">Social Media Integration</h1>
            <div className="grid grid-cols-3 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                LinkedIn
              </button>
              <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                Pinterest
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                Twitter
              </button>
            </div>
          </div>

          {/* Reset Password Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-xl font-bold text-gray-800 mb-6">
              Reset Your Password
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
            <button className="mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full shadow-md transition-all w-full">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
