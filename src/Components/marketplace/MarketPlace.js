import React, { useState } from 'react';
import './MarketPlace.css';

const influencers = [
  {
    name: 'Monkey D. Luffy',
    profilePic: 'https://wallpapers.com/images/hd/glitchcore-luffy-aesthetic-klup4qfestimdsa2.jpg',
    bio: 'Social Media Influencer, Tech Enthusiast',
    linkedinFollowers: 15000,
    pinterestFollowers: 20000,
    twitterFollowers: 50000,
    pricePerPhoto: '$300',
    pricePerVideo: '$500',
    pricePerTweet: '$150',
  },
  {
    name: 'Deadpool',
    profilePic: 'https://w0.peakpx.com/wallpaper/903/975/HD-wallpaper-deadpool-hero-man-thumbnail.jpg',
    bio: 'Fashion Guru and Lifestyle Blogger',
    linkedinFollowers: 25000,
    pinterestFollowers: 50000,
    twitterFollowers: 120000,
    pricePerPhoto: '$400',
    pricePerVideo: '$600',
    pricePerTweet: '$200',
  },
  {
    name: 'Iron Man',
    profilePic: 'https://i.pinimg.com/originals/24/8b/e5/248be556957e41fabbcf795dc06db02d.jpg',
    bio: 'Billionaire, Inventor, and Social Media Influencer',
    linkedinFollowers: 30000,
    pinterestFollowers: 45000,
    twitterFollowers: 200000,
    pricePerPhoto: '$700',
    pricePerVideo: '$1200',
    pricePerTweet: '$350',
  },
  {
    name: 'Peter Parker',
    profilePic: 'https://images.alphacoders.com/134/1347144.png',
    bio: 'Web Developer, Photographer, and Social Media Star',
    linkedinFollowers: 18000,
    pinterestFollowers: 30000,
    twitterFollowers: 80000,
    pricePerPhoto: '$250',
    pricePerVideo: '$450',
    pricePerTweet: '$120',
  },
  {
    name: 'Captain America',
    profilePic: 'https://www.twincities.com/wp-content/uploads/2016/04/from-captain-america-civil-war-to-finding-dory-10-movies-to-look-forward-to-in-2016-734527.jpg',
    bio: 'Activist, Author, and Knowledge Sharer',
    linkedinFollowers: 40000,
    pinterestFollowers: 60000,
    twitterFollowers: 150000,
    pricePerPhoto: '$350',
    pricePerVideo: '$550',
    pricePerTweet: '$180',
  },
  {
    name: 'Gojo Satoru',
    profilePic: 'https://4kwallpapers.com/images/wallpapers/satoru-gojo-black-1920x1200-14684.png',
    bio: 'Social Media Influencer, Fitness Enthusiast',
    linkedinFollowers: 50000,
    pinterestFollowers: 70000,
    twitterFollowers: 200000,
    pricePerPhoto: '$500',
    pricePerVideo: '$800',
    pricePerTweet: '$250',
  },
  {
    name: 'Zenitsu',
    profilePic: 'https://wallpapers.com/images/featured/zenitsu-background-tfv5jhezo7un4m02.jpg',
    bio: 'Anime Influencer, Motivational Speaker',
    linkedinFollowers: 15000,
    pinterestFollowers: 25000,
    twitterFollowers: 70000,
    pricePerPhoto: '$350',
    pricePerVideo: '$550',
    pricePerTweet: '$180',
  }
  
  // Add more influencers as needed
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
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  const handleViewProfile = (influencer) => {
    setSelectedInfluencer(influencer);
  };

  return (
    <div className="marketplace-container">
      <div className="influencer-list">
        <h2 className="section-title">Browse Influencers</h2>
        {influencers.map((influencer, index) => (
          <div key={index} className="influencer-item" onClick={() => handleViewProfile(influencer)}>
            <img src={influencer.profilePic} alt={influencer.name} className="influencer-pic" />
            <div className="influencer-info">
              <p className="influencer-name">{influencer.name}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedInfluencer && (
        <div className="influencer-details">
          <button className="close-btn" onClick={() => setSelectedInfluencer(null)}>Close</button>
          <h3 className="influencer-name">{selectedInfluencer.name}</h3>
          <img src={selectedInfluencer.profilePic} alt={selectedInfluencer.name} className="profile-pic-large" />
          <p>{selectedInfluencer.bio}</p>

          {/* Social Media Followers Section with Icons */}
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

          {/* Pricing Section */}
          <div className="pricing">
            <p className="price-item photo">Price per Photo: {selectedInfluencer.pricePerPhoto}</p>
            <p className="price-item video">Price per Video: {selectedInfluencer.pricePerVideo}</p>
            <p className="price-item tweet">Price per Tweet: {selectedInfluencer.pricePerTweet}</p>
          </div>
          <button className="collaboration-btn">Request Collaboration</button>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
