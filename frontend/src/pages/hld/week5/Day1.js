import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week5Day1() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 5, dayNum = 1, topic = "Load Balancing Fundamentals", concepts = "L4 vs L7, Algorithms, Health checks";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is a load balancer?", options: ["Database server", "Distributes traffic across multiple servers", "Storage system", "Monitoring tool"], correct: 1, explanation: "A load balancer distributes incoming network traffic across multiple backend servers." },
    { id: 2, question: "L4 load balancing operates at?", options: ["Application layer", "Transport layer (TCP/UDP)", "Physical layer", "Data link layer"], correct: 1, explanation: "Layer 4 load balancing works at the transport layer, routing based on IP and port." },
    { id: 3, question: "L7 load balancing can route based on?", options: ["Only IP address", "URL path, headers, cookies", "Only port number", "MAC address"], correct: 1, explanation: "Layer 7 (application layer) can inspect HTTP headers, URLs, cookies for intelligent routing." },
    { id: 4, question: "Round Robin algorithm does?", options: ["Sends to fastest server", "Distributes requests sequentially", "Random distribution", "Weighted by capacity"], correct: 1, explanation: "Round Robin cycles through servers in order, giving each an equal share." },
    { id: 5, question: "Health checks are used to?", options: ["Monitor server performance only", "Remove unhealthy servers from pool", "Increase traffic", "Cache responses"], correct: 1, explanation: "Health checks detect failed servers and remove them from the load balancer pool." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Load Balancing Fundamentals</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Load Balancing Fundamentals</h1><div className="article-tags"><span className="tag">Load Balancer</span><span className="tag">Scaling</span><span className="tag">High Availability</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Load Balancing?</h2>
        <p><strong>Load balancing</strong> distributes incoming network traffic across multiple servers to ensure no single server bears too much load, improving reliability and performance.</p>

        <div className="diagram-container">
          <div className="diagram-title">Load Balancer Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👥</span><span className="flow-node-label">Clients</span><span className="flow-node-sublabel">1000s of requests</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node loadbalancer"><span className="flow-node-icon">⚖️</span><span className="flow-node-label">Load Balancer</span><span className="flow-node-sublabel">Distributes traffic</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Server 1</span><span className="flow-node-sublabel">Healthy ✓</span></div>
              <div className="flow-node server"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Server 2</span><span className="flow-node-sublabel">Healthy ✓</span></div>
              <div className="flow-node server" style={{opacity: 0.5}}><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Server 3</span><span className="flow-node-sublabel">Unhealthy ✗</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Why Load Balancing?</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📈</div>
            <div className="concept-card-title">Scalability</div>
            <div className="concept-card-description">Handle more traffic by adding servers horizontally</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">High Availability</div>
            <div className="concept-card-description">If one server fails, others continue serving</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Performance</div>
            <div className="concept-card-description">Distribute load to prevent any server from being overwhelmed</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔧</div>
            <div className="concept-card-title">Flexibility</div>
            <div className="concept-card-description">Add/remove servers without downtime</div>
          </div>
        </div>

        <h2 className="md-h2">L4 vs L7 Load Balancing</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>Layer 4 (Transport)</th><th>Layer 7 (Application)</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Routes based on</td><td>IP address, TCP/UDP port</td><td>URL, headers, cookies, content</td></tr>
            <tr><td className="feature-name">Speed</td><td>Faster (less processing)</td><td>Slower (content inspection)</td></tr>
            <tr><td className="feature-name">Intelligence</td><td>Basic</td><td>Advanced routing rules</td></tr>
            <tr><td className="feature-name">SSL Termination</td><td>Pass-through</td><td>Can terminate SSL</td></tr>
            <tr><td className="feature-name">Use Case</td><td>Simple TCP load balancing</td><td>HTTP routing, API gateway</td></tr>
            <tr><td className="feature-name">Examples</td><td>HAProxy (TCP mode)</td><td>Nginx, AWS ALB</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Load Balancing Algorithms</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Round Robin</h4>
              <p>Requests distributed sequentially. Simple, works well when servers have equal capacity.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Weighted Round Robin</h4>
              <p>Assigns weights based on server capacity. Powerful servers get more requests.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Least Connections</h4>
              <p>Routes to server with fewest active connections. Good for long-lived connections.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>IP Hash</h4>
              <p>Hash of client IP determines server. Ensures same client goes to same server (sticky sessions).</p>
            </div>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Load balancers distribute traffic for scalability and availability</li>
              <li>L4: Fast, simple routing by IP/port</li>
              <li>L7: Intelligent routing by content (URLs, headers)</li>
              <li>Health checks ensure traffic goes only to healthy servers</li>
              <li>Choose algorithm based on your traffic patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Load Balancing Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Load Balancer Configuration</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Set up Nginx as a load balancer with 3 backend servers</span></li><li><span className="req-number">2</span><span className="req-text">Configure health checks with 5-second intervals</span></li><li><span className="req-number">3</span><span className="req-text">Test failover by stopping one backend server</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/4/day/7" className="nav-link prev">&lt;&lt; W4D7</Link><Link to="/hld/week/5/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week5Day1;
