import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week10Day4() {
  const weekNum = 10, dayNum = 4, topic = "Alerting & SLOs", concepts = "SLIs, SLOs, SLAs, error budgets, alert fatigue";
  
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
    { id: 1, question: "What is an SLI?", options: ["Service Level Investment", "Service Level Indicator - metric measuring service", "Security Level Index", "System Load Indicator"], correct: 1, explanation: "SLI is a quantitative measure of service behavior (e.g., latency, error rate, availability)." },
    { id: 2, question: "What is an SLO?", options: ["Service Level Objective - target value for SLI", "System Load Optimization", "Service Log Output", "Security Level Option"], correct: 0, explanation: "SLO is the target/threshold for an SLI (e.g., 99.9% availability, p99 latency < 200ms)." },
    { id: 3, question: "What is an error budget?", options: ["Cost of errors", "Allowed unreliability based on SLO", "Error logging limit", "Bug tracking metric"], correct: 1, explanation: "Error budget is how much unreliability you can have. 99.9% SLO = 0.1% error budget." },
    { id: 4, question: "What causes alert fatigue?", options: ["Too few alerts", "Too many non-actionable alerts", "No monitoring", "Perfect uptime"], correct: 1, explanation: "Alert fatigue occurs when too many alerts (especially false positives) cause people to ignore them." },
    { id: 5, question: "What makes a good alert?", options: ["Fires frequently", "Actionable and indicates real user impact", "Very sensitive", "Complex conditions"], correct: 1, explanation: "Good alerts are actionable (someone can fix it), urgent, and indicate real user impact." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Alerting & SLOs</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Alerting & SLOs</h1><div className="article-tags"><span className="tag">SLO</span><span className="tag">SLI</span><span className="tag">Error Budget</span><span className="tag">Alerting</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">SLI, SLO, SLA Hierarchy</h2>
        <div className="diagram-container">
          <div className="diagram-title">Service Level Concepts</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📊</span><span className="flow-node-label">SLI</span><span className="flow-node-sublabel">Indicator (Metric)</span></div>
            </div>
            <div className="flow-arrow down">↓ Target value becomes</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">🎯</span><span className="flow-node-label">SLO</span><span className="flow-node-sublabel">Objective (Internal)</span></div>
            </div>
            <div className="flow-arrow down">↓ Contractual becomes</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">📜</span><span className="flow-node-label">SLA</span><span className="flow-node-sublabel">Agreement (External)</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Understanding the Terms</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">SLI (Indicator)</div>
            <div className="concept-card-description">Quantitative measure: request latency, error rate, availability</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🎯</div>
            <div className="concept-card-title">SLO (Objective)</div>
            <div className="concept-card-description">Target value: 99.9% availability, p99 &lt; 200ms</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📜</div>
            <div className="concept-card-title">SLA (Agreement)</div>
            <div className="concept-card-description">Contract with consequences: credits/penalties if missed</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💰</div>
            <div className="concept-card-title">Error Budget</div>
            <div className="concept-card-description">Allowed failures: 99.9% = 43.2 min/month downtime</div>
          </div>
        </div>

        <h2 className="md-h2">Error Budget Calculation</h2>
        <table className="comparison-table">
          <thead><tr><th>SLO</th><th>Availability</th><th>Error Budget/Month</th><th>Error Budget/Year</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">99%</td><td>Two nines</td><td>7.2 hours</td><td>3.65 days</td></tr>
            <tr><td className="feature-name">99.9%</td><td>Three nines</td><td>43.2 minutes</td><td>8.76 hours</td></tr>
            <tr><td className="feature-name">99.99%</td><td>Four nines</td><td>4.32 minutes</td><td>52.6 minutes</td></tr>
            <tr><td className="feature-name">99.999%</td><td>Five nines</td><td>26 seconds</td><td>5.26 minutes</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Alerting Best Practices</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Actionable</h4>
              <p>Someone can do something about it right now</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Urgent</h4>
              <p>Needs attention now, not during work hours</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Symptomatic</h4>
              <p>Based on user impact, not internal causes</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Has Runbook</h4>
              <p>Link to documentation on how to investigate and resolve</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Alert Hierarchy</h2>
        <div className="diagram-container">
          <div className="diagram-title">Alert Severity Levels</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#EF4444'}}>
              <h4 style={{color: '#EF4444'}}>🚨 PAGE (Critical)</h4>
              <ul>
                <li>User-facing outage</li>
                <li>Data loss risk</li>
                <li>Security breach</li>
                <li>Wake someone up!</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#F59E0B'}}>
              <h4 style={{color: '#F59E0B'}}>📋 TICKET (Warning)</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Degraded performance</li>
                <li>→ Capacity concerns</li>
                <li>→ Non-critical errors</li>
                <li>→ Address during work hours</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">SLO-Based Alerting</h2>
        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Alert on Error Budget Burn Rate</h4>
            <p>Instead of: "Alert if error rate > 1%"</p>
            <p>Use: "Alert if burning error budget faster than sustainable"</p>
            <p>This accounts for SLO and gives context about impact.</p>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Avoid Alert Fatigue</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Too many alerts = ignored alerts</li>
              <li>Each alert should be actionable</li>
              <li>Review and tune alerts regularly</li>
              <li>Remove alerts that never fire or always fire</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>SLI = Metric, SLO = Target, SLA = Contract</li>
              <li>Error budget balances reliability and velocity</li>
              <li>Alert on symptoms (user impact), not causes</li>
              <li>Every alert needs a runbook</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Alerting & SLOs Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>SLO & Alerting Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Define SLIs and SLOs for an e-commerce checkout service</span></li><li><span className="req-number">2</span><span className="req-text">Calculate error budget for 99.9% availability SLO</span></li><li><span className="req-number">3</span><span className="req-text">Design alerting rules based on error budget burn rate</span></li><li><span className="req-number">4</span><span className="req-text">Create runbook template for critical alerts</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/10/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/10/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week10Day4;
