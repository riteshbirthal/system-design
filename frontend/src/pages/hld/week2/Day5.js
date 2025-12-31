import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week2Day5() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 2, dayNum = 5, topic = "REST API Design", concepts = "REST principles, Best practices, Versioning";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What does REST stand for?", options: ["Remote State Transfer", "Representational State Transfer", "Request State Transfer", "Resource State Transfer"], correct: 1, explanation: "REST = Representational State Transfer, an architectural style for APIs." },
    { id: 2, question: "RESTful URLs should use?", options: ["Verbs", "Nouns (resources)", "Actions", "Mixed"], correct: 1, explanation: "URLs should represent resources (nouns), methods represent actions." },
    { id: 3, question: "Correct endpoint for getting user 123?", options: ["GET /getUser/123", "GET /users/123", "POST /users/get/123", "GET /user?id=123"], correct: 1, explanation: "/users/123 with GET method follows REST conventions." },
    { id: 4, question: "Which response code for successful POST creating resource?", options: ["200", "201", "204", "202"], correct: 1, explanation: "201 Created indicates successful resource creation." },
    { id: 5, question: "How to version REST APIs?", options: ["URL path (/v1/users)", "Query param (?v=1)", "Header", "All are valid"], correct: 3, explanation: "All approaches work: URL versioning, query params, or Accept header." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>REST API Design</p></div></div></div></div>);

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>REST API Design</h1></header><div className="article-content">
    <h2 className="md-h2">REST Principles</h2>
    <ul>
      <li><strong>Stateless:</strong> Each request contains all needed info</li>
      <li><strong>Client-Server:</strong> Separation of concerns</li>
      <li><strong>Cacheable:</strong> Responses can be cached</li>
      <li><strong>Uniform Interface:</strong> Consistent resource naming</li>
      <li><strong>Layered System:</strong> Client doesn't know if directly connected to server</li>
    </ul>
    
    <h2 className="md-h2">URL Design Best Practices</h2>
    <ul>
      <li>Use nouns, not verbs: /users not /getUsers</li>
      <li>Use plural: /users not /user</li>
      <li>Use hierarchy: /users/123/orders</li>
      <li>Use lowercase with hyphens: /user-profiles</li>
    </ul>
    
    <h2 className="md-h2">HTTP Methods Mapping</h2>
    <table>
      <tr><td>GET /users</td><td>List all users</td></tr>
      <tr><td>GET /users/123</td><td>Get user 123</td></tr>
      <tr><td>POST /users</td><td>Create user</td></tr>
      <tr><td>PUT /users/123</td><td>Replace user 123</td></tr>
      <tr><td>PATCH /users/123</td><td>Update user 123</td></tr>
      <tr><td>DELETE /users/123</td><td>Delete user 123</td></tr>
    </table>
    
    <h2 className="md-h2">Response Codes</h2>
    <ul>
      <li><strong>200:</strong> OK - successful GET/PUT/PATCH</li>
      <li><strong>201:</strong> Created - successful POST</li>
      <li><strong>204:</strong> No Content - successful DELETE</li>
      <li><strong>400:</strong> Bad Request - invalid input</li>
      <li><strong>404:</strong> Not Found - resource doesn't exist</li>
    </ul>
    
    <h2 className="md-h2">Pagination</h2>
    <p>GET /users?page=2&limit=20 or GET /users?offset=20&limit=20</p>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>REST API Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Design REST API</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design REST API for a blog platform (posts, comments, users)</span></li><li><span className="req-number">2</span><span className="req-text">Define all endpoints with methods and response codes</span></li><li><span className="req-number">3</span><span className="req-text">Include pagination and filtering</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/2/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/2/day/6" className="nav-link next">Day 6 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week2Day5;
