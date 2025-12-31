import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week9Day5() {
  const weekNum = 9, dayNum = 5, topic = "Zero Trust & Secrets Management", concepts = "Zero trust principles, Vault, secrets rotation, mTLS";
  
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
    { id: 1, question: "What is the core principle of Zero Trust?", options: ["Trust internal network", "Never trust, always verify", "Trust once, access forever", "Trust admins only"], correct: 1, explanation: "Zero Trust assumes no implicit trust - every request must be verified regardless of network location." },
    { id: 2, question: "What is HashiCorp Vault used for?", options: ["Database management", "Centralized secrets management", "Load balancing", "Message queuing"], correct: 1, explanation: "Vault provides centralized secrets management with dynamic secrets, encryption as a service, and audit logging." },
    { id: 3, question: "What are dynamic secrets?", options: ["Static passwords", "Time-limited credentials generated on demand", "Encrypted files", "API keys"], correct: 1, explanation: "Dynamic secrets are generated on-demand with automatic expiration, reducing blast radius of leaks." },
    { id: 4, question: "What is mTLS?", options: ["Multi-tier Load System", "Mutual TLS authentication", "Message Transport Layer", "Memory Transfer Logic"], correct: 1, explanation: "mTLS provides two-way authentication where both client and server present certificates." },
    { id: 5, question: "What should you NEVER do with secrets?", options: ["Rotate them", "Encrypt them", "Commit to version control", "Audit access"], correct: 2, explanation: "Never commit secrets to version control - use secret management tools instead." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Zero Trust & Secrets Management</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Zero Trust & Secrets Management</h1><div className="article-tags"><span className="tag">Zero Trust</span><span className="tag">Vault</span><span className="tag">Secrets</span><span className="tag">mTLS</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Zero Trust Principles</h2>
        <p><strong>Zero Trust</strong> is a security model based on "never trust, always verify." Unlike perimeter security, it assumes threats exist both inside and outside the network.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔍</div>
            <div className="concept-card-title">Never Trust</div>
            <div className="concept-card-description">Verify every request regardless of network location</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💥</div>
            <div className="concept-card-title">Assume Breach</div>
            <div className="concept-card-description">Design assuming adversary already inside</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔒</div>
            <div className="concept-card-title">Least Privilege</div>
            <div className="concept-card-description">Just-in-time, just-enough access</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🧱</div>
            <div className="concept-card-title">Micro-Segmentation</div>
            <div className="concept-card-description">Fine-grained isolation, limit lateral movement</div>
          </div>
        </div>

        <h2 className="md-h2">Zero Trust Components</h2>
        <div className="diagram-container">
          <div className="diagram-title">Zero Trust Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👤</span><span className="flow-node-label">Identity</span><span className="flow-node-sublabel">Strong Auth + MFA</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📱</span><span className="flow-node-label">Device</span><span className="flow-node-sublabel">Health + Compliance</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">🌐</span><span className="flow-node-label">Network</span><span className="flow-node-sublabel">mTLS + Encryption</span></div>
            </div>
            <div className="flow-arrow down">↓ Continuous Verification</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">📋</span><span className="flow-node-label">Policy Engine</span><span className="flow-node-sublabel">Context-Aware Decisions</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Secrets Management</h2>
        <p>Secrets (passwords, API keys, certificates) require secure management. <strong>Never</strong> hard-code secrets or commit them to version control.</p>

        <table className="comparison-table">
          <thead><tr><th>Tool</th><th>Type</th><th>Key Features</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">HashiCorp Vault</td><td>General purpose</td><td>Dynamic secrets, encryption as service</td></tr>
            <tr><td className="feature-name">AWS Secrets Manager</td><td>AWS native</td><td>Auto rotation, IAM integration</td></tr>
            <tr><td className="feature-name">Azure Key Vault</td><td>Azure native</td><td>HSM-backed, managed identities</td></tr>
            <tr><td className="feature-name">Google Secret Manager</td><td>GCP native</td><td>IAM integration, versioning</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Secrets Management Best Practices</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Never Commit Secrets</h4>
              <p>Use .gitignore, pre-commit hooks, git secrets scanning</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Centralize Secrets</h4>
              <p>Single source of truth, easier rotation and auditing</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Use Dynamic Secrets</h4>
              <p>Short-lived credentials, auto-expire, reduced blast radius</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Rotate Regularly</h4>
              <p>Automate rotation, immediate rotation on suspected breach</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Audit Access</h4>
              <p>Log all secret access, monitor for anomalies</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">mTLS in Zero Trust</h2>
        <div className="diagram-container">
          <div className="diagram-title">Mutual TLS Authentication</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>🔐 Traditional TLS</h4>
              <ul>
                <li>Server presents certificate</li>
                <li>Client verifies server identity</li>
                <li>One-way authentication</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>🔐🔐 Mutual TLS</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Both parties present certificates</li>
                <li>→ Two-way authentication</li>
                <li>→ Zero Trust implementation</li>
                <li>→ Service mesh automates (Istio)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="info-box danger">
          <div className="info-box-icon">🚨</div>
          <div className="info-box-content">
            <h4>Secrets Anti-Patterns</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Hard-coding in source code</li>
              <li>Committing to version control</li>
              <li>Sharing via email/chat</li>
              <li>Environment variables in Dockerfiles</li>
              <li>Logging secrets</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Zero Trust: Never trust, always verify</li>
              <li>Centralize secrets in management tools (Vault)</li>
              <li>Use dynamic, short-lived secrets</li>
              <li>mTLS for service-to-service authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Zero Trust Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Zero Trust Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design Zero Trust architecture for a microservices platform</span></li><li><span className="req-number">2</span><span className="req-text">Implement secrets management strategy using Vault or cloud-native tools</span></li><li><span className="req-number">3</span><span className="req-text">Design automatic secrets rotation with zero downtime</span></li><li><span className="req-number">4</span><span className="req-text">Plan mTLS rollout for service-to-service communication</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/9/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/10/day/1" className="nav-link next">Week 10 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week9Day5;
