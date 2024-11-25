import React, { useState, useMemo } from "react";
import "./MarketPlace.css";

const influencers = [
  {
    name: "Monkey D. Luffy",
    profilePic:
      "https://wallpapers.com/images/hd/glitchcore-luffy-aesthetic-klup4qfestimdsa2.jpg",
    bio: "Social Media Influencer, Tech Enthusiast",
    linkedinFollowers: 15000,
    pinterestFollowers: 20000,
    twitterFollowers: 50000,
    pricePerPhoto: 300,
    pricePerTweet: 150,
    tags: ["Tech Enthusiast", "Social Media"],
  },
  {
    name: "Deadpool",
    profilePic:
      "https://w0.peakpx.com/wallpaper/903/975/HD-wallpaper-deadpool-hero-man-thumbnail.jpg",
    bio: "Fashion Guru and Lifestyle Blogger",
    linkedinFollowers: 25000,
    pinterestFollowers: 50000,
    twitterFollowers: 120000,
    pricePerPhoto: 400,
    pricePerTweet: 200,
    tags: ["Fashion", "Lifestyle"],
  },
  {
    name: "Iron Man",
    profilePic:
      "https://i.pinimg.com/originals/24/8b/e5/248be556957e41fabbcf795dc06db02d.jpg",
    bio: "Billionaire, Inventor, and Social Media Influencer",
    linkedinFollowers: 30000,
    pinterestFollowers: 45000,
    twitterFollowers: 200000,
    pricePerPhoto: 700,
    pricePerTweet: 350,
    tags: ["Billionaire", "Inventor", "Social Media Influencer"],
  },
  {
    name: "Peter Parker",
    profilePic: "https://images.alphacoders.com/134/1347144.png",
    bio: "Web Developer, Photographer, and Social Media Star",
    linkedinFollowers: 18000,
    pinterestFollowers: 30000,
    twitterFollowers: 80000,
    pricePerPhoto: 250,
    pricePerTweet: 120,
    tags: ["Web Developer", "Photographer", "Social Media Star"],
  },
  {
    name: "Captain America",
    profilePic:
      "https://www.twincities.com/wp-content/uploads/2016/04/from-captain-america-civil-war-to-finding-dory-10-movies-to-look-forward-to-in-2016-734527.jpg",
    bio: "Activist, Author, and Knowledge Sharer",
    linkedinFollowers: 40000,
    pinterestFollowers: 60000,
    twitterFollowers: 150000,
    pricePerPhoto: 350,
    pricePerTweet: 180,
    tags: ["Activist", "Author", "Knowledge Sharer"],
  },
  {
    name: "Gojo Satoru",
    profilePic:
      "https://4kwallpapers.com/images/wallpapers/satoru-gojo-black-1920x1200-14684.png",
    bio: "Social Media Influencer, Fitness Enthusiast",
    linkedinFollowers: 50000,
    pinterestFollowers: 70000,
    twitterFollowers: 200000,
    pricePerPhoto: 500,
    pricePerTweet: 250,
    tags: ["Social Media Influencer", "Fitness Enthusiast"],
  },
  {
    name: "Zenitsu",
    profilePic:
      "https://wallpapers.com/images/featured/zenitsu-background-tfv5jhezo7un4m02.jpg",
    bio: "Anime Influencer, Motivational Speaker",
    linkedinFollowers: 15000,
    pinterestFollowers: 25000,
    twitterFollowers: 70000,
    pricePerPhoto: 350,
    pricePerTweet: 180,
    tags: ["Anime Influencer", "Motivational Speaker"],
  },
  {
    name: "Deadpool",
    profilePic:
      "https://w0.peakpx.com/wallpaper/903/975/HD-wallpaper-deadpool-hero-man-thumbnail.jpg",
    bio: "Fashion Guru and Lifestyle Blogger",
    linkedinFollowers: 25000,
    pinterestFollowers: 50000,
    twitterFollowers: 120000,
    pricePerPhoto: 400,
    pricePerTweet: 200,
    tags: ["Fashion", "Lifestyle"],
  },
  {
    name: "Iron Man",
    profilePic:
      "https://i.pinimg.com/originals/24/8b/e5/248be556957e41fabbcf795dc06db02d.jpg",
    bio: "Billionaire, Inventor, and Social Media Influencer",
    linkedinFollowers: 30000,
    pinterestFollowers: 45000,
    twitterFollowers: 200000,
    pricePerPhoto: 700,
    pricePerTweet: 350,
    tags: ["Billionaire", "Inventor", "Social Media Influencer"],
  },
  {
    name: "Peter Parker",
    profilePic: "https://images.alphacoders.com/134/1347144.png",
    bio: "Web Developer, Photographer, and Social Media Star",
    linkedinFollowers: 18000,
    pinterestFollowers: 30000,
    twitterFollowers: 80000,
    pricePerPhoto: 250,
    pricePerTweet: 120,
    tags: ["Web Developer", "Photographer", "Social Media Star"],
  },
  {
    name: "Captain America",
    profilePic:
      "https://www.twincities.com/wp-content/uploads/2016/04/from-captain-america-civil-war-to-finding-dory-10-movies-to-look-forward-to-in-2016-734527.jpg",
    bio: "Activist, Author, and Knowledge Sharer",
    linkedinFollowers: 40000,
    pinterestFollowers: 60000,
    twitterFollowers: 150000,
    pricePerPhoto: 350,
    pricePerTweet: 180,
    tags: ["Activist", "Author", "Knowledge Sharer"],
  },
  {
    name: "Gojo Satoru",
    profilePic:
      "https://4kwallpapers.com/images/wallpapers/satoru-gojo-black-1920x1200-14684.png",
    bio: "Social Media Influencer, Fitness Enthusiast",
    linkedinFollowers: 50000,
    pinterestFollowers: 70000,
    twitterFollowers: 200000,
    pricePerPhoto: 500,
    pricePerTweet: 250,
    tags: ["Social Media Influencer", "Fitness Enthusiast"],
  },
  {
    name: "Zenitsu",
    profilePic:
      "https://wallpapers.com/images/featured/zenitsu-background-tfv5jhezo7un4m02.jpg",
    bio: "Anime Influencer, Motivational Speaker",
    linkedinFollowers: 15000,
    pinterestFollowers: 25000,
    twitterFollowers: 70000,
    pricePerPhoto: 350,
    pricePerTweet: 180,
    tags: ["Anime Influencer", "Motivational Speaker"],
  },
];

