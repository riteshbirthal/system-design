import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const learningTracks = [
    {
      id: 1,
      icon: '🏗️',
      title: 'High-Level Design (HLD)',
      description: 'Learn to design scalable system architectures. Covers fundamentals, databases, caching, load balancing, distributed systems, and microservices.',
      link: '/hld',
      color: '#4361ee',
      weeks: '9 Weeks',
      order: 'Start Here',
      topics: ['Scalability', 'Databases', 'Caching', 'Load Balancing', 'Distributed Systems', 'Microservices']
    },
    {
      id: 2,
      icon: '⚙️',
      title: 'Low-Level Design (LLD)',
      description: 'Master object-oriented design, SOLID principles, design patterns, and UML diagrams for building maintainable code.',
      link: '/lld',
      color: '#7209b7',
      weeks: '2 Weeks',
      order: 'After HLD',
      topics: ['OOP', 'SOLID Principles', 'Design Patterns', 'UML Diagrams', 'Clean Code']
    },
    {
      id: 3,
      icon: '📝',
      title: 'HLD Practice Tests',
      description: 'Practice real-world system design problems. Design Twitter, YouTube, Uber, and more with detailed solutions.',
      link: '/hld-practice',
      color: '#f72585',
      weeks: '50+ Problems',
      order: 'After HLD Course',
      topics: ['Twitter', 'YouTube', 'Uber', 'WhatsApp', 'Netflix', 'Instagram']
    },
    {
      id: 4,
      icon: '🧪',
      title: 'LLD Practice Tests',
      description: 'Solve low-level design problems like Parking Lot, Elevator System, Chess, and more with code implementations.',
      link: '/lld-practice',
      color: '#4cc9f0',
      weeks: '30+ Problems',
      order: 'After LLD Course',
      topics: ['Parking Lot', 'Elevator', 'Chess', 'BookMyShow', 'Splitwise', 'Snake Game']
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1>Master System Design</h1>
        <p>A structured learning path to ace system design interviews</p>
        <div className="learning-path-hint">
          <span>Recommended Order:</span>
          <div className="path-flow">
            <span className="path-step">1. HLD</span>
            <span className="path-arrow">&gt;&gt;</span>
            <span className="path-step">2. LLD</span>
            <span className="path-arrow">&gt;&gt;</span>
            <span className="path-step">3. HLD Practice</span>
            <span className="path-arrow">&gt;&gt;</span>
            <span className="path-step">4. LLD Practice</span>
          </div>
        </div>
      </section>

      <section className="tracks">
        <h2>Learning Tracks</h2>
        <div className="tracks-grid">
          {learningTracks.map((track) => (
            <Link to={track.link} key={track.id} className="track-card">
              <div className="track-header" style={{ background: track.color }}>
                <span className="track-icon">{track.icon}</span>
                <span className="track-order">{track.order}</span>
              </div>
              <div className="track-body">
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <div className="track-meta">
                  <span className="track-weeks">{track.weeks}</span>
                </div>
                <div className="track-topics">
                  {track.topics.slice(0, 4).map((topic, idx) => (
                    <span key={idx} className="topic-chip">{topic}</span>
                  ))}
                  {track.topics.length > 4 && (
                    <span className="topic-chip more">+{track.topics.length - 4} more</span>
                  )}
                </div>
              </div>
              <div className="track-footer" style={{ borderTopColor: track.color }}>
                <span>Start Learning</span>
                <span className="arrow">&gt;&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
