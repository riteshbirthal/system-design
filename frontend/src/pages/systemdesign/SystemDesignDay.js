import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SystemDesignDay.css';

const TAB_STORAGE_PREFIX = 'sd_active_tab_';

const topicsMetadata = {
  '01': { name: 'Introduction to System Design', icon: '🎯', color: '#4F46E5', folder: '01_introduction' },
  '02': { name: 'HLD vs LLD', icon: '📐', color: '#7C3AED', folder: '02_hld_lld' },
  '03': { name: 'Scalability & Performance', icon: '📈', color: '#2563EB', folder: '03_scalability' },
  '04': { name: 'Availability & Fault Tolerance', icon: '🛡️', color: '#059669', folder: '04_availability' },
  '05': { name: 'Data Storage (SQL vs NoSQL)', icon: '🗄️', color: '#DC2626', folder: '05_data_storage' },
  '06': { name: 'Caching Strategies', icon: '⚡', color: '#D97706', folder: '06_caching' },
  '07': { name: 'Load Balancing', icon: '⚖️', color: '#0891B2', folder: '07_load_balancing' },
  '08': { name: 'CAP Theorem & Consistency', icon: '🔺', color: '#BE185D', folder: '08_cap_theorem' },
  '09': { name: 'Message Queues & Events', icon: '📬', color: '#7C2D12', folder: '09_message_queues' },
  '10': { name: 'API Gateways & Proxies', icon: '🚪', color: '#1D4ED8', folder: '10_api_gateways' },
  '11': { name: 'CDNs & Distributed Caches', icon: '🌐', color: '#15803D', folder: '11_cdns' },
  '12': { name: 'Partitioning & Sharding', icon: '🧩', color: '#9333EA', folder: '12_partitioning_sharding' },
  '13': { name: 'Microservices vs Monoliths', icon: '🏗️', color: '#EA580C', folder: '13_microservices_monoliths' },
  '14': { name: 'Security & Authentication', icon: '🔐', color: '#B91C1C', folder: '14_security' },
  '15': { name: 'Monitoring & Observability', icon: '📊', color: '#0D9488', folder: '15_monitoring_observability' },
  '16': { name: 'Case Studies', icon: '📚', color: '#6366F1', folder: '16_case_studies' },
  '17': { name: 'Architecture Patterns', icon: '🏛️', color: '#8B5CF6', folder: '17_architecture_patterns' }
};

