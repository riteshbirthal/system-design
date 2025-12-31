import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week7Day4() {
  const weekNum = 7, dayNum = 4, topic = "Replication Strategies", concepts = "Master-Slave, Multi-Master, Sync vs Async";
  
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
    { id: 1, question: "What is the main purpose of replication?", options: ["Data compression", "High availability and fault tolerance", "Faster writes", "Data encryption"], correct: 1, explanation: "Replication creates copies of data across nodes for high availability and fault tolerance if a node fails." },
    { id: 2, question: "In single-leader replication, where do writes go?", options: ["Any node", "Only the leader", "All nodes simultaneously", "Random node"], correct: 1, explanation: "In single-leader (master-slave), all writes go to the leader, which replicates to followers." },
    { id: 3, question: "What is asynchronous replication?", options: ["Leader waits for all replicas", "Leader doesn't wait for replica confirmation", "No replication", "Instant replication"], correct: 1, explanation: "In async replication, the leader confirms write immediately without waiting for replicas - faster but may lose data." },
    { id: 4, question: "What is the main challenge of multi-leader replication?", options: ["Slow reads", "Conflict resolution", "No availability", "Single point of failure"], correct: 1, explanation: "Multi-leader allows writes to multiple nodes, requiring conflict resolution when same data is modified." },
    { id: 5, question: "Leaderless replication uses what for consistency?", options: ["Single coordinator", "Quorum reads/writes", "No mechanism", "Time synchronization"], correct: 1, explanation: "Leaderless systems use quorum (W + R > N) to ensure reads see recent writes without a leader." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Replication Strategies</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Replication Strategies</h1><div className="article-tags"><span className="tag">Master-Slave</span><span className="tag">Multi-Master</span><span className="tag">Leaderless</span><span className="tag">Sync</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Why Replication?</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">High Availability</div>
            <div className="concept-card-description">System continues working if nodes fail</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📖</div>
            <div className="concept-card-title">Read Scaling</div>
            <div className="concept-card-description">Distribute read load across replicas</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🌍</div>
            <div className="concept-card-title">Geo-distribution</div>
            <div className="concept-card-description">Keep data close to users</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💾</div>
            <div className="concept-card-title">Durability</div>
            <div className="concept-card-description">Data survives hardware failures</div>
          </div>
        </div>

        <h2 className="md-h2">Replication Architectures</h2>
        <table className="comparison-table">
          <thead><tr><th>Type</th><th>Description</th><th>Pros</th><th>Cons</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Single-Leader</td><td>One leader handles writes</td><td>Simple, no conflicts</td><td>Single point for writes</td></tr>
            <tr><td className="feature-name">Multi-Leader</td><td>Multiple nodes accept writes</td><td>High availability</td><td>Conflict resolution needed</td></tr>
            <tr><td className="feature-name">Leaderless</td><td>Any node accepts reads/writes</td><td>No single point of failure</td><td>Complex consistency</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Single-Leader (Master-Slave)</h2>
        <div className="diagram-container">
          <div className="diagram-title">Single-Leader Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">✍️</span><span className="flow-node-label">Writes</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server"><span className="flow-node-icon">👑</span><span className="flow-node-label">Leader</span><span className="flow-node-sublabel">Primary</span></div>
            </div>
            <div className="flow-arrow down">↓ Replicate</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">📋</span><span className="flow-node-label">Follower 1</span></div>
              <div className="flow-node database"><span className="flow-node-icon">📋</span><span className="flow-node-label">Follower 2</span></div>
              <div className="flow-node database"><span className="flow-node-icon">📋</span><span className="flow-node-label">Follower 3</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Synchronous vs Asynchronous</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
            <h4 style={{color: 'var(--color-primary)'}}>🔄 Synchronous</h4>
            <ul>
              <li>Leader waits for replica confirmation</li>
              <li>Strong consistency guaranteed</li>
              <li>Higher latency</li>
              <li>Lower availability (replica failure blocks)</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-success)'}}>
            <h4 style={{color: 'var(--color-success)'}}>⚡ Asynchronous</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Leader confirms immediately</li>
              <li>→ Eventual consistency</li>
              <li>→ Lower latency</li>
              <li>→ May lose recent writes on failure</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Failover Process</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Detect Failure</h4>
              <p>Heartbeat timeout or health check failure detects leader is down.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Elect New Leader</h4>
              <p>Followers elect new leader (most up-to-date replica preferred).</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Reconfigure</h4>
              <p>Clients redirect to new leader, old leader becomes follower on recovery.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Leaderless Replication</h2>
        <div className="diagram-container">
          <div className="diagram-title">Quorum Reads/Writes</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📝</span><span className="flow-node-label">Client</span><span className="flow-node-sublabel">Write to W nodes</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server"><span className="flow-node-icon">✅</span><span className="flow-node-label">Node 1</span></div>
              <div className="flow-node server"><span className="flow-node-icon">✅</span><span className="flow-node-label">Node 2</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">❌</span><span className="flow-node-label">Node 3</span></div>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Quorum Formula</h4>
            <p>W + R {">"} N ensures overlap. With N=3, W=2, R=2: at least one read node has the latest write. This is tunable consistency!</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Single-leader: simple, no conflicts, bottleneck for writes</li>
              <li>Multi-leader: high availability, needs conflict resolution</li>
              <li>Leaderless: no SPOF, uses quorum for consistency</li>
              <li>Sync: strong consistency, higher latency</li>
              <li>Async: lower latency, may lose recent writes</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Replication Strategies Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Global Replication Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design replication strategy for global service (US, EU, Asia)</span></li><li><span className="req-number">2</span><span className="req-text">Handle leader failover scenario with minimal data loss</span></li><li><span className="req-number">3</span><span className="req-text">Choose sync vs async based on consistency requirements</span></li><li><span className="req-number">4</span><span className="req-text">Document replication lag monitoring strategy</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/7/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/7/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week7Day4;
