import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

import "./Entrystyle.css";
import "./Styles.css";

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

  useEffect(() => {
    const elementsLeft = document.querySelectorAll(".hidden-left");
    const elementsRight = document.querySelectorAll(".hidden-right");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsLeft.forEach((el) => observer.observe(el));
    elementsRight.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // Cleanup on component unmount
  }, []);

  return (
    <div className="home justify-center">
      {/* Sections */}
      <div className="mx-5 flex flex-col">
        <Section
          title="Centralized Platform"
          description="A social media collaboration tool designed to streamline team efforts in content creation, scheduling, and performance analytics across multiple platforms."
          imageSrc="Allinone.jpg"
          imageAlt="All in one"
          reverse={false}
        />

        <Section
          title="Collaboration in Marketplace"
          description="Streamline team efforts with a built-in marketplace for post exchanges and real-time collaboration, enabling teams to optimize their social media strategy."
          imageSrc="Marketplace.jpg"
          imageAlt="Marketplace"
          reverse={true}
        />

        <Section
          title="Insights"
          description="Detailed analytics and performance insights across multiple platforms to improve your social media strategy effectively."
          imageSrc="Analysis.jpg"
          imageAlt="Analysis"
          reverse={false}
        />

        <Section
          title="AI Assistant for Post Descriptions"
          description="AI-powered tools for generating compelling and engaging content, enhancing productivity and streamlining the content creation process."
          imageSrc="ai.jpg"
          imageAlt="AI Assistant"
          reverse={true}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll-to-Top Button */}
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

const Section = ({ title, description, imageSrc, imageAlt, reverse }) => (
  <div
    className={`flex border my-5 flex-wrap w-[1120px] ${
      reverse ? "hidden-left" : "hidden-right"
    }`}
  >
    {!reverse && <img className="w-[315px] h-auto rounded-lg" src={imageSrc} alt={imageAlt} />}
    <div className="w-[800px] px-[18px] pb-5">
      <h1 className="text-3xl">{title}</h1>
      <p>{description}</p>
    </div>
    {reverse && <img className="w-[315px] h-auto rounded-lg" src={imageSrc} alt={imageAlt} />}
  </div>
);

const Footer = () => (
  <div className="footer">
    <div className="footer-content">
      <p>© 2024 Schedlr. All rights reserved.</p>
      <SocialIcons />
    </div>
  </div>
);

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

export default Home;
