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
    <div className="con">
      <div className="mx-5">
        <div className="my-5">
          {/* Jumbotron Section */}
          <div
            className="bg-cover bg-center h-[200px] md:h-[300px] flex items-center justify-center" // Smaller height on mobile
            style={{
              backgroundImage:
                "url('')",
            }}
          >
            <div className="bg-black bg-opacity-50 text-white text-center p-5 rounded-lg">
              <h4 className="text-lg">Welcome to</h4>
              <h1 className="text-4xl font-bold">SCHEDLR!</h1>
            </div>
          </div>

          {/* Second section */}
          <div className="flex border p-5 my-2 hidden-right flex-wrap">
            <div className="mx-5">
              <img
                className="w-full max-w-[270px] h-auto rounded-lg"
                src="Allinone.jpg"
                alt="All in one"
              />
            </div>
            <div className="w-full max-w-[700px] my-5">
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
          <div className="flex border p-5 my-2 hidden-left flex-wrap">
            <div className="w-full max-w-[700px]">
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
            <div className="mx-5">
              <img
                className="w-full max-w-[270px] h-auto rounded-lg"
                src="Marketplace.jpg"
                alt="Marketplace"
              />
            </div>
          </div>

          {/* Fourth section */}
          <div className="flex border p-5 my-2 hidden-right flex-wrap">
            <div className="mx-5">
              <img
                className="w-full max-w-[270px] h-auto rounded-lg"
                src="Analysis.jpg"
                alt="Analysis"
              />
            </div>
            <div className="w-full max-w-[700px] my-5">
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
          <div className="flex border p-5 my-2 hidden-left flex-wrap">
            <div className="w-full max-w-[700px]">
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
            <div className="mx-5">
              <img
                className="w-full max-w-[270px] h-auto rounded-lg"
                src="ai.jpg"
                alt="AI"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
