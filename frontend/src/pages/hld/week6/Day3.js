import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week6Day3() {
  const weekNum = 6, dayNum = 3, topic = "ACID vs BASE", concepts = "Transactions, Atomicity, Isolation, Eventual Consistency";
  
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
    { id: 1, question: "What does ACID stand for?", options: ["Async, Cache, Index, Data", "Atomicity, Consistency, Isolation, Durability", "Available, Consistent, Indexed, Distributed", "Application, Connection, Interface, Database"], correct: 1, explanation: "ACID: Atomicity, Consistency, Isolation, Durability - the four properties of database transactions." },
    { id: 2, question: "What does Atomicity guarantee?", options: ["Speed", "All or nothing execution", "Data encryption", "High availability"], correct: 1, explanation: "Atomicity ensures a transaction either completes entirely or has no effect - all or nothing." },
    { id: 3, question: "What does BASE stand for?", options: ["Basic Available Standard Environment", "Basically Available, Soft state, Eventually consistent", "Backend, API, Service, Engine", "None of these"], correct: 1, explanation: "BASE: Basically Available, Soft state, Eventually consistent - an alternative to ACID for distributed systems." },
    { id: 4, question: "Which isolation level prevents dirty reads?", options: ["Read Uncommitted", "Read Committed", "Serializable only", "None"], correct: 1, explanation: "Read Committed and higher isolation levels prevent dirty reads (reading uncommitted changes)." },
    { id: 5, question: "When should you prefer BASE over ACID?", options: ["Financial transactions", "High availability distributed systems", "Single database", "Never"], correct: 1, explanation: "BASE is preferred for distributed systems where availability is more important than strict consistency." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>ACID vs BASE</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>ACID vs BASE</h1><div className="article-tags"><span className="tag">ACID</span><span className="tag">BASE</span><span className="tag">Transactions</span><span className="tag">Consistency</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">ACID Properties</h2>
        <p><strong>ACID</strong> defines the properties that guarantee reliable database transactions, ensuring data integrity even in failure scenarios.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⚛️</div>
            <div className="concept-card-title">Atomicity</div>
            <div className="concept-card-description">All operations succeed or all fail - no partial transactions</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">✅</div>
            <div className="concept-card-title">Consistency</div>
            <div className="concept-card-description">Database moves from one valid state to another</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔒</div>
            <div className="concept-card-title">Isolation</div>
            <div className="concept-card-description">Concurrent transactions don't interfere with each other</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💾</div>
            <div className="concept-card-title">Durability</div>
            <div className="concept-card-description">Committed transactions survive system failures</div>
          </div>
        </div>

        <h2 className="md-h2">BASE Properties</h2>
        <p><strong>BASE</strong> is an alternative model for distributed systems that prioritizes availability over strict consistency.</p>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">B</div>
            <div className="step-content">
              <h4>Basically Available</h4>
              <p>System guarantees availability - always responds, even if with stale data.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">S</div>
            <div className="step-content">
              <h4>Soft State</h4>
              <p>System state may change over time due to eventual consistency propagation.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">E</div>
            <div className="step-content">
              <h4>Eventually Consistent</h4>
              <p>System will become consistent over time if no new updates are made.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">ACID vs BASE Comparison</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
            <h4 style={{color: 'var(--color-primary)'}}>🔒 ACID</h4>
            <ul>
              <li>Strong consistency</li>
              <li>Isolation guaranteed</li>
              <li>Focus on commit</li>
              <li>Pessimistic approach</li>
              <li>Complex transactions</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-success)'}}>
            <h4 style={{color: 'var(--color-success)'}}>⚡ BASE</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Weak consistency</li>
              <li>→ Soft state</li>
              <li>→ Focus on availability</li>
              <li>→ Optimistic approach</li>
              <li>→ Simple operations</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Transaction Isolation Levels</h2>
        <table className="comparison-table">
          <thead><tr><th>Level</th><th>Dirty Read</th><th>Non-repeatable Read</th><th>Phantom Read</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Read Uncommitted</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
            <tr><td className="feature-name">Read Committed</td><td>No</td><td>Yes</td><td>Yes</td></tr>
            <tr><td className="feature-name">Repeatable Read</td><td>No</td><td>No</td><td>Yes</td></tr>
            <tr><td className="feature-name">Serializable</td><td>No</td><td>No</td><td>No</td></tr>
          </tbody>
        </table>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Consistency in ACID vs CAP</h4>
            <p>ACID consistency means database constraints are preserved. CAP consistency means all nodes see the same data. These are different concepts!</p>
          </div>
        </div>

        <h2 className="md-h2">When to Use Each</h2>
        <table className="comparison-table">
          <thead><tr><th>Use ACID</th><th>Use BASE</th></tr></thead>
          <tbody>
            <tr><td>Financial transactions</td><td>Social media feeds</td></tr>
            <tr><td>Inventory management</td><td>Analytics/metrics</td></tr>
            <tr><td>Booking systems</td><td>Shopping carts</td></tr>
            <tr><td>User authentication</td><td>Caching layers</td></tr>
          </tbody>
        </table>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>ACID guarantees strong consistency and isolation</li>
              <li>BASE prioritizes availability over consistency</li>
              <li>Higher isolation = lower concurrency</li>
              <li>Use ACID for critical transactions</li>
              <li>Use BASE for high-scale distributed systems</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>ACID vs BASE Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Transaction Design Exercise</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare ACID vs BASE for different e-commerce scenarios</span></li><li><span className="req-number">2</span><span className="req-text">Design transaction isolation for multi-tenant SaaS</span></li><li><span className="req-number">3</span><span className="req-text">Identify scenarios where BASE is acceptable</span></li><li><span className="req-number">4</span><span className="req-text">Document hybrid ACID+BASE architecture</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/6/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/6/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week6Day3;