const MarketPlace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [selectedRequestType, setSelectedRequestType] = useState("Post");
  const [message, setMessage] = useState("");

  // Simplified filter tags
  const uniqueTags = ["Tech Enthusiast", "Fashion", "Social Media", "Lifestyle"];

  // Filter influencers based on search, tags, and price
  const filteredInfluencers = useMemo(() => {
    return influencers.filter((influencer) => {
      const matchesSearch = influencer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => influencer.tags.includes(tag));
      const matchesPrice =
        (!minPrice || influencer.pricePerPhoto >= minPrice) &&
        (!maxPrice || influencer.pricePerPhoto <= maxPrice);
      return matchesSearch && matchesTags && matchesPrice;
    });
  }, [searchQuery, selectedTags, minPrice, maxPrice]);

  const handleSendRequest = () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }
    alert(
      `Request sent to ${selectedInfluencer.name} for ${selectedRequestType}:\n${message}`
    );
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
            key={influencer.name}
            className={`contact ${
              selectedInfluencer?.name === influencer.name ? "active" : ""
            }`}
            onClick={() => setSelectedInfluencer(influencer)}
          >
            <img src={influencer.profilePic} alt={influencer.name} />
            <span className="contact-name">{influencer.name}</span>
          </div>
        ))}
      </div>

      {/* Details Section */}
      <div className="details-section">
        {selectedInfluencer ? (
          <>
            <div className="chat-header">
              <img
                src={selectedInfluencer.profilePic}
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
                {selectedInfluencer.linkedinFollowers.toLocaleString()}
              </div>
              <div className="follower">
                <i className="fab fa-pinterest"></i>{" "}
                {selectedInfluencer.pinterestFollowers.toLocaleString()}
              </div>
              <div className="follower">
                <i className="fab fa-twitter"></i>{" "}
                {selectedInfluencer.twitterFollowers.toLocaleString()}
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
                  : `$${selectedInfluencer.pricePerTweet}`}
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
