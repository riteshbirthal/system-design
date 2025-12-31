import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week3Day4() {
  const weekNum = 3, dayNum = 4, topic = "Database Replication", concepts = "Master-Slave, Master-Master, Sync vs Async";
  
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
    { id: 1, question: "What is database replication?", options: ["Backup strategy", "Copying data to multiple servers", "Query optimization", "Index creation"], correct: 1, explanation: "Replication copies data across multiple database servers for availability and read scaling." },
    { id: 2, question: "In Master-Slave, where do writes go?", options: ["Any node", "Master only", "Slaves only", "Distributed equally"], correct: 1, explanation: "In Master-Slave replication, all writes go to master, slaves handle reads." },
    { id: 3, question: "Async replication advantage?", options: ["Strong consistency", "Lower write latency", "No data loss", "Simpler setup"], correct: 1, explanation: "Async replication has lower latency since master doesn't wait for slave acknowledgment." },
    { id: 4, question: "Sync replication guarantees?", options: ["Faster writes", "Data consistency across replicas", "No network overhead", "Automatic failover"], correct: 1, explanation: "Synchronous replication ensures all replicas have the data before confirming write." },
    { id: 5, question: "Master-Master allows?", options: ["Reads only", "Writes to any node", "Only backups", "Single point of failure"], correct: 1, explanation: "Master-Master allows writes to any node, but requires conflict resolution." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Database Replication</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Database Replication</h1><div className="article-tags"><span className="tag">Replication</span><span className="tag">High Availability</span><span className="tag">Scaling</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Replication?</h2>
        <p><strong>Replication</strong> is keeping copies of data on multiple database servers for high availability, fault tolerance, and read scaling.</p>

        <h2 className="md-h2">Replication Topologies</h2>
        <div className="diagram-container">
          <div className="diagram-title">Master-Slave Replication</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👤</span><span className="flow-node-label">Writes</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><span className="flow-node-icon">👑</span><span className="flow-node-label">Master</span><span className="flow-node-sublabel">Read + Write</span></div>
            </div>
            <div className="flow-arrow down">↓ Replicate</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">📋</span><span className="flow-node-label">Slave 1</span><span className="flow-node-sublabel">Read Only</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📋</span><span className="flow-node-label">Slave 2</span><span className="flow-node-sublabel">Read Only</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📋</span><span className="flow-node-label">Slave 3</span><span className="flow-node-sublabel">Read Only</span></div>
            </div>
            <div className="flow-arrow down">↑</div>
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👥</span><span className="flow-node-label">Reads</span><span className="flow-node-sublabel">Load balanced</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Sync vs Async Replication</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>Synchronous</th><th>Asynchronous</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Consistency</td><td>Strong</td><td>Eventual</td></tr>
            <tr><td className="feature-name">Write Latency</td><td>Higher (waits for ack)</td><td>Lower (returns immediately)</td></tr>
            <tr><td className="feature-name">Data Loss Risk</td><td>None</td><td>Possible on failure</td></tr>
            <tr><td className="feature-name">Network Dependency</td><td>High</td><td>Low</td></tr>
            <tr><td className="feature-name">Use Case</td><td>Financial systems</td><td>Most web apps</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Replication Patterns</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">👑</div>
            <div className="concept-card-title">Master-Slave</div>
            <div className="concept-card-description">One master for writes, multiple slaves for reads. Simple, good for read-heavy workloads.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">👑👑</div>
            <div className="concept-card-title">Master-Master</div>
            <div className="concept-card-description">Multiple masters accept writes. Needs conflict resolution. Better write availability.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Chain Replication</div>
            <div className="concept-card-description">Linear chain of nodes. Writes at head, reads at tail. Strong consistency.</div>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Replication improves availability and read performance</li>
              <li>Master-Slave: simple, writes to master only</li>
              <li>Sync: strong consistency, higher latency</li>
              <li>Async: lower latency, risk of stale reads</li>
              <li>Consider replication lag in application design</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Replication Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Replication Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design replication strategy for a social media platform</span></li><li><span className="req-number">2</span><span className="req-text">Consider read/write ratio of 100:1</span></li><li><span className="req-number">3</span><span className="req-text">Plan for failover scenarios</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/3/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/3/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week3Day4;
