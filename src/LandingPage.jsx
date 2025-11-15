// src/LandingPage.jsx
import React from "react";
import "./LandingPage.css";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-container">
      <div className="overlay">
        <h1 className="landing-title">Paradise Nursery</h1>
        <p className="landing-description">
          Welcome to Paradise Nursery — your sanctuary for lush, vibrant, and
          air-purifying houseplants. Explore our carefully chosen collection to
          bring nature into your home.
        </p>
        <button className="get-started-button" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
