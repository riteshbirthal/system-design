import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week7Day1() {
  const weekNum = 7, dayNum = 1, topic = "Data Partitioning Basics", concepts = "Horizontal vs Vertical, Sharding, Partition Keys";
  
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
    { id: 1, question: "What is data partitioning?", options: ["Data encryption", "Splitting data across multiple nodes", "Data compression", "Backup strategy"], correct: 1, explanation: "Data partitioning divides data across multiple nodes/servers to improve scalability and performance." },
    { id: 2, question: "What is horizontal partitioning (sharding)?", options: ["Splitting by columns", "Splitting by rows", "Splitting by tables", "No splitting"], correct: 1, explanation: "Horizontal partitioning (sharding) splits rows across multiple shards - each shard has same schema but different rows." },
    { id: 3, question: "What is vertical partitioning?", options: ["Splitting by rows", "Splitting by columns", "Splitting by time", "Splitting by size"], correct: 1, explanation: "Vertical partitioning splits columns - frequently accessed columns in one partition, others in another." },
    { id: 4, question: "What is a hot spot in partitioning?", options: ["Fastest node", "One partition receiving disproportionate traffic", "Cached data", "Primary key"], correct: 1, explanation: "A hot spot occurs when one partition receives significantly more traffic than others, creating a bottleneck." },
    { id: 5, question: "Why is partition key selection important?", options: ["For encryption", "Determines data distribution", "For backup", "For compression"], correct: 1, explanation: "Partition key determines how data is distributed - poor choice leads to uneven distribution and hot spots." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Data Partitioning Basics</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Data Partitioning Basics</h1><div className="article-tags"><span className="tag">Partitioning</span><span className="tag">Sharding</span><span className="tag">Scalability</span><span className="tag">Distribution</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Why Partition Data?</h2>
        <p><strong>Data partitioning</strong> divides large datasets across multiple servers/nodes to achieve better scalability, performance, and manageability.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📈</div>
            <div className="concept-card-title">Scalability</div>
            <div className="concept-card-description">Handle more data than a single server can store</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Performance</div>
            <div className="concept-card-description">Parallel queries across multiple nodes</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">Availability</div>
            <div className="concept-card-description">Failure of one partition doesn't affect others</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔧</div>
            <div className="concept-card-title">Manageability</div>
            <div className="concept-card-description">Smaller datasets are easier to manage and backup</div>
          </div>
        </div>

        <h2 className="md-h2">Partitioning Types</h2>
        <div className="diagram-container">
          <div className="diagram-title">Vertical vs Horizontal Partitioning</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
              <h4 style={{color: 'var(--color-primary)'}}>📊 Vertical (by columns)</h4>
              <ul>
                <li>Split table by columns</li>
                <li>Frequently accessed columns together</li>
                <li>Large text/blob fields separated</li>
                <li>Reduces I/O for common queries</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: 'var(--color-success)'}}>
              <h4 style={{color: 'var(--color-success)'}}>📑 Horizontal (Sharding)</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Split table by rows</li>
                <li>→ Same schema, different data</li>
                <li>→ Each shard holds subset of rows</li>
                <li>→ Most common for scaling</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Horizontal Partitioning Example</h2>
        <div className="diagram-container">
          <div className="diagram-title">Users Table Sharding</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👥</span><span className="flow-node-label">Users Table</span><span className="flow-node-sublabel">10M records</span></div>
            </div>
            <div className="flow-arrow down">↓ Partition by user_id</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 1</span><span className="flow-node-sublabel">IDs 1-3.3M</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 2</span><span className="flow-node-sublabel">IDs 3.3M-6.6M</span></div>
              <div className="flow-node database"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 3</span><span className="flow-node-sublabel">IDs 6.6M-10M</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Partition Key Selection</h2>
        <table className="comparison-table">
          <thead><tr><th>Application</th><th>Good Partition Key</th><th>Reason</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Social Media</td><td>user_id</td><td>User-centric queries, even distribution</td></tr>
            <tr><td className="feature-name">E-commerce</td><td>order_id</td><td>Order isolation, unique per transaction</td></tr>
            <tr><td className="feature-name">Multi-tenant</td><td>tenant_id</td><td>Tenant data isolation</td></tr>
            <tr><td className="feature-name">Time-series</td><td>timestamp</td><td>Time-range queries efficient</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Hot Spots & Data Skew</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">!</div>
            <div className="step-content">
              <h4>Problem: Uneven Distribution</h4>
              <p>Poor partition key causes some shards to receive much more data/traffic than others.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Solution: Good Key Selection</h4>
              <p>Choose keys with high cardinality and even distribution. Avoid sequential keys (timestamps, auto-increment).</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Solution: Composite Keys</h4>
              <p>Combine multiple attributes (user_id + date) to spread load while maintaining locality.</p>
            </div>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Avoid These Partition Keys</h4>
            <p>Auto-increment IDs cause all new data to go to one shard. Timestamps create hot spots for current time. Country codes lead to uneven distribution (US vs Monaco).</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Partitioning enables horizontal scaling</li>
              <li>Vertical = by columns, Horizontal = by rows</li>
              <li>Partition key determines data distribution</li>
              <li>Avoid hot spots with good key selection</li>
              <li>Consider query patterns when choosing keys</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Data Partitioning Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Partition Strategy Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design partition strategy for a user data table with 100M records</span></li><li><span className="req-number">2</span><span className="req-text">Identify potential hot spots in your design</span></li><li><span className="req-number">3</span><span className="req-text">Propose mitigation strategies for uneven distribution</span></li><li><span className="req-number">4</span><span className="req-text">Document query patterns and how partitioning affects them</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/6/day/5" className="nav-link prev">&lt;&lt; Week 6</Link><Link to="/hld/week/7/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week7Day1;
