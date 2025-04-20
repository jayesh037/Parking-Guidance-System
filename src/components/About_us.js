import React, { useEffect } from 'react';

export default function AboutUs() {
  useEffect(() => {
    const elements = document.querySelectorAll('.about-text');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.2 } // Triggers when 20% of the element is visible
    );

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div id='about-us' className="about-us-container">
      <section className="hero-section">
        <div className="content">
          <h1>About Us</h1>
          <p>Revolutionizing Smart Parking with Innovation and Efficiency</p>
        </div>
      </section>
      
      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            At Parking Solutions, we specialize in providing state-of-the-art
            parking guidance systems designed to streamline urban mobility. Our
            mission is to enhance parking efficiency through cutting-edge
            technology, real-time data insights, and seamless user experiences.
          </p>
        </div>

        <div className="about-text">
          <h2>Our Vision</h2>
          <p>
            We envision a future where parking is effortless, congestion is
            reduced, and every driver finds a spot with ease. Through
            AI-powered solutions and intelligent automation, we are committed
            to transforming parking into a hassle-free experience.
          </p>
        </div>

        <div className="about-text">
          <h2>Why Choose Us?</h2>
          <ul>
            <li><strong>Real-Time Monitoring:</strong> Get live updates on parking availability.</li>
            <li><strong>Smart Navigation:</strong> Find the nearest available spot instantly.</li>
            <li><strong>Data-Driven Efficiency:</strong> Optimize space utilization for maximum convenience.</li>
            <li><strong>Seamless Integration:</strong> Compatible with mobile apps and smart city solutions.</li>
          </ul>
        </div>

        <div className="about-text">
          <h2>Our Technology</h2>
          <p>
            Our Parking Guidance System leverages advanced AI, IoT sensors, and cloud-based analytics to revolutionize urban parking. By integrating smart algorithms, we offer real-time occupancy tracking, predictive availability forecasts, and automated reservations, ensuring a seamless parking experience.
          </p>
        </div>
      </section>
    </div>
  );
}
