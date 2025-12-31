import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week14Day4() {
  const weekNum = 14, dayNum = 4, topic = "Redis vs Memcached", concepts = "Feature comparison, data types, persistence, clustering";
  
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
    { id: 1, question: "Which supports more data types?", options: ["Memcached", "Redis", "Both same", "Neither"], correct: 1, explanation: "Redis supports strings, lists, sets, sorted sets, hashes, streams, etc. Memcached only supports strings." },
    { id: 2, question: "Which supports persistence?", options: ["Memcached", "Redis", "Both", "Neither"], correct: 1, explanation: "Redis supports RDB snapshots and AOF logging for persistence. Memcached is purely in-memory." },
    { id: 3, question: "Which is simpler to set up?", options: ["Redis", "Memcached", "Both equal", "Neither"], correct: 1, explanation: "Memcached is simpler - single data type, no persistence. Redis has more features but more complexity." },
    { id: 4, question: "Which supports Pub/Sub?", options: ["Memcached", "Redis", "Both", "Neither"], correct: 1, explanation: "Redis has built-in Pub/Sub functionality. Memcached doesn't support pub/sub." },
    { id: 5, question: "When to choose Memcached over Redis?", options: ["Need pub/sub", "Simple string caching with multi-threaded performance", "Need sorted sets", "Need persistence"], correct: 1, explanation: "Memcached excels at simple string caching with multi-threaded performance for simple key-value use cases." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Redis vs Memcached</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Redis vs Memcached</h1><div className="article-tags"><span className="tag">Redis</span><span className="tag">Memcached</span><span className="tag">Comparison</span><span className="tag">In-Memory</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Feature Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>Redis</th><th>Memcached</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Data Types</td><td>Strings, Lists, Sets, Hashes, Sorted Sets, Streams</td><td>Strings only</td></tr>
            <tr><td className="feature-name">Persistence</td><td>RDB, AOF</td><td>None (pure cache)</td></tr>
            <tr><td className="feature-name">Replication</td><td>Master-Replica</td><td>None built-in</td></tr>
            <tr><td className="feature-name">Clustering</td><td>Redis Cluster</td><td>Client-side</td></tr>
            <tr><td className="feature-name">Pub/Sub</td><td>Yes</td><td>No</td></tr>
            <tr><td className="feature-name">Lua Scripts</td><td>Yes</td><td>No</td></tr>
            <tr><td className="feature-name">Threading</td><td>Single-threaded (6.0+ multi I/O)</td><td>Multi-threaded</td></tr>
            <tr><td className="feature-name">Max Key Size</td><td>512MB</td><td>250 bytes</td></tr>
            <tr><td className="feature-name">Max Value Size</td><td>512MB</td><td>1MB</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Redis Data Types</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">📝</div><div className="concept-card-title">Strings</div><div className="concept-card-description">Simple key-value, counters</div></div>
          <div className="concept-card"><div className="concept-card-icon">📋</div><div className="concept-card-title">Lists</div><div className="concept-card-description">Queues, recent items</div></div>
          <div className="concept-card"><div className="concept-card-icon">🎯</div><div className="concept-card-title">Sets</div><div className="concept-card-description">Unique items, intersections</div></div>
          <div className="concept-card"><div className="concept-card-icon">📊</div><div className="concept-card-title">Sorted Sets</div><div className="concept-card-description">Leaderboards, ranking</div></div>
          <div className="concept-card"><div className="concept-card-icon">🗂️</div><div className="concept-card-title">Hashes</div><div className="concept-card-description">Object storage, user profiles</div></div>
          <div className="concept-card"><div className="concept-card-icon">🌊</div><div className="concept-card-title">Streams</div><div className="concept-card-description">Event logs, messaging</div></div>
        </div>

        <h2 className="md-h2">Redis Persistence</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>RDB Snapshots</h4>
            <ul>
              <li>Point-in-time snapshots</li>
              <li>Compact file format</li>
              <li>Fast restarts</li>
              <li>May lose recent data</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>AOF (Append Only File)</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Logs every write operation</li>
              <li>→ More durable (less data loss)</li>
              <li>→ Larger file size</li>
              <li>→ Slower restarts</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">When to Choose</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">🔴</div><div className="step-content"><h4>Choose Redis When</h4><p>Need rich data types, persistence, pub/sub, Lua scripts, replication</p></div></div>
          <div className="step-card"><div className="step-number">🟢</div><div className="step-content"><h4>Choose Memcached When</h4><p>Simple string caching, multi-threaded performance, minimal complexity</p></div></div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Redis: Feature-rich with data structures, persistence</li>
              <li>Memcached: Simple, fast string caching, multi-threaded</li>
              <li>Redis for most use cases due to flexibility</li>
              <li>Memcached for pure simple caching at scale</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Redis vs Memcached Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Cache Technology Selection</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare Redis vs Memcached for your use case (write pros/cons)</span></li><li><span className="req-number">2</span><span className="req-text">Implement leaderboard using Redis sorted sets</span></li><li><span className="req-number">3</span><span className="req-text">Design session storage with Redis Hash</span></li><li><span className="req-number">4</span><span className="req-text">Configure Redis persistence (RDB + AOF) for production</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/14/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/14/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week14Day4;
