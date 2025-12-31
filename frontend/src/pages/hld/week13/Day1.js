import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week13Day1() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 13, dayNum = 1, topic = "API Gateway Fundamentals", concepts = "Single entry point, routing, cross-cutting concerns";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is an API Gateway?", options: ["A database", "Single entry point for API requests to multiple services", "A programming language", "A testing tool"], correct: 1, explanation: "An API Gateway acts as a single entry point for all client requests, routing them to appropriate backend services." },
    { id: 2, question: "What is NOT a typical API Gateway responsibility?", options: ["Request routing", "Authentication", "Database storage", "Rate limiting"], correct: 2, explanation: "API Gateways handle routing, auth, rate limiting, etc. but don't store data - that's the backend services' job." },
    { id: 3, question: "What is request aggregation?", options: ["Storing requests", "Combining multiple service calls into one client response", "Load balancing", "Caching"], correct: 1, explanation: "Aggregation combines responses from multiple backend services into a single response for the client." },
    { id: 4, question: "What is protocol translation?", options: ["Language conversion", "Converting between protocols (e.g., HTTP to gRPC)", "DNS resolution", "SSL encryption"], correct: 1, explanation: "Protocol translation converts between different protocols, like accepting HTTP from clients and using gRPC to backends." },
    { id: 5, question: "Why use an API Gateway in microservices?", options: ["Increase complexity", "Single entry point, centralized cross-cutting concerns", "Replace databases", "Avoid caching"], correct: 1, explanation: "API Gateway provides a single entry point and centralizes cross-cutting concerns like auth, logging, and rate limiting." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>API Gateway Fundamentals</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>API Gateway Fundamentals</h1><div className="article-tags"><span className="tag">API Gateway</span><span className="tag">Microservices</span><span className="tag">Routing</span><span className="tag">Cross-Cutting</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is an API Gateway?</h2>
        <p>An <strong>API Gateway</strong> is a server that acts as a single entry point for a collection of microservices. It handles requests, routes them to appropriate services, and aggregates responses.</p>

        <div className="diagram-container">
          <div className="diagram-title">API Gateway Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📱</span><span className="flow-node-label">Clients</span><span className="flow-node-sublabel">Web/Mobile/Partners</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node loadbalancer"><span className="flow-node-icon">🚪</span><span className="flow-node-label">API Gateway</span><span className="flow-node-sublabel">Auth, Rate Limit, Route</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">👤</span><span className="flow-node-label">User Service</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">🛒</span><span className="flow-node-label">Order Service</span></div>
              <div className="flow-node database"><span className="flow-node-icon">📦</span><span className="flow-node-label">Product Service</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Key Responsibilities</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">🔀</div><div className="concept-card-title">Request Routing</div><div className="concept-card-description">Direct requests to appropriate backend services</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔐</div><div className="concept-card-title">Authentication</div><div className="concept-card-description">Validate tokens, API keys, OAuth at the edge</div></div>
          <div className="concept-card"><div className="concept-card-icon">⏱️</div><div className="concept-card-title">Rate Limiting</div><div className="concept-card-description">Protect services from abuse and overload</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔄</div><div className="concept-card-title">Request Transform</div><div className="concept-card-description">Modify headers, rewrite URLs, translate protocols</div></div>
        </div>

        <h2 className="md-h2">Routing Types</h2>
        <table className="comparison-table">
          <thead><tr><th>Type</th><th>Example</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Path-based</td><td>/api/users → User Service</td><td>Service segregation</td></tr>
            <tr><td className="feature-name">Host-based</td><td>api.example.com vs admin.example.com</td><td>Subdomain routing</td></tr>
            <tr><td className="feature-name">Header-based</td><td>X-API-Version: v2</td><td>API versioning</td></tr>
            <tr><td className="feature-name">Method-based</td><td>GET → read service, POST → write</td><td>CQRS patterns</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Cross-Cutting Concerns</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><div className="step-content"><h4>Authentication & Authorization</h4><p>Validate JWT/OAuth tokens, check permissions before routing</p></div></div>
          <div className="step-card"><div className="step-number">2</div><div className="step-content"><h4>Logging & Monitoring</h4><p>Centralized request logging, metrics collection, distributed tracing</p></div></div>
          <div className="step-card"><div className="step-number">3</div><div className="step-content"><h4>Rate Limiting & Throttling</h4><p>Protect backends from excessive requests</p></div></div>
          <div className="step-card"><div className="step-number">4</div><div className="step-content"><h4>Caching</h4><p>Cache responses at edge for performance</p></div></div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>API Gateway is the single entry point for microservices</li>
              <li>Handles cross-cutting concerns (auth, logging, rate limiting)</li>
              <li>Routes requests based on path, host, headers, or method</li>
              <li>Simplifies client by hiding service complexity</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>API Gateway Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>API Gateway Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design API Gateway routing for an e-commerce microservices system</span></li><li><span className="req-number">2</span><span className="req-text">Define authentication strategy (API key vs JWT vs OAuth)</span></li><li><span className="req-number">3</span><span className="req-text">Plan rate limiting rules for different client types</span></li><li><span className="req-number">4</span><span className="req-text">Design request/response transformation for legacy backend</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/12/day/5" className="nav-link prev">&lt;&lt; Week 12</Link><Link to="/hld/week/13/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week13Day1;
