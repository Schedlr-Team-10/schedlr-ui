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
      const generatedDescription = await generateDescription(keywords);
      setGeneratedText(generatedDescription);
    } catch (error) {
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
      formData.append("platforms", JSON.stringify(selectedPlatforms));

      const response = await fetch("http://localhost:8081/schedlr/postupload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to post on selected platforms");
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

      if (response.ok) {
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 flex flex-col items-center justify-center p-8 text-gray-800">
      {/* Main Container */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
          Create Your Post
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="bg-yellow-100 rounded-lg p-6 shadow-inner flex flex-col items-center space-y-4">
            {uploadImage ? (
              <img
                src={URL.createObjectURL(uploadImage)}
                alt="Uploaded"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center border-4 border-dashed border-yellow-400 rounded-lg text-yellow-600 font-semibold">
                Upload Image Here
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <button
              onClick={triggerFileInput}
              className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
              Upload Image
            </button>
          </div>

          {/* Post Description and Actions */}
          <div className="flex flex-col space-y-6">
            <textarea
              className="w-full h-32 rounded-lg p-4 bg-purple-100 text-gray-800 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your post description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button
              onClick={openModal}
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
              Generate Description
            </button>

            <div className="grid grid-cols-2 gap-4">
              {["LinkedIn", "Pinterest", "Twitter", "Facebook"].map(
                (platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatformSelection(platform)}
                    className={`py-2 px-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md ${
                      selectedPlatforms.includes(platform)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {platform}
                  </button>
                )
              )}
            </div>

            <button
              onClick={postToSelectedPlatforms}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
              {loading ? "Posting..." : "Post Now"}
            </button>

            <div>
              <label className="block font-semibold mb-2">Schedule Post:</label>
              <input
                type="datetime-local"
                className="w-full rounded-lg p-2 bg-gray-100 focus:ring-2 focus:ring-pink-500"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>

            <button
              onClick={schedulePost}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
              {scheduleLoading ? "Scheduling..." : "Schedule Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg transform transition-transform duration-300">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Generate Description
            </h2>
            <input
              type="text"
              className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 mt-4"
              placeholder="Enter keywords or hashtags..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button
              onClick={handleGenerateDescription}
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold mt-4 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <textarea
              readOnly
              className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 text-gray-700"
              value={generatedText}
            ></textarea>
            <div className="flex justify-between space-x-2 mt-4">
              <button
                onClick={copyToClipboard}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold"
              >
                Copy
              </button>
              <button
                onClick={pasteDescription}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold"
              >
                Paste
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
