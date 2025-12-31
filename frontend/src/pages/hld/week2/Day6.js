import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week2Day6() {
  const weekNum = 2, dayNum = 6, topic = "GraphQL, gRPC & WebSockets", concepts = "API alternatives, Real-time communication";
  
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
    { id: 1, question: "GraphQL solves which REST problem?", options: ["Security", "Over-fetching/under-fetching", "Speed", "Caching"], correct: 1, explanation: "GraphQL lets clients request exactly what they need, solving over/under-fetching." },
    { id: 2, question: "gRPC uses which protocol?", options: ["REST", "SOAP", "Protocol Buffers (protobuf)", "JSON-RPC"], correct: 2, explanation: "gRPC uses Protocol Buffers for efficient binary serialization." },
    { id: 3, question: "WebSockets provide?", options: ["One-way communication", "Full-duplex bidirectional communication", "Only server-to-client", "Only client-to-server"], correct: 1, explanation: "WebSockets enable real-time bidirectional communication." },
    { id: 4, question: "Best choice for real-time chat?", options: ["REST polling", "WebSockets", "GraphQL", "gRPC"], correct: 1, explanation: "WebSockets are ideal for real-time applications like chat." },
    { id: 5, question: "gRPC is best for?", options: ["Browser clients", "Microservices communication", "Simple CRUD", "Static content"], correct: 1, explanation: "gRPC excels in service-to-service communication with high performance needs." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>API Protocols</p></div></div></div></div>);

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>GraphQL, gRPC & WebSockets</h1></header><div className="article-content">
    <h2 className="md-h2">GraphQL</h2>
    <ul>
      <li><strong>Query language:</strong> Clients specify exactly what data they need</li>
      <li><strong>Single endpoint:</strong> One endpoint for all operations</li>
      <li><strong>Solves:</strong> Over-fetching and under-fetching</li>
      <li><strong>Schema:</strong> Strongly typed with introspection</li>
      <li><strong>Use cases:</strong> Complex UIs, mobile apps, aggregating multiple services</li>
    </ul>
    
    <h2 className="md-h2">gRPC</h2>
    <ul>
      <li><strong>Protocol Buffers:</strong> Binary serialization (smaller, faster than JSON)</li>
      <li><strong>HTTP/2:</strong> Multiplexing, streaming</li>
      <li><strong>Streaming:</strong> Supports client/server/bidirectional streaming</li>
      <li><strong>Code generation:</strong> Auto-generates client/server code</li>
      <li><strong>Use cases:</strong> Microservices, low-latency systems</li>
    </ul>
    
    <h2 className="md-h2">WebSockets</h2>
    <ul>
      <li><strong>Full-duplex:</strong> Bidirectional communication</li>
      <li><strong>Persistent connection:</strong> Single connection, no repeated handshakes</li>
      <li><strong>Low latency:</strong> Real-time data transfer</li>
      <li><strong>Use cases:</strong> Chat, live updates, gaming, notifications</li>
    </ul>
    
    <h2 className="md-h2">Comparison</h2>
    <table>
      <tr><td><strong>Protocol</strong></td><td><strong>Best For</strong></td></tr>
      <tr><td>REST</td><td>Simple CRUD, public APIs</td></tr>
      <tr><td>GraphQL</td><td>Complex queries, mobile apps</td></tr>
      <tr><td>gRPC</td><td>Microservices, high performance</td></tr>
      <tr><td>WebSockets</td><td>Real-time bidirectional</td></tr>
    </table>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>API Protocols Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Protocol Comparison</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare REST vs GraphQL for a social media app</span></li><li><span className="req-number">2</span><span className="req-text">When would you choose gRPC over REST?</span></li><li><span className="req-number">3</span><span className="req-text">Design a system using WebSockets for notifications</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/2/day/5" className="nav-link prev">&lt;&lt; Day 5</Link><Link to="/hld/week/2/day/7" className="nav-link next">Day 7 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week2Day6;
