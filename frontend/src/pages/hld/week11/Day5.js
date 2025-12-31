import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week11Day5() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 11, dayNum = 5, topic = "Load Balancer Implementations", concepts = "NGINX, HAProxy, AWS ELB, Envoy, Traefik";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "Which load balancer is known for high performance and is commonly used as a reverse proxy?", options: ["HAProxy", "NGINX", "Traefik", "Apache"], correct: 1, explanation: "NGINX is widely used as both a web server and reverse proxy/load balancer, known for high performance and efficiency." },
    { id: 2, question: "What is HAProxy best known for?", options: ["Static file serving", "High-performance TCP/HTTP load balancing", "Database proxying only", "Container orchestration"], correct: 1, explanation: "HAProxy is a high-performance, reliable TCP/HTTP load balancer used by major companies like GitHub and Stack Overflow." },
    { id: 3, question: "Which AWS load balancer operates at Layer 7?", options: ["Network Load Balancer (NLB)", "Classic Load Balancer", "Application Load Balancer (ALB)", "Gateway Load Balancer"], correct: 2, explanation: "ALB operates at Layer 7 (application layer), supporting content-based routing, while NLB operates at Layer 4." },
    { id: 4, question: "What makes Envoy unique for microservices?", options: ["It's only for databases", "It's designed as a service mesh data plane", "It only supports HTTP/1.1", "It doesn't support health checks"], correct: 1, explanation: "Envoy is designed as a modern service mesh data plane, with built-in support for gRPC, HTTP/2, and observability." },
    { id: 5, question: "Which load balancer has automatic service discovery for containers?", options: ["NGINX (without Plus)", "HAProxy", "Traefik", "Apache"], correct: 2, explanation: "Traefik has native integration with container orchestrators like Kubernetes and Docker for automatic service discovery." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Load Balancer Implementations</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Load Balancer Implementations</h1><div className="article-tags"><span className="tag">NGINX</span><span className="tag">HAProxy</span><span className="tag">AWS ELB</span><span className="tag">Envoy</span><span className="tag">Traefik</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Popular Load Balancer Solutions</h2>
        <p>Understanding the strengths of different load balancer implementations helps you choose the right tool for your architecture.</p>

        <h2 className="md-h2">NGINX</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🚀</div>
            <div className="concept-card-title">High Performance</div>
            <div className="concept-card-description">Event-driven, non-blocking architecture handles millions of connections</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔧</div>
            <div className="concept-card-title">Multi-Purpose</div>
            <div className="concept-card-description">Web server, reverse proxy, load balancer, HTTP cache</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📝</div>
            <div className="concept-card-title">Lua Scripting</div>
            <div className="concept-card-description">Extensible via OpenResty for custom logic</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💼</div>
            <div className="concept-card-title">NGINX Plus</div>
            <div className="concept-card-description">Commercial version with active health checks, API config</div>
          </div>
        </div>

        <h2 className="md-h2">HAProxy</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Extremely Fast</div>
            <div className="concept-card-description">Handles millions of connections per second</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Rich Statistics</div>
            <div className="concept-card-description">Built-in stats dashboard with detailed metrics</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">ACL Routing</div>
            <div className="concept-card-description">Powerful access control lists for complex routing</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🏢</div>
            <div className="concept-card-title">Enterprise Ready</div>
            <div className="concept-card-description">Used by GitHub, Stack Overflow, Twitter</div>
          </div>
        </div>

        <h2 className="md-h2">Comparison Table</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>NGINX</th><th>HAProxy</th><th>AWS ALB/NLB</th><th>Envoy</th><th>Traefik</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Layer</td><td>L4/L7</td><td>L4/L7</td><td>L4 (NLB) / L7 (ALB)</td><td>L4/L7</td><td>L7</td></tr>
            <tr><td className="feature-name">License</td><td>Open Source / Plus</td><td>Open Source</td><td>Managed Service</td><td>Open Source</td><td>Open Source</td></tr>
            <tr><td className="feature-name">Service Discovery</td><td>Manual / Plus</td><td>Manual</td><td>AWS Integration</td><td>xDS API</td><td>Native</td></tr>
            <tr><td className="feature-name">Config Reload</td><td>Hot reload</td><td>Hot reload</td><td>Automatic</td><td>Dynamic (xDS)</td><td>Dynamic</td></tr>
            <tr><td className="feature-name">Best For</td><td>Web, Reverse Proxy</td><td>TCP/HTTP LB</td><td>AWS Workloads</td><td>Service Mesh</td><td>Container/K8s</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">AWS Elastic Load Balancers</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">ALB</div>
            <div className="step-content">
              <h4>Application Load Balancer</h4>
              <p>Layer 7. Path/host routing, WebSocket, container support, gRPC. Best for HTTP/HTTPS workloads.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">NLB</div>
            <div className="step-content">
              <h4>Network Load Balancer</h4>
              <p>Layer 4. Ultra-low latency, static IP, millions RPS. Best for TCP/UDP, gaming, IoT.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">GWLB</div>
            <div className="step-content">
              <h4>Gateway Load Balancer</h4>
              <p>Layer 3. For network appliances (firewalls, IDS). Transparent to clients.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Envoy Proxy</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>✨ Key Features</h4>
            <ul>
              <li>Designed for service mesh (Istio data plane)</li>
              <li>Native gRPC and HTTP/2 support</li>
              <li>Dynamic configuration via xDS APIs</li>
              <li>Built-in observability (tracing, metrics)</li>
              <li>Advanced load balancing (zone-aware)</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>🎯 Traefik Features</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Auto-discovery (K8s, Docker, Consul)</li>
              <li>→ Let's Encrypt integration</li>
              <li>→ Built-in dashboard</li>
              <li>→ Middleware plugins</li>
              <li>→ Simple configuration (YAML/TOML)</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Selection Guide</h2>
        <table className="comparison-table">
          <thead><tr><th>Use Case</th><th>Recommended</th><th>Reason</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Simple web apps</td><td>NGINX</td><td>Easy setup, well documented</td></tr>
            <tr><td className="feature-name">High-performance TCP</td><td>HAProxy</td><td>Best raw performance</td></tr>
            <tr><td className="feature-name">AWS native</td><td>ALB/NLB</td><td>Managed, auto-scaling</td></tr>
            <tr><td className="feature-name">Service mesh</td><td>Envoy</td><td>Designed for microservices</td></tr>
            <tr><td className="feature-name">Kubernetes</td><td>Traefik</td><td>Native K8s integration</td></tr>
          </tbody>
        </table>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Pro Tip</h4>
            <p>Many production architectures combine multiple load balancers: Cloud LB (AWS ALB) at the edge for SSL termination and basic routing, with NGINX or HAProxy internally for more granular control.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>NGINX: Versatile, great for web and reverse proxy</li>
              <li>HAProxy: Maximum performance for TCP/HTTP</li>
              <li>AWS ELB: Managed, integrates with AWS services</li>
              <li>Envoy: Modern, designed for service mesh</li>
              <li>Traefik: Best for container/Kubernetes environments</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>LB Implementations Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Load Balancer Selection Project</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare NGINX and HAProxy configurations for a 3-server cluster</span></li><li><span className="req-number">2</span><span className="req-text">Write sample configuration for path-based routing to different backends</span></li><li><span className="req-number">3</span><span className="req-text">Evaluate AWS ALB vs self-managed NGINX for your use case</span></li><li><span className="req-number">4</span><span className="req-text">Design a hybrid architecture using cloud LB + internal Envoy sidecar</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/11/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/12/day/1" className="nav-link next">Week 12 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week11Day5;
