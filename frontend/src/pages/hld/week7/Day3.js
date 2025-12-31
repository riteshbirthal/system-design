import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week7Day3() {
  const weekNum = 7, dayNum = 3, topic = "Consistent Hashing", concepts = "Hash Ring, Virtual Nodes, Rebalancing";
  
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
    { id: 1, question: "What problem does consistent hashing solve?", options: ["Data encryption", "Minimizing key remapping when nodes change", "Faster queries", "Better compression"], correct: 1, explanation: "Consistent hashing minimizes key remapping when adding/removing nodes - only K/N keys move on average." },
    { id: 2, question: "In consistent hashing, where does a key go?", options: ["Random node", "First node clockwise from key position on ring", "Smallest node", "All nodes"], correct: 1, explanation: "A key is assigned to the first node found by walking clockwise from the key's position on the hash ring." },
    { id: 3, question: "What are virtual nodes (vnodes)?", options: ["Fake nodes", "Multiple positions per physical node on ring", "Backup nodes", "Test nodes"], correct: 1, explanation: "Virtual nodes give each physical node multiple positions on the ring for better load distribution." },
    { id: 4, question: "What happens when a node joins in consistent hashing?", options: ["All keys move", "Only keys in adjacent range move", "Nothing moves", "Half keys move"], correct: 1, explanation: "Only keys between the new node and its predecessor need to move - minimal data migration." },
    { id: 5, question: "Which systems use consistent hashing?", options: ["Only databases", "Cassandra, DynamoDB, CDNs", "Only caches", "Only search engines"], correct: 1, explanation: "Consistent hashing is used by Cassandra, DynamoDB, Memcached, CDNs, and many distributed systems." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Consistent Hashing</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Consistent Hashing</h1><div className="article-tags"><span className="tag">Hash Ring</span><span className="tag">Virtual Nodes</span><span className="tag">Rebalancing</span><span className="tag">Distribution</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">The Problem with Simple Hashing</h2>
        <p>With simple hash modulo (<code>hash(key) % N</code>), when N changes, almost ALL keys need to move!</p>

        <div className="diagram-container">
          <div className="diagram-title">Simple Hash Problem</div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">!</div>
              <div className="step-content">
                <h4>3 Servers: hash(key) % 3</h4>
                <p>key=15: 15%3=0 → Server 0</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">!</div>
              <div className="step-content">
                <h4>4 Servers: hash(key) % 4</h4>
                <p>key=15: 15%4=3 → Server 3 (MOVED!)</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Consistent Hashing Solution</h2>
        <p><strong>Consistent hashing</strong> arranges hash space as a ring. Nodes and keys are hashed onto this ring, and each key is assigned to the first node clockwise from its position.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">💍</div>
            <div className="concept-card-title">Hash Ring</div>
            <div className="concept-card-description">0 to 2^32-1 arranged in a circle</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📍</div>
            <div className="concept-card-title">Node Positions</div>
            <div className="concept-card-description">Nodes placed at hash(node_id) on ring</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔑</div>
            <div className="concept-card-title">Key Assignment</div>
            <div className="concept-card-description">Key goes to first node clockwise</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Minimal Movement</div>
            <div className="concept-card-description">Only K/N keys move on node change</div>
          </div>
        </div>

        <h2 className="md-h2">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Place Nodes on Ring</h4>
              <p>Hash each node ID to get its position: hash(NodeA) → position 1000</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Hash the Key</h4>
              <p>Hash the key to get its position: hash("user123") → position 750</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Walk Clockwise</h4>
              <p>From position 750, find first node clockwise → NodeA at 1000</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Assign to Node</h4>
              <p>Key "user123" is stored on/served by NodeA</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Virtual Nodes (VNodes)</h2>
        <p>Without virtual nodes, data distribution can be uneven. VNodes give each physical node multiple positions on the ring.</p>

        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-error)'}}>
            <h4 style={{color: 'var(--color-error)'}}>❌ Without VNodes</h4>
            <ul>
              <li>Uneven distribution possible</li>
              <li>Node A: 40% data</li>
              <li>Node B: 35% data</li>
              <li>Node C: 25% data</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-success)'}}>
            <h4 style={{color: 'var(--color-success)'}}>✅ With VNodes (100 each)</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Even distribution</li>
              <li>→ Node A: ~33% data</li>
              <li>→ Node B: ~33% data</li>
              <li>→ Node C: ~33% data</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Node Operations</h2>
        <table className="comparison-table">
          <thead><tr><th>Operation</th><th>Simple Hash</th><th>Consistent Hash</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Add Node</td><td>~100% keys move</td><td>~K/N keys move</td></tr>
            <tr><td className="feature-name">Remove Node</td><td>~100% keys move</td><td>~K/N keys move</td></tr>
            <tr><td className="feature-name">Lookup</td><td>O(1)</td><td>O(log N) with binary search</td></tr>
          </tbody>
        </table>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Real-World Usage</h4>
            <p>Cassandra uses 256 vnodes per node by default. DynamoDB uses consistent hashing for partition placement. CDNs use it for cache routing.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Consistent hashing minimizes data movement</li>
              <li>Keys walk clockwise to find their node</li>
              <li>Virtual nodes improve distribution</li>
              <li>Only K/N keys move on node changes</li>
              <li>Used by Cassandra, DynamoDB, CDNs</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Consistent Hashing Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Consistent Hashing Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Implement consistent hashing with virtual nodes</span></li><li><span className="req-number">2</span><span className="req-text">Simulate adding/removing nodes and measure key movement</span></li><li><span className="req-number">3</span><span className="req-text">Compare distribution with different vnode counts</span></li><li><span className="req-number">4</span><span className="req-text">Benchmark lookup performance vs simple hash</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/7/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/7/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week7Day3;
