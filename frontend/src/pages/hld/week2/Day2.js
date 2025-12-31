import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week2Day2() {
  const weekNum = 2, dayNum = 2, topic = "HTTP/HTTPS Protocols", concepts = "HTTP methods, Status codes, HTTPS/TLS, Headers";
  
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
    { id: 1, question: "Which HTTP method is idempotent?", options: ["POST", "GET", "PATCH", "Only DELETE"], correct: 1, explanation: "GET, PUT, DELETE are idempotent. POST is not - each call creates a new resource." },
    { id: 2, question: "What does status code 404 mean?", options: ["Server error", "Not Found", "Success", "Redirect"], correct: 1, explanation: "404 = Not Found - requested resource doesn't exist." },
    { id: 3, question: "What does HTTPS provide?", options: ["Faster loading", "Encryption + Authentication", "Better SEO only", "Caching"], correct: 1, explanation: "HTTPS provides encryption (confidentiality) and authentication (server identity)." },
    { id: 4, question: "What is the 2xx status code range?", options: ["Errors", "Success", "Redirects", "Client errors"], correct: 1, explanation: "2xx = Success (200 OK, 201 Created, 204 No Content)." },
    { id: 5, question: "Difference between PUT and PATCH?", options: ["Same thing", "PUT replaces entire resource, PATCH updates partially", "PATCH is faster", "PUT is for create only"], correct: 1, explanation: "PUT replaces the entire resource, PATCH updates only specified fields." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>HTTP/HTTPS Protocols</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>HTTP/HTTPS Protocols</h1><div className="article-tags"><span className="tag">HTTP</span><span className="tag">HTTPS</span><span className="tag">REST</span><span className="tag">Security</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is HTTP?</h2>
        <p><strong>HTTP (Hypertext Transfer Protocol)</strong> is the foundation of data communication on the web. It's a request-response protocol between clients (browsers) and servers.</p>

        {/* Request-Response Cycle */}
        <h2 className="md-h2">HTTP Request-Response Cycle</h2>
        <div className="diagram-container">
          <div className="diagram-title">HTTP Communication Flow</div>
          <svg viewBox="0 0 700 280" className="svg-diagram" style={{maxHeight: '280px'}}>
            <defs>
              <linearGradient id="clientGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#667eea'}} />
                <stop offset="100%" style={{stopColor:'#764ba2'}} />
              </linearGradient>
              <linearGradient id="serverGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#11998e'}} />
                <stop offset="100%" style={{stopColor:'#38ef7d'}} />
              </linearGradient>
            </defs>
            
            {/* Client */}
            <rect x="50" y="80" width="150" height="120" rx="12" fill="url(#clientGrad2)" />
            <text x="125" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🖥️ Client</text>
            <text x="125" y="140" textAnchor="middle" fill="white" fontSize="11">Browser / App</text>
            <text x="125" y="165" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Sends Request</text>
            <text x="125" y="185" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Receives Response</text>
            
            {/* Server */}
            <rect x="500" y="80" width="150" height="120" rx="12" fill="url(#serverGrad2)" />
            <text x="575" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🖧 Server</text>
            <text x="575" y="140" textAnchor="middle" fill="white" fontSize="11">Web Server</text>
            <text x="575" y="165" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Processes Request</text>
            <text x="575" y="185" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Sends Response</text>
            
            {/* Request Arrow */}
            <path d="M200 120 L500 120" stroke="#667eea" strokeWidth="3" fill="none" markerEnd="url(#arrow)" />
            <rect x="280" y="95" width="140" height="50" rx="6" fill="#f0f4ff" stroke="#667eea" strokeWidth="1" />
            <text x="350" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#667eea">HTTP Request</text>
            <text x="350" y="132" textAnchor="middle" fontSize="9" fill="#666">GET /api/users HTTP/1.1</text>
            
            {/* Response Arrow */}
            <path d="M500 180 L200 180" stroke="#11998e" strokeWidth="3" fill="none" markerEnd="url(#arrow)" />
            <rect x="280" y="155" width="140" height="50" rx="6" fill="#f0fdf4" stroke="#11998e" strokeWidth="1" />
            <text x="350" y="175" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#11998e">HTTP Response</text>
            <text x="350" y="192" textAnchor="middle" fontSize="9" fill="#666">200 OK + JSON data</text>

            {/* Labels */}
            <text x="350" y="250" textAnchor="middle" fontSize="11" fill="#64748b">Stateless: Each request is independent</text>
          </svg>
        </div>

        {/* HTTP Methods */}
        <h2 className="md-h2">HTTP Methods (Verbs)</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Method</th><th>Purpose</th><th>Idempotent</th><th>Safe</th><th>Body</th></tr>
          </thead>
          <tbody>
            <tr><td className="feature-name" style={{color:'#3b82f6'}}>GET</td><td>Retrieve data</td><td className="check">✓</td><td className="check">✓</td><td className="cross">✗</td></tr>
            <tr><td className="feature-name" style={{color:'#22c55e'}}>POST</td><td>Create new resource</td><td className="cross">✗</td><td className="cross">✗</td><td className="check">✓</td></tr>
            <tr><td className="feature-name" style={{color:'#f59e0b'}}>PUT</td><td>Replace entire resource</td><td className="check">✓</td><td className="cross">✗</td><td className="check">✓</td></tr>
            <tr><td className="feature-name" style={{color:'#8b5cf6'}}>PATCH</td><td>Partial update</td><td className="cross">✗</td><td className="cross">✗</td><td className="check">✓</td></tr>
            <tr><td className="feature-name" style={{color:'#ef4444'}}>DELETE</td><td>Remove resource</td><td className="check">✓</td><td className="cross">✗</td><td className="cross">✗</td></tr>
          </tbody>
        </table>

        <div className="info-box note">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Idempotent vs Safe</h4>
            <p><strong>Idempotent:</strong> Multiple identical requests have same effect as single request.<br/>
            <strong>Safe:</strong> Does not modify server state (read-only).</p>
          </div>
        </div>

        {/* Status Codes */}
        <h2 className="md-h2">HTTP Status Codes</h2>
        <div className="diagram-container">
          <div className="diagram-title">Status Code Categories</div>
          <div className="concept-cards">
            <div className="concept-card" style={{borderLeft: '4px solid #64748b'}}>
              <div className="concept-card-icon">ℹ️</div>
              <div className="concept-card-title">1xx Informational</div>
              <div className="concept-card-description">100 Continue, 101 Switching Protocols</div>
            </div>
            <div className="concept-card" style={{borderLeft: '4px solid #22c55e'}}>
              <div className="concept-card-icon">✅</div>
              <div className="concept-card-title">2xx Success</div>
              <div className="concept-card-description">200 OK, 201 Created, 204 No Content</div>
            </div>
            <div className="concept-card" style={{borderLeft: '4px solid #3b82f6'}}>
              <div className="concept-card-icon">↪️</div>
              <div className="concept-card-title">3xx Redirect</div>
              <div className="concept-card-description">301 Permanent, 302 Temporary, 304 Not Modified</div>
            </div>
            <div className="concept-card" style={{borderLeft: '4px solid #f59e0b'}}>
              <div className="concept-card-icon">⚠️</div>
              <div className="concept-card-title">4xx Client Error</div>
              <div className="concept-card-description">400 Bad Request, 401 Unauthorized, 404 Not Found</div>
            </div>
            <div className="concept-card" style={{borderLeft: '4px solid #ef4444'}}>
              <div className="concept-card-icon">❌</div>
              <div className="concept-card-title">5xx Server Error</div>
              <div className="concept-card-description">500 Internal, 502 Bad Gateway, 503 Unavailable</div>
            </div>
          </div>
        </div>

        {/* Common Status Codes */}
        <h3 className="md-h3">Most Common Status Codes</h3>
        <table className="comparison-table">
          <thead><tr><th>Code</th><th>Name</th><th>When to Use</th></tr></thead>
          <tbody>
            <tr><td className="feature-name" style={{color:'#22c55e'}}>200</td><td>OK</td><td>Successful GET, PUT, PATCH</td></tr>
            <tr><td className="feature-name" style={{color:'#22c55e'}}>201</td><td>Created</td><td>Successful POST creating resource</td></tr>
            <tr><td className="feature-name" style={{color:'#22c55e'}}>204</td><td>No Content</td><td>Successful DELETE</td></tr>
            <tr><td className="feature-name" style={{color:'#f59e0b'}}>400</td><td>Bad Request</td><td>Invalid request syntax/data</td></tr>
            <tr><td className="feature-name" style={{color:'#f59e0b'}}>401</td><td>Unauthorized</td><td>Missing/invalid authentication</td></tr>
            <tr><td className="feature-name" style={{color:'#f59e0b'}}>403</td><td>Forbidden</td><td>Authenticated but not authorized</td></tr>
            <tr><td className="feature-name" style={{color:'#f59e0b'}}>404</td><td>Not Found</td><td>Resource doesn't exist</td></tr>
            <tr><td className="feature-name" style={{color:'#ef4444'}}>500</td><td>Internal Server Error</td><td>Unexpected server failure</td></tr>
          </tbody>
        </table>

        {/* HTTPS */}
        <h2 className="md-h2">HTTPS & TLS</h2>
        <p><strong>HTTPS = HTTP + TLS</strong> (Transport Layer Security, successor to SSL)</p>
        
        <div className="diagram-container">
          <div className="diagram-title">HTTPS TLS Handshake (Simplified)</div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Client Hello</h4>
                <p>Client sends supported TLS versions and cipher suites to server.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Server Hello + Certificate</h4>
                <p>Server responds with chosen cipher and SSL certificate (public key).</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Key Exchange</h4>
                <p>Client verifies certificate, generates session key, encrypts with server's public key.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Secure Connection</h4>
                <p>Both parties use shared session key for symmetric encryption. Data is now encrypted!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pros-cons">
          <div className="pros-section">
            <h4>✓ HTTPS Provides</h4>
            <ul>
              <li><strong>Encryption:</strong> Data encrypted in transit</li>
              <li><strong>Authentication:</strong> Server verified via certificates</li>
              <li><strong>Integrity:</strong> Data cannot be modified</li>
            </ul>
          </div>
          <div className="cons-section">
            <h4>✗ Without HTTPS</h4>
            <ul>
              <li>Data visible to anyone on network</li>
              <li>Man-in-the-middle attacks possible</li>
              <li>No verification of server identity</li>
            </ul>
          </div>
        </div>

        {/* Important Headers */}
        <h2 className="md-h2">Important HTTP Headers</h2>
        <table className="comparison-table">
          <thead><tr><th>Header</th><th>Purpose</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Content-Type</td><td>Media type of body</td><td><code>application/json</code></td></tr>
            <tr><td className="feature-name">Authorization</td><td>Auth credentials</td><td><code>Bearer eyJhbG...</code></td></tr>
            <tr><td className="feature-name">Cache-Control</td><td>Caching directives</td><td><code>max-age=3600, public</code></td></tr>
            <tr><td className="feature-name">Accept</td><td>Expected response format</td><td><code>application/json</code></td></tr>
            <tr><td className="feature-name">User-Agent</td><td>Client identification</td><td><code>Mozilla/5.0...</code></td></tr>
            <tr><td className="feature-name">Cookie</td><td>Session data</td><td><code>sessionId=abc123</code></td></tr>
          </tbody>
        </table>

        {/* Key Takeaways */}
        <h2 className="md-h2">Key Takeaways</h2>
        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>HTTP is stateless request-response protocol</li>
              <li>Methods: GET (read), POST (create), PUT (replace), PATCH (update), DELETE</li>
              <li>Status codes: 2xx success, 4xx client error, 5xx server error</li>
              <li>HTTPS = HTTP + TLS encryption (always use for production!)</li>
              <li>Headers carry metadata: Content-Type, Authorization, Cache-Control</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>HTTP Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>API Request Analysis</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Use browser DevTools to capture 10 HTTP requests</span></li><li><span className="req-number">2</span><span className="req-text">Document method, status code, headers for each</span></li><li><span className="req-number">3</span><span className="req-text">Identify which requests are cached</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/2/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/2/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week2Day2;
