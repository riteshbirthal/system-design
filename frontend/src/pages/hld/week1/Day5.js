import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week1Day5() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 1, dayNum = 5, topic = "Back-of-Envelope Estimation", concepts = "Traffic estimation, Storage calculation, Bandwidth";
  const tabs = [{ id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "How many seconds in a day?", options: ["36,000", "86,400", "100,000", "60,000"], correct: 1, explanation: "24 hours × 60 min × 60 sec = 86,400 seconds/day." },
    { id: 2, question: "1 million requests/day = how many RPS?", options: ["~10 RPS", "~12 RPS", "~100 RPS", "~1000 RPS"], correct: 1, explanation: "1M / 86,400 ≈ 11.6 RPS, roughly 12 RPS." },
    { id: 3, question: "How much is 1 TB?", options: ["1,000 MB", "1,000 GB", "1,000,000 MB", "100 GB"], correct: 1, explanation: "1 TB = 1,000 GB = 1,000,000 MB." },
    { id: 4, question: "If avg image is 200KB, how much storage for 10M images?", options: ["2 GB", "20 GB", "200 GB", "2 TB"], correct: 3, explanation: "10M × 200KB = 2,000,000 MB = 2,000 GB = 2 TB." },
    { id: 5, question: "What is QPS?", options: ["Quality Per Second", "Queries Per Second", "Queue Per Server", "Quick Processing Speed"], correct: 1, explanation: "QPS = Queries Per Second, similar to RPS (Requests Per Second)." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Back-of-Envelope Estimation</p></div></div><div className="video-details"><h2>Capacity Planning & Estimation</h2><p className="video-description">Learn to estimate traffic, storage, and bandwidth requirements for system design.</p></div></div></div>);

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Back-of-Envelope Estimation</h1></header><div className="article-content">
    <h2 className="md-h2">Why Estimation Matters</h2>
    <p>Quick estimates help validate designs and identify potential bottlenecks early.</p>
    
    <h2 className="md-h2">Key Numbers to Remember</h2>
    <table>
      <tr><td>Seconds/day</td><td>86,400 (~100K)</td></tr>
      <tr><td>Seconds/month</td><td>~2.5 million</td></tr>
      <tr><td>1 KB</td><td>1,000 bytes</td></tr>
      <tr><td>1 MB</td><td>1,000 KB</td></tr>
      <tr><td>1 GB</td><td>1,000 MB</td></tr>
      <tr><td>1 TB</td><td>1,000 GB</td></tr>
    </table>
    
    <h2 className="md-h2">Traffic Estimation</h2>
    <p><strong>Daily Active Users (DAU)</strong> → Requests/day → RPS</p>
    <p>Example: 10M DAU, 10 requests/user/day = 100M requests/day</p>
    <p>100M / 86,400 ≈ 1,157 RPS average, peak = 2-3x = ~3K RPS</p>
    
    <h2 className="md-h2">Storage Estimation</h2>
    <p>Items × Size × Time period</p>
    <p>Example: 1M photos/day × 200KB × 365 days = 73 TB/year</p>
    
    <h2 className="md-h2">Bandwidth Estimation</h2>
    <p>RPS × Average response size</p>
    <p>Example: 1000 RPS × 500KB = 500 MB/s = 4 Gbps</p>
    
    <h2 className="md-h2">Quick Conversions</h2>
    <ul>
      <li>1M requests/day ≈ 12 RPS</li>
      <li>100M requests/day ≈ 1.2K RPS</li>
      <li>1B requests/day ≈ 12K RPS</li>
    </ul>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span><span className="score-label">Score</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p className="review-question">Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Estimation Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Estimate System Capacity</h1></header><div className="assignment-body"><h3>Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Estimate traffic for a photo-sharing app with 50M DAU</span></li><li><span className="req-number">2</span><span className="req-text">Calculate storage needed for 5 years</span></li><li><span className="req-number">3</span><span className="req-text">Estimate bandwidth requirements</span></li><li><span className="req-number">4</span><span className="req-text">Show all calculations</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/1/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/1/day/6" className="nav-link next">Day 6 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week1Day5;
