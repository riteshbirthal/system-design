import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week13Day3() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 13, dayNum = 3, topic = "Gateway Patterns", concepts = "BFF, aggregation, offloading, routing patterns";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is the BFF (Backends for Frontends) pattern?", options: ["Single gateway for all", "Separate gateways per frontend type (web, mobile)", "Backend only architecture", "No frontend"], correct: 1, explanation: "BFF creates separate API gateways optimized for each frontend type (mobile, web, partner) with tailored responses." },
    { id: 2, question: "What is gateway aggregation?", options: ["Load balancing", "Combining multiple service responses into one", "Request splitting", "Caching"], correct: 1, explanation: "Aggregation combines responses from multiple backend services into a single response for the client." },
    { id: 3, question: "What is gateway offloading?", options: ["Removing the gateway", "Moving cross-cutting concerns from services to gateway", "Load distribution", "Data migration"], correct: 1, explanation: "Offloading moves responsibilities like SSL, auth, and logging from services to the gateway." },
    { id: 4, question: "What is canary routing?", options: ["Bird watching API", "Routing small percentage of traffic to new version", "Error routing", "Round robin"], correct: 1, explanation: "Canary routing sends a small percentage of traffic to a new version to test before full rollout." },
    { id: 5, question: "When to use multiple gateways?", options: ["Never", "Different teams, different requirements, BFF pattern", "Always", "Only for testing"], correct: 1, explanation: "Multiple gateways make sense for BFF pattern, different team ownership, or vastly different requirements." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Gateway Patterns</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Gateway Patterns</h1><div className="article-tags"><span className="tag">BFF</span><span className="tag">Aggregation</span><span className="tag">Offloading</span><span className="tag">Canary</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Backends for Frontends (BFF)</h2>
        <div className="diagram-container">
          <div className="diagram-title">BFF Pattern</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📱</span><span className="flow-node-label">Mobile</span></div>
              <div className="flow-node server"><span className="flow-node-icon">💻</span><span className="flow-node-label">Web</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">🤝</span><span className="flow-node-label">Partner</span></div>
            </div>
            <div className="flow-arrow down">↓ Each has own gateway ↓</div>
            <div className="flow-row">
              <div className="flow-node loadbalancer"><span className="flow-node-icon">📱</span><span className="flow-node-label">Mobile BFF</span></div>
              <div className="flow-node loadbalancer"><span className="flow-node-icon">💻</span><span className="flow-node-label">Web BFF</span></div>
              <div className="flow-node loadbalancer"><span className="flow-node-icon">🤝</span><span className="flow-node-label">Partner BFF</span></div>
            </div>
            <div className="flow-arrow down">↓ All route to same services ↓</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">⚙️</span><span className="flow-node-label">Microservices</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Gateway Aggregation</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">📦</div><div className="concept-card-title">Reduce Roundtrips</div><div className="concept-card-description">One client call instead of multiple</div></div>
          <div className="concept-card"><div className="concept-card-icon">📱</div><div className="concept-card-title">Mobile Optimized</div><div className="concept-card-description">Less network calls on slow connections</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔄</div><div className="concept-card-title">Parallel Calls</div><div className="concept-card-description">Gateway fetches from services in parallel</div></div>
          <div className="concept-card"><div className="concept-card-icon">✨</div><div className="concept-card-title">Response Shaping</div><div className="concept-card-description">Combine and transform for client needs</div></div>
        </div>

        <h2 className="md-h2">Deployment Patterns</h2>
        <table className="comparison-table">
          <thead><tr><th>Pattern</th><th>Description</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Blue-Green</td><td>100% traffic switch between versions</td><td>Full rollout with instant rollback</td></tr>
            <tr><td className="feature-name">Canary</td><td>Gradual % increase to new version</td><td>Test with small user subset</td></tr>
            <tr><td className="feature-name">A/B Testing</td><td>Route based on user/session</td><td>Feature experimentation</td></tr>
            <tr><td className="feature-name">Shadow</td><td>Copy traffic to new version (no response)</td><td>Load testing without impact</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Gateway Offloading</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">🔐</div><div className="step-content"><h4>SSL Termination</h4><p>Handle HTTPS at gateway, HTTP to backends</p></div></div>
          <div className="step-card"><div className="step-number">🔑</div><div className="step-content"><h4>Authentication</h4><p>Validate tokens once at edge</p></div></div>
          <div className="step-card"><div className="step-number">📝</div><div className="step-content"><h4>Logging</h4><p>Centralized request/response logging</p></div></div>
          <div className="step-card"><div className="step-number">🌐</div><div className="step-content"><h4>CORS</h4><p>Handle cross-origin headers centrally</p></div></div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>BFF: Separate gateways per frontend type</li>
              <li>Aggregation reduces client roundtrips</li>
              <li>Canary enables safe gradual rollouts</li>
              <li>Offload cross-cutting concerns to gateway</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Gateway Patterns Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>BFF Architecture Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design BFF architecture for mobile, web, and third-party API</span></li><li><span className="req-number">2</span><span className="req-text">Implement aggregation endpoint combining user + orders + recommendations</span></li><li><span className="req-number">3</span><span className="req-text">Configure canary deployment routing (5% → 25% → 100%)</span></li><li><span className="req-number">4</span><span className="req-text">Document offloading strategy for auth and logging</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/13/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/13/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week13Day3;
