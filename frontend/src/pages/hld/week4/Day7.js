import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week4Day7() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 4, dayNum = 7;
  const topic = "Weekly Hands-On";
  const concepts = "Comprehensive quiz + Project: Design a CDN";

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: false, color: '#E91E63' },
    { id: 'article', label: 'Project Brief', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Final Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Project', icon: '📝', available: true, color: '#FF9800' }
  ];

  const quizQuestions = [
    { id: 1, question: "What is the primary benefit of using a CDN?", options: ["Reduce database queries", "Serve content from geographically closer locations", "Encrypt data", "Provide authentication"], correct: 1, explanation: "CDNs serve content from edge locations closer to users, reducing latency." },
    { id: 2, question: "Which caching pattern writes to cache and DB synchronously?", options: ["Cache-Aside", "Read-Through", "Write-Through", "Write-Behind"], correct: 2, explanation: "Write-Through writes to both cache and database in the same operation." },
    { id: 3, question: "What problem does consistent hashing solve?", options: ["Data encryption", "Minimizing key redistribution when nodes change", "Cache stampede", "Data compression"], correct: 1, explanation: "Consistent hashing ensures only K/N keys need remapping when nodes change." },
    { id: 4, question: "Which eviction policy is best for temporal locality?", options: ["FIFO", "Random", "LRU", "LFU"], correct: 2, explanation: "LRU keeps recently accessed items, ideal for temporal locality patterns." },
    { id: 5, question: "What is Origin Shield in CDN architecture?", options: ["Firewall", "Middle-tier cache reducing origin load", "SSL management", "DDoS protection"], correct: 1, explanation: "Origin Shield consolidates requests to reduce origin server load." },
    { id: 6, question: "What is N+1 query problem?", options: ["Connection limit", "1 query for N items + N queries for related data", "Timeout", "Index issue"], correct: 1, explanation: "N+1 executes 1 query for list, then N queries for related data per item." },
    { id: 7, question: "How many hash slots does Redis Cluster use?", options: ["1024", "4096", "16384", "65536"], correct: 2, explanation: "Redis Cluster uses 16384 hash slots distributed across masters." },
    { id: 8, question: "Best cache invalidation for versioned static assets?", options: ["Manual purge", "Short TTL", "Versioned URLs", "Event-based"], correct: 2, explanation: "Versioned URLs allow long TTLs - when content changes, URL changes." },
    { id: 9, question: "What does 'Seq Scan' in EXPLAIN output indicate?", options: ["Optimized", "Full table scan - needs index", "Using cache", "Parallel"], correct: 1, explanation: "Seq Scan means full table scan, indicating missing or unused index." },
    { id: 10, question: "Target cache hit ratio for effective caching?", options: ["50%+", "70%+", "90%+", "99%+"], correct: 2, explanation: "90%+ hit ratio indicates effective caching strategy." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Week 4 Summary: Caching & Performance</h1><div className="article-meta"><span className="meta-item"><span className="meta-icon">📖</span> 10 min read</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Week 4 Learning Summary</h2>
        <ul>
          <li><strong>Day 1:</strong> Caching fundamentals, cache-aside, read/write-through patterns</li>
          <li><strong>Day 2:</strong> Eviction policies (LRU, LFU, FIFO, TTL), Redis configuration</li>
          <li><strong>Day 3:</strong> Mid-week practice quiz on caching concepts</li>
          <li><strong>Day 4:</strong> Distributed caching, Redis vs Memcached, consistent hashing</li>
          <li><strong>Day 5:</strong> CDN architecture, Cache-Control headers, edge computing</li>
          <li><strong>Day 6:</strong> Performance optimization, N+1 queries, profiling</li>
        </ul>

        <h2 className="md-h2">Key Concepts</h2>
        <h3 className="md-h3">Caching Patterns</h3>
        <ul>
          <li><strong>Cache-Aside:</strong> App manages cache, fetch on miss</li>
          <li><strong>Write-Through:</strong> Write to cache + DB synchronously</li>
          <li><strong>Write-Behind:</strong> Write to cache, async DB update</li>
        </ul>

        <h3 className="md-h3">Eviction Policies</h3>
        <ul>
          <li><strong>LRU:</strong> Least Recently Used (most common)</li>
          <li><strong>LFU:</strong> Least Frequently Used</li>
          <li><strong>TTL:</strong> Time-based expiration</li>
        </ul>

        <h3 className="md-h3">Distributed Caching</h3>
        <ul>
          <li><strong>Redis:</strong> Rich data structures, persistence, clustering</li>
          <li><strong>Memcached:</strong> Simple key-value, multi-threaded</li>
          <li><strong>Consistent Hashing:</strong> Minimize redistribution on node changes</li>
        </ul>

        <h3 className="md-h3">CDN & Performance</h3>
        <ul>
          <li><strong>CDN:</strong> Edge caching for global content delivery</li>
          <li><strong>Cache-Control:</strong> max-age, s-maxage, immutable</li>
          <li><strong>N+1 Fix:</strong> Eager loading (JOIN) or batch loading (IN)</li>
        </ul>

        <h2 className="md-h2">Interview Prep</h2>
        <ul>
          <li>Know Cache-Aside vs Write-Through trade-offs</li>
          <li>Be able to explain consistent hashing with diagram</li>
          <li>Discuss cache invalidation strategies</li>
          <li>Explain N+1 problem and solutions</li>
          <li>Design a CDN architecture</li>
        </ul>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex], answered = Object.keys(selectedAnswers).length;
    if (showResults) {
      const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;
      return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Week 4 Quiz Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span><span className="score-label">Score</span></div><p className="score-detail">{score} of {total} correct</p></div><div className="results-review"><h3>Review</h3>{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><div className="review-header"><span className="review-number">Q{i+1}</span><span className={`review-badge ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}>{selectedAnswers[q.id]===q.correct?'✓':'✗'}</span></div><p className="review-question">{q.question}</p><div className="review-answers"><p><strong>Your answer:</strong> {q.options[selectedAnswers[q.id]]||'None'}</p>{selectedAnswers[q.id]!==q.correct&&<p><strong>Correct:</strong> {q.options[q.correct]}</p>}</div><div className="explanation">{q.explanation}</div></div>))}</div><div className="results-actions"><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div></div>);
    }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Week 4 Comprehensive Quiz</h1><p className="quiz-description">Final assessment covering all Week 4 topics</p><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div><div className="stat-card"><span className="stat-value">70%</span><span className="stat-label">To Pass</span></div></div></header><div className="quiz-progress"><div className="progress-text">Question {currentQuestionIndex+1} of {total}</div><div className="progress-bar"><div className="progress-fill" style={{width:`${((currentQuestionIndex+1)/total)*100}%`}}></div></div><div className="answered-text">{answered} answered</div></div><div className="quiz-question-single"><div className="question-card"><div className="question-header"><span className="question-number">Q{currentQuestionIndex+1}</span></div><p className="question-text">{curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt; Prev</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''} ${selectedAnswers[q.id]!==undefined?'answered':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>Next &gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Design a CDN</h1><span className="difficulty-badge advanced">Advanced</span></div><p className="assignment-description">Design a Content Delivery Network that can serve static content globally with low latency, high availability, and efficient cache management.</p><div className="assignment-meta"><span className="meta-item"><span className="meta-icon">🏆</span> 200 points</span></div></header><div className="assignment-body"><h3>Functional Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Serve static content (images, videos, CSS, JS) from edge locations worldwide</span></li><li><span className="req-number">2</span><span className="req-text">Support cache invalidation/purging via API</span></li><li><span className="req-number">3</span><span className="req-text">Handle cache misses by fetching from origin server</span></li><li><span className="req-number">4</span><span className="req-text">Provide real-time analytics (hit/miss ratio, bandwidth)</span></li></ul><h3>Non-Functional Requirements</h3><ul className="requirements-list"><li><span className="req-number">5</span><span className="req-text">Latency: &lt;50ms for cached content from nearest PoP</span></li><li><span className="req-number">6</span><span className="req-text">Availability: 99.99% uptime</span></li><li><span className="req-number">7</span><span className="req-text">Scale: Handle 1 million requests per second globally</span></li></ul><h3>Design Components</h3><ul className="requirements-list"><li><span className="req-number">8</span><span className="req-text">GeoDNS for routing to nearest PoP</span></li><li><span className="req-number">9</span><span className="req-text">Origin Shield for reducing origin load</span></li><li><span className="req-number">10</span><span className="req-text">Consistent hashing for cache distribution</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Project</button><button className="download-btn">Download Template</button></div></div></div>);

  const renderEmptyState = (icon, title) => (<div className="content-panel"><div className="empty-state"><div className="empty-icon">{icon}</div><h3>{title}</h3><p>Not available for this day.</p></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span><span className="mobile-topic">{topic}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3><p>{concepts}</p></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''} ${!t.available?'disabled':''}`} onClick={()=>{if(t.available){setActiveTab(t.id);setMobileMenuOpen(false);}}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav><div className="mobile-menu-footer"><div className="mobile-day-nav"><Link to="/hld/week/4/day/6" className="nav-link prev">&lt;&lt; Day 6</Link><Link to="/hld/week/5/day/1" className="nav-link next">Week 5 &gt;&gt;</Link></div></div></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back to Course</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2><p className="day-concepts">{concepts}</p></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''} ${!t.available?'disabled':''}`} onClick={()=>t.available&&setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<><span className="nav-label">{t.label}</span>{t.available&&<span className="nav-count">1</span>}</>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/4/day/6" className="nav-link prev">&lt;&lt; Day 6</Link><Link to="/hld/week/5/day/1" className="nav-link next">Week 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><div className="header-left"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></div><div className="header-right"><span className="progress-indicator">Week {weekNum}, Day {dayNum}</span></div></header><div className="content-body">{activeTab==='video'&&renderEmptyState('🎬','Video Not Available')}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week4Day7;
