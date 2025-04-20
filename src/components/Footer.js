import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Parking Guidance System</h3>
          <p>Enhancing efficiency in parking facilities with advanced technology and real-time data management.</p>
        </div>

        <div className="footer-section">
          <h3>Key Features</h3>
          <ul>
            <li>Real-Time Monitoring</li>
            <li>User-Friendly Navigation</li>
            <li>Centralized Management</li>
            <li>Scalable Solutions</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: <a href="mailto:info@parkingsolutions.com">info@parkingsolutions.com</a></p>
          <p>Phone: +1 (800) 123-4567</p>
          <p>Website: <a href="http://www.parkingsolutions.com">www.parkingsolutions.com</a></p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Parking Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}