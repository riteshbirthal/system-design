import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week6Day1() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 6, dayNum = 1, topic = "CAP Theorem", concepts = "Consistency, Availability, Partition Tolerance";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What does CAP stand for?", options: ["Cache, API, Performance", "Consistency, Availability, Partition Tolerance", "Compute, Application, Protocol", "Cluster, Access, Persistence"], correct: 1, explanation: "CAP stands for Consistency, Availability, and Partition Tolerance - the three properties of distributed systems." },
    { id: 2, question: "According to CAP theorem, how many properties can a distributed system have during a partition?", options: ["All three", "Only two", "Only one", "None"], correct: 1, explanation: "During a network partition, a system must choose between consistency and availability - you can only have 2 of the 3." },
    { id: 3, question: "What is a CP system?", options: ["Chooses consistency over availability", "Chooses availability over consistency", "Has no partitions", "Has all three"], correct: 0, explanation: "CP systems prioritize consistency, becoming unavailable during partitions rather than returning stale data." },
    { id: 4, question: "Which is an example of an AP system?", options: ["Traditional RDBMS", "Cassandra", "Single-node MySQL", "ZooKeeper"], correct: 1, explanation: "Cassandra is AP - it remains available during partitions but may return stale data (eventual consistency)." },
    { id: 5, question: "Can CA systems exist in distributed environments?", options: ["Yes, always", "No, partitions are inevitable", "Only with special hardware", "Only in cloud"], correct: 1, explanation: "In distributed systems, network partitions are inevitable, so true CA systems cannot exist - you must handle partitions." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>CAP Theorem Explained</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>CAP Theorem</h1><div className="article-tags"><span className="tag">CAP</span><span className="tag">Distributed</span><span className="tag">Consistency</span><span className="tag">Availability</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is the CAP Theorem?</h2>
        <p>The <strong>CAP Theorem</strong> (Brewer's Theorem) states that a distributed system can only provide two of three guarantees simultaneously: Consistency, Availability, and Partition Tolerance.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Consistency (C)</div>
            <div className="concept-card-description">Every read receives the most recent write or an error</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">✅</div>
            <div className="concept-card-title">Availability (A)</div>
            <div className="concept-card-description">Every request receives a response (without guarantee of latest data)</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">Partition Tolerance (P)</div>
            <div className="concept-card-description">System continues operating despite network partitions</div>
          </div>
        </div>

        <h2 className="md-h2">The CAP Triangle</h2>
        <div className="diagram-container">
          <div className="diagram-title">CAP Theorem Visualization</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">🔄</span><span className="flow-node-label">Consistency</span></div>
            </div>
            <div className="flow-arrow down">↙ CP ↘</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">✅</span><span className="flow-node-label">Availability</span><span className="flow-node-sublabel">AP</span></div>
              <div className="flow-arrow">←→</div>
              <div className="flow-node database"><span className="flow-node-icon">🔗</span><span className="flow-node-label">Partition Tolerance</span><span className="flow-node-sublabel">CP</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">System Classifications</h2>
        <table className="comparison-table">
          <thead><tr><th>Type</th><th>Description</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">CP</td><td>Consistent + Partition Tolerant. Sacrifices availability.</td><td>HBase, MongoDB (strong), Redis Cluster, ZooKeeper</td></tr>
            <tr><td className="feature-name">AP</td><td>Available + Partition Tolerant. Sacrifices consistency.</td><td>Cassandra, DynamoDB, CouchDB, Riak</td></tr>
            <tr><td className="feature-name">CA</td><td>Consistent + Available. Cannot handle partitions.</td><td>Single-node RDBMS (not truly distributed)</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">What Happens During a Partition?</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>CP System Response</h4>
              <p>Returns error or waits for partition to heal. Ensures no stale data is served but some requests fail.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>AP System Response</h4>
              <p>Continues serving requests with potentially stale data. Resolves conflicts after partition heals.</p>
            </div>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Common Misconception</h4>
            <p>CAP doesn't mean you must always sacrifice one property. During normal operation, you can have all three. The choice only matters during a network partition.</p>
          </div>
        </div>

        <h2 className="md-h2">CAP in Practice</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
            <h4 style={{color: 'var(--color-primary)'}}>🔄 Choose CP When</h4>
            <ul>
              <li>Data consistency is critical</li>
              <li>Financial transactions</li>
              <li>Inventory management</li>
              <li>User authentication</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-success)'}}>
            <h4 style={{color: 'var(--color-success)'}}>✅ Choose AP When</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ High availability is critical</li>
              <li>→ Social media feeds</li>
              <li>→ Shopping carts</li>
              <li>→ Analytics and metrics</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>CAP theorem: pick 2 of 3 during partitions</li>
              <li>Partition tolerance is usually required in distributed systems</li>
              <li>Choose CP for consistency-critical data</li>
              <li>Choose AP for availability-critical services</li>
              <li>Many systems are tunable between CP and AP</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>CAP Theorem Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>CAP Classification Exercise</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Classify 5 popular databases by their CAP properties</span></li><li><span className="req-number">2</span><span className="req-text">Design a system that needs both CP and AP for different data</span></li><li><span className="req-number">3</span><span className="req-text">Explain trade-off decisions for an e-commerce platform</span></li><li><span className="req-number">4</span><span className="req-text">Document what happens during a network partition</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/5/day/5" className="nav-link prev">&lt;&lt; Week 5</Link><Link to="/hld/week/6/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week6Day1;
