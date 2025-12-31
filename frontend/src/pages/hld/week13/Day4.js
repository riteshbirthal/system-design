import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week13Day4() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 13, dayNum = 4, topic = "Gateway Security", concepts = "OAuth at gateway, JWT validation, CORS, WAF";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "Why validate JWT at the API Gateway?", options: ["Storage", "Early rejection of invalid requests, offload from services", "Slower processing", "Avoid encryption"], correct: 1, explanation: "Validating JWT at gateway rejects unauthorized requests early, reducing load on backend services." },
    { id: 2, question: "What is CORS?", options: ["Code Optimization", "Cross-Origin Resource Sharing - browser security", "Cache system", "Routing protocol"], correct: 1, explanation: "CORS is a browser security mechanism that restricts cross-origin HTTP requests. Gateway can handle CORS headers." },
    { id: 3, question: "What does WAF stand for?", options: ["Web Application Firewall", "Wide Area Format", "Wireless Access Function", "Web API Framework"], correct: 0, explanation: "WAF (Web Application Firewall) protects against common web attacks like SQL injection, XSS." },
    { id: 4, question: "What should gateway do with internal headers?", options: ["Forward all", "Strip internal headers before forwarding to client", "Add more", "Ignore"], correct: 1, explanation: "Gateway should strip internal/sensitive headers from responses before sending to clients." },
    { id: 5, question: "What is mTLS?", options: ["Message TLS", "Mutual TLS - both client and server verify certificates", "Multiple TLS", "Master TLS"], correct: 1, explanation: "mTLS (Mutual TLS) requires both client and server to present and verify certificates for authentication." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Gateway Security</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Gateway Security</h1><div className="article-tags"><span className="tag">JWT</span><span className="tag">OAuth</span><span className="tag">CORS</span><span className="tag">WAF</span><span className="tag">mTLS</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Authentication at Gateway</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">🔑</div><div className="concept-card-title">API Keys</div><div className="concept-card-description">Simple key in header, good for internal/partner APIs</div></div>
          <div className="concept-card"><div className="concept-card-icon">🎫</div><div className="concept-card-title">JWT Validation</div><div className="concept-card-description">Verify signature, expiry, claims at gateway</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔐</div><div className="concept-card-title">OAuth 2.0</div><div className="concept-card-description">Token introspection or JWT validation</div></div>
          <div className="concept-card"><div className="concept-card-icon">📜</div><div className="concept-card-title">mTLS</div><div className="concept-card-description">Certificate-based for service-to-service</div></div>
        </div>

        <h2 className="md-h2">JWT Validation Flow</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><div className="step-content"><h4>Extract Token</h4><p>Get JWT from Authorization: Bearer header</p></div></div>
          <div className="step-card"><div className="step-number">2</div><div className="step-content"><h4>Verify Signature</h4><p>Use public key/JWKS to verify token wasn't tampered</p></div></div>
          <div className="step-card"><div className="step-number">3</div><div className="step-content"><h4>Check Claims</h4><p>Validate exp, iss, aud claims</p></div></div>
          <div className="step-card"><div className="step-number">4</div><div className="step-content"><h4>Forward Context</h4><p>Pass user info to backend via headers</p></div></div>
        </div>

        <h2 className="md-h2">Security Headers</h2>
        <table className="comparison-table">
          <thead><tr><th>Header</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Strict-Transport-Security</td><td>Force HTTPS (HSTS)</td></tr>
            <tr><td className="feature-name">Content-Security-Policy</td><td>Prevent XSS</td></tr>
            <tr><td className="feature-name">X-Content-Type-Options</td><td>Prevent MIME sniffing</td></tr>
            <tr><td className="feature-name">X-Frame-Options</td><td>Prevent clickjacking</td></tr>
            <tr><td className="feature-name">Access-Control-Allow-*</td><td>CORS headers</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">CORS Configuration</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>✅ Good CORS Config</h4>
            <ul>
              <li>Whitelist specific origins</li>
              <li>Limit allowed methods</li>
              <li>Restrict headers</li>
              <li>Set appropriate max-age</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#EF4444'}}>
            <h4 style={{color: '#EF4444'}}>❌ Avoid</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Access-Control-Allow-Origin: *</li>
              <li>→ Allow all methods</li>
              <li>→ Allow all headers</li>
              <li>→ credentials: true with wildcard</li>
            </ul>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Never expose in responses:</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Internal service names/IPs</li>
              <li>Stack traces</li>
              <li>Database details</li>
              <li>Debug information</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Validate JWT at gateway to reject early</li>
              <li>Add security headers to all responses</li>
              <li>Configure CORS with specific origins, not wildcards</li>
              <li>Consider WAF for protection against common attacks</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Gateway Security Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Security Configuration</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Configure JWT validation with RS256 and JWKS endpoint</span></li><li><span className="req-number">2</span><span className="req-text">Set up proper CORS for web app at app.example.com</span></li><li><span className="req-number">3</span><span className="req-text">Configure security headers (HSTS, CSP, X-Frame-Options)</span></li><li><span className="req-number">4</span><span className="req-text">Design mTLS for internal service-to-service communication</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/13/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/13/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week13Day4;
