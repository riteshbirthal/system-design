import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week3Day5() {
  const weekNum = 3, dayNum = 5, topic = "Database Sharding", concepts = "Horizontal partitioning, Shard keys, Consistent hashing";
  
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
    { id: 1, question: "What is database sharding?", options: ["Backup strategy", "Splitting data across multiple databases", "Query optimization", "Index creation"], correct: 1, explanation: "Sharding horizontally partitions data across multiple database instances for scale." },
    { id: 2, question: "Good shard key should have?", options: ["Low cardinality", "High cardinality, even distribution", "Sequential values", "Null values"], correct: 1, explanation: "Good shard keys have high cardinality and distribute data evenly to avoid hotspots." },
    { id: 3, question: "Problem with range-based sharding?", options: ["Complex queries", "Hotspots on recent data", "No ordering", "Too many shards"], correct: 1, explanation: "Range sharding on timestamps creates hotspots as recent data goes to one shard." },
    { id: 4, question: "Consistent hashing helps with?", options: ["Query speed", "Minimizing data movement when adding nodes", "Strong consistency", "Backup"], correct: 1, explanation: "Consistent hashing minimizes data redistribution when shards are added/removed." },
    { id: 5, question: "Cross-shard joins are?", options: ["Easy and fast", "Difficult and expensive", "Not possible", "Automatic"], correct: 1, explanation: "Cross-shard queries are expensive as they require coordinating across multiple databases." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Database Sharding</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Database Sharding</h1><div className="article-tags"><span className="tag">Sharding</span><span className="tag">Partitioning</span><span className="tag">Scaling</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Sharding?</h2>
        <p><strong>Sharding</strong> is horizontal partitioning - splitting data across multiple database instances (shards). Each shard holds a subset of the data.</p>

        <div className="diagram-container">
          <div className="diagram-title">Sharding Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👤</span><span className="flow-node-label">Application</span></div>
            </div>
            <div className="flow-arrow down">↓ Route by Shard Key</div>
            <div className="flow-row">
              <div className="flow-node database" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><span className="flow-node-icon">🗄️</span><span className="flow-node-label">Shard 1</span><span className="flow-node-sublabel">Users A-H</span></div>
              <div className="flow-node database" style={{background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'}}><span className="flow-node-icon">🗄️</span><span className="flow-node-label">Shard 2</span><span className="flow-node-sublabel">Users I-P</span></div>
              <div className="flow-node database" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}><span className="flow-node-icon">🗄️</span><span className="flow-node-label">Shard 3</span><span className="flow-node-sublabel">Users Q-Z</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Sharding Strategies</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔢</div>
            <div className="concept-card-title">Range-Based</div>
            <div className="concept-card-description">Shard by value ranges (A-H, I-P). Simple but can create hotspots.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">#️⃣</div>
            <div className="concept-card-title">Hash-Based</div>
            <div className="concept-card-description">Hash(key) mod N shards. Even distribution but loses ordering.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📍</div>
            <div className="concept-card-title">Geographic</div>
            <div className="concept-card-description">Shard by location. Good for data locality requirements.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📋</div>
            <div className="concept-card-title">Directory-Based</div>
            <div className="concept-card-description">Lookup table maps keys to shards. Flexible but adds lookup overhead.</div>
          </div>
        </div>

        <h2 className="md-h2">Choosing a Shard Key</h2>
        <div className="pros-cons">
          <div className="pros-section">
            <h4>✓ Good Shard Key</h4>
            <ul>
              <li>High cardinality (many unique values)</li>
              <li>Even distribution</li>
              <li>Used in most queries</li>
              <li>Immutable (doesn't change)</li>
            </ul>
          </div>
          <div className="cons-section">
            <h4>✗ Bad Shard Key</h4>
            <ul>
              <li>Low cardinality (few values)</li>
              <li>Monotonically increasing (timestamp)</li>
              <li>Frequently updated</li>
              <li>Creates hotspots</li>
            </ul>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Sharding Challenges</h4>
            <p>Cross-shard queries are expensive. JOINs across shards require application-level coordination. Rebalancing shards is complex.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Sharding splits data horizontally across databases</li>
              <li>Choose shard key carefully - high cardinality, even distribution</li>
              <li>Consistent hashing minimizes data movement</li>
              <li>Avoid cross-shard queries when possible</li>
              <li>Consider sharding only when necessary</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Sharding Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Sharding Strategy</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design sharding strategy for a chat application with 100M users</span></li><li><span className="req-number">2</span><span className="req-text">Choose appropriate shard key for messages</span></li><li><span className="req-number">3</span><span className="req-text">Handle the case of chat between users on different shards</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/3/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/3/day/6" className="nav-link next">Day 6 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week3Day5;
