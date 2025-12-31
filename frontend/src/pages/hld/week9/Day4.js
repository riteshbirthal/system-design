import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week9Day4() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 9, dayNum = 4, topic = "API Security & OWASP", concepts = "API vulnerabilities, OWASP Top 10, security headers, rate limiting";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is OWASP?", options: ["Database system", "Open Web Application Security Project", "Operating system", "Network protocol"], correct: 1, explanation: "OWASP maintains security vulnerability lists and provides guidance for secure development." },
    { id: 2, question: "What is SQL Injection?", options: ["Database backup", "Inserting malicious SQL through user input", "SQL optimization", "Database migration"], correct: 1, explanation: "SQL Injection executes malicious SQL through unvalidated user input, potentially exposing data." },
    { id: 3, question: "What prevents SQL Injection?", options: ["Encryption", "Parameterized queries", "Load balancing", "Caching"], correct: 1, explanation: "Parameterized queries separate SQL code from data, preventing injection attacks." },
    { id: 4, question: "What is CORS?", options: ["Caching system", "Cross-Origin Resource Sharing", "Certificate protocol", "Compression algorithm"], correct: 1, explanation: "CORS controls which origins can access your API resources from browsers." },
    { id: 5, question: "What is rate limiting?", options: ["Speed optimization", "Limiting requests per user/IP to prevent abuse", "Database indexing", "Memory management"], correct: 1, explanation: "Rate limiting prevents abuse and DDoS by limiting requests per user, IP, or API key." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>API Security & OWASP</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>API Security & OWASP</h1><div className="article-tags"><span className="tag">OWASP</span><span className="tag">API Security</span><span className="tag">Injection</span><span className="tag">XSS</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">OWASP Top 10 Web Application Risks</h2>
        <p>The <strong>OWASP Top 10</strong> represents the most critical security risks to web applications. Understanding these helps design secure systems.</p>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Broken Access Control</h4>
              <p>Users accessing unauthorized resources. Fix: Deny by default, validate ownership</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Cryptographic Failures</h4>
              <p>Weak or missing encryption. Fix: Use strong algorithms (AES-256, RSA-2048)</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Injection (SQL, NoSQL, OS)</h4>
              <p>Malicious code via user input. Fix: Parameterized queries, input validation</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Insecure Design</h4>
              <p>Missing security controls. Fix: Threat modeling, security requirements</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Security Misconfiguration</h4>
              <p>Default credentials, verbose errors. Fix: Hardening, minimal installs</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">API Security Layers</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔒</div>
            <div className="concept-card-title">Transport (HTTPS)</div>
            <div className="concept-card-description">Always use TLS 1.2+ for encryption in transit</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔐</div>
            <div className="concept-card-title">Authentication</div>
            <div className="concept-card-description">OAuth, JWT, API keys - validate identity</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">✅</div>
            <div className="concept-card-title">Input Validation</div>
            <div className="concept-card-description">Validate all inputs, sanitize user data</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⏱️</div>
            <div className="concept-card-title">Rate Limiting</div>
            <div className="concept-card-description">Prevent abuse with request limits</div>
          </div>
        </div>

        <h2 className="md-h2">Common API Vulnerabilities</h2>
        <table className="comparison-table">
          <thead><tr><th>Vulnerability</th><th>Attack</th><th>Prevention</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">SQL Injection</td><td>Malicious SQL in input</td><td>Parameterized queries, ORMs</td></tr>
            <tr><td className="feature-name">XSS</td><td>Script injection in responses</td><td>Output encoding, CSP headers</td></tr>
            <tr><td className="feature-name">CSRF</td><td>Forged requests from user</td><td>CSRF tokens, SameSite cookies</td></tr>
            <tr><td className="feature-name">BOLA</td><td>Access other users' objects</td><td>Ownership validation</td></tr>
            <tr><td className="feature-name">SSRF</td><td>Server fetches malicious URLs</td><td>URL validation, deny lists</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Security Headers</h2>
        <div className="diagram-container">
          <div className="diagram-title">Essential HTTP Security Headers</div>
          <div className="code-block" data-language="HTTP">
            <code>
{`Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin`}
            </code>
          </div>
        </div>

        <h2 className="md-h2">Rate Limiting Strategies</h2>
        <div className="diagram-container">
          <div className="diagram-title">Rate Limiting Approaches</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>📊 By Identifier</h4>
              <ul>
                <li>Per IP address</li>
                <li>Per API key</li>
                <li>Per user account</li>
                <li>Per endpoint</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>🔢 Algorithms</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Token bucket</li>
                <li>→ Sliding window</li>
                <li>→ Fixed window</li>
                <li>→ Leaky bucket</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>API Security Checklist</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Use HTTPS only (no HTTP)</li>
              <li>Validate all inputs (never trust client)</li>
              <li>Implement authentication on every endpoint</li>
              <li>Use rate limiting to prevent abuse</li>
              <li>Return proper error codes (no stack traces)</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Know OWASP Top 10 vulnerabilities</li>
              <li>Always use parameterized queries</li>
              <li>Set security headers on all responses</li>
              <li>Rate limit all public endpoints</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>API Security Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>API Security Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Identify OWASP Top 10 vulnerabilities in a sample API design</span></li><li><span className="req-number">2</span><span className="req-text">Design rate limiting strategy: 100/min free tier, 1000/min premium</span></li><li><span className="req-number">3</span><span className="req-text">Implement security headers for your API</span></li><li><span className="req-number">4</span><span className="req-text">Design input validation middleware for common injection attacks</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/9/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/9/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week9Day4;
