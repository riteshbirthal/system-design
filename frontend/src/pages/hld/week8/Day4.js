import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week8Day4() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 8, dayNum = 4, topic = "Service Mesh & Sidecars", concepts = "Istio, Envoy, mTLS, traffic management";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is a service mesh?", options: ["Database cluster", "Dedicated infrastructure layer for service-to-service communication", "Message queue", "Load balancer"], correct: 1, explanation: "A service mesh is a dedicated infrastructure layer that handles service-to-service communication with features like security, observability, and traffic management." },
    { id: 2, question: "What is a sidecar proxy?", options: ["Main application container", "Auxiliary process alongside primary service", "Database connection", "Message broker"], correct: 1, explanation: "A sidecar proxy runs alongside each service instance, handling network communication and cross-cutting concerns." },
    { id: 3, question: "What does mTLS provide in a service mesh?", options: ["Data storage", "Mutual authentication between services", "Message queuing", "Load balancing"], correct: 1, explanation: "mTLS (mutual TLS) provides two-way authentication and encrypted communication between services." },
    { id: 4, question: "Which is a popular service mesh implementation?", options: ["MySQL", "Redis", "Istio", "MongoDB"], correct: 2, explanation: "Istio is one of the most popular service mesh implementations, using Envoy as its data plane proxy." },
    { id: 5, question: "What is the data plane in a service mesh?", options: ["Configuration storage", "Sidecar proxies that handle traffic", "User interface", "Database layer"], correct: 1, explanation: "The data plane consists of sidecar proxies (like Envoy) that actually handle the network traffic between services." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Service Mesh & Sidecars</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Service Mesh & Sidecars</h1><div className="article-tags"><span className="tag">Service Mesh</span><span className="tag">Sidecar</span><span className="tag">Istio</span><span className="tag">Envoy</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is a Service Mesh?</h2>
        <p>A <strong>service mesh</strong> is a dedicated infrastructure layer for handling service-to-service communication. It provides traffic management, security, and observability without requiring changes to application code.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔀</div>
            <div className="concept-card-title">Traffic Management</div>
            <div className="concept-card-description">Load balancing, routing, retries, circuit breaking, fault injection</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔐</div>
            <div className="concept-card-title">Security (mTLS)</div>
            <div className="concept-card-description">Automatic encryption and mutual authentication between services</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Observability</div>
            <div className="concept-card-description">Metrics, distributed tracing, and logging automatically collected</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📋</div>
            <div className="concept-card-title">Policy Enforcement</div>
            <div className="concept-card-description">Access control, rate limiting, and quota management</div>
          </div>
        </div>

        <h2 className="md-h2">Service Mesh Architecture</h2>
        <div className="diagram-container">
          <div className="diagram-title">Data Plane vs Control Plane</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node server" style={{minWidth: '250px'}}><span className="flow-node-icon">🎛️</span><span className="flow-node-label">Control Plane</span><span className="flow-node-sublabel">Istiod / Consul Connect</span></div>
            </div>
            <div className="flow-arrow down">↓ Configuration & Certificates</div>
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📦</span><span className="flow-node-label">Service A</span><span className="flow-node-sublabel">+ Envoy Sidecar</span></div>
              <div className="flow-node client"><span className="flow-node-icon">📦</span><span className="flow-node-label">Service B</span><span className="flow-node-sublabel">+ Envoy Sidecar</span></div>
              <div className="flow-node client"><span className="flow-node-icon">📦</span><span className="flow-node-label">Service C</span><span className="flow-node-sublabel">+ Envoy Sidecar</span></div>
            </div>
            <div className="flow-arrow down">↕ mTLS Encrypted Traffic (Data Plane)</div>
          </div>
        </div>

        <h2 className="md-h2">Sidecar Pattern</h2>
        <div className="diagram-container">
          <div className="diagram-title">Sidecar Proxy Architecture</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>🚗 Main Application</h4>
              <ul>
                <li>Business logic only</li>
                <li>No network concerns</li>
                <li>Language agnostic</li>
                <li>Simplified code</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>🏍️ Sidecar Proxy (Envoy)</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Service discovery</li>
                <li>→ Load balancing</li>
                <li>→ Circuit breaking</li>
                <li>→ TLS termination</li>
                <li>→ Metrics collection</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Popular Service Mesh Implementations</h2>
        <table className="comparison-table">
          <thead><tr><th>Service Mesh</th><th>Data Plane</th><th>Key Features</th><th>Complexity</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Istio</td><td>Envoy</td><td>Feature-rich, traffic mgmt, security</td><td>High</td></tr>
            <tr><td className="feature-name">Linkerd</td><td>linkerd2-proxy (Rust)</td><td>Lightweight, simple, K8s native</td><td>Low</td></tr>
            <tr><td className="feature-name">Consul Connect</td><td>Envoy / Built-in</td><td>Multi-platform, service discovery</td><td>Medium</td></tr>
            <tr><td className="feature-name">AWS App Mesh</td><td>Envoy</td><td>AWS native, EKS integration</td><td>Medium</td></tr>
            <tr><td className="feature-name">NGINX Service Mesh</td><td>NGINX</td><td>Performance focused, simple</td><td>Low</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Service Mesh Capabilities</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">🔀</div>
            <div className="step-content">
              <h4>Traffic Management</h4>
              <p>Canary deployments, A/B testing, traffic splitting, retries, timeouts, circuit breakers</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🔐</div>
            <div className="step-content">
              <h4>Security</h4>
              <p>Automatic mTLS, certificate rotation, authorization policies, RBAC</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">📈</div>
            <div className="step-content">
              <h4>Observability</h4>
              <p>Golden metrics (latency, traffic, errors, saturation), distributed tracing, service topology</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">💉</div>
            <div className="step-content">
              <h4>Fault Injection</h4>
              <p>Test resilience by injecting delays, errors, and failures in controlled manner</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">When to Use Service Mesh?</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>✅ Good Fit</h4>
            <ul>
              <li>Many microservices (50+)</li>
              <li>Need consistent security (mTLS)</li>
              <li>Complex traffic management</li>
              <li>Multi-language services</li>
              <li>Zero-trust security model</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#EF4444'}}>
            <h4 style={{color: '#EF4444'}}>❌ May Be Overkill</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Few services (&lt;10)</li>
              <li>→ Simple communication patterns</li>
              <li>→ Limited operational capacity</li>
              <li>→ Latency-critical applications</li>
              <li>→ Simple networking needs</li>
            </ul>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Service Mesh Trade-offs</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Added latency (~1-3ms per hop)</li>
              <li>Increased resource consumption (sidecar per pod)</li>
              <li>Operational complexity</li>
              <li>Learning curve for team</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Service mesh handles cross-cutting communication concerns</li>
              <li>Sidecar pattern keeps application code clean</li>
              <li>mTLS provides zero-trust security</li>
              <li>Evaluate complexity vs benefits for your scale</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Service Mesh Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Service Mesh Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare Istio vs Linkerd for a 100-service microservices platform</span></li><li><span className="req-number">2</span><span className="req-text">Design mTLS rollout strategy with zero downtime</span></li><li><span className="req-number">3</span><span className="req-text">Implement canary deployment using traffic splitting</span></li><li><span className="req-number">4</span><span className="req-text">Set up observability stack with metrics, traces, and logs</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/8/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/8/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week8Day4;
