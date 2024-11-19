import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./MarketPlace.css";
import axios from "axios";
import ImageModal from "./ImageModal";

const influencers = [
  {
    name: "Monkey D. Luffy",
    profilePic:
      "https://wallpapers.com/images/hd/glitchcore-luffy-aesthetic-klup4qfestimdsa2.jpg",
    bio: "Social Media Influencer, Tech Enthusiast",
    linkedinFollowers: 15000,
    pinterestFollowers: 20000,
    twitterFollowers: 50000,
    pricePerPhoto: "$300",
    pricePerVideo: "$500",
    pricePerTweet: "$150",
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
    pricePerPhoto: "$400",
    pricePerVideo: "$600",
    pricePerTweet: "$200",
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
    pricePerPhoto: "$700",
    pricePerVideo: "$1200",
    pricePerTweet: "$350",
    tags: ["Billionaire", "Inventor", "Social Media Influencer"],
  },
  {
    name: "Peter Parker",
    profilePic: "https://images.alphacoders.com/134/1347144.png",
    bio: "Web Developer, Photographer, and Social Media Star",
    linkedinFollowers: 18000,
    pinterestFollowers: 30000,
    twitterFollowers: 80000,
    pricePerPhoto: "$250",
    pricePerVideo: "$450",
    pricePerTweet: "$120",
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
    pricePerPhoto: "$350",
    pricePerVideo: "$550",
    pricePerTweet: "$180",
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
    pricePerPhoto: "$500",
    pricePerVideo: "$800",
    pricePerTweet: "$250",
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
    pricePerPhoto: "$350",
    pricePerVideo: "$550",
    pricePerTweet: "$180",
    tags: ["Anime Influencer", "Motivational Speaker"],
  },
];

const formatFollowers = (count) => {
  if (count >= 1000 && count < 1000000) {
    return `${(count / 1000).toFixed(1)}k`;
  } else if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  return count;
};

const MarketPlace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [minFollowers, setMinFollowers] = useState(0);
  const [maxFollowers, setMaxFollowers] = useState(Infinity);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleViewProfile = useCallback((influencer) => {
    setSelectedInfluencer(influencer);
    setSelectedServices([]);
    setMessage("");
  }, []);

  const toggleService = useCallback((service) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter((s) => s !== service)
        : [...prevServices, service]
    );
  }, []);

  const openModal = useCallback((imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalImage(null);
  }, []);

  const filteredInfluencers = useMemo(() => {
    return influencers.filter((influencer) => {
      const matchesSearch = influencer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.every((tag) =>
        influencer.tags.includes(tag)
      );
      const totalFollowers =
        influencer.linkedinFollowers +
        influencer.pinterestFollowers +
        influencer.twitterFollowers;
      const matchesFollowers =
        totalFollowers >= minFollowers && totalFollowers <= maxFollowers;
      const matchesPrice =
        parseInt(influencer.pricePerPhoto.replace("$", "")) >= minPrice &&
        parseInt(influencer.pricePerPhoto.replace("$", "")) <= maxPrice;
      return matchesSearch && matchesTags && matchesFollowers && matchesPrice;
    });
  }, [
    searchQuery,
    selectedTags,
    minFollowers,
    maxFollowers,
    minPrice,
    maxPrice,
  ]);

  const navigate = useNavigate();

  const handleCollaborationRequest = () => {
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    if (message.trim() === "") {
      alert("Please enter a message for the influencer.");
      return;
    }

    alert(
      `Request Collaboration for: ${selectedServices.join(
        ", "
      )}\nMessage: ${message}`
    );

    // Optionally send this data to a backend API
    axios.post("/api/request-collaboration", {
      influencer: selectedInfluencer.name,
      services: selectedServices,
      message,
    });
  };

  return (
    <div className="marketplace-container">
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search influencers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <div className="tags-filter">
          <label>Filter by Category:</label>
          {["Tech Enthusiast", "Fashion", "Lifestyle", "Social Media"].map(
            (tag) => (
              <button
                key={tag}
                className={`tag ${selectedTags.includes(tag) ? "active" : ""}`}
                onClick={() =>
                  setSelectedTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag]
                  )
                }
              >
                {tag}
              </button>
            )
          )}
        </div>

        <div className="range-filters">
          {/* <label>Follower Count:</label>
          <input
            type="number"
            placeholder="Min Followers"
            onChange={(e) => setMinFollowers(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Followers"
            onChange={(e) => setMaxFollowers(Number(e.target.value))}
          /> */}

          <label>Price Range:</label>
          <input
            type="number"
            placeholder="Min Price"
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="influencer-list">
        <h2 className="section-title">Browse Influencers</h2>
        {filteredInfluencers.map((influencer, index) => (
          <div
            key={index}
            className="influencer-item"
            onClick={() => handleViewProfile(influencer)}
          >
            <img
              src={influencer.profilePic}
              alt={influencer.name}
              className="influencer-pic"
            />
            <div className="influencer-info">
              <p className="influencer-name">{influencer.name}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedInfluencer && (
        <div className="influencer-details">
          <button
            className="close-profile-btn"
            onClick={() => setSelectedInfluencer(null)}
          >
            ✕
          </button>
          <h3 className="influencer-name">{selectedInfluencer.name}</h3>
          <img
            src={selectedInfluencer.profilePic}
            alt={selectedInfluencer.name}
            className="profile-pic-large"
            onClick={() => openModal(selectedInfluencer.profilePic)}
          />
          <p>{selectedInfluencer.bio}</p>
          <div className="social-followers">
            <div className="follower-item linkedin">
              <i className="fab fa-linkedin"></i>
              <h5>{formatFollowers(selectedInfluencer.linkedinFollowers)}</h5>
            </div>
            <div className="follower-item pinterest">
              <i className="fab fa-pinterest"></i>
              <h5>{formatFollowers(selectedInfluencer.pinterestFollowers)}</h5>
            </div>
            <div className="follower-item twitter">
              <i className="fab fa-twitter"></i>
              <h5>{formatFollowers(selectedInfluencer.twitterFollowers)}</h5>
            </div>
          </div>
          <div className="pricing">
            <p
              className={`price-item photo ${
                selectedServices.includes("Photo") ? "active" : ""
              }`}
              onClick={() => toggleService("Photo")}
            >
              Price per Photo: {selectedInfluencer.pricePerPhoto}
            </p>
            <p
              className={`price-item video ${
                selectedServices.includes("Video") ? "active" : ""
              }`}
              onClick={() => toggleService("Video")}
            >
              Price per Video: {selectedInfluencer.pricePerVideo}
            </p>
            <p
              className={`price-item tweet ${
                selectedServices.includes("Tweet") ? "active" : ""
              }`}
              onClick={() => toggleService("Tweet")}
            >
              Price per Tweet: {selectedInfluencer.pricePerTweet}
            </p>
          </div>

          <textarea
            className="message-input"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {selectedServices.length > 0 && (
            <button
            className="collaboration-btn"
            onClick={() => {
              if (!message.trim()) {
                alert("Please enter a message for the influencer.");
                return;
              }
              const amount = selectedServices.length * 100; // Example amount calculation
              navigate(`/checkout?amount=${amount}&message=${encodeURIComponent(message)}`); // Redirect to payment page
            }}
          >
            Request Collaboration for {selectedServices.join(", ")}
          </button>
          )}
        </div>
      )}

      {isModalOpen && <ImageModal imageSrc={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default MarketPlace;
