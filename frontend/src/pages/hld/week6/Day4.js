import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week6Day4() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 6, dayNum = 4, topic = "Consensus Algorithms", concepts = "Paxos, Raft, Leader Election, Quorum";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is the purpose of consensus algorithms?", options: ["Speed optimization", "Agreement among distributed nodes", "Data encryption", "Load balancing"], correct: 1, explanation: "Consensus algorithms allow distributed nodes to agree on a single value/state even with failures." },
    { id: 2, question: "Which is considered easier to understand than Paxos?", options: ["Two-phase commit", "Raft", "Byzantine fault tolerance", "Vector clocks"], correct: 1, explanation: "Raft was designed to be understandable - it's equivalent to Paxos but easier to implement correctly." },
    { id: 3, question: "What is a quorum?", options: ["A single node", "Majority of nodes needed for decisions", "All nodes", "Random subset"], correct: 1, explanation: "A quorum is the minimum number of nodes (usually majority) needed to make progress in consensus." },
    { id: 4, question: "In Raft, what happens when a leader fails?", options: ["System stops", "New election is triggered", "Data is lost", "Manual intervention needed"], correct: 1, explanation: "Raft automatically triggers a leader election when followers don't receive heartbeats from the leader." },
    { id: 5, question: "What is split-brain problem?", options: ["Network speed issue", "Multiple nodes thinking they are leader", "Data corruption", "Memory overflow"], correct: 1, explanation: "Split-brain occurs when network partitions cause multiple nodes to believe they are the leader." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Consensus Algorithms</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Consensus Algorithms</h1><div className="article-tags"><span className="tag">Paxos</span><span className="tag">Raft</span><span className="tag">Leader Election</span><span className="tag">Quorum</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Consensus?</h2>
        <p><strong>Consensus</strong> is the process by which distributed nodes agree on a single value or state, even when some nodes fail or messages are delayed.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🤝</div>
            <div className="concept-card-title">Agreement</div>
            <div className="concept-card-description">All non-faulty nodes decide on the same value</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">✅</div>
            <div className="concept-card-title">Validity</div>
            <div className="concept-card-description">Decided value was proposed by some node</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⏱️</div>
            <div className="concept-card-title">Termination</div>
            <div className="concept-card-description">All non-faulty nodes eventually decide</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔒</div>
            <div className="concept-card-title">Integrity</div>
            <div className="concept-card-description">Each node decides at most once</div>
          </div>
        </div>

        <h2 className="md-h2">Raft Algorithm</h2>
        <p>Raft is a consensus algorithm designed to be understandable. Nodes can be in one of three states:</p>

        <div className="diagram-container">
          <div className="diagram-title">Raft Node States</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node dns"><span className="flow-node-icon">👤</span><span className="flow-node-label">Follower</span><span className="flow-node-sublabel">Passive, receives logs</span></div>
              <div className="flow-arrow">→ timeout</div>
              <div className="flow-node cache"><span className="flow-node-icon">🗳️</span><span className="flow-node-label">Candidate</span><span className="flow-node-sublabel">Requests votes</span></div>
              <div className="flow-arrow">→ majority</div>
              <div className="flow-node client"><span className="flow-node-icon">👑</span><span className="flow-node-label">Leader</span><span className="flow-node-sublabel">Handles all writes</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Leader Election Process</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Timeout</h4>
              <p>Follower doesn't receive heartbeat, becomes candidate.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Request Votes</h4>
              <p>Candidate increments term, votes for itself, requests votes from others.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Win Election</h4>
              <p>If receives majority votes, becomes leader. Sends heartbeats.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Log Replication</h4>
              <p>Leader replicates log entries to followers, commits when majority confirms.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Quorum Systems</h2>
        <table className="comparison-table">
          <thead><tr><th>Concept</th><th>Formula</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Read Quorum (R)</td><td>Nodes to read from</td><td>Ensure reading latest data</td></tr>
            <tr><td className="feature-name">Write Quorum (W)</td><td>Nodes to write to</td><td>Ensure durability</td></tr>
            <tr><td className="feature-name">Overlap Rule</td><td>R + W {">"} N</td><td>Guarantee consistency</td></tr>
            <tr><td className="feature-name">Majority</td><td>(N/2) + 1</td><td>Tolerate minority failures</td></tr>
          </tbody>
        </table>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Quorum Example</h4>
            <p>With 5 nodes: W=3, R=3 ensures overlap. At least one node in read quorum has the latest write. This is how Cassandra and DynamoDB achieve tunable consistency.</p>
          </div>
        </div>

        <h2 className="md-h2">Paxos vs Raft</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
            <h4 style={{color: 'var(--color-primary)'}}>📜 Paxos</h4>
            <ul>
              <li>Original consensus algorithm</li>
              <li>Mathematically proven</li>
              <li>Hard to understand</li>
              <li>Difficult to implement</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-success)'}}>
            <h4 style={{color: 'var(--color-success)'}}>🚣 Raft</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Designed for understandability</li>
              <li>→ Equivalent to Paxos</li>
              <li>→ Easier to implement</li>
              <li>→ Used by etcd, Consul</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Consensus allows distributed agreement</li>
              <li>Raft: leader election + log replication</li>
              <li>Quorum ensures read/write overlap</li>
              <li>Majority tolerates minority failures</li>
              <li>Split-brain is avoided with proper consensus</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Consensus Algorithms Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Leader Election Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Implement simple leader election with heartbeats</span></li><li><span className="req-number">2</span><span className="req-text">Design quorum-based read/write system</span></li><li><span className="req-number">3</span><span className="req-text">Simulate network partition and observe behavior</span></li><li><span className="req-number">4</span><span className="req-text">Document split-brain prevention strategy</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/6/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/6/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week6Day4;
