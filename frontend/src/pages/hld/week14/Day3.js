import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week14Day3() {
  const weekNum = 14, dayNum = 3, topic = "Distributed Cache Architecture", concepts = "Redis, Memcached, cache topologies";
  
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
    { id: 1, question: "What is a distributed cache?", options: ["Local memory cache", "Cache spread across multiple nodes for scale", "CDN cache", "Browser cache"], correct: 1, explanation: "A distributed cache spreads data across multiple nodes, providing shared caching for multiple app servers with high throughput." },
    { id: 2, question: "What is consistent hashing used for?", options: ["Encryption", "Distributing keys across cache nodes with minimal redistribution", "Data compression", "Authentication"], correct: 1, explanation: "Consistent hashing distributes keys across nodes so that adding/removing nodes only affects a small portion of keys." },
    { id: 3, question: "What is cache aside pattern?", options: ["Ignore cache", "App checks cache first, loads from DB on miss, then caches", "Write to cache only", "Delete cache always"], correct: 1, explanation: "Cache aside (lazy loading): app checks cache, on miss reads from DB, then populates cache." },
    { id: 4, question: "What is write-through cache?", options: ["Write to cache and DB simultaneously", "Write to cache only", "Write to DB only", "Delete from cache"], correct: 0, explanation: "Write-through writes to both cache and database together, ensuring consistency but adding write latency." },
    { id: 5, question: "What is cache eviction?", options: ["Adding data", "Removing data from cache when full", "Data encryption", "Cache backup"], correct: 1, explanation: "Cache eviction removes data when cache is full, using policies like LRU (Least Recently Used), LFU, FIFO." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Distributed Cache Architecture</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Distributed Cache Architecture</h1><div className="article-tags"><span className="tag">Redis</span><span className="tag">Memcached</span><span className="tag">Consistent Hashing</span><span className="tag">Eviction</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Why Distributed Cache?</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">⚡</div><div className="concept-card-title">Sub-millisecond</div><div className="concept-card-description">In-memory storage for fast reads</div></div>
          <div className="concept-card"><div className="concept-card-icon">📈</div><div className="concept-card-title">Horizontal Scale</div><div className="concept-card-description">Add nodes to handle more data</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔗</div><div className="concept-card-title">Shared Access</div><div className="concept-card-description">Multiple app servers share cache</div></div>
          <div className="concept-card"><div className="concept-card-icon">📉</div><div className="concept-card-title">DB Offload</div><div className="concept-card-description">Reduce database load by 80%+</div></div>
        </div>

        <h2 className="md-h2">Cache Topologies</h2>
        <div className="diagram-container">
          <div className="diagram-title">Distributed Cache Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">App Server 1</span></div>
              <div className="flow-node client"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">App Server 2</span></div>
              <div className="flow-node client"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">App Server 3</span></div>
            </div>
            <div className="flow-arrow down">↓ Consistent hash routing ↓</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">🗄️</span><span className="flow-node-label">Redis Node 1</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">🗄️</span><span className="flow-node-label">Redis Node 2</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">🗄️</span><span className="flow-node-label">Redis Node 3</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Caching Patterns</h2>
        <table className="comparison-table">
          <thead><tr><th>Pattern</th><th>Read</th><th>Write</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Cache Aside</td><td>Cache → DB on miss</td><td>DB only, invalidate cache</td><td>General purpose</td></tr>
            <tr><td className="feature-name">Read Through</td><td>Cache loads from DB</td><td>DB only</td><td>Simple read heavy</td></tr>
            <tr><td className="feature-name">Write Through</td><td>Always cache</td><td>Cache → DB sync</td><td>Consistency critical</td></tr>
            <tr><td className="feature-name">Write Behind</td><td>Always cache</td><td>Cache → DB async</td><td>Write heavy</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Eviction Policies</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">LRU</div><div className="step-content"><h4>Least Recently Used</h4><p>Remove least recently accessed items. Most common.</p></div></div>
          <div className="step-card"><div className="step-number">LFU</div><div className="step-content"><h4>Least Frequently Used</h4><p>Remove items accessed least often.</p></div></div>
          <div className="step-card"><div className="step-number">FIFO</div><div className="step-content"><h4>First In First Out</h4><p>Remove oldest items regardless of access.</p></div></div>
          <div className="step-card"><div className="step-number">TTL</div><div className="step-content"><h4>Time To Live</h4><p>Remove when expiration time reached.</p></div></div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Distributed cache provides shared, scalable caching</li>
              <li>Consistent hashing minimizes redistribution on node changes</li>
              <li>Cache-aside is most flexible pattern</li>
              <li>LRU is most common eviction policy</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Distributed Cache Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Cache Architecture Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design distributed cache for session storage (1M concurrent users)</span></li><li><span className="req-number">2</span><span className="req-text">Implement cache-aside pattern with fallback to database</span></li><li><span className="req-number">3</span><span className="req-text">Configure consistent hashing with virtual nodes</span></li><li><span className="req-number">4</span><span className="req-text">Design eviction strategy for memory-constrained environment</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/14/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/14/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week14Day3;
