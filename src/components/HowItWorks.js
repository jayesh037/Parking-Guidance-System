import React, { useEffect } from "react";

import { FaSearchLocation, FaCar, FaCreditCard, FaParking } from "react-icons/fa";
import { MdOutlineAppShortcut } from "react-icons/md";

const HowItWorks = () => {
  useEffect(() => {
    const steps = document.querySelectorAll(".step");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
        }
      });
    }, { threshold: 0.5 });

    steps.forEach((step) => observer.observe(step));
    return () => steps.forEach((step) => observer.unobserve(step));
  }, []);

  return (
    <div id='howItWorks' className="how-it-works-container">
        <div className="how-it-works">
        
            <h2 className="section-title">How It Works</h2>
        </div>
      
      <div className="steps-container">
        <div className="step"><div className="step-icon"><FaParking /></div><h3>1. Detect Available Parking</h3></div>
        <div className="step"><div className="step-icon"><FaSearchLocation /></div><h3>2. Search for a Spot</h3></div>
        <div className="step"><div className="step-icon"><MdOutlineAppShortcut /></div><h3>3. Smart Reservation</h3></div>
        <div className="step"><div className="step-icon"><FaCar /></div><h3>4. Navigate & Park</h3></div>
        <div className="step"><div className="step-icon"><FaCreditCard /></div><h3>5. Contactless Payment & Exit</h3></div>
      </div>
    </div>
  );
};

export default HowItWorks;
