import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week3Day7() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 3, dayNum = 7, topic = "Weekly Hands-On", concepts = "Final quiz + Project: Design a Database for Twitter";
  const tabs = [{ id: 'article', label: 'Summary', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Final Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Project', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "ACID stands for?", options: ["Atomicity, Consistency, Isolation, Durability", "Async, Cached, Isolated, Durable", "Available, Consistent, Isolated, Distributed", "Atomic, Concurrent, Isolated, Durable"], correct: 0, explanation: "ACID = Atomicity, Consistency, Isolation, Durability." },
    { id: 2, question: "B-Tree index supports?", options: ["Only equality", "Range queries and sorting", "Only text search", "Only hash lookups"], correct: 1, explanation: "B-Tree supports range queries, sorting, and equality." },
    { id: 3, question: "Master-Slave replication?", options: ["Writes to any node", "Writes to master, reads from slaves", "Only backups", "No replication"], correct: 1, explanation: "Master handles writes, slaves handle reads." },
    { id: 4, question: "Good shard key has?", options: ["Low cardinality", "High cardinality, even distribution", "Sequential values", "Null values"], correct: 1, explanation: "Good shard keys distribute data evenly." },
    { id: 5, question: "CAP: During partition choose?", options: ["All three", "C or A", "Only P", "None"], correct: 1, explanation: "During partition, choose Consistency or Availability." },
    { id: 6, question: "MongoDB is?", options: ["Relational", "Document DB", "Key-Value", "Graph"], correct: 1, explanation: "MongoDB stores JSON-like documents." },
    { id: 7, question: "Async replication risk?", options: ["Slower writes", "Data loss on failure", "No reads", "High consistency"], correct: 1, explanation: "Async replication may lose uncommitted data on failure." },
    { id: 8, question: "Composite index (A,B) works for?", options: ["B only", "A only or A+B", "Any combination", "Neither"], correct: 1, explanation: "Leftmost prefix - works for A or A+B queries." },
    { id: 9, question: "AP system example?", options: ["Bank transactions", "Cassandra", "Two-phase commit", "Distributed locks"], correct: 1, explanation: "Cassandra prioritizes availability over consistency." },
    { id: 10, question: "Index trade-off?", options: ["Faster everything", "Faster reads, slower writes", "Slower reads", "No trade-off"], correct: 1, explanation: "Indexes speed reads but slow writes." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Week 3 Summary</h1></header><div className="article-content">
    <h2 className="md-h2">Topics Covered</h2>
    <ul>
      <li><strong>Day 1:</strong> SQL vs NoSQL - types, ACID, use cases</li>
      <li><strong>Day 2:</strong> Indexing - B-Tree, Hash, composite indexes</li>
      <li><strong>Day 3:</strong> Mid-week practice</li>
      <li><strong>Day 4:</strong> Replication - Master-Slave, sync vs async</li>
      <li><strong>Day 5:</strong> Sharding - strategies, shard keys</li>
      <li><strong>Day 6:</strong> CAP Theorem - consistency vs availability</li>
    </ul>
    <h2 className="md-h2">Key Takeaways</h2>
    <ul>
      <li>Choose SQL for ACID, NoSQL for flexibility/scale</li>
      <li>Index columns used in WHERE, JOIN, ORDER BY</li>
      <li>Replication improves reads, sharding improves writes</li>
      <li>CAP: Choose CP or AP based on requirements</li>
    </ul>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Week 3 Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div><p>{score}/{total}</p></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Week 3 Final Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Design Database for Twitter</h1><span className="difficulty-badge advanced">Advanced</span></div><p className="assignment-description">Design the database architecture for a Twitter-like social media platform.</p></header><div className="assignment-body"><h3>Functional Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Users can post tweets (280 chars)</span></li><li><span className="req-number">2</span><span className="req-text">Users can follow other users</span></li><li><span className="req-number">3</span><span className="req-text">Home timeline shows followed users' tweets</span></li><li><span className="req-number">4</span><span className="req-text">Search tweets by hashtag</span></li></ul><h3>Non-Functional Requirements</h3><ul className="requirements-list"><li><span className="req-number">5</span><span className="req-text">500M users, 200M DAU</span></li><li><span className="req-number">6</span><span className="req-text">Timeline load &lt;200ms</span></li></ul><h3>Deliverables</h3><ul className="requirements-list"><li><span className="req-number">7</span><span className="req-text">Database schema design</span></li><li><span className="req-number">8</span><span className="req-text">Sharding strategy for tweets</span></li><li><span className="req-number">9</span><span className="req-text">Replication strategy</span></li><li><span className="req-number">10</span><span className="req-text">Indexing strategy for search</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Project</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/3/day/6" className="nav-link prev">&lt;&lt; Day 6</Link><Link to="/hld/week/4/day/1" className="nav-link next">Week 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week3Day7;
