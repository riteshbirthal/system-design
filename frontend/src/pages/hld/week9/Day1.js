import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week9Day1() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 9, dayNum = 1, topic = "Authentication Fundamentals", concepts = "AuthN vs AuthZ, MFA, passwordless, session management";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is authentication?", options: ["Checking permissions", "Verifying identity", "Encrypting data", "Rate limiting"], correct: 1, explanation: "Authentication (AuthN) verifies identity - 'Who are you?' - before granting access." },
    { id: 2, question: "What are the three authentication factors?", options: ["User, Pass, Token", "Know, Have, Are", "Read, Write, Execute", "Create, Update, Delete"], correct: 1, explanation: "Three factors: Something you know (password), something you have (phone), something you are (fingerprint)." },
    { id: 3, question: "What is MFA?", options: ["Multiple Form Authentication", "Multi-Factor Authentication", "Master File Access", "Main Frame Auth"], correct: 1, explanation: "MFA combines two or more authentication factors for stronger security." },
    { id: 4, question: "What is passwordless authentication?", options: ["No security", "Using biometrics, magic links, or hardware keys instead of passwords", "Anonymous access", "Default passwords"], correct: 1, explanation: "Passwordless eliminates traditional passwords using biometrics, magic links, or FIDO2 keys." },
    { id: 5, question: "What is session management?", options: ["Database management", "Maintaining logged-in state after authentication", "Network routing", "File storage"], correct: 1, explanation: "Session management maintains user's logged-in state after initial authentication." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Authentication Fundamentals</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Authentication Fundamentals</h1><div className="article-tags"><span className="tag">Authentication</span><span className="tag">MFA</span><span className="tag">Security</span><span className="tag">Identity</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Authentication vs Authorization</h2>
        <p>Security in systems begins with understanding two fundamental concepts: <strong>Authentication</strong> (AuthN) verifies identity - "Who are you?" while <strong>Authorization</strong> (AuthZ) verifies permissions - "What can you do?"</p>

        <div className="diagram-container">
          <div className="diagram-title">CIA Triad - Security Fundamentals</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">🔒</span><span className="flow-node-label">Confidentiality</span><span className="flow-node-sublabel">Data accessible only to authorized</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">✓</span><span className="flow-node-label">Integrity</span><span className="flow-node-sublabel">Data hasn't been tampered</span></div>
              <div className="flow-node client"><span className="flow-node-icon">🌐</span><span className="flow-node-label">Availability</span><span className="flow-node-sublabel">Systems accessible when needed</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Authentication Factors</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🧠</div>
            <div className="concept-card-title">Something You Know</div>
            <div className="concept-card-description">Password, PIN, security questions</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📱</div>
            <div className="concept-card-title">Something You Have</div>
            <div className="concept-card-description">Phone, hardware token, smart card</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">👆</div>
            <div className="concept-card-title">Something You Are</div>
            <div className="concept-card-description">Fingerprint, face, voice recognition</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔐</div>
            <div className="concept-card-title">Multi-Factor (MFA)</div>
            <div className="concept-card-description">Combining 2+ factors for stronger security</div>
          </div>
        </div>

        <h2 className="md-h2">Common Authentication Methods</h2>
        <table className="comparison-table">
          <thead><tr><th>Method</th><th>Security Level</th><th>Use Case</th><th>Weakness</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Username/Password</td><td>Low</td><td>Traditional apps</td><td>Phishing, brute force</td></tr>
            <tr><td className="feature-name">API Keys</td><td>Low-Medium</td><td>Service-to-service</td><td>Easy to leak</td></tr>
            <tr><td className="feature-name">Bearer Tokens</td><td>Medium</td><td>API authentication</td><td>Token theft</td></tr>
            <tr><td className="feature-name">mTLS</td><td>High</td><td>Service mesh, zero-trust</td><td>Complex setup</td></tr>
            <tr><td className="feature-name">FIDO2/WebAuthn</td><td>Very High</td><td>Passwordless</td><td>Hardware requirement</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Passwordless Authentication</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">📧</div>
            <div className="step-content">
              <h4>Magic Links</h4>
              <p>One-time login links sent via email - simple but depends on email security</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">📱</div>
            <div className="step-content">
              <h4>Push Notifications</h4>
              <p>Approve login via mobile app notification - convenient for users</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">👆</div>
            <div className="step-content">
              <h4>Biometrics</h4>
              <p>Fingerprint, Face ID - convenient but privacy concerns</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🔑</div>
            <div className="step-content">
              <h4>FIDO2/Passkeys</h4>
              <p>Hardware security keys or platform authenticators - phishing resistant</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Session Management</h2>
        <div className="diagram-container">
          <div className="diagram-title">Server-Side vs Client-Side Sessions</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>🖥️ Server-Side Sessions</h4>
              <ul>
                <li>Session ID in cookie</li>
                <li>Data stored on server</li>
                <li>Easy to invalidate</li>
                <li>Scalability challenges</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>📱 Client-Side (Tokens)</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Token contains all data (JWT)</li>
                <li>→ Stateless server</li>
                <li>→ Harder to invalidate</li>
                <li>→ Scales horizontally</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Security Pitfalls to Avoid</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Storing passwords in plain text (always hash with bcrypt/argon2)</li>
              <li>Weak session tokens (use cryptographically secure random)</li>
              <li>No rate limiting on login (enables brute force)</li>
              <li>Insecure password reset flows</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>AuthN = Who are you? AuthZ = What can you do?</li>
              <li>MFA significantly improves security</li>
              <li>Passwordless is the future (FIDO2, Passkeys)</li>
              <li>Choose session management based on scale needs</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Authentication Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Authentication System Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design authentication flow for a banking application with MFA</span></li><li><span className="req-number">2</span><span className="req-text">Compare session-based vs token-based auth for your use case</span></li><li><span className="req-number">3</span><span className="req-text">Implement secure password reset flow with rate limiting</span></li><li><span className="req-number">4</span><span className="req-text">Design passwordless authentication option using WebAuthn</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/8/day/5" className="nav-link prev">&lt;&lt; Week 8</Link><Link to="/hld/week/9/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week9Day1;
