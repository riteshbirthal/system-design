import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week13Day2() {
  const weekNum = 13, dayNum = 2, topic = "Gateway Features", concepts = "Rate limiting, auth, transformation, circuit breaker";
  
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
    { id: 1, question: "What is the token bucket rate limiting algorithm?", options: ["Fixed counter", "Tokens added at rate, consumed per request", "Sliding window", "No limiting"], correct: 1, explanation: "Token bucket adds tokens at a fixed rate. Each request consumes a token. If no tokens, request is rejected or queued." },
    { id: 2, question: "What does a circuit breaker do at the gateway?", options: ["Electrical protection", "Stops routing to failing service after threshold", "Password encryption", "Load balancing"], correct: 1, explanation: "Circuit breaker stops sending requests to a failing service after a threshold, allowing it time to recover." },
    { id: 3, question: "What is request transformation?", options: ["Encryption", "Modifying request headers, body, or URL before forwarding", "Caching", "Authentication"], correct: 1, explanation: "Request transformation modifies the incoming request (headers, body, URL) before routing to the backend." },
    { id: 4, question: "Why validate JWT at the gateway?", options: ["Storage", "Offload auth from services, reject invalid early", "Improve latency", "Database access"], correct: 1, explanation: "Validating JWT at gateway rejects invalid requests early and offloads authentication from individual services." },
    { id: 5, question: "What is service discovery in gateway context?", options: ["Finding bugs", "Dynamically discovering backend service instances", "DNS lookup", "Port scanning"], correct: 1, explanation: "Service discovery allows the gateway to dynamically find and route to available service instances." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Gateway Features</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Gateway Features</h1><div className="article-tags"><span className="tag">Rate Limiting</span><span className="tag">Circuit Breaker</span><span className="tag">Transformation</span><span className="tag">Caching</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Rate Limiting Algorithms</h2>
        <table className="comparison-table">
          <thead><tr><th>Algorithm</th><th>How It Works</th><th>Pros/Cons</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Fixed Window</td><td>Count requests per time window</td><td>Simple; burst at window boundaries</td></tr>
            <tr><td className="feature-name">Sliding Window</td><td>Rolling count over time</td><td>Smooth; more complex</td></tr>
            <tr><td className="feature-name">Token Bucket</td><td>Tokens refill at rate, consumed per request</td><td>Allows bursts; configurable</td></tr>
            <tr><td className="feature-name">Leaky Bucket</td><td>Process at constant rate</td><td>Smooth output; may queue</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Circuit Breaker Pattern</h2>
        <div className="diagram-container">
          <div className="diagram-title">Circuit Breaker States</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">✅</span><span className="flow-node-label">CLOSED</span><span className="flow-node-sublabel">Normal, requests pass</span></div>
              <div className="flow-arrow">→ failures exceed threshold →</div>
              <div className="flow-node cache"><span className="flow-node-icon">🚫</span><span className="flow-node-label">OPEN</span><span className="flow-node-sublabel">Requests fail fast</span></div>
            </div>
            <div className="flow-arrow down">↑ success ← ↓ timeout</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">🔄</span><span className="flow-node-label">HALF-OPEN</span><span className="flow-node-sublabel">Test requests</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Request/Response Transformation</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">📝</div><div className="concept-card-title">Header Manipulation</div><div className="concept-card-description">Add X-Request-ID, remove internal headers</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔗</div><div className="concept-card-title">URL Rewriting</div><div className="concept-card-description">/api/v1/users → /internal/user-service</div></div>
          <div className="concept-card"><div className="concept-card-icon">📦</div><div className="concept-card-title">Body Transform</div><div className="concept-card-description">Convert JSON structure, filter fields</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔄</div><div className="concept-card-title">Protocol Convert</div><div className="concept-card-description">REST to gRPC, SOAP to JSON</div></div>
        </div>

        <h2 className="md-h2">Caching at Gateway</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><div className="step-content"><h4>What to Cache</h4><p>GET requests, static responses, frequently accessed data</p></div></div>
          <div className="step-card"><div className="step-number">2</div><div className="step-content"><h4>Cache Key</h4><p>URL + relevant headers (Accept-Language, Authorization)</p></div></div>
          <div className="step-card"><div className="step-number">3</div><div className="step-content"><h4>Invalidation</h4><p>TTL-based, event-based, or manual purge</p></div></div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Token bucket allows bursts while maintaining average rate</li>
              <li>Circuit breaker prevents cascading failures</li>
              <li>Transformation adapts between client and backend formats</li>
              <li>Cache GET responses at gateway for performance</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Gateway Features Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Gateway Configuration</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Configure rate limiting: 100 req/min for free tier, 1000 for premium</span></li><li><span className="req-number">2</span><span className="req-text">Implement circuit breaker with 5 failure threshold, 30s timeout</span></li><li><span className="req-number">3</span><span className="req-text">Design request transformation to add correlation ID</span></li><li><span className="req-number">4</span><span className="req-text">Configure caching policy for product catalog API</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/13/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/13/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week13Day2;
