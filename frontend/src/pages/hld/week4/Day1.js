import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week4Day1() {
  const weekNum = 4, dayNum = 1, topic = "Caching Fundamentals", concepts = "Cache types, Cache-aside, Read/Write-through patterns";
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }
  ];

  const quizQuestions = [
    { id: 1, question: "What is the primary purpose of caching?", options: ["Increase database storage", "Reduce retrieval time and decrease load on data sources", "Encrypt sensitive data", "Backup data automatically"], correct: 1, explanation: "Caching stores copies of frequently accessed data in high-speed storage to reduce retrieval time and offload traffic from databases." },
    { id: 2, question: "In Cache-Aside pattern, what happens on a cache miss?", options: ["Request fails", "Cache auto-fetches from DB", "App fetches from DB, stores in cache", "Data served stale"], correct: 2, explanation: "In Cache-Aside, the application manages the cache - on miss, it queries the database, stores the result in cache, then returns." },
    { id: 3, question: "What is the target cache hit ratio?", options: ["50%+", "70%+", "90%+", "99%+"], correct: 2, explanation: "A 90%+ hit ratio is the target. Lower ratios indicate the caching strategy may need optimization." },
    { id: 4, question: "Which pattern writes to both cache and DB synchronously?", options: ["Cache-Aside", "Read-Through", "Write-Through", "Write-Behind"], correct: 2, explanation: "Write-Through writes data to cache and database simultaneously, ensuring strong consistency but with higher write latency." },
    { id: 5, question: "Approximate latency of Redis cache lookup?", options: ["0.5 nanoseconds", "100 nanoseconds", "500μs to 1ms", "10-100ms"], correct: 2, explanation: "Distributed caches like Redis have network latency of ~500μs-1ms, much faster than DB queries (10-100ms)." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (
    <div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Caching Fundamentals</p></div></div><div className="video-details"><h2>Introduction to Caching Strategies</h2><p className="video-description">Learn cache types, caching patterns (Cache-Aside, Read-Through, Write-Through), and how to measure cache effectiveness.</p><div className="video-meta"><span className="meta-item"><span className="meta-icon">⏱️</span> 25 min</span><span className="meta-item"><span className="meta-icon">📊</span> Intermediate</span></div></div></div></div>
  );

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Caching Fundamentals</h1><div className="article-meta"><span className="meta-item"><span className="meta-icon">📖</span> 15 min read</span></div><div className="article-tags"><span className="tag">Cache</span><span className="tag">Performance</span><span className="tag">Redis</span><span className="tag">System Design</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Caching?</h2>
        <p><strong>Caching</strong> is storing copies of frequently accessed data in high-speed storage to reduce retrieval time and decrease load on primary data sources.</p>
        
        <div className="info-box note">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Think of it like...</h4>
            <p>Keeping your most-used tools on your desk instead of walking to the storage room. The desk is faster to access but has limited space.</p>
          </div>
        </div>

        {/* Why Caching Matters */}
        <h2 className="md-h2">Why Caching Matters</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Performance</div>
            <div className="concept-card-description">Reduces response times from seconds to milliseconds</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📈</div>
            <div className="concept-card-title">Scalability</div>
            <div className="concept-card-description">Offloads traffic from databases, enables horizontal scaling</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💰</div>
            <div className="concept-card-title">Cost Efficiency</div>
            <div className="concept-card-description">Reduces expensive database operations</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">Reliability</div>
            <div className="concept-card-description">Can serve data during backend failures</div>
          </div>
        </div>

        {/* Cache Hit vs Miss Diagram */}
        <h2 className="md-h2">Cache Hit vs Cache Miss</h2>
        <div className="diagram-container">
          <div className="diagram-title">Cache Lookup Flow</div>
          <div className="pros-cons">
            <div className="pros-section">
              <h4>✓ Cache Hit (Fast Path)</h4>
              <div className="flow-diagram" style={{padding: '1rem', alignItems: 'flex-start'}}>
                <div className="flow-row" style={{gap: '0.5rem', justifyContent: 'flex-start'}}>
                  <div className="flow-node client" style={{minWidth: '80px', padding: '0.75rem'}}>
                    <span style={{fontSize: '1.2rem'}}>👤</span>
                    <span className="flow-node-label" style={{fontSize: '0.75rem'}}>Request</span>
                  </div>
                  <span style={{color: '#10b981'}}>→</span>
                  <div className="flow-node cache" style={{minWidth: '80px', padding: '0.75rem'}}>
                    <span style={{fontSize: '1.2rem'}}>⚡</span>
                    <span className="flow-node-label" style={{fontSize: '0.75rem'}}>Cache</span>
                  </div>
                  <span style={{color: '#10b981'}}>→</span>
                  <div style={{background: '#d1fae5', padding: '0.75rem', borderRadius: '8px', color: '#065f46', fontWeight: '600', fontSize: '0.8rem'}}>
                    ✓ Found!<br/>~1ms
                  </div>
                </div>
              </div>
            </div>
            <div className="cons-section">
              <h4>✗ Cache Miss (Slow Path)</h4>
              <div className="flow-diagram" style={{padding: '1rem', alignItems: 'flex-start'}}>
                <div className="flow-row" style={{gap: '0.5rem', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                  <div className="flow-node client" style={{minWidth: '70px', padding: '0.5rem'}}>
                    <span style={{fontSize: '1rem'}}>👤</span>
                    <span className="flow-node-label" style={{fontSize: '0.7rem'}}>Request</span>
                  </div>
                  <span style={{color: '#ef4444'}}>→</span>
                  <div className="flow-node cache" style={{minWidth: '70px', padding: '0.5rem', opacity: 0.6}}>
                    <span style={{fontSize: '1rem'}}>❌</span>
                    <span className="flow-node-label" style={{fontSize: '0.7rem'}}>Miss</span>
                  </div>
                  <span style={{color: '#ef4444'}}>→</span>
                  <div className="flow-node database" style={{minWidth: '70px', padding: '0.5rem'}}>
                    <span style={{fontSize: '1rem'}}>🗄️</span>
                    <span className="flow-node-label" style={{fontSize: '0.7rem'}}>DB</span>
                  </div>
                  <span style={{color: '#f59e0b'}}>→</span>
                  <div style={{background: '#fef3c7', padding: '0.5rem', borderRadius: '8px', color: '#92400e', fontSize: '0.7rem'}}>
                    ~50ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hit Ratio Metrics */}
        <h2 className="md-h2">Cache Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">90%+</div>
            <div className="metric-label">Target Hit Ratio</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">&lt;1ms</div>
            <div className="metric-label">Cache Latency</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">50-100ms</div>
            <div className="metric-label">DB Latency</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">50-100x</div>
            <div className="metric-label">Speed Improvement</div>
          </div>
        </div>

        {/* Latency Comparison */}
        <h2 className="md-h2">Latency Comparison</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Storage Type</th><th>Latency</th><th>Scale</th></tr>
          </thead>
          <tbody>
            <tr><td className="feature-name">L1 Cache</td><td>~0.5 ns</td><td><div style={{background:'#10b981',height:'8px',width:'2%',borderRadius:'4px'}}></div></td></tr>
            <tr><td className="feature-name">L2 Cache</td><td>~7 ns</td><td><div style={{background:'#22c55e',height:'8px',width:'5%',borderRadius:'4px'}}></div></td></tr>
            <tr><td className="feature-name">RAM</td><td>~100 ns</td><td><div style={{background:'#84cc16',height:'8px',width:'8%',borderRadius:'4px'}}></div></td></tr>
            <tr><td className="feature-name">Redis/Memcached</td><td>~500μs-1ms</td><td><div style={{background:'#eab308',height:'8px',width:'20%',borderRadius:'4px'}}></div></td></tr>
            <tr><td className="feature-name">SSD</td><td>~100μs</td><td><div style={{background:'#f97316',height:'8px',width:'15%',borderRadius:'4px'}}></div></td></tr>
            <tr><td className="feature-name">Database Query</td><td>~10-100ms</td><td><div style={{background:'#ef4444',height:'8px',width:'80%',borderRadius:'4px'}}></div></td></tr>
            <tr><td className="feature-name">API Call</td><td>~100-500ms</td><td><div style={{background:'#dc2626',height:'8px',width:'100%',borderRadius:'4px'}}></div></td></tr>
          </tbody>
        </table>

        {/* Caching Patterns */}
        <h2 className="md-h2">Caching Patterns</h2>

        {/* Cache-Aside Pattern */}
        <h3 className="md-h3">1. Cache-Aside (Lazy Loading)</h3>
        <div className="diagram-container">
          <div className="diagram-title">Cache-Aside Pattern</div>
          <svg viewBox="0 0 600 250" className="svg-diagram" style={{maxHeight: '250px'}}>
            <defs>
              <linearGradient id="appGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#667eea'}} />
                <stop offset="100%" style={{stopColor:'#764ba2'}} />
              </linearGradient>
              <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#f093fb'}} />
                <stop offset="100%" style={{stopColor:'#f5576c'}} />
              </linearGradient>
              <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#11998e'}} />
                <stop offset="100%" style={{stopColor:'#38ef7d'}} />
              </linearGradient>
            </defs>
            
            {/* Application */}
            <rect x="230" y="20" width="140" height="60" rx="10" fill="url(#appGrad)" />
            <text x="300" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Application</text>
            <text x="300" y="68" textAnchor="middle" fill="white" fontSize="10">Manages both</text>
            
            {/* Cache */}
            <rect x="50" y="150" width="120" height="70" rx="10" fill="url(#cacheGrad)" />
            <text x="110" y="180" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">⚡ Cache</text>
            <text x="110" y="200" textAnchor="middle" fill="white" fontSize="10">Redis/Memcached</text>
            
            {/* Database */}
            <rect x="430" y="150" width="120" height="70" rx="10" fill="url(#dbGrad)" />
            <text x="490" y="180" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🗄️ Database</text>
            <text x="490" y="200" textAnchor="middle" fill="white" fontSize="10">PostgreSQL</text>
            
            {/* Arrows */}
            <path d="M250 80 L130 145" stroke="#667eea" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <text x="170" y="100" fontSize="10" fill="#666">1. Check cache</text>
            
            <path d="M350 80 L470 145" stroke="#667eea" strokeWidth="2" fill="none" strokeDasharray="5,3" />
            <text x="400" y="100" fontSize="10" fill="#666">2. On miss, query DB</text>
            
            <path d="M430 185 L170 185" stroke="#11998e" strokeWidth="2" fill="none" strokeDasharray="5,3" />
            <text x="300" y="175" fontSize="10" fill="#666">3. Store in cache</text>
          </svg>
        </div>
        
        <div className="pros-cons">
          <div className="pros-section">
            <h4>✓ Pros</h4>
            <ul>
              <li>Only requested data is cached</li>
              <li>Cache failure doesn't break system</li>
              <li>Simple to implement</li>
            </ul>
          </div>
          <div className="cons-section">
            <h4>✗ Cons</h4>
            <ul>
              <li>First request always hits DB</li>
              <li>Potential for stale data</li>
              <li>Cache stampede risk</li>
            </ul>
          </div>
        </div>

        {/* Write-Through Pattern */}
        <h3 className="md-h3">2. Write-Through Pattern</h3>
        <div className="diagram-container">
          <div className="diagram-title">Write-Through Pattern</div>
          <svg viewBox="0 0 600 200" className="svg-diagram" style={{maxHeight: '200px'}}>
            {/* Application */}
            <rect x="50" y="70" width="100" height="60" rx="10" fill="url(#appGrad)" />
            <text x="100" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">App</text>
            <text x="100" y="118" textAnchor="middle" fill="white" fontSize="9">Write data</text>
            
            {/* Cache */}
            <rect x="230" y="70" width="100" height="60" rx="10" fill="url(#cacheGrad)" />
            <text x="280" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Cache</text>
            <text x="280" y="118" textAnchor="middle" fill="white" fontSize="9">Write first</text>
            
            {/* Database */}
            <rect x="410" y="70" width="100" height="60" rx="10" fill="url(#dbGrad)" />
            <text x="460" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Database</text>
            <text x="460" y="118" textAnchor="middle" fill="white" fontSize="9">Then persist</text>
            
            {/* Arrows */}
            <path d="M150 100 L225 100" stroke="#667eea" strokeWidth="3" fill="none" />
            <text x="187" y="90" fontSize="10" fill="#666">1</text>
            
            <path d="M330 100 L405 100" stroke="#f093fb" strokeWidth="3" fill="none" />
            <text x="367" y="90" fontSize="10" fill="#666">2</text>
            
            <text x="300" y="170" textAnchor="middle" fontSize="11" fill="#666">Synchronous: Both writes complete before returning</text>
          </svg>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Write-Through: Strong Consistency</h4>
            <p>Use when data consistency is critical. Every write goes to both cache and database synchronously. Higher latency but cache always has latest data.</p>
          </div>
        </div>

        {/* Write-Behind Pattern */}
        <h3 className="md-h3">3. Write-Behind (Write-Back) Pattern</h3>
        <div className="diagram-container">
          <div className="diagram-title">Write-Behind Pattern</div>
          <svg viewBox="0 0 600 200" className="svg-diagram" style={{maxHeight: '200px'}}>
            {/* Application */}
            <rect x="50" y="70" width="100" height="60" rx="10" fill="url(#appGrad)" />
            <text x="100" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">App</text>
            <text x="100" y="118" textAnchor="middle" fill="white" fontSize="9">Fast write</text>
            
            {/* Cache */}
            <rect x="230" y="70" width="100" height="60" rx="10" fill="url(#cacheGrad)" />
            <text x="280" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Cache</text>
            <text x="280" y="118" textAnchor="middle" fill="white" fontSize="9">Return immediately</text>
            
            {/* Queue */}
            <rect x="320" y="150" width="80" height="40" rx="5" fill="#fbbf24" />
            <text x="360" y="175" textAnchor="middle" fill="#333" fontSize="10" fontWeight="bold">Queue</text>
            
            {/* Database */}
            <rect x="450" y="70" width="100" height="60" rx="10" fill="url(#dbGrad)" />
            <text x="500" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Database</text>
            <text x="500" y="118" textAnchor="middle" fill="white" fontSize="9">Async persist</text>
            
            {/* Arrows */}
            <path d="M150 100 L225 100" stroke="#667eea" strokeWidth="3" fill="none" />
            <text x="187" y="90" fontSize="10" fill="#666">1</text>
            
            <path d="M330 130 L340 150" stroke="#f093fb" strokeWidth="2" fill="none" strokeDasharray="4,2" />
            <path d="M400 170 L450 130" stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="4,2" />
            <text x="420" y="160" fontSize="10" fill="#666">async</text>
          </svg>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Write-Behind: Risk of Data Loss</h4>
            <p>Fastest writes but if cache fails before async persist, data is lost. Use for non-critical data or with proper durability measures.</p>
          </div>
        </div>

        {/* Pattern Comparison */}
        <h2 className="md-h2">Pattern Comparison</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Pattern</th><th>Consistency</th><th>Write Speed</th><th>Complexity</th><th>Use Case</th></tr>
          </thead>
          <tbody>
            <tr><td className="feature-name">Cache-Aside</td><td>Eventual</td><td>N/A</td><td>Low</td><td>Read-heavy workloads</td></tr>
            <tr><td className="feature-name">Read-Through</td><td>Eventual</td><td>N/A</td><td>Medium</td><td>Simplified cache logic</td></tr>
            <tr><td className="feature-name">Write-Through</td><td>Strong</td><td>Slow</td><td>Medium</td><td>Consistency critical</td></tr>
            <tr><td className="feature-name">Write-Behind</td><td>Eventual</td><td>Fast</td><td>High</td><td>Write-heavy, non-critical</td></tr>
          </tbody>
        </table>

        {/* Key Takeaways */}
        <h2 className="md-h2">Key Takeaways</h2>
        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Caching dramatically improves performance - aim for 90%+ hit ratio</li>
              <li>Cache-Aside is most common: app manages cache explicitly</li>
              <li>Write-Through for strong consistency, Write-Behind for speed</li>
              <li>Consider cache invalidation strategy (TTL, event-based)</li>
              <li>Monitor hit ratio, latency, and memory usage</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) {
      const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;
      return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Quiz Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span><span className="score-label">Score</span></div><p className="score-detail">{score} of {total} correct</p></div><div className="results-review"><h3>Review</h3>{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><div className="review-header"><span className="review-number">Q{i+1}</span><span className={`review-badge ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}>{selectedAnswers[q.id]===q.correct?'✓':'✗'}</span></div><p className="review-question">{q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>);
    }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Caching Fundamentals Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-progress"><div className="progress-bar"><div className="progress-fill" style={{width:`${((currentQuestionIndex+1)/total)*100}%`}}></div></div></div><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Implement Cache-Aside Pattern</h1><span className="difficulty-badge intermediate">Intermediate</span></div><p className="assignment-description">Build a caching layer with get/set operations, TTL support, and hit ratio tracking.</p></header><div className="assignment-body"><h3>Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Implement CacheAside class with get(key) and set(key, value, ttl)</span></li><li><span className="req-number">2</span><span className="req-text">Simulate database with artificial delay (100-200ms)</span></li><li><span className="req-number">3</span><span className="req-text">Track and report cache hit/miss statistics</span></li><li><span className="req-number">4</span><span className="req-text">Implement TTL expiration for cache entries</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Assignment</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span><span className="mobile-topic">{topic}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2><p className="day-concepts">{concepts}</p></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><span className="nav-link prev disabled">&lt;&lt; Prev</span><Link to="/hld/week/4/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><div className="header-left"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></div></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week4Day1;
