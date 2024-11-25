import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./MarketPlace.css";

const MarketPlace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [selectedRequestType, setSelectedRequestType] = useState("Post");
  const [message, setMessage] = useState("");
  const [influencers, setInfluencers] = useState([]);

  // Fetch influencers from the backend
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/influencers/findallInfl");
        setInfluencers(response.data);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      }
    };
    fetchInfluencers();
  }, []);

  // Simplified filter tags
  const uniqueTags = ["Tech Enthusiast", "Fashion", "Social Media", "Lifestyle"];

  // Filter influencers based on search, tags, and price
  const filteredInfluencers = useMemo(() => {
    return influencers.filter((influencer) => {
      const matchesSearch = influencer.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => influencer.tags?.includes(tag));
      const matchesPrice =
        (!minPrice || influencer.pricePerPhoto >= minPrice) &&
        (!maxPrice || influencer.pricePerPhoto <= maxPrice);
      return matchesSearch && matchesTags && matchesPrice;
    });
  }, [searchQuery, selectedTags, minPrice, maxPrice, influencers]);

  // Fetch influencer details
  const fetchInfluencerDetails = async (influencerId, influencerName) => {
    try {
      const response = await axios.post(`http://localhost:8081/influencers/${influencerId}`, {
        influencerId,
        influencerName,
      });
      setSelectedInfluencer(response.data.influencerWithUserNameDTO);
    } catch (error) {
      console.error("Error fetching influencer details:", error);
    }
  };

  // Handle collaboration request
  const handleSendRequest = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8081/influencers/raiseCollabReq",
        null, 
        {
          params: {
            userId: 1, 
            influencerId: selectedInfluencer.influencerId,
            message,
          },
        }
      );
      alert(`Collaboration request sent:\n${response.data.message}`);
    } catch (error) {
      console.error("Error sending request:", error);
    }
    setMessage("");
  };

  return (
    <div className="marketplace-container">
      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search influencers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filters-container">
          <h4>Filter by Category:</h4>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              className={`tag ${selectedTags.includes(tag) ? "active" : ""}`}
              onClick={() =>
                setSelectedTags((prevTags) =>
                  prevTags.includes(tag)
                    ? prevTags.filter((t) => t !== tag)
                    : [...prevTags, tag]
                )
              }
            >
              {tag}
            </button>
          ))}
          <h4>Filter by Price Range:</h4>
          <div className="price-filters">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Influencers Section */}
      <div className="influencers-section">
        {filteredInfluencers.map((influencer) => (
          <div
            key={influencer.userid}
            className={`contact ${
              selectedInfluencer?.influencerId === influencer.userid ? "active" : ""
            }`}
            onClick={() => fetchInfluencerDetails(influencer.userid, influencer.username)}
          >
            <img
              src={influencer.profilePic || "placeholder-image.png"}
              alt={influencer.username}
            />
            <span className="contact-name">{influencer.username}</span>
          </div>
        ))}
      </div>

      {/* Details Section */}
      <div className="details-section">
        {selectedInfluencer ? (
          <>
            <div className="chat-header">
              <img
                src={selectedInfluencer.profilePic || "placeholder-image.png"}
                alt={selectedInfluencer.name}
              />
              <div>
                <h3>{selectedInfluencer.name}</h3>
                <p>{selectedInfluencer.bio}</p>
              </div>
            </div>
            <div className="followers">
              <div className="follower">
                <i className="fab fa-linkedin"></i>{" "}
                {selectedInfluencer.linkedinFollowers?.toLocaleString() || 0}
              </div>
              <div className="follower">
                <i className="fab fa-pinterest"></i>{" "}
                {selectedInfluencer.pinterestFollowers?.toLocaleString() || 0}
              </div>
              <div className="follower">
                <i className="fab fa-twitter"></i>{" "}
                {selectedInfluencer.twitterFollowers?.toLocaleString() || 0}
              </div>
            </div>
            <div className="request-options">
              <button
                className={`request-type ${
                  selectedRequestType === "Post" ? "active" : ""
                }`}
                onClick={() => setSelectedRequestType("Post")}
              >
                Post
              </button>
              <button
                className={`request-type ${
                  selectedRequestType === "Video" ? "active" : ""
                }`}
                onClick={() => setSelectedRequestType("Video")}
              >
                Video
              </button>
            </div>
            <div className="pricing">
              <p>
                <strong>Price for {selectedRequestType}:</strong>{" "}
                {selectedRequestType === "Post"
                  ? `$${selectedInfluencer.pricePerPhoto}`
                  : `$${selectedInfluencer.pricePerVideo}`}
              </p>
            </div>
            <textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendRequest} className="send-request-btn">
              Send Request
            </button>
          </>
        ) : (
          <div className="placeholder">
            <h3>Select an influencer to view details</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
