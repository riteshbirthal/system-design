import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week2Day7() {
  const weekNum = 2, dayNum = 7, topic = "Weekly Hands-On", concepts = "Final quiz + Project: Design a Chat System";
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);
  const tabs = [{ id: 'article', label: 'Summary', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Final Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Project', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "DNS translates?", options: ["IP to MAC", "Domain to IP", "Port to service", "URL to path"], correct: 1, explanation: "DNS resolves domain names to IP addresses." },
    { id: 2, question: "HTTP 201 means?", options: ["OK", "Created", "No Content", "Redirect"], correct: 1, explanation: "201 = Created, typically for successful POST." },
    { id: 3, question: "TCP vs UDP - which is reliable?", options: ["UDP", "TCP", "Both", "Neither"], correct: 1, explanation: "TCP guarantees delivery with acknowledgments." },
    { id: 4, question: "REST endpoint for creating user?", options: ["GET /users", "POST /users", "PUT /users", "DELETE /users"], correct: 1, explanation: "POST to collection endpoint creates new resource." },
    { id: 5, question: "GraphQL advantage?", options: ["Faster", "Prevents over-fetching", "Simpler", "Better security"], correct: 1, explanation: "Clients request exactly what they need." },
    { id: 6, question: "WebSockets best for?", options: ["File upload", "Real-time chat", "CRUD", "Static pages"], correct: 1, explanation: "WebSockets enable real-time bidirectional communication." },
    { id: 7, question: "Which DNS record for mail?", options: ["A", "CNAME", "MX", "NS"], correct: 2, explanation: "MX records specify mail servers." },
    { id: 8, question: "gRPC uses?", options: ["JSON", "XML", "Protocol Buffers", "Plain text"], correct: 2, explanation: "gRPC uses Protocol Buffers for efficient serialization." },
    { id: 9, question: "TTL in DNS controls?", options: ["Security", "Cache duration", "Record type", "IP version"], correct: 1, explanation: "TTL = Time To Live, cache duration for DNS records." },
    { id: 10, question: "HTTPS provides?", options: ["Speed", "Encryption", "Caching", "Compression"], correct: 1, explanation: "HTTPS encrypts data and authenticates servers." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Week 2 Summary</h1></header><div className="article-content">
    <h2 className="md-h2">Topics Covered</h2>
    <ul>
      <li><strong>Day 1:</strong> DNS - Domain resolution, record types, hierarchy</li>
      <li><strong>Day 2:</strong> HTTP/HTTPS - Methods, status codes, TLS</li>
      <li><strong>Day 3:</strong> Mid-week practice</li>
      <li><strong>Day 4:</strong> TCP vs UDP - Transport protocols</li>
      <li><strong>Day 5:</strong> REST API - Design principles, best practices</li>
      <li><strong>Day 6:</strong> GraphQL, gRPC, WebSockets</li>
    </ul>
    <h2 className="md-h2">Key Takeaways</h2>
    <ul>
      <li>DNS is the phone book of the internet</li>
      <li>HTTP methods map to CRUD operations</li>
      <li>TCP for reliability, UDP for speed</li>
      <li>REST for simple APIs, GraphQL for complex queries</li>
      <li>WebSockets for real-time communication</li>
    </ul>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Week 2 Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div><p>{score}/{total} correct</p></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Week 2 Final Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Design a Chat System</h1><span className="difficulty-badge intermediate">Intermediate</span></div><p className="assignment-description">Design a real-time chat application like Slack or WhatsApp.</p></header><div className="assignment-body"><h3>Functional Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">1:1 messaging between users</span></li><li><span className="req-number">2</span><span className="req-text">Group chats (up to 100 members)</span></li><li><span className="req-number">3</span><span className="req-text">Online/offline status indicators</span></li><li><span className="req-number">4</span><span className="req-text">Read receipts and typing indicators</span></li><li><span className="req-number">5</span><span className="req-text">Message history persistence</span></li></ul><h3>Non-Functional Requirements</h3><ul className="requirements-list"><li><span className="req-number">6</span><span className="req-text">Low latency (&lt;100ms for message delivery)</span></li><li><span className="req-number">7</span><span className="req-text">Support 10M concurrent users</span></li><li><span className="req-number">8</span><span className="req-text">99.99% availability</span></li></ul><h3>Deliverables</h3><ul className="requirements-list"><li><span className="req-number">9</span><span className="req-text">High-level architecture diagram</span></li><li><span className="req-number">10</span><span className="req-text">WebSocket connection management design</span></li><li><span className="req-number">11</span><span className="req-text">Message storage schema</span></li><li><span className="req-number">12</span><span className="req-text">Explain protocol choices (REST/WebSocket/etc)</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Project</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/2/day/6" className="nav-link prev">&lt;&lt; Day 6</Link><Link to="/hld/week/3/day/1" className="nav-link next">Week 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week2Day7;
