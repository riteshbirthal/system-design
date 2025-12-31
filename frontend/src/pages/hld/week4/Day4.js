import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week4Day4() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 4, dayNum = 4;
  const topic = "Distributed Caching";
  const concepts = "Redis, Memcached, Consistent hashing";

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }
  ];

  const quizQuestions = [
    { id: 1, question: "What is the main advantage of distributed caching over single-server caching?", options: ["Lower cost", "Simpler setup", "Horizontal scaling and high availability", "Faster single-key lookups"], correct: 2, explanation: "Distributed caching enables horizontal scaling, higher throughput, better availability, and more storage capacity." },
    { id: 2, question: "Which data structures does Redis support that Memcached doesn't?", options: ["Only strings", "Lists, Sets, Sorted Sets, Hashes", "Only key-value pairs", "Binary data"], correct: 1, explanation: "Redis supports rich data structures including Strings, Lists, Sets, Sorted Sets, Hashes, Streams, and more." },
    { id: 3, question: "What problem does consistent hashing solve?", options: ["Data encryption", "Minimizing key redistribution when nodes change", "Faster lookups", "Data compression"], correct: 1, explanation: "Consistent hashing ensures only K/N keys need remapping when nodes change, instead of most keys with modulo hashing." },
    { id: 4, question: "How many hash slots does Redis Cluster use?", options: ["1024", "4096", "16384", "65536"], correct: 2, explanation: "Redis Cluster uses 16384 hash slots distributed across master nodes." },
    { id: 5, question: "When should you choose Memcached over Redis?", options: ["Need persistence", "Need pub/sub", "Simple key-value with maximum throughput", "Need data structures"], correct: 2, explanation: "Memcached is better for simple key-value caching with multi-threaded performance and lower memory overhead." }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const renderVideoContent = () => (
    <div className="content-panel video-panel">
      <div className="video-container">
        <div className="video-player">
          <div className="video-placeholder">
            <div className="play-button"><span>▶</span></div>
            <p>Distributed Caching - Video Lesson</p>
          </div>
        </div>
        <div className="video-details">
          <h2>Distributed Caching with Redis & Memcached</h2>
          <p className="video-description">Learn how to scale caching across multiple servers using Redis clusters and Memcached. Understand consistent hashing and cache distribution strategies.</p>
          <div className="video-meta">
            <span className="meta-item"><span className="meta-icon">⏱️</span> 28 min</span>
            <span className="meta-item"><span className="meta-icon">📊</span> Advanced</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArticleContent = () => (
    <div className="content-panel article-panel">
      <article className="article-container">
        <header className="article-header">
          <h1>Distributed Caching</h1>
          <div className="article-meta">
            <span className="meta-item"><span className="meta-icon">📖</span> 18 min read</span>
            <span className="meta-item"><span className="meta-icon">📁</span> Caching</span>
          </div>
          <div className="article-tags">
            <span className="tag">Redis</span>
            <span className="tag">Memcached</span>
            <span className="tag">Consistent Hashing</span>
          </div>
        </header>
        <div className="article-content">
          <h2 className="md-h2">Why Distributed Caching?</h2>
          <p>As applications scale, a single cache server becomes a bottleneck. <strong>Distributed caching</strong> spreads data across multiple cache nodes, providing:</p>
          <ul>
            <li><strong>Horizontal Scaling:</strong> Add more nodes for capacity and throughput</li>
            <li><strong>High Availability:</strong> No single point of failure with replication</li>
            <li><strong>More Storage:</strong> Combined memory of all nodes</li>
            <li><strong>Better Performance:</strong> Load distributed across nodes</li>
          </ul>

          <h2 className="md-h2">Redis vs Memcached</h2>
          
          <h3 className="md-h3">Redis</h3>
          <p>In-memory data structure store used as cache, database, and message broker.</p>
          <ul>
            <li><strong>Data Structures:</strong> Strings, Lists, Sets, Hashes, Sorted Sets, Streams</li>
            <li><strong>Persistence:</strong> RDB snapshots and AOF logging</li>
            <li><strong>Replication:</strong> Master-replica support</li>
            <li><strong>Clustering:</strong> Native cluster mode with automatic sharding</li>
            <li><strong>Pub/Sub:</strong> Message broadcasting</li>
            <li><strong>Lua Scripting:</strong> Server-side scripting</li>
          </ul>

          <h3 className="md-h3">Memcached</h3>
          <p>Simple, high-performance distributed memory caching system.</p>
          <ul>
            <li><strong>Data Type:</strong> Key-value strings only</li>
            <li><strong>Multi-threaded:</strong> Better CPU utilization</li>
            <li><strong>No Persistence:</strong> Pure cache</li>
            <li><strong>Lower Memory Overhead:</strong> Simpler data model</li>
          </ul>

          <h3 className="md-h3">Redis vs Memcached Comparison</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Redis</th>
                <th>Memcached</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-name">Data Types</td>
                <td>Strings, Lists, Sets, Hashes, Sorted Sets, Streams</td>
                <td>Strings only</td>
              </tr>
              <tr>
                <td className="feature-name">Persistence</td>
                <td><span className="check">✓</span> RDB snapshots + AOF logging</td>
                <td><span className="cross">✗</span> No persistence</td>
              </tr>
              <tr>
                <td className="feature-name">Replication</td>
                <td><span className="check">✓</span> Built-in master-replica</td>
                <td><span className="cross">✗</span> Not built-in</td>
              </tr>
              <tr>
                <td className="feature-name">Clustering</td>
                <td><span className="check">✓</span> Native cluster mode</td>
                <td>Client-side sharding</td>
              </tr>
              <tr>
                <td className="feature-name">Threading Model</td>
                <td>Single-threaded (I/O threads in 6.0+)</td>
                <td><span className="check">✓</span> Multi-threaded</td>
              </tr>
              <tr>
                <td className="feature-name">Memory Efficiency</td>
                <td>Higher overhead (data structures)</td>
                <td><span className="check">✓</span> Lower overhead</td>
              </tr>
              <tr>
                <td className="feature-name">Pub/Sub</td>
                <td><span className="check">✓</span> Built-in</td>
                <td><span className="cross">✗</span> Not supported</td>
              </tr>
              <tr>
                <td className="feature-name">Lua Scripting</td>
                <td><span className="check">✓</span> Server-side scripts</td>
                <td><span className="cross">✗</span> Not supported</td>
              </tr>
              <tr>
                <td className="feature-name">Best Use Case</td>
                <td>Complex caching, sessions, leaderboards, queues</td>
                <td>Simple key-value with high throughput</td>
              </tr>
            </tbody>
          </table>

          <h2 className="md-h2">Consistent Hashing</h2>
          <p><strong>Problem with modulo hashing:</strong> With <code className="inline-code">hash(key) % N</code>, adding/removing a server causes most keys to be remapped.</p>
          
          <p><strong>Solution:</strong> Consistent hashing maps both keys and servers onto a virtual ring. Keys are stored on the first server encountered clockwise.</p>
          
          <p><strong>Benefit:</strong> When adding/removing a server, only <code className="inline-code">K/N</code> keys need remapping (K = total keys, N = servers).</p>

          <h3 className="md-h3">Virtual Nodes</h3>
          <p>Each physical server maps to multiple virtual nodes on the ring for better distribution.</p>

          <h2 className="md-h2">Redis Cluster Architecture</h2>
          <p>Redis Cluster uses <strong>16384 hash slots</strong> distributed across master nodes:</p>
          <ul>
            <li>Key "user:123" → CRC16("user:123") % 16384 = slot → Master node</li>
            <li>Each master has replica(s) for failover</li>
            <li>Minimum 6 nodes recommended (3 masters + 3 replicas)</li>
          </ul>

          <h2 className="md-h2">Key Takeaways</h2>
          <ul>
            <li>Distributed caching enables horizontal scaling and high availability</li>
            <li>Redis offers rich features; Memcached is simpler but efficient</li>
            <li>Consistent hashing minimizes key redistribution when nodes change</li>
            <li>Redis Cluster uses 16384 hash slots for automatic sharding</li>
          </ul>
        </div>
      </article>
    </div>
  );

  const renderQuizContent = () => {
    const totalQuestions = quizQuestions.length;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const answeredCount = Object.keys(selectedAnswers).length;

    if (showResults) {
      const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;
      return (
        <div className="content-panel quiz-panel">
          <div className="quiz-container">
            <div className="quiz-results">
              <div className="results-header">
                <h2>Quiz Complete!</h2>
                <div className="score-circle"><span className="score-value">{Math.round((score / totalQuestions) * 100)}%</span><span className="score-label">Score</span></div>
                <p className="score-detail">You got {score} out of {totalQuestions} correct</p>
              </div>
              <div className="results-review"><h3>Review Answers</h3>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className={`review-item ${selectedAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                    <div className="review-header"><span className="review-number">Q{idx + 1}</span><span className={`review-badge ${selectedAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>{selectedAnswers[q.id] === q.correct ? '✓ Correct' : '✗ Incorrect'}</span></div>
                    <p className="review-question">{q.question}</p>
                    <div className="review-answers"><p><strong>Your answer:</strong> {q.options[selectedAnswers[q.id]] || 'Not answered'}</p>{selectedAnswers[q.id] !== q.correct && <p><strong>Correct:</strong> {q.options[q.correct]}</p>}</div>
                    <div className="explanation">{q.explanation}</div>
                  </div>
                ))}
              </div>
              <div className="results-actions"><button className="retry-btn" onClick={() => { setSelectedAnswers({}); setShowResults(false); setCurrentQuestionIndex(0); }}>Retry Quiz</button></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="content-panel quiz-panel">
        <div className="quiz-container">
          <header className="quiz-header"><h1>Distributed Caching Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{totalQuestions}</span><span className="stat-label">Questions</span></div><div className="stat-card"><span className="stat-value">70%</span><span className="stat-label">To Pass</span></div></div></header>
          <div className="quiz-progress"><div className="progress-text">Question {currentQuestionIndex + 1} of {totalQuestions}</div><div className="progress-bar"><div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div></div><div className="answered-text">{answeredCount} of {totalQuestions} answered</div></div>
          <div className="quiz-question-single"><div className="question-card"><div className="question-header"><span className="question-number">Question {currentQuestionIndex + 1}</span></div><p className="question-text">{currentQuestion.question}</p><div className="options-list">{currentQuestion.options.map((option, optIdx) => (<label key={optIdx} className={`option-item ${selectedAnswers[currentQuestion.id] === optIdx ? 'selected' : ''}`}><input type="radio" name={`q-${currentQuestion.id}`} checked={selectedAnswers[currentQuestion.id] === optIdx} onChange={() => handleAnswerSelect(currentQuestion.id, optIdx)} /><span className="option-letter">{String.fromCharCode(65 + optIdx)}</span><span className="option-text">{option}</span></label>))}</div></div></div>
          <div className="quiz-navigation"><button className="nav-btn prev" onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0}>&lt;&lt; Previous</button><div className="question-dots">{quizQuestions.map((q, idx) => (<button key={idx} className={`dot ${idx === currentQuestionIndex ? 'active' : ''} ${selectedAnswers[q.id] !== undefined ? 'answered' : ''}`} onClick={() => setCurrentQuestionIndex(idx)}>{idx + 1}</button>))}</div>{currentQuestionIndex === totalQuestions - 1 ? (<button className="nav-btn submit" onClick={() => setShowResults(true)}>Submit Quiz</button>) : (<button className="nav-btn next" onClick={() => setCurrentQuestionIndex(i => i + 1)}>Next &gt;&gt;</button>)}</div>
        </div>
      </div>
    );
  };

  const renderAssignmentContent = () => (
    <div className="content-panel assignment-panel">
      <div className="assignment-container">
        <header className="assignment-header">
          <div className="assignment-title-row"><h1>Implement Consistent Hashing</h1><span className="difficulty-badge advanced">Advanced</span></div>
          <p className="assignment-description">Build a consistent hashing implementation with virtual nodes for distributed cache key distribution.</p>
          <div className="assignment-meta"><span className="meta-item"><span className="meta-icon">🏆</span> 150 points</span></div>
        </header>
        <div className="assignment-body">
          <h3>Requirements</h3>
          <ul className="requirements-list">
            <li><span className="req-number">1</span><span className="req-text">Implement ConsistentHash class with add_node, remove_node, get_node methods</span></li>
            <li><span className="req-number">2</span><span className="req-text">Support configurable number of virtual nodes per physical node</span></li>
            <li><span className="req-number">3</span><span className="req-text">Demonstrate minimal key redistribution when nodes change</span></li>
            <li><span className="req-number">4</span><span className="req-text">Compare distribution uniformity with different virtual node counts</span></li>
          </ul>
        </div>
        <div className="assignment-actions"><button className="start-btn">Start Assignment</button><button className="download-btn">Download Template</button></div>
      </div>
    </div>
  );

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span><span className="mobile-topic">{topic}</span></div><button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3><p>{concepts}</p></div></div><nav className="mobile-menu-nav">{tabs.map((tab) => (<button key={tab.id} className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }} style={{ '--tab-color': tab.color }}><span className="nav-icon">{tab.icon}</span><span className="nav-label">{tab.label}</span></button>))}</nav><div className="mobile-menu-footer"><div className="mobile-day-nav"><Link to="/hld/week/4/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/4/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div></div>
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed && <span>Back to Course</span>}</Link><button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed ? '>>' : '<<'}</button></div>{!sidebarCollapsed && (<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2><p className="day-concepts">{concepts}</p></div>)}<nav className="sidebar-nav">{tabs.map((tab) => (<button key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)} style={{ '--tab-color': tab.color }}><span className="nav-icon">{tab.icon}</span>{!sidebarCollapsed && <><span className="nav-label">{tab.label}</span><span className="nav-count">1</span></>}</button>))}</nav>{!sidebarCollapsed && (<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/4/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/4/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>)}</aside>
      <main className="main-content"><header className="content-header"><div className="header-left"><span className="content-type" style={{ '--type-color': tabs.find(t => t.id === activeTab)?.color }}>{tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}</span></div><div className="header-right"><span className="progress-indicator">Week {weekNum}, Day {dayNum}</span></div></header><div className="content-body">{activeTab === 'video' && renderVideoContent()}{activeTab === 'article' && renderArticleContent()}{activeTab === 'quiz' && renderQuizContent()}{activeTab === 'assignment' && renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week4Day4;
