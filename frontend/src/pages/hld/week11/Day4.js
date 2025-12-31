import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week11Day4() {
  const weekNum = 11, dayNum = 4, topic = "SSL/TLS Termination & GSLB", concepts = "SSL offloading, geo-routing, global load balancing";
  
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
    { id: 1, question: "What is SSL termination?", options: ["Ending SSL support", "Decrypting HTTPS at the load balancer", "SSL certificate renewal", "Blocking SSL"], correct: 1, explanation: "SSL termination decrypts HTTPS traffic at the load balancer, allowing inspection and reducing backend CPU load." },
    { id: 2, question: "What is SSL passthrough?", options: ["SSL termination", "Passing encrypted traffic directly to backend", "Disabling SSL", "Certificate caching"], correct: 1, explanation: "SSL passthrough forwards encrypted traffic to backend servers without decryption, maintaining end-to-end encryption." },
    { id: 3, question: "What is GSLB?", options: ["Generic Server Load Balancing", "Global Server Load Balancing across data centers", "Local load balancing", "SSL balancing"], correct: 1, explanation: "GSLB distributes traffic across multiple geographic data centers for optimal performance and disaster recovery." },
    { id: 4, question: "What routing method returns different IPs based on user location?", options: ["Round robin", "Geo-routing/Geographic routing", "Least connections", "Weighted"], correct: 1, explanation: "Geo-routing returns different IP addresses based on the user's geographic location to serve from the nearest data center." },
    { id: 5, question: "What is SSL re-encryption?", options: ["Terminating and not re-encrypting", "Terminating, inspecting, then re-encrypting to backend", "Passthrough", "Certificate generation"], correct: 1, explanation: "SSL re-encryption terminates SSL at the load balancer, inspects/modifies traffic, then creates new SSL connection to backend." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>SSL/TLS Termination & GSLB</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>SSL/TLS Termination & GSLB</h1><div className="article-tags"><span className="tag">SSL Termination</span><span className="tag">TLS</span><span className="tag">GSLB</span><span className="tag">Geo-Routing</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">SSL/TLS Termination</h2>
        <p><strong>SSL termination</strong> (also called SSL offloading) is when the load balancer decrypts HTTPS traffic instead of the backend servers, reducing their computational load.</p>

        <h3 className="md-h3">SSL Architectures</h3>
        <div className="diagram-container">
          <div className="diagram-title">SSL Termination Options</div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>SSL Termination (Offloading)</h4>
                <p>Client → [HTTPS] → LB → [HTTP] → Backend. LB decrypts, backend receives plain HTTP. Simple but internal traffic unencrypted.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>SSL Passthrough</h4>
                <p>Client → [HTTPS] → LB → [HTTPS] → Backend. No decryption at LB. End-to-end encryption but no content inspection.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>SSL Re-encryption</h4>
                <p>Client → [HTTPS] → LB → [HTTPS] → Backend. LB decrypts, inspects, re-encrypts. Best security, highest overhead.</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Benefits of SSL Termination</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Reduced Backend Load</div>
            <div className="concept-card-description">No CPU-intensive SSL operations on app servers</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔧</div>
            <div className="concept-card-title">Centralized Certificates</div>
            <div className="concept-card-description">Manage certs in one place, not on every server</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔍</div>
            <div className="concept-card-title">Content Inspection</div>
            <div className="concept-card-description">Enable L7 features like path-based routing</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Better Visibility</div>
            <div className="concept-card-description">Log and monitor actual HTTP requests</div>
          </div>
        </div>

        <h2 className="md-h2">Global Server Load Balancing (GSLB)</h2>
        <p><strong>GSLB</strong> distributes traffic across multiple data centers or geographic regions, routing users to the optimal location.</p>

        <div className="diagram-container">
          <div className="diagram-title">GSLB Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👤</span><span className="flow-node-label">User (Europe)</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node dns"><span className="flow-node-icon">🌐</span><span className="flow-node-label">GSLB DNS</span><span className="flow-node-sublabel">Returns EU IP</span></div>
            </div>
            <div className="flow-arrow down">↓ Routes to nearest</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">🏢</span><span className="flow-node-label">US-East DC</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">🏢</span><span className="flow-node-label">EU DC</span><span className="flow-node-sublabel">✓ Selected</span></div>
              <div className="flow-node database"><span className="flow-node-icon">🏢</span><span className="flow-node-label">APAC DC</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">GSLB Routing Strategies</h2>
        <table className="comparison-table">
          <thead><tr><th>Strategy</th><th>Description</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Geographic</td><td>Route based on client IP geolocation</td><td>Data residency requirements</td></tr>
            <tr><td className="feature-name">Latency-Based</td><td>Route to data center with lowest latency</td><td>Performance optimization</td></tr>
            <tr><td className="feature-name">Failover</td><td>Primary DC with secondary for DR</td><td>Disaster recovery</td></tr>
            <tr><td className="feature-name">Weighted</td><td>Distribute percentage across DCs</td><td>Gradual rollouts, cost balancing</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Implementation Considerations</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>🔒 SSL Best Practices</h4>
            <ul>
              <li>Use TLS 1.2 or 1.3 only</li>
              <li>Strong cipher suites</li>
              <li>Enable HSTS header</li>
              <li>Automate cert renewal (Let's Encrypt)</li>
              <li>Consider OCSP stapling</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>🌍 GSLB Considerations</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ DNS TTL affects failover time</li>
              <li>→ Client DNS caching issues</li>
              <li>→ Data replication between regions</li>
              <li>→ Session management across DCs</li>
              <li>→ Active-active vs active-passive</li>
            </ul>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Preserve Client IP</h4>
            <p>When using SSL termination, use X-Forwarded-For and X-Forwarded-Proto headers to pass original client IP and protocol to backend servers.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>SSL termination reduces backend load, enables L7 features</li>
              <li>SSL passthrough for end-to-end encryption</li>
              <li>GSLB routes users to optimal data center</li>
              <li>Geo-routing for latency and compliance</li>
              <li>Consider DNS TTL for failover speed</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>SSL & GSLB Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Multi-Region Architecture Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design SSL strategy for a global application (termination vs passthrough)</span></li><li><span className="req-number">2</span><span className="req-text">Configure GSLB with failover between US, EU, and APAC regions</span></li><li><span className="req-number">3</span><span className="req-text">Plan data replication strategy for cross-region consistency</span></li><li><span className="req-number">4</span><span className="req-text">Document failover procedure and expected recovery time</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/11/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/11/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week11Day4;
