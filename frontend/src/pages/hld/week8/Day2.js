import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week8Day2() {
  const weekNum = 8, dayNum = 2, topic = "Service Discovery & Communication", concepts = "Service registry, client-side vs server-side discovery";
  
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
    { id: 1, question: "What is service discovery?", options: ["Database management", "Finding available service instances", "Code compilation", "Testing framework"], correct: 1, explanation: "Service discovery enables services to find each other in dynamic environments where instances come and go." },
    { id: 2, question: "What is client-side discovery?", options: ["Server finds services", "Client queries registry and load balances", "DNS-based lookup", "Manual configuration"], correct: 1, explanation: "In client-side discovery, the client queries the service registry and performs load balancing to select an instance." },
    { id: 3, question: "Which tool is commonly used for service discovery?", options: ["MySQL", "Redis", "Consul", "MongoDB"], correct: 2, explanation: "Consul, Eureka, and etcd are popular service discovery tools that maintain service registries." },
    { id: 4, question: "What is a health check in service discovery?", options: ["Code review", "Verifying service availability", "Database backup", "Load testing"], correct: 1, explanation: "Health checks verify that service instances are available and functioning correctly." },
    { id: 5, question: "What is server-side discovery?", options: ["Client queries registry", "Load balancer queries registry and routes", "Manual IP configuration", "No registry needed"], correct: 1, explanation: "In server-side discovery, a load balancer queries the registry and routes requests to available instances." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Service Discovery & Communication</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Service Discovery & Communication</h1><div className="article-tags"><span className="tag">Service Discovery</span><span className="tag">Microservices</span><span className="tag">Registry</span><span className="tag">Communication</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Why Service Discovery?</h2>
        <p>In microservices architectures, services need to locate each other dynamically. Unlike monoliths with in-process calls, microservices must discover <strong>network locations</strong> of other services that may change frequently due to auto-scaling and deployments.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Dynamic Environments</div>
            <div className="concept-card-description">Services come and go due to scaling, failures, and deployments</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">Decoupling</div>
            <div className="concept-card-description">Services don't need hard-coded IP addresses</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⚖️</div>
            <div className="concept-card-title">Load Balancing</div>
            <div className="concept-card-description">Distribute requests across multiple instances</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔍</div>
            <div className="concept-card-title">Health Awareness</div>
            <div className="concept-card-description">Route only to healthy instances</div>
          </div>
        </div>

        <h2 className="md-h2">Discovery Patterns</h2>
        <div className="diagram-container">
          <div className="diagram-title">Client-Side vs Server-Side Discovery</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>📱 Client-Side Discovery</h4>
              <ul>
                <li>Client queries service registry</li>
                <li>Client performs load balancing</li>
                <li>More client logic needed</li>
                <li>Example: Netflix Eureka + Ribbon</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>🖥️ Server-Side Discovery</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Load balancer queries registry</li>
                <li>→ Client sends to load balancer</li>
                <li>→ Simpler client implementation</li>
                <li>→ Example: AWS ELB, Kubernetes</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Service Discovery Architecture</h2>
        <div className="diagram-container">
          <div className="diagram-title">Service Registry Flow</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📱</span><span className="flow-node-label">Service A</span><span className="flow-node-sublabel">Consumer</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📋</span><span className="flow-node-label">Service Registry</span><span className="flow-node-sublabel">Consul/Eureka</span></div>
            </div>
            <div className="flow-arrow down">↓ 1. Query for Service B</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Service B-1</span><span className="flow-node-sublabel">Instance 1</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Service B-2</span><span className="flow-node-sublabel">Instance 2</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Service B-3</span><span className="flow-node-sublabel">Instance 3</span></div>
            </div>
            <div className="flow-arrow down">↑ 2. Register & Health Check</div>
          </div>
        </div>

        <h2 className="md-h2">Service Discovery Tools</h2>
        <table className="comparison-table">
          <thead><tr><th>Tool</th><th>Type</th><th>Key Features</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Consul</td><td>General purpose</td><td>KV store, health checks, DNS</td><td>Multi-datacenter</td></tr>
            <tr><td className="feature-name">Eureka</td><td>Client-side</td><td>Netflix stack, REST-based</td><td>Spring Cloud apps</td></tr>
            <tr><td className="feature-name">etcd</td><td>KV store</td><td>Raft consensus, watch</td><td>Kubernetes</td></tr>
            <tr><td className="feature-name">Kubernetes DNS</td><td>Server-side</td><td>Native K8s, automatic</td><td>K8s workloads</td></tr>
            <tr><td className="feature-name">ZooKeeper</td><td>Coordination</td><td>Strong consistency</td><td>Hadoop ecosystem</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Health Checks & Registration</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Service Registration</h4>
              <p>Service registers itself with registry on startup (self-registration) or via a third party (registrar)</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Health Check</h4>
              <p>Registry periodically pings services or services send heartbeats to prove liveness</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Deregistration</h4>
              <p>Failed health checks or graceful shutdown removes service from registry</p>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Best Practices</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Use health checks to route only to healthy instances</li>
              <li>Implement graceful shutdown with deregistration</li>
              <li>Cache discovery results locally with TTL</li>
              <li>Use DNS-based discovery for simplicity when possible</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Service discovery is essential for dynamic microservices</li>
              <li>Client-side: more control, more complexity</li>
              <li>Server-side: simpler clients, infrastructure dependency</li>
              <li>Health checks ensure routing to available instances</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Service Discovery Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Service Discovery Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design a service discovery system for 50+ microservices</span></li><li><span className="req-number">2</span><span className="req-text">Compare client-side vs server-side discovery trade-offs</span></li><li><span className="req-number">3</span><span className="req-text">Implement health check strategy with graceful degradation</span></li><li><span className="req-number">4</span><span className="req-text">Handle cross-datacenter service discovery</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/8/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/8/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week8Day2;
