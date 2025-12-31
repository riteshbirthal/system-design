import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week1Day7() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 1, dayNum = 7, topic = "Weekly Hands-On", concepts = "Comprehensive quiz + Project: Design a Pastebin";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: false, color: '#E91E63' },{ id: 'article', label: 'Project Brief', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Final Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Project', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What does HLD focus on?", options: ["Code details", "System architecture", "Unit tests", "CSS"], correct: 1, explanation: "HLD focuses on overall system architecture." },
    { id: 2, question: "Functional vs Non-functional?", options: ["Same thing", "FR=What, NFR=How", "FR=How, NFR=What", "Both about features"], correct: 1, explanation: "FR describes what system does, NFR describes how it performs." },
    { id: 3, question: "Horizontal scaling means?", options: ["More RAM", "More servers", "Better CPU", "More storage"], correct: 1, explanation: "Horizontal = adding more servers to distribute load." },
    { id: 4, question: "1M requests/day ≈ ?", options: ["1 RPS", "12 RPS", "100 RPS", "1000 RPS"], correct: 1, explanation: "1M / 86400 ≈ 12 RPS." },
    { id: 5, question: "First step in design interview?", options: ["Draw diagram", "Clarify requirements", "Database design", "API design"], correct: 1, explanation: "Always start by clarifying requirements." },
    { id: 6, question: "99.99% availability downtime/year?", options: ["3.65 days", "8.76 hours", "52.6 minutes", "5.26 minutes"], correct: 2, explanation: "4 nines = ~52.6 minutes downtime per year." },
    { id: 7, question: "Why stateless design?", options: ["Uses less code", "Any server can handle any request", "Faster", "More secure"], correct: 1, explanation: "Stateless enables horizontal scaling - any server handles any request." },
    { id: 8, question: "Load Balancer purpose?", options: ["Store data", "Distribute traffic", "Cache content", "Encrypt data"], correct: 1, explanation: "Load balancer distributes traffic across servers." },
    { id: 9, question: "In RESHADED, 'S' means?", options: ["Security", "Storage Schema", "Scaling", "Speed"], correct: 1, explanation: "S = Storage Schema - database design and data models." },
    { id: 10, question: "Key component for session in stateless?", options: ["Local storage", "Redis/External store", "Cookies only", "Database only"], correct: 1, explanation: "Use external session store like Redis for stateless design." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const renderEmptyState = (icon, title) => (<div className="content-panel"><div className="empty-state"><div className="empty-icon">{icon}</div><h3>{title}</h3></div></div>);

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Week 1 Summary</h1></header><div className="article-content">
    <h2 className="md-h2">Week 1 Topics</h2>
    <ul>
      <li><strong>Day 1:</strong> System Design basics, HLD vs LLD, key components</li>
      <li><strong>Day 2:</strong> Functional & Non-functional requirements, MoSCoW</li>
      <li><strong>Day 3:</strong> Mid-week practice quiz</li>
      <li><strong>Day 4:</strong> Scalability - vertical vs horizontal, stateless design</li>
      <li><strong>Day 5:</strong> Back-of-envelope estimation</li>
      <li><strong>Day 6:</strong> RESHADED framework for interviews</li>
    </ul>
    <h2 className="md-h2">Key Takeaways</h2>
    <ul>
      <li>Always clarify requirements before designing</li>
      <li>Understand difference between FR and NFR</li>
      <li>Stateless design enables horizontal scaling</li>
      <li>Use estimation to validate designs</li>
      <li>Follow a structured framework in interviews</li>
    </ul>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Week 1 Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div><p>{score}/{total} correct</p></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Week 1 Final Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-progress"><div className="progress-bar"><div className="progress-fill" style={{width:`${((currentQuestionIndex+1)/total)*100}%`}}></div></div></div><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Design a Pastebin</h1><span className="difficulty-badge intermediate">Intermediate</span></div><p className="assignment-description">Design a service like Pastebin where users can store and share text snippets.</p></header><div className="assignment-body"><h3>Functional Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Users can create pastes with text content</span></li><li><span className="req-number">2</span><span className="req-text">Generate short URLs for each paste</span></li><li><span className="req-number">3</span><span className="req-text">Users can access paste via short URL</span></li><li><span className="req-number">4</span><span className="req-text">Optional: Set expiration time</span></li></ul><h3>Non-Functional Requirements</h3><ul className="requirements-list"><li><span className="req-number">5</span><span className="req-text">High availability (99.9%)</span></li><li><span className="req-number">6</span><span className="req-text">Low latency (&lt;200ms)</span></li><li><span className="req-number">7</span><span className="req-text">Handle 1M pastes/day</span></li></ul><h3>Deliverables</h3><ul className="requirements-list"><li><span className="req-number">8</span><span className="req-text">Requirements document</span></li><li><span className="req-number">9</span><span className="req-text">Capacity estimation</span></li><li><span className="req-number">10</span><span className="req-text">High-level architecture diagram</span></li><li><span className="req-number">11</span><span className="req-text">API design</span></li><li><span className="req-number">12</span><span className="req-text">Database schema</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Project</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''} ${!t.available?'disabled':''}`} onClick={()=>{if(t.available){setActiveTab(t.id);setMobileMenuOpen(false);}}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''} ${!t.available?'disabled':''}`} onClick={()=>t.available&&setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/1/day/6" className="nav-link prev">&lt;&lt; Day 6</Link><Link to="/hld/week/2/day/1" className="nav-link next">Week 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderEmptyState('🎬','Not Available')}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week1Day7;
