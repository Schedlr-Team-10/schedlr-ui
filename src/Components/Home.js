import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./Entrystyle.css";
import CollaborationMarketplaceImg from '../assets/images/collaboration_marketplace.webp';
import AIAssistanceImg from '../assets/images/ai_assistance.webp';
import SchedulingImg from '../assets/images/scheduling.webp';
import PerformanceAnalyticsImg from '../assets/images/performance_analytics.webp';


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
      {/* Header Section */}
      <header className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Schedlr: Centralized Social Media Management
        </h1>
        <p className="text-lg font-light mb-6">
          Streamline your social media collaboration, scheduling, and analytics across all platforms in one place.
        </p>
        <button className="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">
          Start Scheduling Now
        </button>
      </header>

      {/* Features Section */}
      <section className="features bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <FeatureCard
            title="Collaboration in Marketplace"
            description="Collaborate with your team and exchange ideas with ease."
            image={CollaborationMarketplaceImg}
          />
          <FeatureCard
            title="AI Assistance"
            description="Generate compelling and engaging content with AI tools."
            image={AIAssistanceImg}
          />
          <FeatureCard
            title="Scheduling"
            description="Plan your content calendar and post on time, every time."
            image={SchedulingImg}
          />
          <FeatureCard
            title="Performance Analytics"
            description="Gain detailed insights to drive better results."
            image={PerformanceAnalyticsImg}
          />
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta bg-gradient-to-br from-purple-500 to-blue-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Your Social Media to the Next Level?</h2>
        <button className="bg-white text-purple-600 py-2 px-6 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p>© 2024 Schedlr. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll-to-Top Button */}
      {showScroll && (
        <button
          className="scroll-to-top fixed bottom-8 right-8 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

const FeatureCard = ({ title, description, image }) => (
  <div className="feature-card bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
