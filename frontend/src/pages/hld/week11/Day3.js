import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week11Day3() {
  const weekNum = 11, dayNum = 3, topic = "Health Checks & Session Persistence", concepts = "Active/passive checks, sticky sessions, connection draining";
  
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
    { id: 1, question: "What is the purpose of health checks?", options: ["Monitor network speed", "Detect unhealthy servers and remove from pool", "Check SSL certificates", "Measure bandwidth"], correct: 1, explanation: "Health checks detect unhealthy servers and automatically remove them from the load balancer pool to prevent routing traffic to failed servers." },
    { id: 2, question: "What is active health checking?", options: ["Checking servers manually", "Periodically probing servers with dedicated requests", "Monitoring actual traffic responses", "Using CPU metrics"], correct: 1, explanation: "Active health checks periodically send probe requests to servers to verify they're responding correctly, independent of user traffic." },
    { id: 3, question: "What is session persistence (sticky sessions)?", options: ["Long database connections", "Routing same client to same server", "Caching session data", "Encrypting sessions"], correct: 1, explanation: "Session persistence ensures all requests from a client during a session are routed to the same backend server." },
    { id: 4, question: "What is connection draining?", options: ["Closing all connections immediately", "Allowing in-flight requests to complete before removing server", "Draining database connections", "Memory cleanup"], correct: 1, explanation: "Connection draining stops new connections to a server being removed while allowing existing requests to complete gracefully." },
    { id: 5, question: "What is a deep health check?", options: ["Basic TCP connection", "Checking dependencies like database and cache", "DNS lookup", "Port scan"], correct: 1, explanation: "A deep health check verifies not just the server but also its dependencies (database, cache, external services) to ensure full functionality." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Health Checks & Session Persistence</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Health Checks & Session Persistence</h1><div className="article-tags"><span className="tag">Health Checks</span><span className="tag">Sticky Sessions</span><span className="tag">Connection Draining</span><span className="tag">Failover</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Why Health Checks Matter</h2>
        <p>Health checks ensure traffic is only routed to healthy, responsive servers. Without them, users could be directed to failed or degraded servers.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔍</div>
            <div className="concept-card-title">Detect Failures</div>
            <div className="concept-card-description">Identify servers that are down or not responding</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Automatic Recovery</div>
            <div className="concept-card-description">Re-add servers once they become healthy again</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">Prevent Errors</div>
            <div className="concept-card-description">Users never see errors from failed servers</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Operational Insight</div>
            <div className="concept-card-description">Track server health over time</div>
          </div>
        </div>

        <h2 className="md-h2">Types of Health Checks</h2>
        <table className="comparison-table">
          <thead><tr><th>Type</th><th>How It Works</th><th>Pros</th><th>Cons</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">TCP Check</td><td>Try TCP connection to server:port</td><td>Simple, low overhead</td><td>Doesn't verify app health</td></tr>
            <tr><td className="feature-name">HTTP Check</td><td>GET /health, expect HTTP 200</td><td>Verifies app responding</td><td>More overhead than TCP</td></tr>
            <tr><td className="feature-name">Deep Check</td><td>Check app + DB + cache + external</td><td>Comprehensive</td><td>Expensive, may cause cascading failures</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Active vs Passive Health Checks</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>🔄 Active Health Checks</h4>
            <ul>
              <li>LB periodically probes servers</li>
              <li>Dedicated health endpoint (/health)</li>
              <li>Detect issues before affecting users</li>
              <li>Configurable interval (e.g., every 10s)</li>
              <li>Additional network traffic</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>📊 Passive Health Checks</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Monitor actual user traffic responses</li>
              <li>→ Mark unhealthy on error threshold</li>
              <li>→ No additional probe traffic</li>
              <li>→ May take time to detect issues</li>
              <li>→ React to real problems</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Health Check Configuration</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">⏱️</div>
            <div className="step-content">
              <h4>Interval</h4>
              <p>How often to check (e.g., 10 seconds). Balance between detection speed and overhead.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">⏰</div>
            <div className="step-content">
              <h4>Timeout</h4>
              <p>How long to wait for response (e.g., 5 seconds). Must be less than interval.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">📉</div>
            <div className="step-content">
              <h4>Fall Threshold</h4>
              <p>Failures before marking unhealthy (e.g., 3). Prevents false positives from transient issues.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">📈</div>
            <div className="step-content">
              <h4>Rise Threshold</h4>
              <p>Successes before marking healthy again (e.g., 2). Ensures recovery is stable.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Session Persistence</h2>
        <p><strong>Sticky sessions</strong> ensure all requests from a client go to the same server. Important for stateful applications storing session data in memory.</p>

        <h3 className="md-h3">Persistence Methods</h3>
        <table className="comparison-table">
          <thead><tr><th>Method</th><th>How It Works</th><th>Considerations</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Source IP</td><td>Hash(client_ip) → server</td><td>NAT causes all users to hit same server</td></tr>
            <tr><td className="feature-name">Cookie-Based</td><td>LB inserts cookie with server ID</td><td>Best approach, works with NAT</td></tr>
            <tr><td className="feature-name">URL Parameter</td><td>Server ID in URL query string</td><td>Pollutes URLs, caching issues</td></tr>
            <tr><td className="feature-name">SSL Session ID</td><td>Use TLS session for persistence</td><td>Requires SSL passthrough</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Connection Draining</h2>
        <div className="diagram-container">
          <div className="diagram-title">Graceful Server Removal</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">1️⃣</span><span className="flow-node-label">Mark for Removal</span><span className="flow-node-sublabel">Stop new connections</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">2️⃣</span><span className="flow-node-label">Drain Period</span><span className="flow-node-sublabel">Wait for in-flight requests</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">3️⃣</span><span className="flow-node-label">Remove from Pool</span><span className="flow-node-sublabel">Fully disconnected</span></div>
            </div>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Best Practice: Avoid Sticky Sessions</h4>
            <p>Design stateless applications where possible. Store session data in Redis or a database. This allows any server to handle any request, improving availability and scaling.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Active health checks probe servers; passive monitors real traffic</li>
              <li>Configure fall/rise thresholds to prevent flapping</li>
              <li>Use cookie-based persistence if sticky sessions needed</li>
              <li>Prefer stateless design over sticky sessions</li>
              <li>Always implement connection draining for graceful shutdowns</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Health Checks Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Health Check Strategy Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design health check endpoint for a service with DB and cache dependencies</span></li><li><span className="req-number">2</span><span className="req-text">Configure appropriate intervals, timeouts, and thresholds</span></li><li><span className="req-number">3</span><span className="req-text">Implement graceful shutdown with connection draining</span></li><li><span className="req-number">4</span><span className="req-text">Compare when to use sticky sessions vs external session storage</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/11/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/11/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week11Day3;
