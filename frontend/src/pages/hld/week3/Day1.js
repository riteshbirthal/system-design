import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week3Day1() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 3, dayNum = 1, topic = "SQL vs NoSQL Databases", concepts = "Relational vs Non-relational, ACID, Use cases";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What does ACID stand for?", options: ["Atomicity, Consistency, Isolation, Durability", "Async, Concurrent, Independent, Distributed", "Available, Consistent, Independent, Durable", "Atomic, Cached, Isolated, Distributed"], correct: 0, explanation: "ACID = Atomicity, Consistency, Isolation, Durability - key properties of database transactions." },
    { id: 2, question: "Which database type is best for complex joins?", options: ["Document DB", "Key-Value Store", "Relational (SQL)", "Graph DB"], correct: 2, explanation: "SQL databases excel at complex joins due to their relational nature and SQL query language." },
    { id: 3, question: "MongoDB is what type of database?", options: ["Relational", "Document", "Key-Value", "Column-family"], correct: 1, explanation: "MongoDB is a document database that stores data in JSON-like documents." },
    { id: 4, question: "When to choose NoSQL over SQL?", options: ["Need ACID transactions", "Complex relationships", "Flexible schema, high scale", "Financial transactions"], correct: 2, explanation: "NoSQL is ideal when you need schema flexibility, horizontal scaling, and can tolerate eventual consistency." },
    { id: 5, question: "Which is a column-family database?", options: ["PostgreSQL", "MongoDB", "Cassandra", "Neo4j"], correct: 2, explanation: "Cassandra is a column-family database designed for high availability and scalability." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>SQL vs NoSQL Databases</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>SQL vs NoSQL Databases</h1><div className="article-tags"><span className="tag">Database</span><span className="tag">SQL</span><span className="tag">NoSQL</span><span className="tag">ACID</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Database Types Overview</h2>
        <p>Choosing the right database is critical for system design. The choice depends on data structure, scale requirements, and consistency needs.</p>
        
        <div className="concept-cards">
          <div className="concept-card" style={{borderLeft: '4px solid #3b82f6'}}>
            <div className="concept-card-icon">🗃️</div>
            <div className="concept-card-title">SQL (Relational)</div>
            <div className="concept-card-description">Structured data, ACID compliant, complex queries</div>
          </div>
          <div className="concept-card" style={{borderLeft: '4px solid #22c55e'}}>
            <div className="concept-card-icon">📄</div>
            <div className="concept-card-title">Document DB</div>
            <div className="concept-card-description">JSON-like documents, flexible schema</div>
          </div>
          <div className="concept-card" style={{borderLeft: '4px solid #f59e0b'}}>
            <div className="concept-card-icon">🔑</div>
            <div className="concept-card-title">Key-Value</div>
            <div className="concept-card-description">Simple lookups, extremely fast, caching</div>
          </div>
          <div className="concept-card" style={{borderLeft: '4px solid #8b5cf6'}}>
            <div className="concept-card-icon">🕸️</div>
            <div className="concept-card-title">Graph DB</div>
            <div className="concept-card-description">Relationships, social networks, recommendations</div>
          </div>
        </div>

        <h2 className="md-h2">SQL vs NoSQL Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>SQL</th><th>NoSQL</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Schema</td><td>Fixed, predefined</td><td>Flexible, dynamic</td></tr>
            <tr><td className="feature-name">Scaling</td><td>Vertical (scale up)</td><td>Horizontal (scale out)</td></tr>
            <tr><td className="feature-name">Transactions</td><td>ACID guaranteed</td><td>BASE (eventual consistency)</td></tr>
            <tr><td className="feature-name">Queries</td><td>Complex JOINs, SQL</td><td>Simple queries, no JOINs</td></tr>
            <tr><td className="feature-name">Data Model</td><td>Tables with rows</td><td>Documents, Key-Value, Graphs</td></tr>
            <tr><td className="feature-name">Examples</td><td>PostgreSQL, MySQL</td><td>MongoDB, Redis, Cassandra</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">ACID Properties</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">A</div>
            <div className="step-content">
              <h4>Atomicity</h4>
              <p>Transaction is all-or-nothing. Either all operations succeed or none do.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">C</div>
            <div className="step-content">
              <h4>Consistency</h4>
              <p>Database moves from one valid state to another. All constraints are maintained.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">I</div>
            <div className="step-content">
              <h4>Isolation</h4>
              <p>Concurrent transactions don't interfere with each other.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">D</div>
            <div className="step-content">
              <h4>Durability</h4>
              <p>Committed transactions survive system failures (written to disk).</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">When to Use Each</h2>
        <div className="pros-cons">
          <div className="pros-section">
            <h4>✓ Choose SQL When</h4>
            <ul>
              <li>Data has clear relationships</li>
              <li>Need complex queries/JOINs</li>
              <li>ACID transactions required</li>
              <li>Data integrity is critical</li>
              <li>Financial/banking systems</li>
            </ul>
          </div>
          <div className="cons-section">
            <h4>✓ Choose NoSQL When</h4>
            <ul>
              <li>Schema changes frequently</li>
              <li>Need horizontal scaling</li>
              <li>High write throughput</li>
              <li>Eventual consistency is OK</li>
              <li>Real-time analytics, IoT</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>SQL for structured data with relationships and ACID needs</li>
              <li>NoSQL for flexible schema and horizontal scaling</li>
              <li>Many systems use both (polyglot persistence)</li>
              <li>Consider CAP theorem trade-offs</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Database Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Database Selection Exercise</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare PostgreSQL vs MongoDB for an e-commerce platform</span></li><li><span className="req-number">2</span><span className="req-text">List pros/cons of each for products, orders, user data</span></li><li><span className="req-number">3</span><span className="req-text">Recommend which to use for each data type and why</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/2/day/7" className="nav-link prev">&lt;&lt; W2D7</Link><Link to="/hld/week/3/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week3Day1;
