import React from 'react';
import './TrackPage.css';

function LLDPractice() {
  const problems = [
    { category: 'Classic Problems', items: ['Parking Lot System', 'Elevator System', 'Vending Machine', 'ATM Machine'] },
    { category: 'Gaming', items: ['Chess Game', 'Snake & Ladder', 'Tic Tac Toe', 'Card Game'] },
    { category: 'Booking Systems', items: ['BookMyShow', 'Hotel Booking', 'Flight Booking', 'Restaurant Reservation'] },
    { category: 'Social & Finance', items: ['Splitwise', 'Stock Exchange', 'Wallet System', 'Notification Service'] },
    { category: 'File & Storage', items: ['File System', 'Cache System', 'Logger System', 'Rate Limiter'] },
    { category: 'E-Commerce', items: ['Shopping Cart', 'Inventory Management', 'Order Management', 'Payment Gateway'] },
  ];

  return (
    <div className="track-page">
      <div className="track-page-header lld-practice">
        <span className="track-page-icon">🧪</span>
        <h1>LLD Practice Tests</h1>
        <p>Solve low-level design problems with object-oriented approach and code implementations</p>
        <div className="track-page-stats">
          <span>30+ Problems</span>
          <span>6 Categories</span>
          <span>Code Solutions</span>
        </div>
      </div>

      <div className="track-page-content">
        <div className="coming-soon-banner">
          <span className="coming-soon-icon">🚧</span>
          <h2>Data will be coming soon...</h2>
          <p>We are preparing problem statements, class diagrams, and code implementations for each problem.</p>
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

export default LLDPractice;
