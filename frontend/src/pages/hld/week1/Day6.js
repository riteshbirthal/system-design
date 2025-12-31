import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week1Day6() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 1, dayNum = 6, topic = "System Design Framework", concepts = "RESHADED framework, Interview approach";
  const tabs = [{ id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is the first step in system design interview?", options: ["Draw diagrams", "Clarify requirements", "Discuss database", "Write code"], correct: 1, explanation: "Always start by clarifying requirements - functional and non-functional." },
    { id: 2, question: "In RESHADED, what does 'E' stand for?", options: ["Estimation", "Encryption", "Endpoint", "Error handling"], correct: 0, explanation: "E = Estimation - back-of-envelope calculations for traffic, storage, bandwidth." },
    { id: 3, question: "When should you discuss trade-offs?", options: ["Never", "At the end", "Throughout the discussion", "Only if asked"], correct: 2, explanation: "Discussing trade-offs shows depth of understanding and should happen throughout." },
    { id: 4, question: "What does API design typically include?", options: ["CSS styles", "Endpoints, methods, request/response formats", "Database queries", "Unit tests"], correct: 1, explanation: "API design defines endpoints, HTTP methods, and data formats." },
    { id: 5, question: "Why is high-level design drawn before deep dive?", options: ["It's faster", "Shows the big picture before details", "Interviewer preference", "Required by process"], correct: 1, explanation: "HLD gives overall architecture context before diving into specific components." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>System Design Framework</p></div></div><div className="video-details"><h2>RESHADED Framework</h2><p className="video-description">Learn a structured approach to tackle any system design interview question.</p></div></div></div>);

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>System Design Framework</h1></header><div className="article-content">
    <h2 className="md-h2">The RESHADED Framework</h2>
    <p>A structured approach for system design interviews:</p>
    
    <table>
      <tr><td><strong>R</strong></td><td>Requirements</td><td>Clarify functional & non-functional requirements</td></tr>
      <tr><td><strong>E</strong></td><td>Estimation</td><td>Back-of-envelope calculations</td></tr>
      <tr><td><strong>S</strong></td><td>Storage Schema</td><td>Database design, data models</td></tr>
      <tr><td><strong>H</strong></td><td>High-Level Design</td><td>System architecture diagram</td></tr>
      <tr><td><strong>A</strong></td><td>API Design</td><td>Endpoints, methods, formats</td></tr>
      <tr><td><strong>D</strong></td><td>Deep Dive</td><td>Detailed design of key components</td></tr>
      <tr><td><strong>E</strong></td><td>Evaluate</td><td>Trade-offs, bottlenecks, improvements</td></tr>
      <tr><td><strong>D</strong></td><td>Discuss</td><td>Edge cases, monitoring, scaling</td></tr>
    </table>
    
    <h2 className="md-h2">Time Allocation (45 min interview)</h2>
    <ul>
      <li>Requirements: 5 min</li>
      <li>Estimation: 5 min</li>
      <li>High-Level Design: 10 min</li>
      <li>API Design: 5 min</li>
      <li>Deep Dive: 15 min</li>
      <li>Wrap-up/Questions: 5 min</li>
    </ul>
    
    <h2 className="md-h2">Interview Tips</h2>
    <ul>
      <li>Always clarify requirements first</li>
      <li>Think out loud - explain your reasoning</li>
      <li>Discuss trade-offs for major decisions</li>
      <li>Start simple, then add complexity</li>
      <li>Ask clarifying questions</li>
      <li>Be prepared to go deeper on any component</li>
    </ul>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Framework Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Practice the Framework</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Pick a system (URL shortener, Twitter, Uber)</span></li><li><span className="req-number">2</span><span className="req-text">Apply RESHADED framework step by step</span></li><li><span className="req-number">3</span><span className="req-text">Time yourself - aim for 45 minutes</span></li><li><span className="req-number">4</span><span className="req-text">Document your design</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/1/day/5" className="nav-link prev">&lt;&lt; Day 5</Link><Link to="/hld/week/1/day/7" className="nav-link next">Day 7 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week1Day6;
