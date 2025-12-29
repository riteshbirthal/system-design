import React from 'react';
import './TrackPage.css';

function HLDPractice() {
  const problems = [
    { category: 'Social Media', items: ['Design Twitter/X', 'Design Facebook', 'Design Instagram', 'Design LinkedIn'] },
    { category: 'Video Streaming', items: ['Design YouTube', 'Design Netflix', 'Design Twitch', 'Design TikTok'] },
    { category: 'Messaging', items: ['Design WhatsApp', 'Design Slack', 'Design Discord', 'Design Telegram'] },
    { category: 'E-Commerce', items: ['Design Amazon', 'Design Flipkart', 'Design eBay', 'Design Shopify'] },
    { category: 'Transportation', items: ['Design Uber', 'Design Lyft', 'Design Ola', 'Design Google Maps'] },
    { category: 'Search & Storage', items: ['Design Google Search', 'Design Dropbox', 'Design Google Drive', 'Design Typeahead'] },
  ];

  return (
    <div className="track-page">
      <div className="track-page-header hld-practice">
        <span className="track-page-icon">📝</span>
        <h1>HLD Practice Tests</h1>
        <p>Practice real-world system design interview problems with detailed solutions</p>
        <div className="track-page-stats">
          <span>50+ Problems</span>
          <span>6 Categories</span>
          <span>Detailed Solutions</span>
        </div>
      </div>

      <div className="track-page-content">
        <div className="coming-soon-banner">
          <span className="coming-soon-icon">🚧</span>
          <h2>Data will be coming soon...</h2>
          <p>We are preparing detailed problem statements and solutions for each system design problem.</p>
        </div>

        <div className="problems-preview">
          <h3>Problem Categories</h3>
          <div className="problems-grid">
            {problems.map((category) => (
              <div key={category.category} className="problem-category-card">
                <h4>{category.category}</h4>
                <ul>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HLDPractice;
