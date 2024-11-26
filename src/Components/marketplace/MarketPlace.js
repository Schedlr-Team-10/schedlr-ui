import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./MarketPlace.css";

const MarketPlace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [collaborationStatus, setCollaborationStatus] = useState(null);
  const [selectedRequestType, setSelectedRequestType] = useState("Post");
  const [message, setMessage] = useState("");
  const [influencers, setInfluencers] = useState([]);
  const [collaborationToken, setCollaborationToken] = useState(null);

  // Fetch influencers from the backend
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/influencers/findallInfl"
        );
        setInfluencers(response.data);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      }
    };
    fetchInfluencers();
  }, []);

  // Simplified filter tags
  const uniqueTags = [
    "Tech Enthusiast",
    "Fashion",
    "Social Media",
    "Lifestyle",
  ];

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

  // Fetch influencer details and collaboration status
  const fetchInfluencerDetails = async (influencerId, influencerName) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/influencers/${localStorage.getItem("userId")}`,
        {
          influencerId,
          influencerName,
        }
      );
      setSelectedInfluencer(response.data.influencerWithUserNameDTO || {});
      setCollaborationStatus(response.data.collaborationDto?.status || null);
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

    if (!selectedInfluencer || !selectedInfluencer.influencerId) {
      alert("No influencer selected.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/influencers/raiseCollabReq",
        null,
        {
          params: {
            userId,
            influencerId: selectedInfluencer.influencerId,
            message,
          },
        }
      );

      setCollaborationStatus("PENDING");
      alert(`Collaboration request sent: ${response.data.message}`);
    } catch (error) {
      console.error("Error sending request:", error);
    }
    setMessage(""); // Clear the input message
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const influencerId = selectedInfluencer?.influencerId;

    if (userId && influencerId) {
      const uniqueKey = `collaborationToken_${userId}_${influencerId}`;
      const savedToken = localStorage.getItem(uniqueKey);

      if (savedToken) {
        setCollaborationToken(savedToken);
        setCollaborationStatus("COMPLETED");
      }
    }
  }, [selectedInfluencer]);

  const handleMakePayment = async () => {
    if (!selectedInfluencer || !selectedInfluencer.influencerId) {
      alert("No influencer selected.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/influencers/changeStatus",
        null,
        {
          params: {
            userId: userId,
            influencerId: selectedInfluencer.influencerId,
            status: "COMPLETED",
          },
        }
      );

      alert("Payment completed successfully!");
      console.log(response.data);

      const token = response.data.collaborationToken;
      const uniqueKey = `collaborationToken_${userId}_${selectedInfluencer.influencerId}`;

      setCollaborationStatus("COMPLETED");
      setCollaborationToken(token);

      // Save the collaboration token in localStorage with a unique key
      localStorage.setItem(uniqueKey, token);
    } catch (error) {
      console.error("Error completing payment:", error);
      alert("Failed to complete payment. Please try again.");
    }
  };

  const handleCopyToClipboard = () => {
    if (collaborationToken) {
      navigator.clipboard.writeText(collaborationToken).then(
        () => {
          alert("Collaboration code copied to clipboard!");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
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
              selectedInfluencer?.userid === influencer.userid ? "active" : ""
            }`}
            onClick={() =>
              fetchInfluencerDetails(influencer.userid, influencer.username)
            }
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

            {/* LinkedIn */}
            {selectedInfluencer.linkedinProfile && (
              <a
                href={selectedInfluencer.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="follower"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            )}

            {/* Pinterest */}
            {selectedInfluencer.pinterestProfile && (
              <a
                href={selectedInfluencer.pinterestProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="follower"
              >
                <i className="fab fa-pinterest"></i>
              </a>
            )}

            {/* Twitter */}
            {selectedInfluencer.twitterProfile && (
              <a
                href={selectedInfluencer.twitterProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="follower"
              >
                <i className="fab fa-twitter"></i>
              </a>
            )}

            <div className="request-options">
              <button
                className={`request-type ${
                  selectedRequestType === "Post" ? "active" : ""
                }`}
                onClick={() => setSelectedRequestType("Post")}
              >
                Post
              </button>
              {/* <button
                className={`request-type ${
                  selectedRequestType === "Video" ? "active" : ""
                }`}
                onClick={() => setSelectedRequestType("Video")}
              >
                Video
              </button> */}
            </div>
            <div className="pricing">
              <p>
                <strong>Price for {selectedRequestType}:</strong>{" "}
                {selectedRequestType === "Post"
                  ? `$${selectedInfluencer.pricePerPhoto}`
                  : `$${selectedInfluencer.pricePerVideo}`}
              </p>
            </div>

            {/* Collaboration Section */}
            {console.log(collaborationStatus)}
            {collaborationStatus ? (
              <p>
                <strong>Status:</strong> {collaborationStatus}
                {collaborationStatus === "COMPLETED" && collaborationToken ? (
                  <div>
                    <p>
                      <strong>Your Collaboration Code:</strong>{" "}
                      {collaborationToken}
                    </p>
                    <button
                      onClick={handleCopyToClipboard}
                      className="copy-btn"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                ) : null}
                {collaborationStatus === "ACCEPTED" ? (
                  <div>
                    <button
                      onClick={handleMakePayment}
                      className="send-request-btn"
                    >
                      Make Payment
                    </button>
                  </div>
                ) : null}
              </p>
            ) : (
              <>
                <textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={handleSendRequest}
                  className="send-request-btn"
                >
                  Send Request
                </button>
              </>
            )}
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
