import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week8Day3() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 8, dayNum = 3, topic = "API Gateway Pattern", concepts = "Routing, authentication, rate limiting, aggregation";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is an API Gateway?", options: ["Database server", "Single entry point for client requests", "File storage", "Message queue"], correct: 1, explanation: "An API Gateway is a single entry point that routes requests to appropriate microservices and handles cross-cutting concerns." },
    { id: 2, question: "Which is NOT a typical API Gateway responsibility?", options: ["Request routing", "Business logic processing", "Authentication", "Rate limiting"], correct: 1, explanation: "Business logic should be in services, not the gateway. Gateway handles routing, auth, rate limiting, etc." },
    { id: 3, question: "What is the BFF pattern?", options: ["Backend for Frontend - separate gateway per client type", "Big Frontend Framework", "Batch File Format", "Binary Fast Forward"], correct: 0, explanation: "BFF creates separate backend services optimized for each frontend type (web, mobile, IoT)." },
    { id: 4, question: "What is response aggregation?", options: ["Combining responses from multiple services", "Data compression", "Log collection", "Error grouping"], correct: 0, explanation: "Response aggregation combines data from multiple backend services into a single response for the client." },
    { id: 5, question: "Which tool is commonly used as an API Gateway?", options: ["MongoDB", "Kong", "MySQL", "Kafka"], correct: 1, explanation: "Kong, AWS API Gateway, NGINX, and Zuul are popular API Gateway implementations." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>API Gateway Pattern</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>API Gateway Pattern</h1><div className="article-tags"><span className="tag">API Gateway</span><span className="tag">Microservices</span><span className="tag">Routing</span><span className="tag">BFF</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is an API Gateway?</h2>
        <p>An <strong>API Gateway</strong> is a single entry point for all client requests that routes to appropriate microservices. It handles cross-cutting concerns like authentication, rate limiting, and monitoring, acting as a reverse proxy with additional capabilities.</p>

        <div className="diagram-container">
          <div className="diagram-title">API Gateway Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📱</span><span className="flow-node-label">Mobile App</span></div>
              <div className="flow-node client"><span className="flow-node-icon">🌐</span><span className="flow-node-label">Web App</span></div>
              <div className="flow-node client"><span className="flow-node-icon">🔧</span><span className="flow-node-label">Third Party</span></div>
            </div>
            <div className="flow-arrow down">↓ All Requests</div>
            <div className="flow-row">
              <div className="flow-node loadbalancer"><span className="flow-node-icon">🚪</span><span className="flow-node-label">API Gateway</span><span className="flow-node-sublabel">Auth, Rate Limit, Route</span></div>
            </div>
            <div className="flow-arrow down">↓ Routed Requests</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">👤</span><span className="flow-node-label">User Service</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📦</span><span className="flow-node-label">Order Service</span></div>
              <div className="flow-node server"><span className="flow-node-icon">💳</span><span className="flow-node-label">Payment Service</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">API Gateway Responsibilities</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔀</div>
            <div className="concept-card-title">Request Routing</div>
            <div className="concept-card-description">Route requests to appropriate backend services based on path, headers, or content</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔐</div>
            <div className="concept-card-title">Authentication</div>
            <div className="concept-card-description">Validate tokens, API keys, and manage user sessions</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⏱️</div>
            <div className="concept-card-title">Rate Limiting</div>
            <div className="concept-card-description">Prevent abuse by limiting requests per user, IP, or API key</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Monitoring</div>
            <div className="concept-card-description">Collect metrics, logs, and traces for observability</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🗜️</div>
            <div className="concept-card-title">Response Transform</div>
            <div className="concept-card-description">Transform, aggregate, and cache responses</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Protocol Translation</div>
            <div className="concept-card-description">Convert between REST, GraphQL, gRPC, WebSocket</div>
          </div>
        </div>

        <h2 className="md-h2">BFF Pattern (Backend for Frontend)</h2>
        <div className="diagram-container">
          <div className="diagram-title">BFF Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📱</span><span className="flow-node-label">Mobile</span></div>
              <div className="flow-node client"><span className="flow-node-icon">🌐</span><span className="flow-node-label">Web</span></div>
              <div className="flow-node client"><span className="flow-node-icon">📺</span><span className="flow-node-label">Smart TV</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">📱</span><span className="flow-node-label">Mobile BFF</span></div>
              <div className="flow-node server"><span className="flow-node-icon">🌐</span><span className="flow-node-label">Web BFF</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📺</span><span className="flow-node-label">TV BFF</span></div>
            </div>
            <div className="flow-arrow down">↓ Aggregated Calls</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">⚙️</span><span className="flow-node-label">Microservices</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Popular API Gateway Solutions</h2>
        <table className="comparison-table">
          <thead><tr><th>Gateway</th><th>Type</th><th>Key Features</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Kong</td><td>Open Source</td><td>Plugin ecosystem, Lua</td><td>Enterprise, extensible</td></tr>
            <tr><td className="feature-name">AWS API Gateway</td><td>Managed</td><td>Lambda integration, WAF</td><td>AWS-native apps</td></tr>
            <tr><td className="feature-name">NGINX Plus</td><td>Commercial</td><td>High performance, simple</td><td>Simple routing</td></tr>
            <tr><td className="feature-name">Zuul</td><td>Open Source</td><td>Netflix stack, Java</td><td>Spring Cloud</td></tr>
            <tr><td className="feature-name">Traefik</td><td>Open Source</td><td>Auto-discovery, K8s native</td><td>Kubernetes</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Implementation Best Practices</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Keep Gateway Thin</h4>
              <p>Avoid business logic in gateway - only cross-cutting concerns like auth, rate limiting, routing</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Enable Caching</h4>
              <p>Cache responses for GET requests to reduce backend load and improve latency</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Implement Circuit Breaker</h4>
              <p>Prevent cascade failures by failing fast when backend services are down</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>High Availability</h4>
              <p>Deploy multiple gateway instances - it's a single point of failure if not redundant</p>
            </div>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Common Pitfalls</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Putting business logic in the gateway</li>
              <li>Single instance (no redundancy)</li>
              <li>No rate limiting (DDoS vulnerability)</li>
              <li>Missing circuit breakers (cascade failures)</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>API Gateway is single entry point for all clients</li>
              <li>Handles auth, rate limiting, routing, monitoring</li>
              <li>BFF pattern provides client-specific optimizations</li>
              <li>Keep it thin - no business logic</li>
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

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>API Gateway Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design an API Gateway for an e-commerce platform with 10 microservices</span></li><li><span className="req-number">2</span><span className="req-text">Implement rate limiting strategy: 100 req/min for free tier, 1000 for premium</span></li><li><span className="req-number">3</span><span className="req-text">Design BFF pattern for mobile and web clients</span></li><li><span className="req-number">4</span><span className="req-text">Handle authentication with JWT tokens and API keys</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/8/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/8/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week8Day3;
