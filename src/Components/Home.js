import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Entrystyle.css";

const Home = () => {
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
      <div className="mx-5 flex flex-col">
        {/* Jumbotron Section */}
        <div className="flex justify-center my-2">
          <h4>AI Powered Social Media Scheduler</h4>
        </div>

        {/* Sections */}
        <Section
          title="Centralized Platform"
          description="A social media collaboration tool designed to streamline team efforts in content creation, scheduling, and performance analytics across multiple platforms. It offers AI-powered content generation, a built-in marketplace for post exchanges, and seamless integration with Facebook, LinkedIn, Instagram, and Twitter."
          imageSrc="Allinone.jpg"
          imageAlt="All in one"
          reverse={false}
        />

        <Section
          title="Collaboration in Marketplace"
          description="Streamline team efforts with a built-in marketplace for post exchanges and real-time collaboration, enabling teams to optimize their social media strategy and engagement efficiently."
          imageSrc="Marketplace.jpg"
          imageAlt="Marketplace"
          reverse={true}
        />

        <Section
          title="Insights"
          description="Detailed analytics and performance insights across multiple platforms to improve your social media strategy and engagement effectively."
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
  <div className="w-full max-w-[1440px] gap-8 pt-[60px] pb-10 sm:pt-16 sm:pb-8 px-5 sm:px-20">
    <div className="flex flex-col lg:flex-row justify-between items-center gap-[60px] text-center sm:text-left text-[18px] leading-[23.4px]">
      {/* Footer Content */}
      <div className="flex flex-col items-center justify-center lg:items-start space-y-3 min-w-[320px]">
        <p>Social Media Scheduling Tool</p>
        <SocialIcons />
      </div>
      {/* Footer Links */}
      <FooterLinks />
    </div>
    <div className="w-full min-h-[1px] my-10 sm:my-8 bg-white bg-opacity-10"></div>
  </div>
);

const SocialIcons = () => (
  <ul className="flex justify-center gap-[10px]">
    {["GitHub", "Instagram", "LinkedIn", "Twitter", "Facebook"].map((platform) => (
      <li key={platform}>
        <button
          className="w-11 h-11 flex justify-center items-center rounded-full bg-[#3e3e3e] hover:bg-pink transition-all"
          aria-label={platform}
        >
          {/* Dynamically load the icon based on the platform */}
          <img
            src={`/icons/${platform.toLowerCase()}.png`}
            alt={`${platform} icon`}
            className="w-6 h-6"
          />
        </button>
      </li>
    ))}
  </ul>
);


const FooterLinks = () => (
  <div className="flex flex-col sm:flex-row justify-between gap-[60px] max-w-[600px] w-full">
    {[
      { title: "Free Tools", links: ["Free Marketing Tools", "List your agency"] },
      { title: "Resources", links: ["Blog", "Docs", "Channels", "Roadmap", "Discord"] },
      { title: "Company", links: ["Pricing", "Terms of Service", "Privacy Policy"] },
    ].map(({ title, links }) => (
      <div key={title} className="space-y-3 sm:space-y-5">
        <p className="font-[700]">{title}</p>
        <ul className="space-y-2 sm:space-y-3">
          {links.map((link) => (
            <li key={link} className="hover:text-pink transition-all">
              <a href={`/${link.toLowerCase().replace(/\s/g, "-")}`}>{link}</a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default Home;
