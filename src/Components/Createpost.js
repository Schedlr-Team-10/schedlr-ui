import { useState } from "react";
import { generateDescription } from "../Components/api/gptService"; // Adjust path if needed

const CreatePost = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduleTime, setScheduleTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  // New state for status modal
  const [statusModal, setStatusModal] = useState({ isOpen: false, message: "", isSuccess: false });

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
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const postToSelectedPlatforms = async () => {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform.");
      return;
    }

    setLoading(true);
    try {
      const promises = selectedPlatforms.map(async (platform) => {
        const formData = new FormData();
        formData.append("description", description);
        formData.append("uploadImage", uploadImage);
        formData.append("userId", localStorage.getItem("userId"));

        const response = await fetch(
          `http://localhost:8081/${platform.toString().toLowerCase()}/postupload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error(`Failed to post on ${platform}`);
        return await response.json();
      });

      await Promise.all(promises);

      // Open success modal
      setStatusModal({ isOpen: true, message: "Post successfully published!", isSuccess: true });
    } catch (error) {
      console.error("Error posting to platforms:", error);

      // Open failure modal
      setStatusModal({ isOpen: true, message: "Error posting to platforms. Please try again.", isSuccess: false });
    } finally {
      setLoading(false);
    }
  };

  const closeStatusModal = () => setStatusModal({ ...statusModal, isOpen: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-[100px] mt-[25px]">
        {/* Image Upload Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {uploadImage && (
            <img
              src={URL.createObjectURL(uploadImage)}
              alt="Uploaded Post"
              className="h-56 w-full object-cover"
            />
          )}
          <div className="p-4">
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <button
              onClick={triggerFileInput}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-all"
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Post Description and Platform Section */}
        <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 h-28 resize-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Write your post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            onClick={openModal}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition-all"
          >
            Generate Description
          </button>

          <div className="grid grid-cols-2 gap-2">
            {["LinkedIn", "PInterest", "Twitter", "Facebook"].map((platform) => (
              <button
                key={platform}
                onClick={() => togglePlatformSelection(platform)}
                className={`p-2 rounded-md font-medium transition-all text-sm ${
                  selectedPlatforms.includes(platform)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          <button
            onClick={postToSelectedPlatforms}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition-all"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Now"}
          </button>

          <div>
            <p className="text-gray-600 mb-1 text-sm">Schedule your post at:</p>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-blue-400 text-sm"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Status Modal */}
      {statusModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h2
              className={`text-lg font-semibold ${
                statusModal.isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusModal.message}
            </h2>
            <button
              onClick={closeStatusModal}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-1 rounded-md font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Description Generation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Generate Description</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              placeholder="Enter keywords or hashtags"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button
              onClick={handleGenerateDescription}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-md font-medium transition-all text-sm"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <textarea
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 h-24 text-sm"
              value={generatedText}
            ></textarea>
            <button
              onClick={copyToClipboard}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-1 rounded-md font-medium transition-all text-sm"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={pasteDescription}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-1 rounded-md font-medium transition-all text-sm"
            >
              Use This Description
            </button>
            <button
              onClick={closeModal}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded-md font-medium transition-all text-sm"
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
