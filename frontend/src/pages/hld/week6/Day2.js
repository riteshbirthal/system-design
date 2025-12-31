import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week6Day2() {
  const weekNum = 6, dayNum = 2, topic = "Consistency Models", concepts = "Strong, Eventual, Causal, Linearizability";
  
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
    { id: 1, question: "What does strong consistency guarantee?", options: ["Eventually same data", "Always latest data or error", "Fastest response", "No guarantees"], correct: 1, explanation: "Strong consistency ensures every read returns the most recent write or an error, never stale data." },
    { id: 2, question: "What is eventual consistency?", options: ["Immediate consistency", "Data converges over time", "Never consistent", "Random consistency"], correct: 1, explanation: "Eventual consistency guarantees that, given enough time without updates, all replicas will converge to the same value." },
    { id: 3, question: "What does 'read-your-writes' consistency provide?", options: ["Others see your writes immediately", "You always see your own writes", "No one sees writes", "Delayed writes"], correct: 1, explanation: "Read-your-writes ensures a client always sees its own writes, though others might not see them immediately." },
    { id: 4, question: "Which consistency model has highest latency?", options: ["Eventual", "Strong/Linearizable", "Causal", "Read-your-writes"], correct: 1, explanation: "Strong/linearizable consistency has highest latency because it requires coordination between all replicas." },
    { id: 5, question: "Causal consistency preserves what?", options: ["Time ordering", "Cause-effect relationships", "All orderings", "No orderings"], correct: 1, explanation: "Causal consistency ensures operations that are causally related are seen in the same order by all nodes." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Consistency Models</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Consistency Models</h1><div className="article-tags"><span className="tag">Strong</span><span className="tag">Eventual</span><span className="tag">Causal</span><span className="tag">Linearizable</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Consistency?</h2>
        <p>In distributed systems, <strong>consistency</strong> defines the contract between the system and applications regarding what data is returned on reads after writes.</p>

        <h2 className="md-h2">Consistency Spectrum</h2>
        <div className="diagram-container">
          <div className="diagram-title">Strongest → Weakest Consistency</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">🔒</span><span className="flow-node-label">Linearizable</span><span className="flow-node-sublabel">Real-time ordering</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server"><span className="flow-node-icon">📊</span><span className="flow-node-label">Sequential</span><span className="flow-node-sublabel">Total order</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node cache"><span className="flow-node-icon">🔗</span><span className="flow-node-label">Causal</span><span className="flow-node-sublabel">Cause-effect</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node dns"><span className="flow-node-icon">⏰</span><span className="flow-node-label">Eventual</span><span className="flow-node-sublabel">Will converge</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Consistency Models Explained</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔒</div>
            <div className="concept-card-title">Strong (Linearizable)</div>
            <div className="concept-card-description">All reads return most recent write. Appears as single copy.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Sequential</div>
            <div className="concept-card-description">All operations appear in some total order consistent with program order.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">Causal</div>
            <div className="concept-card-description">Causally related operations seen in same order everywhere.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⏰</div>
            <div className="concept-card-title">Eventual</div>
            <div className="concept-card-description">Given no new updates, all replicas eventually converge.</div>
          </div>
        </div>

        <h2 className="md-h2">Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Model</th><th>Guarantee</th><th>Latency</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Strong</td><td>Latest data always</td><td>High</td><td>Banking, inventory</td></tr>
            <tr><td className="feature-name">Eventual</td><td>Will converge</td><td>Low</td><td>Social media, caching</td></tr>
            <tr><td className="feature-name">Causal</td><td>Cause-effect preserved</td><td>Medium</td><td>Collaborative apps</td></tr>
            <tr><td className="feature-name">Read-your-writes</td><td>See own writes</td><td>Medium</td><td>User sessions</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Session Guarantees</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Read Your Writes</h4>
              <p>After writing, subsequent reads by same client will see that write (or later).</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Monotonic Reads</h4>
              <p>Once a client reads a value, subsequent reads will never return older values.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Monotonic Writes</h4>
              <p>Writes by same client are applied in the order they were issued.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Writes Follow Reads</h4>
              <p>A write following a read will occur after the read's value was written.</p>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Choosing Consistency</h4>
            <p>Strong consistency for critical operations (payments), eventual for non-critical (likes). Many systems offer tunable consistency per operation.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Consistency is a spectrum from strong to eventual</li>
              <li>Stronger consistency = higher latency</li>
              <li>Eventual consistency offers best availability</li>
              <li>Causal preserves cause-effect relationships</li>
              <li>Choose based on application requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Consistency Models Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Multi-Consistency System Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design system with different consistency for different data types</span></li><li><span className="req-number">2</span><span className="req-text">Implement read-your-writes for user profiles</span></li><li><span className="req-number">3</span><span className="req-text">Use eventual consistency for activity feeds</span></li><li><span className="req-number">4</span><span className="req-text">Document trade-offs and implementation strategy</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/6/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/6/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week6Day2;
