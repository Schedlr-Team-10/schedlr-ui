import { useState } from "react";
import { generateDescription } from "./api/gptService"; // Import GPT service

const CreatePost = () => {
  const [uploadImage, setUploadImage] = useState(
    "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
  );
  const [description, setDescription] = useState(""); // State to hold description
  const [loading, setLoading] = useState(false); // Loading state for GPT-3

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

  const generatePostDescription = async () => {
    setLoading(true);
    try {
      const generatedText = await generateDescription(description); // Call GPT-3 service
      setDescription(generatedText); // Update the textarea with generated description
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Failed to generate description. Please try again.");
    }
    setLoading(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Allow user to edit the generated text
  };

  return (
    <div className="createPost flex flex-col lg:flex-row items-center justify-center min-h-screen p-8 bg-gray-100 space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Image Upload Section */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-full max-w-sm">
        <img
          className="h-72 w-full object-cover rounded-md"
          src={uploadImage}
          alt="Uploaded Post"
        />
        <input
          id="fileInput"
          className="hidden"
          type="file"
          onChange={handleChange}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 mt-4 w-full rounded-md"
          onClick={triggerFileInput}
        >
          Upload Image
        </button>
      </div>

      {/* Post Description and Platform Section */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-lg space-y-4">
        {/* Description Input */}
        <div>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 h-36 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows="8"
            placeholder="Write your post description"
            value={description} // Controlled input for description
            onChange={handleDescriptionChange}
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-2 w-full rounded-md"
            onClick={generatePostDescription}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Description"}
          </button>
        </div>

        {/* Platform Selection */}
        <div className="grid grid-cols-2 gap-4">
          {["Twitter", "Facebook", "LinkedIn", "Instagram"].map((platform) => (
            <label
              key={platform}
              className="flex items-center space-x-3 border p-2 rounded-md hover:bg-gray-50"
            >
              <input type="checkbox" className="custom-checkbox" />
              <i className={`fa-brands fa-${platform.toLowerCase()} fa-lg`}></i>
              <span className="font-medium text-gray-700">{platform}</span>
            </label>
          ))}
        </div>

        {/* Post and Schedule Buttons */}
        <div className="flex flex-col space-y-3">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md">
            Post Now
          </button>
          <div>
            <p className="text-gray-600 mb-2">Schedule your post at:</p>
            <input
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="datetime-local"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
