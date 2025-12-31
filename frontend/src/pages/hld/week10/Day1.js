import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week10Day1() {
  const weekNum = 10, dayNum = 1, topic = "Three Pillars of Observability", concepts = "Metrics, Logs, Traces - understanding system behavior";
  
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
    { id: 1, question: "What is observability?", options: ["Performance testing", "Ability to understand internal state from external outputs", "Database management", "Load balancing"], correct: 1, explanation: "Observability lets you understand WHY something is happening by examining outputs like metrics, logs, and traces." },
    { id: 2, question: "What are the three pillars of observability?", options: ["CPU, Memory, Disk", "Metrics, Logs, Traces", "Read, Write, Delete", "Auth, Cache, Queue"], correct: 1, explanation: "The three pillars are Metrics (numerical), Logs (events), and Traces (request flow across services)." },
    { id: 3, question: "What is a metric?", options: ["Log message", "Numerical measurement over time", "Database record", "API endpoint"], correct: 1, explanation: "Metrics are numerical measurements aggregated over time (counts, gauges, histograms)." },
    { id: 4, question: "What is distributed tracing?", options: ["Log aggregation", "Tracking request flow across services", "Database indexing", "Load balancing"], correct: 1, explanation: "Distributed tracing follows a request as it flows through multiple services, capturing timing and relationships." },
    { id: 5, question: "What does a trace consist of?", options: ["Logs and metrics", "Multiple spans", "Database queries", "API calls only"], correct: 1, explanation: "A trace consists of multiple spans, each representing a single operation within the request journey." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Three Pillars of Observability</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Three Pillars of Observability</h1><div className="article-tags"><span className="tag">Observability</span><span className="tag">Metrics</span><span className="tag">Logs</span><span className="tag">Traces</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Monitoring vs Observability</h2>
        <p><strong>Monitoring</strong> tells you WHEN something is wrong (known unknowns). <strong>Observability</strong> tells you WHY it's wrong (unknown unknowns). In complex distributed systems, observability is essential.</p>

        <div className="diagram-container">
          <div className="diagram-title">Monitoring vs Observability</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>📊 Monitoring</h4>
              <ul>
                <li>Predefined metrics and thresholds</li>
                <li>Alerts when something breaks</li>
                <li>"Is the system healthy?"</li>
                <li>Reactive approach</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>🔍 Observability</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Explore without prior knowledge</li>
                <li>→ Understand WHY issues occur</li>
                <li>→ "What is the system doing?"</li>
                <li>→ Proactive and exploratory</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">The Three Pillars</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📈</div>
            <div className="concept-card-title">Metrics</div>
            <div className="concept-card-description">Numerical measurements over time - counts, gauges, histograms. Good for trends and alerting.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📝</div>
            <div className="concept-card-title">Logs</div>
            <div className="concept-card-description">Discrete events with timestamps. Rich context for debugging and forensics.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">Traces</div>
            <div className="concept-card-description">Request flow across services. Shows timing, relationships, and bottlenecks.</div>
          </div>
        </div>

        <h2 className="md-h2">How They Work Together</h2>
        <div className="diagram-container">
          <div className="diagram-title">Incident Investigation Flow</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📈</span><span className="flow-node-label">METRICS</span><span className="flow-node-sublabel">Error rate spike!</span></div>
            </div>
            <div className="flow-arrow down">↓ What happened?</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">📝</span><span className="flow-node-label">LOGS</span><span className="flow-node-sublabel">Find error messages</span></div>
            </div>
            <div className="flow-arrow down">↓ Where did it fail?</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">🔗</span><span className="flow-node-label">TRACES</span><span className="flow-node-sublabel">Follow request path</span></div>
            </div>
            <div className="flow-arrow down">↓ ROOT CAUSE FOUND</div>
          </div>
        </div>

        <h2 className="md-h2">Comparison of Pillars</h2>
        <table className="comparison-table">
          <thead><tr><th>Aspect</th><th>Metrics</th><th>Logs</th><th>Traces</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Data Type</td><td>Numerical</td><td>Text/JSON</td><td>Spans</td></tr>
            <tr><td className="feature-name">Cardinality</td><td>Low</td><td>High</td><td>Medium</td></tr>
            <tr><td className="feature-name">Storage Cost</td><td>Cheap</td><td>Expensive</td><td>Medium</td></tr>
            <tr><td className="feature-name">Best For</td><td>Trends, Alerts</td><td>Debugging</td><td>Latency Analysis</td></tr>
            <tr><td className="feature-name">Question</td><td>How much?</td><td>What happened?</td><td>Where?</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Why Observability Matters</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Complex Distributed Systems</h4>
              <p>Microservices create many interaction points - traditional monitoring can't capture full picture</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Faster Incident Resolution</h4>
              <p>Quickly identify root cause, reduce MTTR (Mean Time To Resolution)</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Performance Optimization</h4>
              <p>Identify bottlenecks across services, understand user experience impact</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Proactive Detection</h4>
              <p>Catch issues before users notice, identify trends and anomalies</p>
            </div>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Observability = Metrics + Logs + Traces</li>
              <li>Metrics for trends, Logs for details, Traces for flow</li>
              <li>Use all three together for effective debugging</li>
              <li>Essential for distributed systems</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Observability Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Observability Strategy</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design observability strategy for a 10-service microservices platform</span></li><li><span className="req-number">2</span><span className="req-text">Define key metrics, log formats, and tracing approach</span></li><li><span className="req-number">3</span><span className="req-text">Create incident investigation playbook using all three pillars</span></li><li><span className="req-number">4</span><span className="req-text">Estimate storage costs for each pillar</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/9/day/5" className="nav-link prev">&lt;&lt; Week 9</Link><Link to="/hld/week/10/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week10Day1;
