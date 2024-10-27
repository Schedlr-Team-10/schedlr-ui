import { useState } from "react";
import { generateDescription } from "../Components/api/gptService"; // Adjust path if needed

const CreatePost = () => {
  const [uploadImage, setUploadImage] = useState(
    "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
  );
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduleTime, setScheduleTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [keywords, setKeywords] = useState(""); 
  const [generatedText, setGeneratedText] = useState(""); 

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result);
      };
      reader.readAsDataURL(file);
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
        const response = await fetch(`/api/${platform.toLowerCase()}/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: description, image: uploadImage }),
        });

        if (!response.ok) throw new Error(`Failed to post on ${platform}`);

        return response.json();
      });

      await Promise.all(promises);
      alert("Post successfully published on selected platforms!");
    } catch (error) {
      console.error("Error posting to platforms:", error);
      alert("Error posting to platforms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Upload Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={uploadImage}
            alt="Uploaded Post"
            className="h-72 w-full object-cover"
          />
          <div className="p-6">
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <button
              onClick={triggerFileInput}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold transition-all"
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Post Description and Platform Section */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 h-36 resize-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            onClick={openModal}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-md font-semibold transition-all"
          >
            Generate Description
          </button>

          <div className="grid grid-cols-2 gap-4">
            {["Twitter", "Facebook", "LinkedIn", "Instagram"].map((platform) => (
              <label
                key={platform}
                className={`flex items-center space-x-3 border p-2 rounded-md cursor-pointer transition-all ${
                  selectedPlatforms.includes(platform) ? "bg-gray-100" : ""
                }`}
                onClick={() => togglePlatformSelection(platform)}
              >
                <input type="checkbox" checked={selectedPlatforms.includes(platform)} readOnly />
                <i className={`fa-brands fa-${platform.toLowerCase()} fa-lg text-gray-500`}></i>
                <span className="font-medium">{platform}</span>
              </label>
            ))}
          </div>

          <button
            onClick={postToSelectedPlatforms}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold transition-all"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Now"}
          </button>

          <div>
            <p className="text-gray-600 mb-2">Schedule your post at:</p>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Modal for Description Generation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Generate Description</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Enter keywords or hashtags"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button
              onClick={handleGenerateDescription}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-all"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <textarea
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 h-28"
              value={generatedText}
            ></textarea>
            <button
              onClick={copyToClipboard}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md font-semibold transition-all"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={pasteDescription}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition-all"
            >
              Use This Description
            </button>
            <button
              onClick={closeModal}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition-all"
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
