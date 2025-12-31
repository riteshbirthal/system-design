import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week13Day5() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 13, dayNum = 5, topic = "Gateway Implementations", concepts = "Kong, AWS API Gateway, NGINX, Envoy comparison";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is Kong API Gateway known for?", options: ["Database only", "Rich plugin ecosystem built on NGINX", "Mobile development", "Testing tool"], correct: 1, explanation: "Kong is an open-source API gateway built on NGINX/OpenResty with a rich plugin ecosystem." },
    { id: 2, question: "When is AWS API Gateway the best choice?", options: ["On-premise only", "AWS-native workloads with Lambda integration", "Linux desktop", "Gaming"], correct: 1, explanation: "AWS API Gateway is ideal for AWS-native workloads, especially with Lambda for serverless architectures." },
    { id: 3, question: "What makes Envoy unique?", options: ["Oldest gateway", "Designed for service mesh as data plane", "Only for databases", "Windows only"], correct: 1, explanation: "Envoy is a modern proxy designed as a service mesh data plane with native gRPC and observability support." },
    { id: 4, question: "What feature does Traefik excel at?", options: ["Manual configuration", "Automatic service discovery for containers", "Mainframe integration", "Desktop apps"], correct: 1, explanation: "Traefik has native auto-discovery for Kubernetes, Docker, and other orchestrators." },
    { id: 5, question: "Which gateway is fully managed by AWS?", options: ["Kong", "NGINX", "AWS API Gateway", "HAProxy"], correct: 2, explanation: "AWS API Gateway is a fully managed service requiring no infrastructure management." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Gateway Implementations</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Gateway Implementations</h1><div className="article-tags"><span className="tag">Kong</span><span className="tag">AWS API Gateway</span><span className="tag">NGINX</span><span className="tag">Envoy</span><span className="tag">Traefik</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Implementation Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>Kong</th><th>AWS API GW</th><th>Envoy</th><th>Traefik</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Type</td><td>Open Source</td><td>Managed</td><td>Open Source</td><td>Open Source</td></tr>
            <tr><td className="feature-name">Base</td><td>NGINX/OpenResty</td><td>AWS Native</td><td>C++</td><td>Go</td></tr>
            <tr><td className="feature-name">Plugins</td><td>100+ plugins</td><td>Limited</td><td>Filters</td><td>Middlewares</td></tr>
            <tr><td className="feature-name">Service Discovery</td><td>DNS/Consul</td><td>AWS native</td><td>xDS API</td><td>Native (K8s)</td></tr>
            <tr><td className="feature-name">Best For</td><td>API Management</td><td>AWS/Serverless</td><td>Service Mesh</td><td>Containers</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Kong Gateway</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">🔌</div><div className="concept-card-title">Plugin Ecosystem</div><div className="concept-card-description">Auth, rate limiting, transformations, logging built-in</div></div>
          <div className="concept-card"><div className="concept-card-icon">📊</div><div className="concept-card-title">Admin API</div><div className="concept-card-description">REST API for configuration management</div></div>
          <div className="concept-card"><div className="concept-card-icon">☸️</div><div className="concept-card-title">K8s Native</div><div className="concept-card-description">Kong Ingress Controller for Kubernetes</div></div>
          <div className="concept-card"><div className="concept-card-icon">💼</div><div className="concept-card-title">Enterprise</div><div className="concept-card-description">Kong Enterprise with additional features</div></div>
        </div>

        <h2 className="md-h2">AWS API Gateway</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">REST</div><div className="step-content"><h4>REST API</h4><p>Full features, request validation, caching, WAF integration</p></div></div>
          <div className="step-card"><div className="step-number">HTTP</div><div className="step-content"><h4>HTTP API</h4><p>Lightweight, lower cost, faster, JWT auth built-in</p></div></div>
          <div className="step-card"><div className="step-number">WS</div><div className="step-content"><h4>WebSocket API</h4><p>Real-time bidirectional communication</p></div></div>
        </div>

        <h2 className="md-h2">Selection Guide</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>Use Case → Solution</h4>
            <ul>
              <li>AWS + Lambda → AWS API Gateway</li>
              <li>Rich plugins needed → Kong</li>
              <li>Service mesh → Envoy</li>
              <li>Kubernetes → Traefik or Kong</li>
              <li>Custom logic → NGINX + Lua</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>Key Considerations</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Managed vs self-hosted operational cost</li>
              <li>→ Vendor lock-in concerns</li>
              <li>→ Team expertise</li>
              <li>→ Integration requirements</li>
              <li>→ Performance needs</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Kong: Best for API management with plugin ecosystem</li>
              <li>AWS API Gateway: Best for AWS-native/serverless</li>
              <li>Envoy: Best for service mesh data plane</li>
              <li>Traefik: Best for container/Kubernetes auto-discovery</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Gateway Implementation Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Gateway Selection Project</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare Kong vs AWS API Gateway for your company's needs</span></li><li><span className="req-number">2</span><span className="req-text">Design gateway architecture for a microservices platform</span></li><li><span className="req-number">3</span><span className="req-text">Evaluate cost: managed service vs self-hosted</span></li><li><span className="req-number">4</span><span className="req-text">Create migration plan from existing gateway to new solution</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/13/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/14/day/1" className="nav-link next">Week 14 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week13Day5;
