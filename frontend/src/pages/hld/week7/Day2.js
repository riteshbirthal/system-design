import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week7Day2() {
  const weekNum = 7, dayNum = 2, topic = "Sharding Techniques", concepts = "Range, Hash, Directory-based, Geo Sharding";
  
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
    { id: 1, question: "What is range-based sharding?", options: ["Random distribution", "Data split by key ranges", "Circular distribution", "No splitting"], correct: 1, explanation: "Range-based sharding divides data into ranges (e.g., A-H, I-P, Q-Z) - efficient for range queries." },
    { id: 2, question: "What is a disadvantage of range-based sharding?", options: ["Complex implementation", "Can create hot spots", "No range queries", "Uses more storage"], correct: 1, explanation: "Range-based can create hot spots if certain ranges are accessed more frequently (e.g., recent timestamps)." },
    { id: 3, question: "How does hash-based sharding work?", options: ["By key range", "Hash(key) % num_shards", "By file size", "Alphabetically"], correct: 1, explanation: "Hash-based sharding uses hash(key) % num_shards to determine which shard stores the data." },
    { id: 4, question: "What is directory-based sharding?", options: ["File system sharding", "Lookup table maps key to shard", "Geographic sharding", "Time-based sharding"], correct: 1, explanation: "Directory-based sharding uses a lookup table/service to map keys to shards - flexible but adds overhead." },
    { id: 5, question: "When is geo-based sharding useful?", options: ["Small datasets", "Data locality requirements", "Single region apps", "Backup purposes"], correct: 1, explanation: "Geo-based sharding places data near users for lower latency and helps with data residency requirements." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Sharding Techniques</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Sharding Techniques</h1><div className="article-tags"><span className="tag">Range</span><span className="tag">Hash</span><span className="tag">Directory</span><span className="tag">Geo</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Sharding Strategies Overview</h2>
        <p>Different sharding strategies have different trade-offs. Choose based on your query patterns and data characteristics.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Range-based</div>
            <div className="concept-card-description">Split by key ranges (A-H, I-P, Q-Z)</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">#️⃣</div>
            <div className="concept-card-title">Hash-based</div>
            <div className="concept-card-description">Hash(key) % num_shards for even distribution</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📖</div>
            <div className="concept-card-title">Directory-based</div>
            <div className="concept-card-description">Lookup table maps keys to shards</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🌍</div>
            <div className="concept-card-title">Geo-based</div>
            <div className="concept-card-description">Data near users by geographic location</div>
          </div>
        </div>

        <h2 className="md-h2">Strategy Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Strategy</th><th>Pros</th><th>Cons</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Range</td><td>Range queries efficient</td><td>Hot spots possible</td><td>Time-series data</td></tr>
            <tr><td className="feature-name">Hash</td><td>Even distribution</td><td>Range queries slow</td><td>Random access patterns</td></tr>
            <tr><td className="feature-name">Directory</td><td>Flexible mapping</td><td>Extra lookup overhead</td><td>Complex sharding logic</td></tr>
            <tr><td className="feature-name">Geo</td><td>Data locality</td><td>Uneven distribution</td><td>Global applications</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Range-based Sharding</h2>
        <div className="diagram-container">
          <div className="diagram-title">Range Sharding Example</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 1</span><span className="flow-node-sublabel">Keys 1-1000</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 2</span><span className="flow-node-sublabel">Keys 1001-2000</span></div>
              <div className="flow-node database"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 3</span><span className="flow-node-sublabel">Keys 2001-3000</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Hash-based Sharding</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Hash the Key</h4>
              <p>Apply hash function to partition key: hash("user123") = 7829347</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Calculate Shard</h4>
              <p>Modulo by shard count: 7829347 % 4 = 3 → goes to Shard 3</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Route Request</h4>
              <p>All operations for this key go to the same shard</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Directory-based Sharding</h2>
        <div className="diagram-container">
          <div className="diagram-title">Directory Lookup</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">🔍</span><span className="flow-node-label">Query: user123</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node dns"><span className="flow-node-icon">📖</span><span className="flow-node-label">Directory Service</span><span className="flow-node-sublabel">user123 → Shard 2</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node database"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 2</span></div>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Composite Sharding Keys</h4>
            <p>Combine attributes for better distribution: (tenant_id, timestamp) spreads load while keeping tenant data together for efficient queries.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Range: good for range queries, risk of hot spots</li>
              <li>Hash: even distribution, poor for range queries</li>
              <li>Directory: flexible but adds lookup overhead</li>
              <li>Geo: data locality for global apps</li>
              <li>Choose based on query patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Sharding Techniques Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Multi-Tenant SaaS Sharding</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design sharding strategy for multi-tenant SaaS platform</span></li><li><span className="req-number">2</span><span className="req-text">Compare range vs hash sharding for your use case</span></li><li><span className="req-number">3</span><span className="req-text">Handle tenant isolation requirements</span></li><li><span className="req-number">4</span><span className="req-text">Plan for shard rebalancing when adding capacity</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/7/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/7/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week7Day2;
