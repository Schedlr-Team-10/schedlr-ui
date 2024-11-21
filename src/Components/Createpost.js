import { useState } from "react";
import { generateDescription } from "../Components/api/gptService";
import "./CreatePost.css";

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
    <div className="create-post">
      <div className="main-container">
        <h1 className="title">Create Your Post</h1>
        <div className="content-container">
          {/* Image Upload Section */}
          <div className="upload-section">
            {uploadImage ? (
              <img
                src={URL.createObjectURL(uploadImage)}
                alt="Uploaded"
                className="uploaded-image"
              />
            ) : (
              <div className="upload-placeholder">Upload Image Here</div>
            )}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <button onClick={triggerFileInput} className="upload-button">
              Upload Image
            </button>
          </div>

          {/* Post Description and Actions */}
          <div className="action-section">
            <textarea
              className="description-input"
              placeholder="Write your post description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={openModal} className="generate-button">
              Generate Description
            </button>
            <div className="platform-buttons">
              {["LinkedIn", "Pinterest", "Twitter", "Facebook"].map(
                (platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatformSelection(platform)}
                    className={`platform-button ${
                      selectedPlatforms.includes(platform)
                        ? "selected"
                        : "unselected"
                    }`}
                  >
                    {platform}
                  </button>
                )
              )}
            </div>
            <button onClick={postToSelectedPlatforms} className="post-button">
              {loading ? "Posting..." : "Post Now"}
            </button>
            <div className="schedule-section">
              <label>Schedule Post:</label>
              <input
                type="datetime-local"
                className="schedule-input"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
            <button onClick={schedulePost} className="schedule-button">
              {scheduleLoading ? "Scheduling..." : "Schedule Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Generate Description</h2>
            <input
              type="text"
              className="keyword-input"
              placeholder="Enter keywords or hashtags..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button
              onClick={handleGenerateDescription}
              className={`generate-modal-button ${
                loading ? "disabled" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <textarea
              readOnly
              className="generated-text"
              value={generatedText}
            ></textarea>
            <div className="modal-buttons">
              <button onClick={copyToClipboard} className="copy-button">
                Copy
              </button>
              <button onClick={pasteDescription} className="paste-button">
                Paste
              </button>
              <button onClick={closeModal} className="close-button">
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
