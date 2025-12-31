import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week2Day3() {
  const weekNum = 2, dayNum = 3, topic = "Mid-Week Practice", concepts = "Review DNS and HTTP concepts";
  
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
    { id: 1, question: "What does DNS resolve?", options: ["IP to domain", "Domain to IP", "Port to service", "URL to path"], correct: 1, explanation: "DNS resolves domain names to IP addresses." },
    { id: 2, question: "Which DNS record is for email?", options: ["A", "CNAME", "MX", "TXT"], correct: 2, explanation: "MX (Mail Exchange) records specify mail servers." },
    { id: 3, question: "HTTP 500 means?", options: ["Not found", "Unauthorized", "Server error", "Bad request"], correct: 2, explanation: "5xx codes indicate server-side errors." },
    { id: 4, question: "Which HTTP method creates resources?", options: ["GET", "POST", "DELETE", "HEAD"], correct: 1, explanation: "POST is typically used to create new resources." },
    { id: 5, question: "TTL in DNS affects?", options: ["Security", "Cache duration", "Speed only", "Record type"], correct: 1, explanation: "TTL determines how long records are cached." },
    { id: 6, question: "HTTPS provides?", options: ["Speed", "Encryption", "Better UI", "More features"], correct: 1, explanation: "HTTPS encrypts data and authenticates servers." },
    { id: 7, question: "What is CNAME record?", options: ["IP mapping", "Alias to another domain", "Mail server", "Text data"], correct: 1, explanation: "CNAME creates an alias pointing to another domain." },
    { id: 8, question: "Idempotent HTTP methods?", options: ["Only GET", "GET, PUT, DELETE", "Only POST", "All methods"], correct: 1, explanation: "GET, PUT, DELETE are idempotent - same result regardless of repeat calls." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Week 2 Review: DNS & HTTP</h1></header><div className="article-content">
    <h2 className="md-h2">DNS Key Points</h2>
    <ul><li>DNS translates domains to IPs</li><li>Hierarchy: Root → TLD → Authoritative</li><li>Record types: A, AAAA, CNAME, MX, NS, TXT</li><li>TTL controls cache duration</li></ul>
    <h2 className="md-h2">HTTP Key Points</h2>
    <ul><li>Methods: GET, POST, PUT, PATCH, DELETE</li><li>Status: 2xx success, 4xx client error, 5xx server error</li><li>HTTPS = HTTP + TLS encryption</li><li>Headers: Content-Type, Authorization, Cache-Control</li></ul>
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
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/2/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/2/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}</div></main>
    </div>
  );
}

export default Week2Day3;
