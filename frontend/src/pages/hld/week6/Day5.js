import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week6Day5() {
  const weekNum = 6, dayNum = 5, topic = "Designing for Consistency", concepts = "Conflict Resolution, CRDTs, Saga Pattern, 2PC";
  
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
    { id: 1, question: "What is Last-Write-Wins (LWW)?", options: ["First update wins", "Latest timestamp update wins", "Random selection", "Manual merge"], correct: 1, explanation: "LWW resolves conflicts by keeping the update with the most recent timestamp." },
    { id: 2, question: "What are CRDTs?", options: ["Compression algorithms", "Conflict-free Replicated Data Types", "Cache systems", "Database types"], correct: 1, explanation: "CRDTs are data structures designed to automatically merge concurrent updates without conflicts." },
    { id: 3, question: "What is the Saga pattern used for?", options: ["Data caching", "Distributed transactions without 2PC", "Load balancing", "Message routing"], correct: 1, explanation: "Saga manages distributed transactions as a sequence of local transactions with compensating actions for rollback." },
    { id: 4, question: "What is a problem with Two-Phase Commit (2PC)?", options: ["Too fast", "Blocking if coordinator fails", "No consistency", "High availability"], correct: 1, explanation: "2PC is blocking - if coordinator fails during commit, participants wait indefinitely." },
    { id: 5, question: "Vector clocks are used for?", options: ["Time synchronization", "Detecting concurrent updates and causality", "Load balancing", "Encryption"], correct: 1, explanation: "Vector clocks track causality between events, helping detect concurrent updates that may conflict." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Designing for Consistency</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Designing for Consistency</h1><div className="article-tags"><span className="tag">Conflict Resolution</span><span className="tag">CRDT</span><span className="tag">Saga</span><span className="tag">2PC</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Conflict Resolution Strategies</h2>
        <p>In distributed systems with replication, concurrent updates can create conflicts. Here are common resolution strategies:</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⏰</div>
            <div className="concept-card-title">Last-Write-Wins</div>
            <div className="concept-card-description">Latest timestamp wins. Simple but may lose data.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔢</div>
            <div className="concept-card-title">Vector Clocks</div>
            <div className="concept-card-description">Track causality to detect true conflicts for manual resolution.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">CRDTs</div>
            <div className="concept-card-description">Data structures that merge automatically without conflicts.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">👤</div>
            <div className="concept-card-title">Application Logic</div>
            <div className="concept-card-description">Custom merge logic based on business rules.</div>
          </div>
        </div>

        <h2 className="md-h2">CRDTs (Conflict-free Replicated Data Types)</h2>
        <table className="comparison-table">
          <thead><tr><th>CRDT Type</th><th>Description</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">G-Counter</td><td>Grow-only counter (increment only)</td><td>Like counts, page views</td></tr>
            <tr><td className="feature-name">PN-Counter</td><td>Positive-negative counter</td><td>Cart quantities, inventory</td></tr>
            <tr><td className="feature-name">G-Set</td><td>Grow-only set (add only)</td><td>Tags, followers</td></tr>
            <tr><td className="feature-name">OR-Set</td><td>Observed-remove set</td><td>Shopping cart items</td></tr>
            <tr><td className="feature-name">LWW-Register</td><td>Last-writer-wins register</td><td>User profiles, settings</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Saga Pattern</h2>
        <p>The <strong>Saga pattern</strong> manages distributed transactions as a sequence of local transactions with compensating actions.</p>

        <div className="diagram-container">
          <div className="diagram-title">Saga: Order Processing</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">1</span><span className="flow-node-label">Create Order</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server"><span className="flow-node-icon">2</span><span className="flow-node-label">Reserve Inventory</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node cache"><span className="flow-node-icon">3</span><span className="flow-node-label">Process Payment</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node dns"><span className="flow-node-icon">4</span><span className="flow-node-label">Ship Order</span></div>
            </div>
            <div className="flow-arrow down">↓ Failure? Compensate ↓</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">↩️</span><span className="flow-node-label">Cancel Order → Release Inventory → Refund</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Two-Phase Commit (2PC)</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Prepare Phase</h4>
              <p>Coordinator asks all participants if they can commit. Participants respond yes/no.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Commit Phase</h4>
              <p>If all say yes, coordinator sends commit. If any says no, coordinator sends abort.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">2PC vs Saga</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
            <h4 style={{color: 'var(--color-primary)'}}>🔒 Two-Phase Commit</h4>
            <ul>
              <li>Strong consistency</li>
              <li>Atomic across all participants</li>
              <li>Blocking (coordinator failure)</li>
              <li>Tight coupling</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-success)'}}>
            <h4 style={{color: 'var(--color-success)'}}>🔄 Saga Pattern</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Eventual consistency</li>
              <li>→ Non-blocking</li>
              <li>→ Loose coupling</li>
              <li>→ Complex compensation logic</li>
            </ul>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Choosing the Right Approach</h4>
            <p>Use 2PC for tightly-coupled transactions needing atomicity. Use Saga for microservices with long-running operations. Use CRDTs when conflicts can be auto-merged.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>LWW is simple but may lose updates</li>
              <li>CRDTs auto-merge without conflicts</li>
              <li>Saga uses compensating transactions</li>
              <li>2PC provides atomicity but is blocking</li>
              <li>Choose based on consistency requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Consistency Design Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Saga Pattern Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Implement saga for order processing with 4 services</span></li><li><span className="req-number">2</span><span className="req-text">Design compensating transactions for each step</span></li><li><span className="req-number">3</span><span className="req-text">Handle partial failures with rollback</span></li><li><span className="req-number">4</span><span className="req-text">Compare with 2PC approach for same scenario</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/6/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/7/day/1" className="nav-link next">Week 7 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week6Day5;
