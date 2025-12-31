import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week3Day3() {
  const weekNum = 3, dayNum = 3, topic = "Mid-Week Practice", concepts = "Review SQL, NoSQL, Indexing concepts";
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);
  const tabs = [{ id: 'article', label: 'Review', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' }];

  const quizQuestions = [
    { id: 1, question: "ACID stands for?", options: ["Atomicity, Consistency, Isolation, Durability", "Async, Cached, Independent, Durable", "Available, Consistent, Isolated, Distributed", "Atomic, Concurrent, Independent, Durable"], correct: 0, explanation: "ACID = Atomicity, Consistency, Isolation, Durability." },
    { id: 2, question: "MongoDB is what type?", options: ["Relational", "Document", "Key-Value", "Graph"], correct: 1, explanation: "MongoDB stores data in JSON-like documents." },
    { id: 3, question: "B-Tree index supports?", options: ["Only equality", "Range queries and sorting", "Only text search", "Only geospatial"], correct: 1, explanation: "B-Tree supports =, <, >, BETWEEN, ORDER BY." },
    { id: 4, question: "Hash index is best for?", options: ["Range queries", "Exact equality only", "Sorting", "Full-text search"], correct: 1, explanation: "Hash indexes only support exact equality lookups." },
    { id: 5, question: "Composite index (A,B,C) works for?", options: ["Query on C only", "Query on A, or A+B, or A+B+C", "Query on B only", "Any combination"], correct: 1, explanation: "Leftmost prefix rule - must include leading columns." },
    { id: 6, question: "NoSQL is better for?", options: ["Complex JOINs", "ACID transactions", "Flexible schema, horizontal scaling", "Financial systems"], correct: 2, explanation: "NoSQL excels at schema flexibility and horizontal scaling." },
    { id: 7, question: "Index downside?", options: ["Faster reads", "Slower writes, more storage", "Better security", "Simpler queries"], correct: 1, explanation: "Indexes slow down writes and use extra storage." },
    { id: 8, question: "Cassandra is what type?", options: ["Document", "Relational", "Column-family", "Graph"], correct: 2, explanation: "Cassandra is a column-family (wide-column) database." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Week 3 Mid-Review</h1></header><div className="article-content">
    <h2 className="md-h2">Day 1: SQL vs NoSQL</h2>
    <ul><li>SQL: Structured, ACID, complex queries, vertical scaling</li><li>NoSQL: Flexible schema, eventual consistency, horizontal scaling</li><li>Types: Document (MongoDB), Key-Value (Redis), Column (Cassandra), Graph (Neo4j)</li></ul>
    <h2 className="md-h2">Day 2: Indexing</h2>
    <ul><li>B-Tree: Range queries, sorting, most common</li><li>Hash: Exact equality only, O(1) lookup</li><li>Composite: Follow leftmost prefix rule</li><li>Trade-off: Faster reads vs slower writes</li></ul>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Mid-Week Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/3/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/3/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}</div></main>
    </div>
  );
}

export default Week3Day3;
