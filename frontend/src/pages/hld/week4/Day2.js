import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week4Day2() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 4;
  const dayNum = 2;
  const topic = "Cache Eviction Policies";
  const concepts = "LRU, LFU, FIFO, TTL strategies";

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Which eviction policy removes items that haven't been accessed for the longest time?",
      options: ["FIFO", "LFU", "LRU", "Random"],
      correct: 2,
      explanation: "LRU (Least Recently Used) evicts items based on when they were last accessed. Items not accessed recently are evicted first."
    },
    {
      id: 2,
      question: "What is the main disadvantage of LFU eviction policy?",
      options: [
        "High memory overhead",
        "New items may be evicted quickly before becoming 'frequent'",
        "Cannot be implemented efficiently",
        "Does not support TTL"
      ],
      correct: 1,
      explanation: "LFU tracks access frequency, so new items start with low counts and may be evicted before having a chance to become frequently used."
    },
    {
      id: 3,
      question: "What data structure combination provides O(1) operations for LRU cache?",
      options: [
        "Array + Binary Search Tree",
        "HashMap + Doubly Linked List",
        "Stack + Queue",
        "Heap + Array"
      ],
      correct: 1,
      explanation: "HashMap provides O(1) key lookup, while Doubly Linked List provides O(1) node removal and insertion for maintaining access order."
    },
    {
      id: 4,
      question: "Which Redis eviction policy only evicts keys that have a TTL set?",
      options: ["allkeys-lru", "volatile-lru", "noeviction", "allkeys-random"],
      correct: 1,
      explanation: "volatile-lru applies LRU eviction only to keys with TTL set, protecting persistent data without expiration."
    },
    {
      id: 5,
      question: "What happens when you set TTL too short?",
      options: [
        "Cache memory overflow",
        "Low hit ratio and increased database load",
        "Data corruption",
        "Server crashes"
      ],
      correct: 1,
      explanation: "Short TTL causes data to expire frequently, leading to cache misses, low hit ratio, and increased load on the database."
    }
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
            <p>Cache Eviction Policies - Video Lesson</p>
          </div>
        </div>
        <div className="video-details">
          <h2>Understanding Cache Eviction Policies</h2>
          <p className="video-description">
            Deep dive into different cache eviction strategies. Learn when cache is full and how to decide 
            which entries to remove - LRU, LFU, FIFO, and TTL-based approaches.
          </p>
          <div className="video-meta">
            <span className="meta-item"><span className="meta-icon">⏱️</span> 22 min</span>
            <span className="meta-item"><span className="meta-icon">📊</span> Intermediate</span>
            <span className="meta-item"><span className="meta-icon">📁</span> Caching</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArticleContent = () => (
    <div className="content-panel article-panel">
      <article className="article-container">
        <header className="article-header">
          <h1>Cache Eviction Policies</h1>
          <div className="article-meta">
            <span className="meta-item"><span className="meta-icon">📖</span> 12 min read</span>
            <span className="meta-item"><span className="meta-icon">👤</span> System Design Team</span>
            <span className="meta-item"><span className="meta-icon">📁</span> Caching</span>
          </div>
          <div className="article-tags">
            <span className="tag">LRU</span>
            <span className="tag">LFU</span>
            <span className="tag">TTL</span>
            <span className="tag">Redis</span>
          </div>
        </header>
        <div className="article-content">
          <h2 className="md-h2">Why Cache Eviction?</h2>
          <p>Caches have limited memory. When the cache is full and new data needs to be stored, we must decide <strong>which existing entries to remove</strong>. This decision is made by the eviction policy.</p>
          
          <p>The goal is to evict data that is <strong>least likely to be needed again</strong>, keeping the most valuable data in cache to maximize hit ratio.</p>

          <h2 className="md-h2">Eviction Policies</h2>

          <h3 className="md-h3">1. LRU (Least Recently Used)</h3>
          <p>Remove items that haven't been accessed recently. Assumes recent access predicts future access.</p>
          <p><strong>Example:</strong> Access order: A→B→C→A→D (cache size 3) → State: [D,A,C] → New E: [E,D,A] (C evicted)</p>
          <ul>
            <li><strong>Pros:</strong> Good general-purpose policy, simple to understand</li>
            <li><strong>Cons:</strong> Doesn't consider access frequency, one-time scans can evict useful data</li>
            <li><strong>Best for:</strong> Most common choice for general caching</li>
          </ul>

          <h3 className="md-h3">2. LFU (Least Frequently Used)</h3>
          <p>Remove items with lowest access count. Considers long-term popularity.</p>
          <p><strong>Example:</strong> Counts: A(10), B(2), C(5) → New D: B evicted (lowest count)</p>
          <ul>
            <li><strong>Pros:</strong> Keeps frequently accessed items</li>
            <li><strong>Cons:</strong> New items may be evicted quickly, old popular items stay forever</li>
            <li><strong>Best for:</strong> When access frequency is more important than recency</li>
          </ul>

          <h3 className="md-h3">3. FIFO (First In, First Out)</h3>
          <p>Remove oldest entries first, regardless of access patterns. Simple queue-like behavior.</p>
          <ul>
            <li><strong>Pros:</strong> Very simple to implement, predictable</li>
            <li><strong>Cons:</strong> Doesn't consider access patterns</li>
            <li><strong>Best for:</strong> Simple needs, session timeouts</li>
          </ul>

          <h3 className="md-h3">4. Random Replacement</h3>
          <p>Randomly select entry to evict. Surprisingly effective in some cases.</p>
          <ul>
            <li><strong>Pros:</strong> Simple, no tracking overhead</li>
            <li><strong>Cons:</strong> May evict important data, unpredictable</li>
            <li><strong>Best for:</strong> Large caches where tracking overhead matters</li>
          </ul>

          <h3 className="md-h3">5. TTL (Time To Live)</h3>
          <p>Entries expire after a fixed time period. Used alongside other policies.</p>
          <p><code className="inline-code">cache.set("user:123", data, ttl=3600)</code> - Expires in 1 hour</p>

          <h2 className="md-h2">LRU Implementation</h2>
          <p>LRU is typically implemented using a <strong>HashMap + Doubly Linked List</strong> for O(1) get and put operations:</p>
          <ul>
            <li>HashMap: O(1) key → node pointer lookup</li>
            <li>Doubly Linked List: O(1) add/remove for maintaining access order</li>
            <li>Head = Most Recent, Tail = Least Recent</li>
          </ul>

          <h2 className="md-h2">Redis Eviction Policies</h2>
          <p>Redis provides several eviction policies via <code className="inline-code">maxmemory-policy</code>:</p>
          <table>
            <tr><td><strong>noeviction</strong></td><td>Return errors when memory limit reached</td></tr>
            <tr><td><strong>allkeys-lru</strong></td><td>Evict least recently used keys (all keys)</td></tr>
            <tr><td><strong>allkeys-lfu</strong></td><td>Evict least frequently used keys (all keys)</td></tr>
            <tr><td><strong>volatile-lru</strong></td><td>Evict LRU among keys with TTL set</td></tr>
            <tr><td><strong>volatile-lfu</strong></td><td>Evict LFU among keys with TTL set</td></tr>
            <tr><td><strong>volatile-ttl</strong></td><td>Evict keys with shortest TTL first</td></tr>
          </table>

          <p><strong>Recommendation:</strong> Use <code className="inline-code">allkeys-lru</code> for most caching use cases. Use <code className="inline-code">volatile-*</code> when you have a mix of cached and persistent data.</p>

          <h2 className="md-h2">TTL Best Practices</h2>
          <ul>
            <li><strong>Session Data:</strong> TTL = Session timeout (e.g., 30 minutes)</li>
            <li><strong>User Profiles:</strong> TTL = 15-60 minutes</li>
            <li><strong>Product Catalog:</strong> TTL = 1-24 hours</li>
            <li><strong>Configuration:</strong> TTL = Hours to days</li>
          </ul>

          <h2 className="md-h2">Key Takeaways</h2>
          <ul>
            <li><strong>LRU is the default choice</strong> - works well for most workloads with temporal locality</li>
            <li><strong>LFU for frequency patterns</strong> - when some items are accessed much more than others</li>
            <li><strong>Always use TTL</strong> - even with other policies, TTL ensures eventual freshness</li>
            <li><strong>Monitor eviction rate</strong> - high eviction means cache is too small</li>
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
                <div className="score-circle">
                  <span className="score-value">{Math.round((score / totalQuestions) * 100)}%</span>
                  <span className="score-label">Score</span>
                </div>
                <p className="score-detail">You got {score} out of {totalQuestions} questions correct</p>
              </div>
              <div className="results-review">
                <h3>Review Answers</h3>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className={`review-item ${selectedAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                    <div className="review-header">
                      <span className="review-number">Q{idx + 1}</span>
                      <span className={`review-badge ${selectedAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                        {selectedAnswers[q.id] === q.correct ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="review-question">{q.question}</p>
                    <div className="review-answers">
                      <p><strong>Your answer:</strong> {q.options[selectedAnswers[q.id]] || 'Not answered'}</p>
                      {selectedAnswers[q.id] !== q.correct && <p><strong>Correct answer:</strong> {q.options[q.correct]}</p>}
                    </div>
                    <div className="explanation">{q.explanation}</div>
                  </div>
                ))}
              </div>
              <div className="results-actions">
                <button className="retry-btn" onClick={() => { setSelectedAnswers({}); setShowResults(false); setCurrentQuestionIndex(0); }}>Retry Quiz</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="content-panel quiz-panel">
        <div className="quiz-container">
          <header className="quiz-header">
            <h1>Cache Eviction Policies Quiz</h1>
            <p className="quiz-description">Test your understanding of eviction strategies</p>
            <div className="quiz-stats">
              <div className="stat-card"><span className="stat-value">{totalQuestions}</span><span className="stat-label">Questions</span></div>
              <div className="stat-card"><span className="stat-value">70%</span><span className="stat-label">To Pass</span></div>
            </div>
          </header>
          <div className="quiz-progress">
            <div className="progress-text">Question {currentQuestionIndex + 1} of {totalQuestions}</div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div></div>
            <div className="answered-text">{answeredCount} of {totalQuestions} answered</div>
          </div>
          <div className="quiz-question-single">
            <div className="question-card">
              <div className="question-header"><span className="question-number">Question {currentQuestionIndex + 1}</span></div>
              <p className="question-text">{currentQuestion.question}</p>
              <div className="options-list">
                {currentQuestion.options.map((option, optIdx) => (
                  <label key={optIdx} className={`option-item ${selectedAnswers[currentQuestion.id] === optIdx ? 'selected' : ''}`}>
                    <input type="radio" name={`q-${currentQuestion.id}`} checked={selectedAnswers[currentQuestion.id] === optIdx} onChange={() => handleAnswerSelect(currentQuestion.id, optIdx)} />
                    <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="quiz-navigation">
            <button className="nav-btn prev" onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0}>&lt;&lt; Previous</button>
            <div className="question-dots">
              {quizQuestions.map((q, idx) => (
                <button key={idx} className={`dot ${idx === currentQuestionIndex ? 'active' : ''} ${selectedAnswers[q.id] !== undefined ? 'answered' : ''}`} onClick={() => setCurrentQuestionIndex(idx)}>{idx + 1}</button>
              ))}
            </div>
            {currentQuestionIndex === totalQuestions - 1 ? (
              <button className="nav-btn submit" onClick={() => setShowResults(true)}>Submit Quiz</button>
            ) : (
              <button className="nav-btn next" onClick={() => setCurrentQuestionIndex(i => i + 1)}>Next &gt;&gt;</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAssignmentContent = () => (
    <div className="content-panel assignment-panel">
      <div className="assignment-container">
        <header className="assignment-header">
          <div className="assignment-title-row">
            <h1>Implement an LRU Cache</h1>
            <span className="difficulty-badge intermediate">Intermediate</span>
          </div>
          <p className="assignment-description">
            Implement an LRU cache with O(1) get and put operations using HashMap and Doubly Linked List.
          </p>
          <div className="assignment-meta">
            <span className="meta-item"><span className="meta-icon">🏆</span> 100 points</span>
            <span className="meta-item"><span className="meta-icon">📁</span> Caching</span>
          </div>
        </header>
        <div className="assignment-body">
          <h3>Requirements</h3>
          <ul className="requirements-list">
            <li><span className="req-number">1</span><span className="req-text">Implement LRUCache class with constructor(capacity), get(key), put(key, value)</span></li>
            <li><span className="req-number">2</span><span className="req-text">get(key) returns value if exists, -1 otherwise, marks as recently used</span></li>
            <li><span className="req-number">3</span><span className="req-text">put(key, value) inserts/updates and evicts LRU item if at capacity</span></li>
            <li><span className="req-number">4</span><span className="req-text">Both operations must be O(1) time complexity</span></li>
            <li><span className="req-number">5</span><span className="req-text">Write comprehensive tests for edge cases</span></li>
          </ul>
        </div>
        <div className="assignment-actions">
          <button className="start-btn">Start Assignment</button>
          <button className="download-btn">Download Template</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="hld-day-layout">
      <div className="mobile-header">
        <Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link>
        <div className="mobile-title">
          <span className="mobile-week-badge">W{weekNum}D{dayNum}</span>
          <span className="mobile-topic">{topic}</span>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-info">
            <div className="week-badge">Week {weekNum} • Day {dayNum}</div>
            <h3>{topic}</h3>
            <p>{concepts}</p>
          </div>
        </div>
        <nav className="mobile-menu-nav">
          {tabs.map((tab) => (
            <button key={tab.id} className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }} style={{ '--tab-color': tab.color }}>
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <div className="mobile-day-nav">
            <Link to="/hld/week/4/day/1" className="nav-link prev" onClick={() => setMobileMenuOpen(false)}>&lt;&lt; Day 1</Link>
            <Link to="/hld/week/4/day/3" className="nav-link next" onClick={() => setMobileMenuOpen(false)}>Day 3 &gt;&gt;</Link>
          </div>
        </div>
      </div>

      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed && <span>Back to Course</span>}</Link>
          <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed ? '>>' : '<<'}</button>
        </div>
        {!sidebarCollapsed && (
          <div className="sidebar-info">
            <div className="week-badge">Week {weekNum} • Day {dayNum}</div>
            <h2 className="day-topic">{topic}</h2>
            <p className="day-concepts">{concepts}</p>
          </div>
        )}
        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)} style={{ '--tab-color': tab.color }}>
              <span className="nav-icon">{tab.icon}</span>
              {!sidebarCollapsed && <><span className="nav-label">{tab.label}</span><span className="nav-count">1</span></>}
            </button>
          ))}
        </nav>
        {!sidebarCollapsed && (
          <div className="sidebar-footer">
            <div className="day-navigation">
              <Link to="/hld/week/4/day/1" className="nav-link prev">&lt;&lt; Day 1</Link>
              <Link to="/hld/week/4/day/3" className="nav-link next">Day 3 &gt;&gt;</Link>
            </div>
          </div>
        )}
      </aside>

      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <span className="content-type" style={{ '--type-color': tabs.find(t => t.id === activeTab)?.color }}>
              {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
            </span>
          </div>
          <div className="header-right"><span className="progress-indicator">Week {weekNum}, Day {dayNum}</span></div>
        </header>
        <div className="content-body">
          {activeTab === 'video' && renderVideoContent()}
          {activeTab === 'article' && renderArticleContent()}
          {activeTab === 'quiz' && renderQuizContent()}
          {activeTab === 'assignment' && renderAssignmentContent()}
        </div>
      </main>
    </div>
  );
}

export default Week4Day2;
