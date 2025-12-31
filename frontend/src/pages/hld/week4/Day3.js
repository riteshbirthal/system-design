import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week4Day3() {
  const weekNum = 4;
  const dayNum = 3;
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);
  const topic = "Mid-Week Practice";
  const concepts = "Practice quiz on caching basics and eviction";

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: false, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', available: false, color: '#FF9800' }
  ];

  const quizQuestions = [
    { id: 1, question: "What is the primary benefit of using a Cache-Aside pattern?", options: ["Data is always fresh in the cache", "Application has full control over what gets cached", "Cache automatically syncs with database", "No cache misses ever occur"], correct: 1, explanation: "Cache-Aside gives the application explicit control over caching decisions." },
    { id: 2, question: "Which eviction policy would be BEST for user session data?", options: ["LFU (Least Frequently Used)", "FIFO (First In First Out)", "LRU (Least Recently Used)", "Random Replacement"], correct: 2, explanation: "LRU is best for sessions because recently active users are more likely to need their session data again." },
    { id: 3, question: "What happens in Write-Through cache when data is written?", options: ["Data is written only to cache, database updated later", "Data is written to both cache and database synchronously", "Data is written only to database, cache invalidated", "Data is queued for batch writing"], correct: 1, explanation: "Write-Through ensures data consistency by writing to both cache and database in the same operation." },
    { id: 4, question: "Cache has 1000 requests. 850 are cache hits. What is the hit ratio?", options: ["15%", "85%", "8.5%", "0.85%"], correct: 1, explanation: "Hit Ratio = Cache Hits / Total Requests = 850/1000 = 0.85 = 85%." },
    { id: 5, question: "Which Redis policy should you use when Redis contains BOTH cached data (with TTL) and persistent data (without TTL)?", options: ["allkeys-lru", "volatile-lru", "noeviction", "allkeys-random"], correct: 1, explanation: "volatile-lru only evicts keys that have a TTL set, protecting persistent data." },
    { id: 6, question: "What is the time complexity of LRU cache with HashMap + Doubly Linked List?", options: ["O(n) for both get and put", "O(1) for get, O(n) for put", "O(log n) for both", "O(1) for both get and put"], correct: 3, explanation: "HashMap provides O(1) lookup, Doubly linked list provides O(1) node operations." },
    { id: 7, question: "What is 'Cache Stampede' (Thundering Herd)?", options: ["Cache memory fills up too quickly", "Multiple requests hitting database simultaneously after cache expiration", "Cache entries evicted too frequently", "Network congestion between cache servers"], correct: 1, explanation: "Cache stampede occurs when a popular cache key expires and many concurrent requests all miss the cache." },
    { id: 8, question: "Which pattern is BEST for write-heavy workloads with acceptable data loss risk?", options: ["Cache-Aside", "Read-Through", "Write-Through", "Write-Behind (Write-Back)"], correct: 3, explanation: "Write-Behind writes to cache immediately and asynchronously updates database - fast but risks data loss." },
    { id: 9, question: "What is the main disadvantage of LFU compared to LRU?", options: ["Higher memory overhead", "New items may be evicted quickly before becoming 'frequent'", "Cannot be implemented with O(1) operations", "Does not support TTL"], correct: 1, explanation: "LFU's 'frequency pollution' problem: new items start with low counts and may be evicted too quickly." },
    { id: 10, question: "What problem does Cache Invalidation primarily address?", options: ["Cache memory management", "Data consistency between cache and source of truth", "Cache server discovery", "Load balancing between cache nodes"], correct: 1, explanation: "Cache invalidation ensures cached data reflects the current state of the source database." }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const renderArticleContent = () => (
    <div className="content-panel article-panel">
      <article className="article-container">
        <header className="article-header">
          <h1>Mid-Week Review: Caching Concepts</h1>
          <div className="article-meta">
            <span className="meta-item"><span className="meta-icon">📖</span> 8 min read</span>
            <span className="meta-item"><span className="meta-icon">📁</span> Review</span>
          </div>
        </header>
        <div className="article-content">
          <h2 className="md-h2">Quick Review: Days 1-2</h2>
          
          <h3 className="md-h3">Day 1: Caching Fundamentals</h3>
          <ul>
            <li><strong>Caching</strong>: Storing frequently accessed data in fast storage</li>
            <li><strong>Cache Hit</strong>: Data found in cache (fast)</li>
            <li><strong>Cache Miss</strong>: Data not in cache, fetch from source</li>
            <li><strong>Hit Ratio Target</strong>: 90%+ for effective caching</li>
          </ul>

          <h3 className="md-h3">Caching Patterns</h3>
          <ul>
            <li><strong>Cache-Aside</strong>: App manages cache, fetch on miss</li>
            <li><strong>Read-Through</strong>: Cache handles DB reads</li>
            <li><strong>Write-Through</strong>: Write to cache + DB synchronously</li>
            <li><strong>Write-Behind</strong>: Write to cache, async DB update</li>
          </ul>

          <h3 className="md-h3">Day 2: Eviction Policies</h3>
          <ul>
            <li><strong>LRU</strong>: Evict least recently used (most common)</li>
            <li><strong>LFU</strong>: Evict least frequently used</li>
            <li><strong>FIFO</strong>: Evict oldest first</li>
            <li><strong>TTL</strong>: Expire after time period</li>
          </ul>

          <h3 className="md-h3">Redis Eviction Policies</h3>
          <ul>
            <li><code className="inline-code">allkeys-lru</code>: LRU on all keys (recommended)</li>
            <li><code className="inline-code">volatile-lru</code>: LRU on keys with TTL</li>
            <li><code className="inline-code">volatile-ttl</code>: Shortest TTL first</li>
          </ul>

          <h2 className="md-h2">Key Formulas</h2>
          <p><strong>Hit Ratio</strong> = Cache Hits / (Cache Hits + Cache Misses)</p>
          <p><strong>LRU Implementation</strong>: HashMap + Doubly Linked List = O(1) operations</p>

          <h2 className="md-h2">Common Interview Questions</h2>
          <ul>
            <li>When would you use Cache-Aside vs Write-Through?</li>
            <li>How would you implement an LRU cache?</li>
            <li>What is cache stampede and how do you prevent it?</li>
            <li>How do you handle cache invalidation?</li>
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
            <h1>Mid-Week Practice Quiz</h1>
            <p className="quiz-description">Test your understanding of Days 1-2: Caching Fundamentals & Eviction</p>
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

  const renderEmptyState = (icon, title) => (
    <div className="content-panel">
      <div className="empty-state">
        <div className="empty-icon">{icon}</div>
        <h3>{title}</h3>
        <p>This content is not available for practice days.</p>
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
            <button key={tab.id} className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''} ${!tab.available ? 'disabled' : ''}`} onClick={() => { if(tab.available) { setActiveTab(tab.id); setMobileMenuOpen(false); }}} style={{ '--tab-color': tab.color }}>
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <div className="mobile-day-nav">
            <Link to="/hld/week/4/day/2" className="nav-link prev">&lt;&lt; Day 2</Link>
            <Link to="/hld/week/4/day/4" className="nav-link next">Day 4 &gt;&gt;</Link>
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
            <button key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''} ${!tab.available ? 'disabled' : ''}`} onClick={() => tab.available && setActiveTab(tab.id)} style={{ '--tab-color': tab.color }}>
              <span className="nav-icon">{tab.icon}</span>
              {!sidebarCollapsed && <><span className="nav-label">{tab.label}</span>{tab.available && <span className="nav-count">1</span>}</>}
            </button>
          ))}
        </nav>
        {!sidebarCollapsed && (
          <div className="sidebar-footer">
            <div className="day-navigation">
              <Link to="/hld/week/4/day/2" className="nav-link prev">&lt;&lt; Day 2</Link>
              <Link to="/hld/week/4/day/4" className="nav-link next">Day 4 &gt;&gt;</Link>
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
          {activeTab === 'video' && renderEmptyState('🎬', 'Video Not Available')}
          {activeTab === 'article' && renderArticleContent()}
          {activeTab === 'quiz' && renderQuizContent()}
          {activeTab === 'assignment' && renderEmptyState('📝', 'Assignment Not Available')}
        </div>
      </main>
    </div>
  );
}

export default Week4Day3;
