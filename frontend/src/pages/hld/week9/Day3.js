import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week9Day3() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 9, dayNum = 3, topic = "Authorization & Access Control", concepts = "RBAC, ABAC, policies, least privilege";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is RBAC?", options: ["Resource-Based Access Control", "Role-Based Access Control", "Rule-Based Access Control", "Request-Based Access Control"], correct: 1, explanation: "RBAC assigns users to roles, and roles have permissions. Users inherit permissions from their roles." },
    { id: 2, question: "What is ABAC?", options: ["Attribute-Based Access Control", "Action-Based Access Control", "Admin-Based Access Control", "Application-Based Access Control"], correct: 0, explanation: "ABAC makes decisions based on attributes of user, resource, and environment." },
    { id: 3, question: "What is the principle of least privilege?", options: ["Give all permissions", "Grant minimum permissions necessary", "No permissions", "Admin access only"], correct: 1, explanation: "Least privilege means granting only the minimum permissions necessary for a task." },
    { id: 4, question: "What is an ACL?", options: ["Access Control List", "Admin Control Layer", "Authentication Control Logic", "Application Control Level"], correct: 0, explanation: "ACL is a list of permissions attached to a resource specifying who can do what." },
    { id: 5, question: "What tool is used for policy-based access control?", options: ["MySQL", "Open Policy Agent (OPA)", "Redis", "Nginx"], correct: 1, explanation: "OPA is a popular tool for centralized policy-based access control across services." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Authorization & Access Control</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Authorization & Access Control</h1><div className="article-tags"><span className="tag">Authorization</span><span className="tag">RBAC</span><span className="tag">ABAC</span><span className="tag">Policies</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Authorization Fundamentals</h2>
        <p><strong>Authorization</strong> determines what authenticated users are allowed to do. After verifying identity (authentication), we must verify permissions (authorization) for every action.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📋</div>
            <div className="concept-card-title">ACL (Access Control List)</div>
            <div className="concept-card-description">List of permissions per resource - simple but doesn't scale</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">👥</div>
            <div className="concept-card-title">RBAC (Role-Based)</div>
            <div className="concept-card-description">Users assigned to roles with permissions - easy to manage</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🏷️</div>
            <div className="concept-card-title">ABAC (Attribute-Based)</div>
            <div className="concept-card-description">Decisions based on attributes - fine-grained control</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">ReBAC (Relationship-Based)</div>
            <div className="concept-card-description">Based on entity relationships - graph-based (Google Zanzibar)</div>
          </div>
        </div>

        <h2 className="md-h2">Role-Based Access Control (RBAC)</h2>
        <div className="diagram-container">
          <div className="diagram-title">RBAC Hierarchy</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👤</span><span className="flow-node-label">Users</span><span className="flow-node-sublabel">John, Jane, Bob</span></div>
            </div>
            <div className="flow-arrow down">↓ Assigned to</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">🎭</span><span className="flow-node-label">Roles</span><span className="flow-node-sublabel">Admin, Editor, Viewer</span></div>
            </div>
            <div className="flow-arrow down">↓ Have</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">🔑</span><span className="flow-node-label">Permissions</span><span className="flow-node-sublabel">Create, Read, Update, Delete</span></div>
            </div>
          </div>
        </div>

        <table className="comparison-table">
          <thead><tr><th>Role</th><th>Create</th><th>Read</th><th>Update</th><th>Delete</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Admin</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
            <tr><td className="feature-name">Editor</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td><td className="cross">✗</td></tr>
            <tr><td className="feature-name">Viewer</td><td className="cross">✗</td><td className="check">✓</td><td className="cross">✗</td><td className="cross">✗</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Attribute-Based Access Control (ABAC)</h2>
        <div className="diagram-container">
          <div className="diagram-title">ABAC Policy Example</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>📝 Policy Rule</h4>
              <p style={{color: '#CBD5E1', fontSize: '0.95rem'}}>
                "Allow if user.department = resource.department AND time is business hours AND user.clearance >= resource.classification"
              </p>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>🏷️ Attributes Used</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ User: department, clearance, location</li>
                <li>→ Resource: owner, classification</li>
                <li>→ Environment: time, IP address</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Authorization Models Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Model</th><th>Granularity</th><th>Complexity</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">ACL</td><td>Resource-level</td><td>Low</td><td>Simple file systems</td></tr>
            <tr><td className="feature-name">RBAC</td><td>Role-level</td><td>Medium</td><td>Enterprise apps</td></tr>
            <tr><td className="feature-name">ABAC</td><td>Attribute-level</td><td>High</td><td>Complex, context-aware</td></tr>
            <tr><td className="feature-name">ReBAC</td><td>Relationship-level</td><td>High</td><td>Social apps, docs</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Authorization in Microservices</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>API Gateway Authorization</h4>
              <p>Coarse-grained at edge - validate tokens, check basic permissions</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Service-Level Authorization</h4>
              <p>Fine-grained within service - business logic authorization</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Centralized Policy Service</h4>
              <p>Consistent policies across services using OPA, Cerbos, or similar</p>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Principle of Least Privilege</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Grant minimum permissions necessary for task</li>
              <li>Use time-bound elevated access (JIT)</li>
              <li>Regular access reviews and audits</li>
              <li>Separate duties where possible</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>RBAC for most enterprise applications</li>
              <li>ABAC for fine-grained, context-aware access</li>
              <li>Always default to deny (whitelist approach)</li>
              <li>Centralize authorization logic when possible</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Authorization Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Authorization System Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design RBAC model for a SaaS application with Admin, Manager, User roles</span></li><li><span className="req-number">2</span><span className="req-text">Implement ABAC policy for document access based on department and clearance</span></li><li><span className="req-number">3</span><span className="req-text">Design centralized authorization service using OPA</span></li><li><span className="req-number">4</span><span className="req-text">Implement audit logging for all authorization decisions</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/9/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/9/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week9Day3;
