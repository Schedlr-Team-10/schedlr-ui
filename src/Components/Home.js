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

    return () => observer.disconnect(); 
  }, []);

  return (
    <div className="">
      <div className="mx-5 flex flex-end">
        <div className="my-2">
          {/* Jumbotron Section */}
          <div className="flex justify-center">
            <img className="w-[500px] h-[300px]" src="https://whatdreammeans.com/wp-content/uploads/2021/08/social-networks.jpg"/>
            <div>
              <h4>AI Powered Social Media Scheduler</h4>
            </div>
          </div>

          {/* Second section */}
          <div className="flex border my-1 hidden-right flex-wrap w-[1120px]">
            <img className="w-[315px] h-auto rounded-lg" src="Allinone.jpg" alt="All in one"/>
            <div className="w-[800px] px-[18px] pb-5 my-0">
              <h1 className="text-3xl">Centralized platform</h1>
              <p>
                A social media collaboration tool designed to streamline team
                efforts in content creation, scheduling, and performance
                analytics across multiple platforms. It offers AI-powered
                content generation, a built-in marketplace for post exchanges,
                and seamless integration with Facebook, LinkedIn, Instagram, and
                Twitter. The tool enhances productivity through post scheduling,
                real-time collaboration, and detailed analytics, allowing teams
                to optimize their social media strategy and engagement
                efficiently.
              </p>
            </div>
          </div>

          {/* Third section */}
          <div className="flex border hidden-left flex-wrap w-[1120px] my-5">
          <div className="w-[800px] px-[18px] pb-5 my-0">
            <h1 className="text-3xl">Colloboration in Marketplace</h1>
              <p>
                A social media collaboration tool designed to streamline team
                efforts in content creation, scheduling, and performance
                analytics across multiple platforms. It offers AI-powered
                content generation, a built-in marketplace for post exchanges,
                and seamless integration with Facebook, LinkedIn, Instagram, and
                Twitter. The tool enhances productivity through post scheduling,
                real-time collaboration, and detailed analytics, allowing teams
                to optimize their social media strategy and engagement
                efficiently.
              </p>
            </div>
            <img className="w-[315px] h-auto rounded-lg" src="Marketplace.jpg" alt="Marketplace" />
          </div>

          {/* Fourth section */}
          <div className="flex border my-5 hidden-right flex-wrap w-[1120px]">
            <img className="w-[315px] h-auto rounded-lg" src="Analysis.jpg" alt="Analysis"/>
            <div className="w-[800px] px-[18px] pb-5 my-0">
            <h1 className="text-3xl">Insights</h1>
              <p>
                A social media collaboration tool designed to streamline team
                efforts in content creation, scheduling, and performance
                analytics across multiple platforms. It offers AI-powered
                content generation, a built-in marketplace for post exchanges,
                and seamless integration with Facebook, LinkedIn, Instagram, and
                Twitter. The tool enhances productivity through post scheduling,
                real-time collaboration, and detailed analytics, allowing teams
                to optimize their social media strategy and engagement
                efficiently.
              </p>
            </div>
          </div>

          {/* Fifth section */}
          <div className="flex border my-5 hidden-left flex-wrap w-[1120px]">
          <div className="w-[800px] px-[18px] pb-5 my-0">
            <h1 className="text-3xl">AI Assitant for Post Descriptions</h1>
              <p>
                A social media collaboration tool designed to streamline team
                efforts in content creation, scheduling, and performance
                analytics across multiple platforms. It offers AI-powered
                content generation, a built-in marketplace for post exchanges,
                and seamless integration with Facebook, LinkedIn, Instagram, and
                Twitter. The tool enhances productivity through post scheduling,
                real-time collaboration, and detailed analytics, allowing teams
                to optimize their social media strategy and engagement
                efficiently.
              </p>
            </div>
            <img className="w-[315px] h-auto rounded-lg"  src="ai.jpg" alt="AI" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
