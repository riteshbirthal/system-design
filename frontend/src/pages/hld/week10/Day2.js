import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week10Day2() {
  const weekNum = 10, dayNum = 2, topic = "Metrics & Monitoring Methods", concepts = "Golden Signals, RED, USE methods, Prometheus, Grafana";
  
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
    { id: 1, question: "What are the Four Golden Signals?", options: ["CPU, Memory, Disk, Network", "Latency, Traffic, Errors, Saturation", "Read, Write, Update, Delete", "Auth, Cache, Queue, DB"], correct: 1, explanation: "Google SRE's Four Golden Signals: Latency, Traffic, Errors, Saturation - key metrics for any service." },
    { id: 2, question: "What does RED stand for?", options: ["Read, Edit, Delete", "Rate, Errors, Duration", "Request, Execute, Deploy", "Retry, Error, Debug"], correct: 1, explanation: "RED method: Rate (requests/sec), Errors (failed requests), Duration (latency distribution)." },
    { id: 3, question: "What does USE stand for?", options: ["User, System, Error", "Utilization, Saturation, Errors", "Upload, Store, Execute", "Update, Select, Export"], correct: 1, explanation: "USE method for resources: Utilization (% busy), Saturation (queue depth), Errors (error count)." },
    { id: 4, question: "What type of metric is a counter?", options: ["Goes up and down", "Only increases (cumulative)", "Fixed value", "Percentage"], correct: 1, explanation: "Counters only increase (resets on restart). Used for total requests, errors, bytes sent." },
    { id: 5, question: "Why use percentiles (p99) instead of average?", options: ["Easier to calculate", "Shows worst-case experience better", "Uses less storage", "More accurate"], correct: 1, explanation: "Percentiles show tail latency - p99 means 99% of requests are faster. Averages hide outliers." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Metrics & Monitoring Methods</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Metrics & Monitoring Methods</h1><div className="article-tags"><span className="tag">Metrics</span><span className="tag">Golden Signals</span><span className="tag">RED</span><span className="tag">USE</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Metric Types</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📈</div>
            <div className="concept-card-title">Counter</div>
            <div className="concept-card-description">Cumulative, only increases. Total requests, errors, bytes sent.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Gauge</div>
            <div className="concept-card-description">Point-in-time value, up or down. Temperature, queue size, connections.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📉</div>
            <div className="concept-card-title">Histogram</div>
            <div className="concept-card-description">Distribution in buckets. Request latency, response sizes (p50, p95, p99).</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📐</div>
            <div className="concept-card-title">Summary</div>
            <div className="concept-card-description">Client-side percentiles. Similar to histogram but not aggregatable.</div>
          </div>
        </div>

        <h2 className="md-h2">Four Golden Signals (Google SRE)</h2>
        <div className="diagram-container">
          <div className="diagram-title">Monitor These for Every Service</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">⏱️</span><span className="flow-node-label">Latency</span><span className="flow-node-sublabel">Response time</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📊</span><span className="flow-node-label">Traffic</span><span className="flow-node-sublabel">Requests/sec</span></div>
              <div className="flow-node database" style={{background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'}}><span className="flow-node-icon">❌</span><span className="flow-node-label">Errors</span><span className="flow-node-sublabel">Failure rate</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">📦</span><span className="flow-node-label">Saturation</span><span className="flow-node-sublabel">Capacity used</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Monitoring Methods Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Method</th><th>Focus</th><th>Metrics</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Golden Signals</td><td>Services</td><td>Latency, Traffic, Errors, Saturation</td><td>All services</td></tr>
            <tr><td className="feature-name">RED</td><td>Services</td><td>Rate, Errors, Duration</td><td>Request-driven services</td></tr>
            <tr><td className="feature-name">USE</td><td>Resources</td><td>Utilization, Saturation, Errors</td><td>Infrastructure (CPU, disk)</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">RED Method (For Services)</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">R</div>
            <div className="step-content">
              <h4>Rate</h4>
              <p>Requests per second - how much traffic is hitting your service</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">E</div>
            <div className="step-content">
              <h4>Errors</h4>
              <p>Number of failed requests - HTTP 5xx, timeouts, exceptions</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">D</div>
            <div className="step-content">
              <h4>Duration</h4>
              <p>Distribution of request latency - use percentiles (p50, p95, p99)</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">USE Method (For Resources)</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">U</div>
            <div className="step-content">
              <h4>Utilization</h4>
              <p>Percentage of time resource is busy (CPU %, memory used %)</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">S</div>
            <div className="step-content">
              <h4>Saturation</h4>
              <p>Extra work queued (run queue length, disk queue depth)</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">E</div>
            <div className="step-content">
              <h4>Errors</h4>
              <p>Count of error events (disk errors, network errors)</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Why Percentiles Matter</h2>
        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Averages Lie!</h4>
            <p>Average latency of 100ms might hide that 1% of users experience 5000ms. Use percentiles:</p>
            <ul style={{margin: '0.5rem 0 0', paddingLeft: '1.2rem'}}>
              <li><strong>p50</strong>: Median - typical experience</li>
              <li><strong>p95</strong>: 95% of requests faster than this</li>
              <li><strong>p99</strong>: Tail latency - worst 1% experience</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Use Golden Signals or RED for services</li>
              <li>Use USE method for infrastructure</li>
              <li>Always use percentiles, not averages</li>
              <li>Keep cardinality low (avoid high-cardinality labels)</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Metrics Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Metrics Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Define Golden Signals metrics for an e-commerce Order service</span></li><li><span className="req-number">2</span><span className="req-text">Design USE metrics for database and cache infrastructure</span></li><li><span className="req-number">3</span><span className="req-text">Create Grafana dashboard layout with key metrics</span></li><li><span className="req-number">4</span><span className="req-text">Define SLOs based on p99 latency and error rate</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/10/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/10/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week10Day2;
