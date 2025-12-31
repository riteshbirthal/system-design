import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week9Day2() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 9, dayNum = 2, topic = "OAuth 2.0 & JWT", concepts = "OAuth flows, OpenID Connect, JWT structure, token management";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is OAuth 2.0?", options: ["Encryption protocol", "Authorization framework for delegated access", "Database system", "Message queue"], correct: 1, explanation: "OAuth 2.0 is an authorization framework allowing third-party apps to access resources without sharing credentials." },
    { id: 2, question: "What is the purpose of an access token?", options: ["Store user password", "Credential to access protected resources", "Encrypt data", "Route requests"], correct: 1, explanation: "Access token is a credential used to access protected resources (APIs) on behalf of the user." },
    { id: 3, question: "What does OIDC add to OAuth 2.0?", options: ["Rate limiting", "Identity layer with ID tokens", "Caching", "Load balancing"], correct: 1, explanation: "OpenID Connect adds an identity layer with ID tokens containing user identity claims." },
    { id: 4, question: "What are the three parts of a JWT?", options: ["User, Pass, Token", "Header, Payload, Signature", "Key, Value, Pair", "ID, Name, Email"], correct: 1, explanation: "JWT consists of Header (algorithm), Payload (claims), and Signature (verification)." },
    { id: 5, question: "Which OAuth grant type is best for SPAs?", options: ["Client Credentials", "Authorization Code with PKCE", "Implicit (deprecated)", "Password Grant"], correct: 1, explanation: "Authorization Code with PKCE is recommended for SPAs as it prevents code interception attacks." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>OAuth 2.0 & JWT</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>OAuth 2.0 & JWT</h1><div className="article-tags"><span className="tag">OAuth</span><span className="tag">JWT</span><span className="tag">OIDC</span><span className="tag">Tokens</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">OAuth 2.0 Core Concepts</h2>
        <p><strong>OAuth 2.0</strong> is an authorization framework allowing third-party applications to access user resources without sharing credentials. It's the standard for delegated authorization.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">👤</div>
            <div className="concept-card-title">Resource Owner</div>
            <div className="concept-card-description">User who owns the data and grants access</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📱</div>
            <div className="concept-card-title">Client</div>
            <div className="concept-card-description">Application requesting access to resources</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔐</div>
            <div className="concept-card-title">Authorization Server</div>
            <div className="concept-card-description">Issues tokens after user authentication</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🗄️</div>
            <div className="concept-card-title">Resource Server</div>
            <div className="concept-card-description">Hosts protected resources (APIs)</div>
          </div>
        </div>

        <h2 className="md-h2">OAuth 2.0 Authorization Code Flow</h2>
        <div className="diagram-container">
          <div className="diagram-title">Authorization Code Grant (Recommended)</div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>User Clicks "Login with Google"</h4>
                <p>Client redirects user to authorization server</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>User Authenticates & Consents</h4>
                <p>User logs in and approves requested scopes</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Authorization Code Returned</h4>
                <p>Server redirects back with authorization code</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Exchange Code for Tokens</h4>
                <p>Client exchanges code for access/refresh tokens (server-to-server)</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Access Resources</h4>
                <p>Client uses access token to call protected APIs</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">OAuth Grant Types</h2>
        <table className="comparison-table">
          <thead><tr><th>Grant Type</th><th>Use Case</th><th>Security</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Authorization Code</td><td>Server-side web apps</td><td>High - code exchanged server-side</td></tr>
            <tr><td className="feature-name">Auth Code + PKCE</td><td>SPAs, mobile apps</td><td>High - prevents code interception</td></tr>
            <tr><td className="feature-name">Client Credentials</td><td>Machine-to-machine (M2M)</td><td>High - no user involved</td></tr>
            <tr><td className="feature-name">Implicit (Deprecated)</td><td>Legacy SPAs</td><td>Low - tokens in URL</td></tr>
            <tr><td className="feature-name">Password (Legacy)</td><td>First-party only</td><td>Low - client sees password</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">JWT (JSON Web Token) Structure</h2>
        <div className="diagram-container">
          <div className="diagram-title">JWT: header.payload.signature</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">📋</span><span className="flow-node-label">Header</span><span className="flow-node-sublabel">alg: RS256, typ: JWT</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">📦</span><span className="flow-node-label">Payload</span><span className="flow-node-sublabel">sub, iss, exp, claims</span></div>
              <div className="flow-node client"><span className="flow-node-icon">🔏</span><span className="flow-node-label">Signature</span><span className="flow-node-sublabel">HMAC/RSA signed</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">OpenID Connect (OIDC)</h2>
        <div className="diagram-container">
          <div className="diagram-title">OIDC = OAuth 2.0 + Identity Layer</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>🔐 OAuth 2.0 (Authorization)</h4>
              <ul>
                <li>Access tokens for API access</li>
                <li>Delegated authorization</li>
                <li>Scopes define permissions</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>👤 OIDC Adds (Authentication)</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ ID Token (JWT with user identity)</li>
                <li>→ UserInfo endpoint</li>
                <li>→ Standard claims (sub, email, name)</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">JWT Best Practices</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Use Strong Algorithms</h4>
              <p>RS256 or ES256 for asymmetric signing (public key verification)</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Short Expiration</h4>
              <p>Access tokens: 15-60 minutes. Use refresh tokens for renewal</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Validate All Claims</h4>
              <p>Always verify: exp, iss, aud, signature before trusting token</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Secure Storage</h4>
              <p>HttpOnly cookies for web apps. Avoid localStorage (XSS risk)</p>
            </div>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Common JWT Mistakes</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Using "none" algorithm (no signature verification)</li>
              <li>Storing sensitive data in payload (it's base64, not encrypted)</li>
              <li>Not validating signature before trusting claims</li>
              <li>Long-lived access tokens without refresh mechanism</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>OAuth 2.0 = Authorization, OIDC = Authentication</li>
              <li>Use Authorization Code + PKCE for modern apps</li>
              <li>JWT: header.payload.signature - always verify!</li>
              <li>Short-lived access tokens + refresh tokens</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>OAuth & JWT Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>OAuth Implementation Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design OAuth 2.0 flow for a SPA with PKCE</span></li><li><span className="req-number">2</span><span className="req-text">Define JWT claims structure for your application</span></li><li><span className="req-number">3</span><span className="req-text">Implement token refresh strategy with sliding expiration</span></li><li><span className="req-number">4</span><span className="req-text">Design token revocation mechanism for logout</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/9/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/9/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week9Day2;
