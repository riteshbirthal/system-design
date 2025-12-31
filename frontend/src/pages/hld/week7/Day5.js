import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week7Day5() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 7, dayNum = 5, topic = "Handling Distributed Data", concepts = "Cross-Shard Queries, Distributed Transactions, Global Indexes";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is the scatter-gather pattern?", options: ["Data compression", "Query all shards, aggregate results", "Single shard query", "Data replication"], correct: 1, explanation: "Scatter-gather sends query to all shards (scatter) and aggregates their responses (gather)." },
    { id: 2, question: "What is a challenge with cross-shard joins?", options: ["Too simple", "High latency and complexity", "No data movement", "Automatic optimization"], correct: 1, explanation: "Cross-shard joins require moving data between shards, increasing latency and complexity significantly." },
    { id: 3, question: "What is a global secondary index?", options: ["Index on one shard", "Index spanning all shards", "No index", "Primary key"], correct: 1, explanation: "A global secondary index covers all shards, enabling fast lookups by non-partition-key attributes." },
    { id: 4, question: "What is data locality optimization?", options: ["Moving data far from users", "Keeping related data on same shard", "Random distribution", "No optimization"], correct: 1, explanation: "Data locality keeps related data together to minimize cross-shard operations." },
    { id: 5, question: "How do distributed transactions differ from local?", options: ["Simpler", "Require coordination across nodes", "No difference", "Faster"], correct: 1, explanation: "Distributed transactions require coordination (2PC, Saga) across multiple nodes, adding complexity." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Handling Distributed Data</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Handling Distributed Data</h1><div className="article-tags"><span className="tag">Cross-Shard</span><span className="tag">Transactions</span><span className="tag">Indexes</span><span className="tag">Optimization</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Cross-Shard Query Challenges</h2>
        <p>When data is sharded, queries that span multiple shards become complex. Understanding these challenges is key to designing effective distributed systems.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔀</div>
            <div className="concept-card-title">Scatter-Gather</div>
            <div className="concept-card-description">Query all shards, combine results</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">Distributed Joins</div>
            <div className="concept-card-description">Join data across shards - expensive!</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📑</div>
            <div className="concept-card-title">Global Indexes</div>
            <div className="concept-card-description">Index spanning all shards</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📍</div>
            <div className="concept-card-title">Data Locality</div>
            <div className="concept-card-description">Keep related data together</div>
          </div>
        </div>

        <h2 className="md-h2">Scatter-Gather Pattern</h2>
        <div className="diagram-container">
          <div className="diagram-title">Scatter-Gather Query Flow</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">🔍</span><span className="flow-node-label">Query Router</span></div>
            </div>
            <div className="flow-arrow down">↓ Scatter</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 1</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 2</span></div>
              <div className="flow-node server"><span className="flow-node-icon">📦</span><span className="flow-node-label">Shard 3</span></div>
            </div>
            <div className="flow-arrow down">↓ Gather & Aggregate</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">📊</span><span className="flow-node-label">Aggregated Result</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Secondary Index Strategies</h2>
        <table className="comparison-table">
          <thead><tr><th>Strategy</th><th>Description</th><th>Write</th><th>Read</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Local Index</td><td>Each shard indexes own data</td><td>Fast (single shard)</td><td>Slow (query all shards)</td></tr>
            <tr><td className="feature-name">Global Index</td><td>Separate index service</td><td>Slow (update index)</td><td>Fast (single lookup)</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Distributed Transaction Options</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Two-Phase Commit (2PC)</h4>
              <p>Coordinator ensures all-or-nothing across shards. Strong consistency but blocking.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Saga Pattern</h4>
              <p>Sequence of local transactions with compensating actions. Eventually consistent.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Avoid If Possible</h4>
              <p>Design data model to keep transactions within single shard when possible.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Data Locality Strategies</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-success)'}}>
            <h4 style={{color: 'var(--color-success)'}}>✅ Best Practices</h4>
            <ul>
              <li>Co-locate related entities on same shard</li>
              <li>Use composite keys (tenant_id + entity_id)</li>
              <li>Denormalize to avoid joins</li>
              <li>Pre-aggregate common queries</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-error)'}}>
            <h4 style={{color: 'var(--color-error)'}}>❌ Avoid</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Random shard key selection</li>
              <li>→ Cross-shard joins in hot paths</li>
              <li>→ Global transactions for every operation</li>
              <li>→ Ignoring query patterns in design</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Optimization Techniques</h2>
        <table className="comparison-table">
          <thead><tr><th>Technique</th><th>When to Use</th><th>Trade-off</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Denormalization</td><td>Frequent joins across shards</td><td>Storage vs query speed</td></tr>
            <tr><td className="feature-name">Materialized Views</td><td>Complex aggregations</td><td>Staleness vs compute</td></tr>
            <tr><td className="feature-name">Caching</td><td>Repeated cross-shard queries</td><td>Freshness vs latency</td></tr>
            <tr><td className="feature-name">Async Processing</td><td>Non-critical aggregations</td><td>Consistency vs speed</td></tr>
          </tbody>
        </table>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Design for Query Patterns</h4>
            <p>Analyze your query patterns BEFORE choosing shard key. If 90% of queries are by user_id, shard by user_id to make most queries single-shard.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Cross-shard queries use scatter-gather pattern</li>
              <li>Global indexes trade write speed for read speed</li>
              <li>Avoid distributed transactions when possible</li>
              <li>Co-locate related data for locality</li>
              <li>Design shard key based on query patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Distributed Data Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Globally Distributed Database Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design sharded database for global e-commerce platform</span></li><li><span className="req-number">2</span><span className="req-text">Implement cross-shard aggregation for analytics</span></li><li><span className="req-number">3</span><span className="req-text">Design secondary index strategy for product search</span></li><li><span className="req-number">4</span><span className="req-text">Handle distributed transactions for checkout flow</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/7/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><span className="nav-link next disabled">End of Week 7</span></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week7Day5;
