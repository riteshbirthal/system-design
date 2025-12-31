import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week2Day4() {
  const weekNum = 2, dayNum = 4, topic = "TCP vs UDP", concepts = "Transport layer protocols, Use cases, Comparison";
  
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
    { id: 1, question: "TCP is connection-oriented. What does this mean?", options: ["No handshake", "Establishes connection before data transfer", "Faster than UDP", "No error checking"], correct: 1, explanation: "TCP uses 3-way handshake to establish connection before sending data." },
    { id: 2, question: "Which protocol is faster but unreliable?", options: ["TCP", "UDP", "HTTP", "FTP"], correct: 1, explanation: "UDP is faster because it doesn't guarantee delivery or order." },
    { id: 3, question: "Video streaming typically uses?", options: ["TCP only", "UDP only", "Both TCP and UDP", "Neither"], correct: 2, explanation: "Streaming often uses UDP for video data, TCP for control signals." },
    { id: 4, question: "TCP guarantees?", options: ["Speed", "Order and delivery", "Low latency", "Less bandwidth"], correct: 1, explanation: "TCP guarantees ordered delivery with acknowledgments and retransmission." },
    { id: 5, question: "Best protocol for real-time gaming?", options: ["TCP", "UDP", "HTTP", "SMTP"], correct: 1, explanation: "UDP's low latency is preferred for real-time games even with some packet loss." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>TCP vs UDP</p></div></div></div></div>);

  const renderArticleContent = () => (<div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>TCP vs UDP</h1></header><div className="article-content">
    <h2 className="md-h2">TCP (Transmission Control Protocol)</h2>
    <ul>
      <li><strong>Connection-oriented:</strong> 3-way handshake (SYN, SYN-ACK, ACK)</li>
      <li><strong>Reliable:</strong> Guarantees delivery with acknowledgments</li>
      <li><strong>Ordered:</strong> Data arrives in sequence</li>
      <li><strong>Flow control:</strong> Prevents overwhelming receiver</li>
      <li><strong>Use cases:</strong> HTTP, email, file transfer, database</li>
    </ul>
    
    <h2 className="md-h2">UDP (User Datagram Protocol)</h2>
    <ul>
      <li><strong>Connectionless:</strong> No handshake required</li>
      <li><strong>Unreliable:</strong> No delivery guarantee</li>
      <li><strong>Unordered:</strong> Packets may arrive out of order</li>
      <li><strong>Fast:</strong> Lower latency, less overhead</li>
      <li><strong>Use cases:</strong> Video streaming, VoIP, gaming, DNS</li>
    </ul>
    
    <h2 className="md-h2">Comparison</h2>
    <table>
      <tr><td><strong>Feature</strong></td><td><strong>TCP</strong></td><td><strong>UDP</strong></td></tr>
      <tr><td>Connection</td><td>Required</td><td>Not required</td></tr>
      <tr><td>Reliability</td><td>Guaranteed</td><td>Best effort</td></tr>
      <tr><td>Order</td><td>Guaranteed</td><td>Not guaranteed</td></tr>
      <tr><td>Speed</td><td>Slower</td><td>Faster</td></tr>
      <tr><td>Overhead</td><td>Higher</td><td>Lower</td></tr>
    </table>
    
    <h2 className="md-h2">When to Use Each</h2>
    <ul>
      <li><strong>TCP:</strong> When data integrity matters (web, email, files)</li>
      <li><strong>UDP:</strong> When speed matters more than reliability (live video, games)</li>
    </ul>
  </div></article></div>);

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>TCP/UDP Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Protocol Analysis</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">List 5 applications that use TCP and explain why</span></li><li><span className="req-number">2</span><span className="req-text">List 5 applications that use UDP and explain why</span></li><li><span className="req-number">3</span><span className="req-text">Design a system where you'd use both protocols</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/2/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/2/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week2Day4;
