import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SystemDesignCourse.css';

const topicsData = [
  { id: '01', name: 'Introduction to System Design', folder: '01_introduction', icon: '🎯', color: '#4F46E5' },
  { id: '02', name: 'HLD vs LLD', folder: '02_hld_lld', icon: '📐', color: '#7C3AED' },
  { id: '03', name: 'Scalability & Performance', folder: '03_scalability', icon: '📈', color: '#2563EB' },
  { id: '04', name: 'Availability & Fault Tolerance', folder: '04_availability', icon: '🛡️', color: '#059669' },
  { id: '05', name: 'Data Storage (SQL vs NoSQL)', folder: '05_data_storage', icon: '🗄️', color: '#DC2626' },
  { id: '06', name: 'Caching Strategies', folder: '06_caching', icon: '⚡', color: '#D97706' },
  { id: '07', name: 'Load Balancing', folder: '07_load_balancing', icon: '⚖️', color: '#0891B2' },
  { id: '08', name: 'CAP Theorem & Consistency', folder: '08_cap_theorem', icon: '🔺', color: '#BE185D' },
  { id: '09', name: 'Message Queues & Events', folder: '09_message_queues', icon: '📬', color: '#7C2D12' },
  { id: '10', name: 'API Gateways & Proxies', folder: '10_api_gateways', icon: '🚪', color: '#1D4ED8' },
  { id: '11', name: 'CDNs & Distributed Caches', folder: '11_cdns', icon: '🌐', color: '#15803D' },
  { id: '12', name: 'Partitioning & Sharding', folder: '12_partitioning_sharding', icon: '🧩', color: '#9333EA' },
  { id: '13', name: 'Microservices vs Monoliths', folder: '13_microservices_monoliths', icon: '🏗️', color: '#EA580C' },
  { id: '14', name: 'Security & Authentication', folder: '14_security', icon: '🔐', color: '#B91C1C' },
  { id: '15', name: 'Monitoring & Observability', folder: '15_monitoring_observability', icon: '📊', color: '#0D9488' },
  { id: '16', name: 'Case Studies', folder: '16_case_studies', icon: '📚', color: '#6366F1' },
  { id: '17', name: 'Architecture Patterns', folder: '17_architecture_patterns', icon: '🏛️', color: '#8B5CF6' }
];

function SystemDesignCourse() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = topicsData.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sd-course-container">
      <header className="sd-course-header">
        <div className="sd-header-content">
          <Link to="/" className="sd-back-link">&lt;&lt; Back to Home</Link>
          <h1>System Design Fundamentals</h1>
          <p className="sd-subtitle">Master the art of designing scalable, reliable, and efficient systems</p>
          <div className="sd-stats">
            <div className="sd-stat">
              <span className="sd-stat-value">17</span>
              <span className="sd-stat-label">Topics</span>
            </div>
            <div className="sd-stat">
              <span className="sd-stat-value">1700+</span>
              <span className="sd-stat-label">Questions</span>
            </div>
            <div className="sd-stat">
              <span className="sd-stat-value">100+</span>
              <span className="sd-stat-label">Hours</span>
            </div>
          </div>
        </div>
      </header>

      <div className="sd-course-content">
        <div className="sd-search-bar">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sd-search-input"
          />
        </div>

        <div className="sd-topics-grid">
          {filteredTopics.map((topic, index) => (
            <Link 
              to={`/systemdesign/topic/${topic.id}`} 
              key={topic.id}
              className="sd-topic-card"
              style={{ '--topic-color': topic.color }}
            >
              <div className="sd-topic-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="sd-topic-icon">{topic.icon}</div>
              <h3 className="sd-topic-name">{topic.name}</h3>
              <div className="sd-topic-meta">
                <span className="sd-topic-badge">100+ Questions</span>
              </div>
              <div className="sd-topic-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SystemDesignCourse;
