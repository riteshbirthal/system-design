import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week1Day4() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 1, dayNum = 4, topic = "Scalability Fundamentals", concepts = "Vertical vs Horizontal scaling, Stateless design";
  const tabs = [{ id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is vertical scaling?", options: ["Adding more servers", "Adding more resources to existing server", "Distributing data", "Using CDN"], correct: 1, explanation: "Vertical scaling (scale up) means adding more CPU, RAM, storage to existing server." },
    { id: 2, question: "What is horizontal scaling?", options: ["Adding more RAM", "Adding more servers", "Upgrading CPU", "Using SSD"], correct: 1, explanation: "Horizontal scaling (scale out) means adding more servers to handle load." },
    { id: 3, question: "Why is stateless design important for scaling?", options: ["Uses less memory", "Any server can handle any request", "Faster response", "Better security"], correct: 1, explanation: "Stateless servers don't store session data, so any server can handle any request." },
    { id: 4, question: "What enables horizontal scaling?", options: ["Bigger servers", "Load balancer + stateless design", "More RAM", "Faster CPU"], correct: 1, explanation: "Load balancer distributes traffic; stateless design ensures any server can handle requests." },
    { id: 5, question: "Vertical scaling limitation?", options: ["Too expensive", "Hardware limits - can only scale so far", "Too slow", "Needs more code"], correct: 1, explanation: "Vertical scaling has hardware limits - you can't add infinite resources to one server." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Scalability Fundamentals</p></div></div><div className="video-details"><h2>Understanding Scalability</h2><p className="video-description">Learn the difference between vertical and horizontal scaling, and why stateless design is crucial for scalability.</p><div className="video-meta"><span className="meta-item"><span className="meta-icon">⏱️</span> 22 min</span></div></div></div></div>);

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Scalability Fundamentals</h1><div className="article-tags"><span className="tag">Scaling</span><span className="tag">Stateless</span></div></header><div className="article-content">
    <h2 className="md-h2">What is Scalability?</h2>
    <p>Scalability is the ability of a system to handle increased load by adding resources.</p>
    
    <h2 className="md-h2">Vertical Scaling (Scale Up)</h2>
    <p>Adding more power to existing server: more CPU, RAM, storage.</p>
    <ul><li><strong>Pros:</strong> Simple, no code changes</li><li><strong>Cons:</strong> Hardware limits, single point of failure, expensive</li></ul>
    
    <h2 className="md-h2">Horizontal Scaling (Scale Out)</h2>
    <p>Adding more servers to distribute load.</p>
    <ul><li><strong>Pros:</strong> No hardware limits, fault tolerant, cost-effective</li><li><strong>Cons:</strong> More complex, needs load balancer, stateless design</li></ul>
    
    <h2 className="md-h2">Stateless vs Stateful</h2>
    <table><tr><td><strong>Stateless</strong></td><td>Server doesn't store session data; any server can handle any request</td></tr><tr><td><strong>Stateful</strong></td><td>Server stores session data; specific server needed for user</td></tr></table>
    
    <h3 className="md-h3">Making Systems Stateless</h3>
    <ul><li>Store session in external store (Redis)</li><li>Use JWT tokens (client holds state)</li><li>Store user data in database</li></ul>
    
    <h2 className="md-h2">Key Takeaways</h2>
    <ul><li>Horizontal scaling is preferred for large systems</li><li>Stateless design enables horizontal scaling</li><li>Use external session storage (Redis)</li><li>Load balancer distributes traffic across servers</li></ul>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Quiz Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span><span className="score-label">Score</span></div></div><div className="results-review"><h3>Review</h3>{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><div className="review-header"><span className="review-number">Q{i+1}</span><span className={`review-badge ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}>{selectedAnswers[q.id]===q.correct?'✓':'✗'}</span></div><p className="review-question">{q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><div className="results-actions"><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Scalability Quiz</h1></header><div className="quiz-progress"><div className="progress-bar"><div className="progress-fill" style={{width:`${((currentQuestionIndex+1)/total)*100}%`}}></div></div></div><div className="quiz-question-single"><div className="question-card"><div className="question-header"><span className="question-number">Q{currentQuestionIndex+1}</span></div><p className="question-text">{curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''} ${selectedAnswers[q.id]!==undefined?'answered':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Design for Scale</h1><span className="difficulty-badge intermediate">Intermediate</span></div><p className="assignment-description">Transform a stateful design into a stateless, horizontally scalable architecture.</p></header><div className="assignment-body"><h3>Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Identify stateful components in a given architecture</span></li><li><span className="req-number">2</span><span className="req-text">Move session data to Redis</span></li><li><span className="req-number">3</span><span className="req-text">Add load balancer for traffic distribution</span></li><li><span className="req-number">4</span><span className="req-text">Draw before/after architecture diagrams</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span><span className="mobile-topic">{topic}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav><div className="mobile-menu-footer"><div className="mobile-day-nav"><Link to="/hld/week/1/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/1/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2><p className="day-concepts">{concepts}</p></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/1/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/1/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><div className="header-left"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></div></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week1Day4;
