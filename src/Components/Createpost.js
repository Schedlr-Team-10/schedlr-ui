import { useState } from "react";
import { generateDescription } from "../Components/api/gptService"; 

const CreatePost = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); 
  const [scheduleTime, setScheduleTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateDescription = async () => {
    setLoading(true);
    try {
      console.log("Generating description...");
      const generatedDescription = await generateDescription(keywords);
      setGeneratedText(generatedDescription);
    } catch (error) {
      console.log("We could not fetch from AI");
      console.error("Error generating description:", error);
      alert("Failed to generate description. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    alert("Copied to clipboard!");
  };

  const pasteDescription = () => {
    setDescription(generatedText);
    closeModal();
  };

  const togglePlatformSelection = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const postToSelectedPlatforms = async () => {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform.");
      return;
    }
  
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("uploadImage", uploadImage);
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("platforms", JSON.stringify(selectedPlatforms)); // Add selected platforms
  
      const response = await fetch("http://localhost:8081/schedlr/postupload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to post on selected platforms");
  
      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
  
      alert("Post successfully published on selected platforms!");
    } catch (error) {
      console.error("Error posting to platforms:", error);
      alert("Error posting to platforms. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const schedulePost = async () => {
    if (!scheduleTime) {
      alert("Please select a date and time to schedule your post.");
      return;
    }
    setScheduleLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("uploadImage", uploadImage);
      formData.append("platforms", JSON.stringify(selectedPlatforms));
      formData.append("scheduleTime", scheduleTime);
      formData.append("userId", localStorage.getItem("userId"));
  
      const response = await fetch("http://localhost:8081/schedlr/schedule", {
        method: "POST",
        body: formData,
      });
  
      console.log("Response is: ", response);
  
      if (response.ok) {
        console.log("adfasdf");
        alert("Scheduled Successfully");
      } else {
        throw new Error("Failed to schedule post");
      }
    } catch (error) {
      console.error("Error scheduling post:", error);
      alert("Error scheduling post. Please try again.");
    } finally {
      setScheduleLoading(false);
    }
  };
  
  return (
    <div className="create min-h-screen from-gray-100 to-gray-200 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-[100px] mt-[25px]">
        {/* Image Upload Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          {uploadImage && (
            <img
              src={URL.createObjectURL(uploadImage)}
              alt="Uploaded Post"
              className="h-56 w-full object-cover"
            />
          )}
          <div className="p-6">
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <button
              onClick={triggerFileInput}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-all shadow-md"
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Post Description and Platform Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Create Your Post</h2>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 h-28 resize-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Write your post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            onClick={openModal}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition-all"
          >
            Generate Description
          </button>

          <div className="grid grid-cols-2 gap-4">
            {["LinkedIn", "PInterest", "Twitter", "Facebook"].map((platform) => (
              <button
                key={platform}
                onClick={() => togglePlatformSelection(platform)}
                className={`p-2 rounded-md font-semibold transition-all text-sm ${
                  selectedPlatforms.includes(platform)
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          <button
            onClick={postToSelectedPlatforms}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition-all"
            disabled={loading || scheduleLoading}
          >
            {loading ? "Posting..." : "Post Now"}
          </button>

          <div>
            <p className="text-gray-600 mb-1 text-sm">Schedule your post at:</p>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 text-sm"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </div>

          <button
            onClick={schedulePost}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition-all"
            disabled={loading || scheduleLoading}
          >
            {scheduleLoading ? "Scheduling..." : "Schedule Now"}
          </button>
        </div>
      </div>

      {/* Modal for Description Generation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Generate Description</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter keywords or hashtags"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button
              onClick={handleGenerateDescription}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-all"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <textarea
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 h-24 text-sm"
              value={generatedText}
            ></textarea>
            <button
              onClick={copyToClipboard}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition-all text-sm"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={pasteDescription}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-all text-sm"
            >
              Paste Description
            </button>
            <button
              onClick={closeModal}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition-all text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