function SystemDesignDay() {
  const { topicId } = useParams();
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem(`${TAB_STORAGE_PREFIX}${topicId}`);
    return saved || 'notes';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [content, setContent] = useState({ notes: '', questions: [] });
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const topic = topicsMetadata[topicId] || { name: 'Unknown Topic', icon: '📖', color: '#6366F1' };
  const topicNum = parseInt(topicId);

  useEffect(() => {
    localStorage.setItem(`${TAB_STORAGE_PREFIX}${topicId}`, activeTab);
  }, [activeTab, topicId]);

  useEffect(() => {
    loadContent();
  }, [topicId]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const notesModule = await import(`./content/topic_${topicId}/notes.js`);
      const questionsModule = await import(`./content/topic_${topicId}/questions.js`);
      setContent({
        notes: notesModule.default || notesModule.notes || '',
        questions: questionsModule.default || questionsModule.questions || []
      });
    } catch (error) {
      console.error('Error loading content:', error);
      setContent({ notes: 'Content coming soon...', questions: [] });
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredQuestions = content.questions.filter(q => 
    filterDifficulty === 'all' || q.difficulty?.toLowerCase() === filterDifficulty
  );

  const tabs = [
    { id: 'notes', label: 'Study Notes', icon: '📖' },
    { id: 'questions', label: 'Practice Questions', icon: '❓' }
  ];

  const renderNotes = () => {
    if (!content.notes) {
      return (
        <div className="sd-empty-state">
          <div className="sd-empty-icon">📖</div>
          <h3>Notes Coming Soon</h3>
          <p>Study material for this topic is being prepared.</p>
        </div>
      );
    }

    return (
      <div className="sd-notes-container">
        <div className="sd-notes-content" dangerouslySetInnerHTML={{ __html: formatNotes(content.notes) }} />
      </div>
    );
  };

  const formatNotes = (text) => {
    if (!text) return '';
    
    let html = text
      .replace(/^#{4}\s+(.+)$/gm, '<h4 class="sd-h4">$1</h4>')
      .replace(/^#{3}\s+(.+)$/gm, '<h3 class="sd-h3">$1</h3>')
      .replace(/^#{2}\s+(.+)$/gm, '<h2 class="sd-h2">$1</h2>')
      .replace(/^#{1}\s+(.+)$/gm, '<h1 class="sd-h1">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="sd-inline-code">$1</code>')
      .replace(/^[-•]\s+(.+)$/gm, '<li class="sd-list-item">$1</li>')
      .replace(/^\d+\.\s+(.+)$/gm, '<li class="sd-numbered-item">$1</li>')
      .replace(/\n\n/g, '</p><p class="sd-paragraph">')
      .replace(/\n/g, '<br/>');
    
    return `<p class="sd-paragraph">${html}</p>`;
  };

  const renderQuestions = () => {
    if (content.questions.length === 0) {
      return (
        <div className="sd-empty-state">
          <div className="sd-empty-icon">❓</div>
          <h3>Questions Coming Soon</h3>
          <p>Practice questions for this topic are being prepared.</p>
        </div>
      );
    }

    return (
      <div className="sd-questions-container">
        <div className="sd-questions-header">
          <div className="sd-questions-count">
            {filteredQuestions.length} Questions
          </div>
          <div className="sd-filter-buttons">
            {['all', 'easy', 'medium', 'hard'].map(diff => (
              <button
                key={diff}
                className={`sd-filter-btn ${filterDifficulty === diff ? 'active' : ''} ${diff}`}
                onClick={() => setFilterDifficulty(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="sd-questions-list">
          {filteredQuestions.map((q, idx) => (
            <div 
              key={idx} 
              className={`sd-question-card ${expandedQuestions[idx] ? 'expanded' : ''}`}
            >
              <div 
                className="sd-question-header"
                onClick={() => toggleQuestion(idx)}
              >
                <div className="sd-question-left">
                  <span className="sd-question-num">Q{idx + 1}</span>
                  <span className={`sd-difficulty-badge ${q.difficulty?.toLowerCase() || 'medium'}`}>
                    {q.difficulty || 'Medium'}
                  </span>
                </div>
                <h4 className="sd-question-text">{q.question}</h4>
                <span className="sd-expand-icon">{expandedQuestions[idx] ? '−' : '+'}</span>
              </div>
              {expandedQuestions[idx] && (
                <div className="sd-answer-section">
                  <div className="sd-answer-label">Answer</div>
                  <div className="sd-answer-text">{q.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="sd-day-layout sd-loading">
        <div className="sd-loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="sd-day-layout">
      {/* Mobile Header */}
      <div className="sd-mobile-header">
        <Link to="/systemdesign" className="sd-mobile-back">&lt;&lt;</Link>
        <div className="sd-mobile-title">
          <span className="sd-mobile-badge" style={{ background: topic.color }}>
            {topic.icon} {topicId}
          </span>
        </div>
        <button className="sd-mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`sd-hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`sd-mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div className={`sd-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sd-mobile-menu-header" style={{ background: topic.color }}>
          <span className="sd-menu-icon">{topic.icon}</span>
          <h3>{topic.name}</h3>
        </div>
        <nav className="sd-mobile-menu-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sd-mobile-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              }}
            >
              <span className="sd-nav-icon">{tab.icon}</span>
              <span className="sd-nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="sd-mobile-menu-footer">
          <div className="sd-topic-nav">
            {topicNum > 1 && (
              <Link 
                to={`/systemdesign/topic/${String(topicNum - 1).padStart(2, '0')}`} 
                className="sd-nav-link prev"
                onClick={() => setMobileMenuOpen(false)}
              >
                &lt;&lt; Topic {topicNum - 1}
              </Link>
            )}
            {topicNum < 17 && (
              <Link 
                to={`/systemdesign/topic/${String(topicNum + 1).padStart(2, '0')}`} 
                className="sd-nav-link next"
                onClick={() => setMobileMenuOpen(false)}
              >
                Topic {topicNum + 1} &gt;&gt;
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="sd-sidebar">
        <div className="sd-sidebar-header">
          <Link to="/systemdesign" className="sd-back-link">
            <span>&lt;&lt;</span> Back to Course
          </Link>
        </div>

        <div className="sd-sidebar-info" style={{ borderLeftColor: topic.color }}>
          <div className="sd-topic-badge" style={{ background: topic.color }}>
            Topic {topicId}
          </div>
          <div className="sd-topic-icon">{topic.icon}</div>
          <h2 className="sd-topic-title">{topic.name}</h2>
        </div>

        <nav className="sd-sidebar-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sd-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ '--tab-color': topic.color }}
            >
              <span className="sd-nav-icon">{tab.icon}</span>
              <span className="sd-nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sd-sidebar-footer">
          <div className="sd-topic-nav">
            {topicNum > 1 && (
              <Link 
                to={`/systemdesign/topic/${String(topicNum - 1).padStart(2, '0')}`} 
                className="sd-nav-link prev"
              >
                &lt;&lt; Prev
              </Link>
            )}
            {topicNum < 17 && (
              <Link 
                to={`/systemdesign/topic/${String(topicNum + 1).padStart(2, '0')}`} 
                className="sd-nav-link next"
              >
                Next &gt;&gt;
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="sd-main-content">
        <header className="sd-content-header" style={{ '--header-color': topic.color }}>
          <div className="sd-header-left">
            <span className="sd-content-type">
              {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
            </span>
          </div>
          <div className="sd-header-right">
            <span className="sd-progress-badge">Topic {topicId} of 17</span>
          </div>
        </header>

        <div className="sd-content-body">
          {activeTab === 'notes' && renderNotes()}
          {activeTab === 'questions' && renderQuestions()}
        </div>
      </main>
    </div>
  );
}

export default SystemDesignDay;
