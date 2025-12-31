import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week14Day1() {
  const weekNum = 14, dayNum = 1, topic = "CDN Fundamentals", concepts = "Edge servers, PoPs, content distribution";
  
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
    { id: 1, question: "What is a CDN?", options: ["Central Database Network", "Content Delivery Network - geographically distributed servers", "Computer Data Node", "Cloud DNS Network"], correct: 1, explanation: "A CDN (Content Delivery Network) is a geographically distributed network of servers that delivers content to users from the nearest edge location." },
    { id: 2, question: "What is a PoP in CDN context?", options: ["Post Office Protocol", "Point of Presence - edge server location", "Packet Operation Point", "Protocol of Performance"], correct: 1, explanation: "PoP (Point of Presence) is a physical location where CDN edge servers are deployed, close to end users." },
    { id: 3, question: "What is the origin server?", options: ["First CDN server", "Original source of content (your servers)", "Load balancer", "DNS server"], correct: 1, explanation: "The origin server is your original server where the CDN fetches content when not cached at the edge." },
    { id: 4, question: "What content is best for CDN?", options: ["User sessions", "Static content like images, CSS, JS", "Database queries", "Real-time data"], correct: 1, explanation: "CDNs are most effective for static content (images, CSS, JS, videos) that doesn't change frequently." },
    { id: 5, question: "What is cache hit ratio?", options: ["CPU usage", "Percentage of requests served from cache vs origin", "Network speed", "Server count"], correct: 1, explanation: "Cache hit ratio is the percentage of requests served from CDN cache without going to the origin server." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>CDN Fundamentals</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>CDN Fundamentals</h1><div className="article-tags"><span className="tag">CDN</span><span className="tag">Edge</span><span className="tag">Caching</span><span className="tag">Performance</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is a CDN?</h2>
        <p>A <strong>Content Delivery Network (CDN)</strong> is a geographically distributed network of proxy servers that cache content close to end users to reduce latency and improve performance.</p>

        <div className="diagram-container">
          <div className="diagram-title">CDN Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">🌍</span><span className="flow-node-label">Users Worldwide</span></div>
            </div>
            <div className="flow-arrow down">↓ Request nearest PoP ↓</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">📍</span><span className="flow-node-label">PoP USA</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">📍</span><span className="flow-node-label">PoP Europe</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">📍</span><span className="flow-node-label">PoP Asia</span></div>
            </div>
            <div className="flow-arrow down">↓ Cache miss → fetch ↓</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">🏠</span><span className="flow-node-label">Origin Server</span><span className="flow-node-sublabel">Your infrastructure</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">CDN Benefits</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">⚡</div><div className="concept-card-title">Lower Latency</div><div className="concept-card-description">Content served from nearest edge location</div></div>
          <div className="concept-card"><div className="concept-card-icon">📉</div><div className="concept-card-title">Reduced Origin Load</div><div className="concept-card-description">80-99% of requests served by CDN</div></div>
          <div className="concept-card"><div className="concept-card-icon">🛡️</div><div className="concept-card-title">DDoS Protection</div><div className="concept-card-description">Distributed network absorbs attacks</div></div>
          <div className="concept-card"><div className="concept-card-icon">📈</div><div className="concept-card-title">High Availability</div><div className="concept-card-description">Redundancy across global PoPs</div></div>
        </div>

        <h2 className="md-h2">CDN Components</h2>
        <table className="comparison-table">
          <thead><tr><th>Component</th><th>Description</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Edge Servers</td><td>Servers at PoP locations</td><td>Cache and serve content</td></tr>
            <tr><td className="feature-name">Origin Server</td><td>Your primary server</td><td>Source of truth for content</td></tr>
            <tr><td className="feature-name">PoP</td><td>Point of Presence</td><td>Geographic server locations</td></tr>
            <tr><td className="feature-name">DNS</td><td>GeoDNS routing</td><td>Direct users to nearest PoP</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">CDN Request Flow</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><div className="step-content"><h4>DNS Lookup</h4><p>User requests asset, DNS resolves to nearest CDN PoP</p></div></div>
          <div className="step-card"><div className="step-number">2</div><div className="step-content"><h4>Cache Check</h4><p>CDN edge checks if content is in cache</p></div></div>
          <div className="step-card"><div className="step-number">3</div><div className="step-content"><h4>Cache Hit</h4><p>If cached: serve directly (fast!)</p></div></div>
          <div className="step-card"><div className="step-number">4</div><div className="step-content"><h4>Cache Miss</h4><p>If not cached: fetch from origin, cache, then serve</p></div></div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>CDN distributes content to edge servers worldwide</li>
              <li>Reduces latency by serving from nearest PoP</li>
              <li>Offloads traffic from origin servers</li>
              <li>Provides DDoS protection and high availability</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>CDN Fundamentals Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>CDN Analysis</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Analyze your website's assets and identify CDN candidates</span></li><li><span className="req-number">2</span><span className="req-text">Calculate expected latency improvement with CDN</span></li><li><span className="req-number">3</span><span className="req-text">Compare 3 CDN providers (CloudFlare, Fastly, CloudFront)</span></li><li><span className="req-number">4</span><span className="req-text">Design CDN integration architecture for your application</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/13/day/5" className="nav-link prev">&lt;&lt; Week 13</Link><Link to="/hld/week/14/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week14Day1;
