import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week3Day6() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 3, dayNum = 6, topic = "CAP Theorem", concepts = "Consistency, Availability, Partition Tolerance";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "CAP theorem states?", options: ["You can have all three", "Choose 2 of 3 during partition", "Only consistency matters", "Availability is optional"], correct: 1, explanation: "CAP theorem: during network partition, you must choose between Consistency and Availability." },
    { id: 2, question: "What is Partition Tolerance?", options: ["Data splitting", "System works despite network failures", "High availability", "Strong consistency"], correct: 1, explanation: "Partition tolerance means the system continues operating despite network partitions between nodes." },
    { id: 3, question: "CP system prioritizes?", options: ["Consistency over Availability", "Availability over Consistency", "Performance", "Scalability"], correct: 0, explanation: "CP systems maintain consistency during partitions, sacrificing availability." },
    { id: 4, question: "AP system example?", options: ["Bank transactions", "DNS", "Two-phase commit", "Distributed locks"], correct: 1, explanation: "DNS is AP - prioritizes availability, tolerates temporary inconsistency (stale records)." },
    { id: 5, question: "When no partition, you can have?", options: ["Only C", "Only A", "Both C and A", "Neither"], correct: 2, explanation: "Without network partition, systems can provide both Consistency and Availability." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>CAP Theorem</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>CAP Theorem</h1><div className="article-tags"><span className="tag">CAP</span><span className="tag">Distributed Systems</span><span className="tag">Trade-offs</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">The CAP Theorem</h2>
        <p>In a distributed system, you can only guarantee <strong>two of three</strong> properties during a network partition:</p>

        <div className="diagram-container">
          <div className="diagram-title">CAP Triangle</div>
          <svg viewBox="0 0 400 300" className="svg-diagram" style={{maxHeight: '300px'}}>
            {/* Triangle */}
            <polygon points="200,30 50,250 350,250" fill="none" stroke="#667eea" strokeWidth="3"/>
            {/* C */}
            <circle cx="200" cy="30" r="40" fill="#667eea"/>
            <text x="200" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">C</text>
            <text x="200" y="45" textAnchor="middle" fill="white" fontSize="10">Consistency</text>
            {/* A */}
            <circle cx="50" cy="250" r="40" fill="#11998e"/>
            <text x="50" y="245" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
            <text x="50" y="265" textAnchor="middle" fill="white" fontSize="10">Availability</text>
            {/* P */}
            <circle cx="350" cy="250" r="40" fill="#f093fb"/>
            <text x="350" y="245" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">P</text>
            <text x="350" y="265" textAnchor="middle" fill="white" fontSize="10">Partition</text>
            {/* Labels on edges */}
            <text x="115" y="130" textAnchor="middle" fill="#666" fontSize="11" transform="rotate(-55 115 130)">CA (no partition)</text>
            <text x="285" y="130" textAnchor="middle" fill="#666" fontSize="11" transform="rotate(55 285 130)">CP</text>
            <text x="200" y="270" textAnchor="middle" fill="#666" fontSize="11">AP</text>
          </svg>
        </div>

        <h2 className="md-h2">The Three Properties</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>C</div>
            <div className="step-content">
              <h4>Consistency</h4>
              <p>All nodes see the same data at the same time. Every read receives the most recent write.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number" style={{background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'}}>A</div>
            <div className="step-content">
              <h4>Availability</h4>
              <p>Every request receives a response (success/failure). System is always operational.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>P</div>
            <div className="step-content">
              <h4>Partition Tolerance</h4>
              <p>System continues to operate despite network failures between nodes.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">System Classifications</h2>
        <table className="comparison-table">
          <thead><tr><th>Type</th><th>Behavior</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">CP</td><td>Consistent but may be unavailable during partition</td><td>MongoDB, HBase, Redis Cluster</td></tr>
            <tr><td className="feature-name">AP</td><td>Available but may return stale data during partition</td><td>Cassandra, DynamoDB, CouchDB</td></tr>
            <tr><td className="feature-name">CA</td><td>Both (only possible without partitions - single node)</td><td>Traditional RDBMS (single node)</td></tr>
          </tbody>
        </table>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Real-World Note</h4>
            <p>Network partitions WILL happen in distributed systems. So practically, you're choosing between CP and AP. The choice depends on your use case.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>CAP: Choose 2 of 3 during network partition</li>
              <li>P is required for distributed systems</li>
              <li>CP: Consistency over availability (banking)</li>
              <li>AP: Availability over consistency (social media)</li>
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
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>CAP Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>CAP Analysis</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Analyze 3 real-world systems and classify as CP or AP</span></li><li><span className="req-number">2</span><span className="req-text">Explain why each made their trade-off choice</span></li><li><span className="req-number">3</span><span className="req-text">Design a system that can switch between CP/AP based on operation</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/3/day/5" className="nav-link prev">&lt;&lt; Day 5</Link><Link to="/hld/week/3/day/7" className="nav-link next">Day 7 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week3Day6;
