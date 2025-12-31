import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <h3 className="footer-logo">System Design Mastery</h3>
          <p className="footer-tagline">Master the art of designing scalable, reliable, and efficient systems.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hld">HLD Course</Link></li>
            <li><Link to="/lld">LLD Course</Link></li>
            <li><Link to="/quizzes">Quizzes</Link></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/tutorials">Tutorials</Link></li>
            <li><Link to="/content">Articles</Link></li>
            <li><Link to="/assignments">Assignments</Link></li>
            <li><Link to="/hld-practice">Practice</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <span className="social-icon">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <span className="social-icon">LinkedIn</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <span className="social-icon">Twitter</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} BitByBitGo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
