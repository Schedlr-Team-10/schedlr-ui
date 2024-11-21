import React, { useEffect, useState } from "react";
import "./Entrystyle.css";
import { Link } from "react-router-dom";
import CollaborationMarketplaceImg from '../assets/images/collaboration_marketplace.webp';
import AIAssistanceImg from '../assets/images/ai_assistance.webp';
import SchedulingImg from '../assets/images/scheduling.webp';
import PerformanceAnalyticsImg from '../assets/images/performance_analytics.webp';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Scroll-to-Top functionality
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home">
      <header
        className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-32"
        style={{
          backgroundImage: `url(https://t3.ftcdn.net/jpg/03/89/32/80/360_F_389328016_ak3iUrk15slWfEZdYL96O6eKTUyImDeC.jpg)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Make your life as a
              social media marketer
              way easier
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-100">
              Connect all your social media accounts, sit back and let the magic
              happen. Get clear analytics for all your social profiles in one
              dashboard. Schedule and report your content in seconds.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold shadow hover:bg-gray-100 transition">
                Try for Free
              </button>
              <button className="bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-purple-800 transition">
                Get a Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="features bg-white py-12 px-6 relative -mt-16 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <FeatureCard
            title="Collaboration in Marketplace"
            description="Collaborate with your team and exchange ideas with ease."
            image={CollaborationMarketplaceImg}
            buttonText="Explore MarketPlace"
            link="/marketplace"
          />
          <FeatureCard
            title="AI Assistance"
            description="Generate compelling and engaging content with AI tools."
            image={AIAssistanceImg}
            buttonText="Explore AI Assistant"
            link="/createpost"
          />
          <FeatureCard
            title="Scheduling"
            description="Plan your content calendar and post on time, every time."
            image={SchedulingImg}
            buttonText="Explore Scheduling"
            link="/createpost"
          />
          <FeatureCard
            title="Performance Analytics"
            description="Gain detailed insights to drive better results."
            image={PerformanceAnalyticsImg}
            buttonText="Explore Analytics"
            link="/insights"
          />
        </div>
      </section>

      <section className="cta bg-gradient-to-br from-purple-500 to-blue-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Your Social Media to the Next Level?</h2>
        <button className="scroll-to-top" onClick={scrollToTop}>Get Started Now</button>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p>© 2024 Schedlr. All rights reserved.</p>
          <SocialIcons />
        </div>
      </footer>
    </div>
  );
};

const SocialIcons = () => (
  <ul className="flex justify-center gap-4">
    <li>
      <FaFacebook className="w-6 h-6 text-blue-600" />
    </li>
    <li>
      <FaTwitter className="w-6 h-6 text-blue-400" />
    </li>
    <li>
      <FaInstagram className="w-6 h-6 text-pink-500" />
    </li>
    <li>
      <FaLinkedin className="w-6 h-6 text-blue-800" />
    </li>
    <li>
      <FaGithub className="w-6 h-6 text-gray-900" />
    </li>
  </ul>
);

const FeatureCard = ({ title, description, image, buttonText, link }) => (
  <div className="h-72 relative feature-card bg-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-4 flex flex-col justify-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <Link to={link}>
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          {buttonText}
        </button>
      </Link>
    </div>
  </div>
);

export default Home;
