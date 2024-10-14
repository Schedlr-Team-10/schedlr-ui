import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Entrystyle.css'; 

const Home = () => {
  useEffect(() => {
    const elementsLeft = document.querySelectorAll('.hidden-left');
    const elementsRight = document.querySelectorAll('.hidden-right');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // Stop observing once it's shown
        }
      });
    }, { threshold: 0.1 });

    elementsLeft.forEach(el => observer.observe(el));
    elementsRight.forEach(el => observer.observe(el));

    return () => observer.disconnect(); // Clean up observer on component unmount
  }, []);

  return (
    <div className="mx-5">
      <div className="my-5">
        <div className="">
          {/* First section */}
          <div className="flex justify-center items-center border border-black p-5 my-2 h-[300px] hidden-left">
            <div className="mx-5">
              <h1>AI Powered Social Media Scheduling App</h1>
            </div>
          </div>

          {/* Second section */}
          <div className="flex border border-black p-5 my-2 hidden-right flex-wrap">
            <div className="mx-5">
              <img className="w-full max-w-[270px] h-auto rounded-lg" src="Allinone.jpg" alt="All in one"/>
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
          <div className="flex border border-black p-5 my-2 hidden-left flex-wrap">
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
              <img className="w-full max-w-[270px] h-auto rounded-lg" src="Marketplace.jpg" alt="Marketplace"/>
            </div>
          </div>

          {/* Fourth section */}
          <div className="flex border border-black p-5 my-2 hidden-right flex-wrap">
            <div className="mx-5">
              <img className="w-full max-w-[270px] h-auto rounded-lg" src="Analysis.jpg" alt="Analysis"/>
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
          <div className="flex border border-black p-5 my-2 hidden-left flex-wrap">
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
              <img className="w-full max-w-[270px] h-auto rounded-lg" src="ai.jpg" alt="AI"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
