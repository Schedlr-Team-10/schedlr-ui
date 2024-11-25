import React, { useEffect, useState } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import {
  PINTEREST_CLIENT_ID,
  PINTEREST_REDIRECT_URL,
  PINTEREST_SCOPE,
  PINTEREST_CODE,
} from "./util/Constants";
import { LinkedAuth } from "./util/Util";
import PasswordRest from "./PasswordReset";

const MyProfile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("1");
  

  // Profile Picture and Bio States
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isCropping, setIsCropping] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleFileChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  // Social Media Links and Costs States
  const [profileUrls, setProfileUrls] = useState({
    pinterest: "https://pinterest.com/user",
    linkedin: "https://linkedin.com/in/user",
    twitter: "https://twitter.com/user",
  });
  const [chargeForPost, setChargeForPost] = useState(100);
  const [chargeForVideo, setChargeForVideo] = useState(200);
  const [isEditingSocialMedia, setIsEditingSocialMedia] = useState(false);

  // Social Media Check-In
  const handlePInterestLogin = () => {
    const oauthUrl = `https://www.pinterest.com/oauth/?client_id=${PINTEREST_CLIENT_ID}&redirect_uri=${PINTEREST_REDIRECT_URL}&scope=${PINTEREST_SCOPE}&response_type=${PINTEREST_CODE}`;
    window.location.href = oauthUrl;
  };

  const buildLinkedInAuthUrl = () => {
    const linkedInAuthUrl = "https://www.linkedin.com/oauth/v2/authorization";
    const params = {
      response_type: "code",
      client_id: "862ar2q201lf2i",
      redirect_uri: "http://localhost:3000/myprofile",
      state: "DCEeFWf45A53sdfKef424",
      scope: "openid profile email w_member_social",
    };
    const queryParams = new URLSearchParams(params).toString();
    return `${linkedInAuthUrl}?${queryParams}`;
  };

  const handleLinkedInLogin = () => {
    const authUrl = buildLinkedInAuthUrl();
    window.location.href = authUrl;
  };

  // Fetch User Information
  const fetchUserInfo = async (id) => {
    const url = `http://localhost:8081/myProfile/userInfo?userId=${id}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log("Data full : "+data.bio);
      setBio(data.bio);
      setProfileImage(data.profilepic);
      setUserName(data.username);
      setEmail(data.email);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };


  // Cropper Functions
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
   // setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setIsCropping(true); 
        setProfilePic(file);  
      };
      reader.readAsDataURL(file); 
    }
  };
  

  const handleSaveCroppedImage = () => {
    setProfileImage(selectedImage); 
    setIsCropping(false);
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (!bio && !profilePic) {
      setResponseMessage("Please provide at least one field to update.");
      return;
    }
    const formData = new FormData();
    if (profilePic) formData.append("profilePic", profilePic);
    if (bio) formData.append("bio", bio);
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.put(
        `http://localhost:8082/schedlr/${userId}/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseMessage("Profile updated successfully!");
      console.log("Updated User:", response.data);
      setIsUpdatingProfile(false);
      fetchUserInfo(userId);
    } catch (error) {
      console.error("Error updating profile:", error);
      setResponseMessage("Failed to update profile. Please try again.");
    }
  };
  

  const handleSaveSocialMedia = () => {
    alert("Social media links and costs updated successfully!");
    setIsEditingSocialMedia(false);
  };

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    setUserid(userIdFromStorage);
    fetchUserInfo(userIdFromStorage);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code!=null && state!=null) {
      LinkedAuth(code, state, userid);
    }
  }, []);

  return (
    <div className="bg-[#ECF0F1] min-h-screen p-8 px-52">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Profile Picture and Bio */}
        <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-lg">
          {!isUpdatingProfile ? (
            <div className="text-center">
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-full mx-auto w-28 h-28 object-cover"
              />
              <h2 className="text-center text-xl font-bold mt-5">{userName}</h2>
              <p className="text-center text-gray-600">{email}</p>
              <p className="mt-3 text-center text-gray-700">{bio || "No bio added yet."}</p>
              <button
                onClick={() => setIsUpdatingProfile(true)}
                className="mt-5 bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 transition"
              >
                Update Profile
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">Update Profile</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Profile Picture:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Bio:</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-2 py-1"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write your bio here"
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsUpdatingProfile(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Social Media Links and Costs */}
        < >
          {localStorage.getItem("accountType") === "INFLUENCER" && (
            <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Social Media & Costs</h2>
              {!isEditingSocialMedia ? (
                <div className="">
                  <p className="mb-3 mt-10">
                    <strong>Pinterest:</strong> {profileUrls.pinterest}
                  </p>
                  <p className="mb-3">
                    <strong>LinkedIn:</strong> {profileUrls.linkedin}
                  </p>
                  <p className="mb-3">
                    <strong>Twitter:</strong> {profileUrls.twitter}
                  </p>
                  <p className="mb-3">
                    <strong>Charge for Post:</strong> ${chargeForPost}
                  </p>
                  <button
                    onClick={() => setIsEditingSocialMedia(true)}
                    className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 transition w-full mt-10"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Pinterest:</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg px-2 py-1"
                      value={profileUrls.pinterest}
                      onChange={(e) =>
                        setProfileUrls({ ...profileUrls, pinterest: e.target.value })
                      }
                      placeholder="Enter Pinterest profile URL"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">LinkedIn:</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg px-2 py-1"
                      value={profileUrls.linkedin}
                      onChange={(e) =>
                        setProfileUrls({ ...profileUrls, linkedin: e.target.value })
                      }
                      placeholder="Enter LinkedIn profile URL"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Twitter:</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg px-2 py-1"
                      value={profileUrls.twitter}
                      onChange={(e) =>
                        setProfileUrls({ ...profileUrls, twitter: e.target.value })
                      }
                      placeholder="Enter Twitter profile URL"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Charge for Post:</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-2 py-1"
                      value={chargeForPost}
                      onChange={(e) => setChargeForPost(e.target.value)}
                      placeholder="Enter charge for post"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setIsEditingSocialMedia(false)}
                      className="bg-gray-600 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveSocialMedia}
                      className="bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>

      </div>

      {/* Social Media Check-in */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Check-in to Social Media</h2>
        <div className="flex justify-around">
          <button
            className="bg-[#d62976] text-white py-2 px-4 rounded shadow-md hover:bg-[#c8236f] transition mx-4"
            onClick={handlePInterestLogin}
          >
            Pinterest
          </button>
          <button
            className="bg-[#0A66C2] text-white py-2 px-4 rounded shadow-md hover:bg-[#084a90] transition mx-4"
            onClick={handleLinkedInLogin}
          >
            LinkedIn
          </button>
          <button className="bg-[#1DA1F2] text-white py-2 px-4 rounded shadow-md hover:bg-[#177cc8] transition mx-4">
            Twitter
          </button>
        </div>
      </div>

      <PasswordRest/>
      
      {/* Cropping Modal */}
      {isCropping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Crop Your Picture</h2>
            <div className="relative w-full h-64 bg-gray-200">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Zoom:</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded"
                onClick={() => setIsCropping(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleSaveCroppedImage}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
