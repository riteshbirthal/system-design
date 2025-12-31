import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week3Day2() {
  const weekNum = 3, dayNum = 2, topic = "Database Indexing", concepts = "B-Tree, Hash Index, Composite indexes, Query optimization";
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is a database index?", options: ["A backup of data", "A data structure to speed up queries", "A type of table", "A query language"], correct: 1, explanation: "An index is a data structure (like B-Tree) that speeds up data retrieval at the cost of extra storage and write overhead." },
    { id: 2, question: "B-Tree index is best for?", options: ["Exact matches only", "Range queries and sorting", "Full-text search", "Geospatial data"], correct: 1, explanation: "B-Tree indexes support range queries, sorting, and equality checks efficiently." },
    { id: 3, question: "Hash index is best for?", options: ["Range queries", "Exact equality lookups", "Sorting", "Pattern matching"], correct: 1, explanation: "Hash indexes are optimized for exact equality lookups (=) but don't support ranges or sorting." },
    { id: 4, question: "Downside of too many indexes?", options: ["Faster reads", "Slower writes, more storage", "Better consistency", "Improved security"], correct: 1, explanation: "Each index must be updated on writes, slowing down INSERT/UPDATE/DELETE operations and using extra storage." },
    { id: 5, question: "Composite index on (A, B) can be used for?", options: ["Queries on B alone", "Queries on A, or A and B", "Only queries on both A and B", "Any column combination"], correct: 1, explanation: "Composite indexes follow leftmost prefix - (A,B) index works for queries on A alone or A+B, not B alone." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Database Indexing</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Database Indexing</h1><div className="article-tags"><span className="tag">Index</span><span className="tag">B-Tree</span><span className="tag">Performance</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is an Index?</h2>
        <p>An <strong>index</strong> is a data structure that improves query speed by providing quick lookup paths to data, similar to a book's index.</p>
        
        <div className="info-box note">
          <div className="info-box-icon">📚</div>
          <div className="info-box-content">
            <h4>Book Analogy</h4>
            <p>Without an index, finding a topic requires scanning every page. With an index, you look up the topic and jump directly to the page.</p>
          </div>
        </div>

        <h2 className="md-h2">Index Types</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🌲</div>
            <div className="concept-card-title">B-Tree Index</div>
            <div className="concept-card-description">Most common. Supports =, &lt;, &gt;, BETWEEN, ORDER BY. Default in most DBs.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">#️⃣</div>
            <div className="concept-card-title">Hash Index</div>
            <div className="concept-card-description">Only exact equality (=). O(1) lookup. No range queries.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📝</div>
            <div className="concept-card-title">Full-Text Index</div>
            <div className="concept-card-description">Text search with relevance ranking. Used for search features.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🗺️</div>
            <div className="concept-card-title">Spatial Index</div>
            <div className="concept-card-description">Geospatial queries. R-Tree structure for location data.</div>
          </div>
        </div>

        <h2 className="md-h2">B-Tree Structure</h2>
        <div className="diagram-container">
          <div className="diagram-title">B-Tree Index Visualization</div>
          <svg viewBox="0 0 500 200" className="svg-diagram" style={{maxHeight: '200px'}}>
            <defs>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#667eea'}} />
                <stop offset="100%" style={{stopColor:'#764ba2'}} />
              </linearGradient>
            </defs>
            {/* Root */}
            <rect x="200" y="10" width="100" height="35" rx="5" fill="url(#nodeGrad)" />
            <text x="250" y="32" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">50</text>
            {/* Level 2 */}
            <rect x="80" y="70" width="80" height="35" rx="5" fill="url(#nodeGrad)" />
            <text x="120" y="92" textAnchor="middle" fill="white" fontSize="11">25 | 35</text>
            <rect x="320" y="70" width="80" height="35" rx="5" fill="url(#nodeGrad)" />
            <text x="360" y="92" textAnchor="middle" fill="white" fontSize="11">75 | 90</text>
            {/* Leaves */}
            <rect x="20" y="130" width="60" height="30" rx="5" fill="#e2e8f0" stroke="#667eea" />
            <text x="50" y="150" textAnchor="middle" fontSize="10">10,20</text>
            <rect x="90" y="130" width="60" height="30" rx="5" fill="#e2e8f0" stroke="#667eea" />
            <text x="120" y="150" textAnchor="middle" fontSize="10">30,33</text>
            <rect x="160" y="130" width="60" height="30" rx="5" fill="#e2e8f0" stroke="#667eea" />
            <text x="190" y="150" textAnchor="middle" fontSize="10">40,45</text>
            <rect x="280" y="130" width="60" height="30" rx="5" fill="#e2e8f0" stroke="#667eea" />
            <text x="310" y="150" textAnchor="middle" fontSize="10">60,70</text>
            <rect x="350" y="130" width="60" height="30" rx="5" fill="#e2e8f0" stroke="#667eea" />
            <text x="380" y="150" textAnchor="middle" fontSize="10">80,85</text>
            <rect x="420" y="130" width="60" height="30" rx="5" fill="#e2e8f0" stroke="#667eea" />
            <text x="450" y="150" textAnchor="middle" fontSize="10">95,99</text>
            {/* Lines */}
            <line x1="220" y1="45" x2="120" y2="70" stroke="#667eea" strokeWidth="2" />
            <line x1="280" y1="45" x2="360" y2="70" stroke="#667eea" strokeWidth="2" />
            <line x1="100" y1="105" x2="50" y2="130" stroke="#94a3b8" />
            <line x1="120" y1="105" x2="120" y2="130" stroke="#94a3b8" />
            <line x1="140" y1="105" x2="190" y2="130" stroke="#94a3b8" />
            <line x1="340" y1="105" x2="310" y2="130" stroke="#94a3b8" />
            <line x1="360" y1="105" x2="380" y2="130" stroke="#94a3b8" />
            <line x1="380" y1="105" x2="450" y2="130" stroke="#94a3b8" />
            <text x="250" y="185" textAnchor="middle" fontSize="10" fill="#64748b">O(log n) lookup - balanced tree structure</text>
          </svg>
        </div>

        <h2 className="md-h2">Composite Index</h2>
        <p>Index on multiple columns: <code>CREATE INDEX idx ON users(country, city, name)</code></p>
        
        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Leftmost Prefix Rule</h4>
            <p>Index (A, B, C) can be used for queries on: A | A,B | A,B,C<br/>
            Cannot be used for: B alone | C alone | B,C</p>
          </div>
        </div>

        <h2 className="md-h2">Index Trade-offs</h2>
        <div className="pros-cons">
          <div className="pros-section">
            <h4>✓ Benefits</h4>
            <ul>
              <li>Faster SELECT queries</li>
              <li>Faster ORDER BY, GROUP BY</li>
              <li>Efficient JOIN operations</li>
              <li>Unique constraints enforcement</li>
            </ul>
          </div>
          <div className="cons-section">
            <h4>✗ Costs</h4>
            <ul>
              <li>Slower INSERT/UPDATE/DELETE</li>
              <li>Extra storage space</li>
              <li>Index maintenance overhead</li>
              <li>Can become fragmented</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Key Takeaways</h2>
        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Index columns used in WHERE, JOIN, ORDER BY</li>
              <li>B-Tree for most cases, Hash for exact matches only</li>
              <li>Follow leftmost prefix rule for composite indexes</li>
              <li>Use EXPLAIN to analyze query plans</li>
              <li>Don't over-index - balance read vs write performance</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Indexing Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Index Optimization</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Given a users table with 10M rows, design indexes for common queries</span></li><li><span className="req-number">2</span><span className="req-text">Use EXPLAIN to analyze query performance</span></li><li><span className="req-number">3</span><span className="req-text">Document before/after query times</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/3/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/3/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week3Day2;
