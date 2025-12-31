import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week14Day5() {
  const weekNum = 14, dayNum = 5, topic = "Cache Patterns & Best Practices", concepts = "Thundering herd, cache stampede, cache warming";
  
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
    { id: 1, question: "What is the thundering herd problem?", options: ["Too many animals", "Many requests hit DB when cache expires simultaneously", "Cache overflow", "Network issue"], correct: 1, explanation: "Thundering herd occurs when many requests simultaneously hit the database when a popular cache entry expires." },
    { id: 2, question: "What is cache warming?", options: ["Heating servers", "Pre-populating cache before traffic arrives", "Clearing cache", "Database backup"], correct: 1, explanation: "Cache warming pre-populates the cache with expected data before traffic arrives to avoid cold start issues." },
    { id: 3, question: "What is a probabilistic early expiration?", options: ["Random deletion", "Randomly refresh cache before TTL to prevent stampede", "Encryption", "Compression"], correct: 1, explanation: "Probabilistic early expiration randomly refreshes cache entries before TTL to spread refresh load and prevent stampede." },
    { id: 4, question: "What is cache penetration?", options: ["Cache hack", "Requests for non-existent data bypass cache to DB", "Cache overflow", "Data corruption"], correct: 1, explanation: "Cache penetration occurs when requests for non-existent data always go to DB. Solved with bloom filters or caching nulls." },
    { id: 5, question: "What is the lock stampede solution?", options: ["Remove all locks", "One request rebuilds cache while others wait or get stale", "Add more databases", "Disable caching"], correct: 1, explanation: "Lock stampede solution: on cache miss, one request acquires lock to rebuild cache, others wait or return stale data." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Cache Patterns & Best Practices</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Cache Patterns & Best Practices</h1><div className="article-tags"><span className="tag">Thundering Herd</span><span className="tag">Cache Warming</span><span className="tag">Stampede</span><span className="tag">Best Practices</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Common Cache Problems</h2>
        <table className="comparison-table">
          <thead><tr><th>Problem</th><th>Description</th><th>Solution</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Thundering Herd</td><td>Mass DB hits on cache expiry</td><td>Lock, probabilistic refresh</td></tr>
            <tr><td className="feature-name">Cache Penetration</td><td>Non-existent data hits DB</td><td>Bloom filter, cache nulls</td></tr>
            <tr><td className="feature-name">Cache Avalanche</td><td>Many keys expire at once</td><td>Jittered TTL, staggered expiry</td></tr>
            <tr><td className="feature-name">Hot Key</td><td>One key gets too many requests</td><td>Local cache, replicas</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Solutions</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">🔒</div><div className="concept-card-title">Lock on Rebuild</div><div className="concept-card-description">One request rebuilds, others wait</div></div>
          <div className="concept-card"><div className="concept-card-icon">🎲</div><div className="concept-card-title">Probabilistic Refresh</div><div className="concept-card-description">Random early refresh before TTL</div></div>
          <div className="concept-card"><div className="concept-card-icon">🌡️</div><div className="concept-card-title">Cache Warming</div><div className="concept-card-description">Pre-populate before traffic</div></div>
          <div className="concept-card"><div className="concept-card-icon">🌸</div><div className="concept-card-title">Bloom Filter</div><div className="concept-card-description">Check existence before DB query</div></div>
        </div>

        <h2 className="md-h2">Best Practices</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><div className="step-content"><h4>Set Appropriate TTLs</h4><p>Balance freshness vs hit ratio. Add jitter to prevent mass expiry.</p></div></div>
          <div className="step-card"><div className="step-number">2</div><div className="step-content"><h4>Cache What Matters</h4><p>Hot data, expensive queries, slow computations. Don't cache everything.</p></div></div>
          <div className="step-card"><div className="step-number">3</div><div className="step-content"><h4>Monitor Cache Metrics</h4><p>Hit ratio, miss ratio, evictions, memory usage, latency.</p></div></div>
          <div className="step-card"><div className="step-number">4</div><div className="step-content"><h4>Handle Failures Gracefully</h4><p>Cache is optional - app should work (slower) without it.</p></div></div>
        </div>

        <h2 className="md-h2">Cache Metrics to Monitor</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>✅ Health Indicators</h4>
            <ul>
              <li>Hit ratio &gt; 90% (typical)</li>
              <li>Low eviction rate</li>
              <li>Stable memory usage</li>
              <li>Sub-ms latency</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#EF4444'}}>
            <h4 style={{color: '#EF4444'}}>❌ Warning Signs</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Hit ratio dropping</li>
              <li>→ High eviction rate</li>
              <li>→ Memory at limit</li>
              <li>→ Increasing latency</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Use locks or probabilistic refresh for thundering herd</li>
              <li>Bloom filters prevent cache penetration</li>
              <li>Jitter TTLs to prevent cache avalanche</li>
              <li>Monitor hit ratio and evictions continuously</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Cache Best Practices Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Production Cache Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Implement lock-based cache rebuild to prevent thundering herd</span></li><li><span className="req-number">2</span><span className="req-text">Add cache warming script for cold start scenarios</span></li><li><span className="req-number">3</span><span className="req-text">Implement TTL jitter (random variation) to prevent avalanche</span></li><li><span className="req-number">4</span><span className="req-text">Set up cache monitoring dashboard (hit ratio, latency, evictions)</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/14/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld" className="nav-link next">Course Home &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week14Day5;
