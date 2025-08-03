import React, { useEffect } from 'react';
import './Presentation.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaRocket, FaChartLine, FaUserFriends, FaShieldAlt } from 'react-icons/fa';

const Presentation = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="presentation_container">
      <h1 className="presentation_title" data-aos="fade-down">
        🎉 Welcome to Our Event Platform
      </h1>
      <p className="presentation_subtext" data-aos="fade-up">
        Discover the features that make managing events simple, interactive, and successful.
      </p>

      <div className="features_grid">
        <div className="feature_card" data-aos="fade-right">
          <FaRocket className="feature_icon" />
          <h3>Easy Launch</h3>
          <p>Create and publish your events with just a few clicks.</p>
        </div>

        <div className="feature_card" data-aos="fade-up">
          <FaChartLine className="feature_icon" />
          <h3>Real-Time Insights</h3>
          <p>Track performance and audience engagement instantly.</p>
        </div>

        <div className="feature_card" data-aos="fade-left">
          <FaUserFriends className="feature_icon" />
          <h3>Interactive Experience</h3>
          <p>Boost attendance with seamless user interaction.</p>
        </div>

        <div className="feature_card" data-aos="fade-up">
          <FaShieldAlt className="feature_icon" />
          <h3>Secure & Reliable</h3>
          <p>Data is encrypted, private, and safe — always.</p>
        </div>
      </div>
    </div>
  );
};

export default Presentation;