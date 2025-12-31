import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week1Day2() {
  const weekNum = 1, dayNum = 2;
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);
  const topic = "Functional & Non-Functional Requirements";
  const concepts = "Requirements gathering, MoSCoW, User stories";

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }
  ];

  const quizQuestions = [
    { id: 1, question: "Which is a functional requirement?", options: ["System should handle 10K requests/second", "Users can create an account", "99.9% uptime", "Response time < 200ms"], correct: 1, explanation: "Functional requirements describe WHAT the system does. Creating an account is a feature/function." },
    { id: 2, question: "Which is a non-functional requirement?", options: ["Users can search products", "Users can add to cart", "System must be available 99.99%", "Users can checkout"], correct: 2, explanation: "Non-functional requirements describe HOW the system performs. Availability is a quality attribute." },
    { id: 3, question: "In MoSCoW prioritization, what does 'S' stand for?", options: ["Should have", "Shall have", "System have", "Secondary"], correct: 0, explanation: "MoSCoW: Must have, Should have, Could have, Won't have (this time)." },
    { id: 4, question: "What is the purpose of capacity estimation?", options: ["To write code faster", "To plan infrastructure and scale", "To design UI", "To write documentation"], correct: 1, explanation: "Capacity estimation helps determine storage, bandwidth, and server needs for the expected load." },
    { id: 5, question: "Which is an example of latency requirement?", options: ["Support 1M users", "Store 1TB data", "Response time < 100ms", "99% uptime"], correct: 2, explanation: "Latency measures how fast the system responds. Response time < 100ms is a latency requirement." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (
    <div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Requirements Engineering</p></div></div><div className="video-details"><h2>Functional & Non-Functional Requirements</h2><p className="video-description">Learn to identify and categorize system requirements. Understand the difference between functional and non-functional requirements.</p><div className="video-meta"><span className="meta-item"><span className="meta-icon">⏱️</span> 18 min</span><span className="meta-item"><span className="meta-icon">📊</span> Beginner</span></div></div></div></div>
  );

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Functional & Non-Functional Requirements</h1><div className="article-meta"><span className="meta-item"><span className="meta-icon">📖</span> 14 min read</span></div><div className="article-tags"><span className="tag">Requirements</span><span className="tag">MoSCoW</span><span className="tag">NFR</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Functional Requirements (FR)</h2>
        <p>Functional requirements describe <strong>WHAT</strong> the system should do - the features and capabilities.</p>
        <ul>
          <li>User registration and authentication</li>
          <li>Search functionality</li>
          <li>Create, read, update, delete operations</li>
          <li>Payment processing</li>
          <li>Notification system</li>
        </ul>

        <h2 className="md-h2">Non-Functional Requirements (NFR)</h2>
        <p>Non-functional requirements describe <strong>HOW</strong> the system performs - quality attributes.</p>
        
        <h3 className="md-h3">Key NFR Categories</h3>
        <table>
          <tr><td><strong>Category</strong></td><td><strong>Example</strong></td></tr>
          <tr><td>Performance</td><td>Response time &lt; 200ms</td></tr>
          <tr><td>Scalability</td><td>Handle 1M concurrent users</td></tr>
          <tr><td>Availability</td><td>99.99% uptime (4 nines)</td></tr>
          <tr><td>Reliability</td><td>No data loss on failures</td></tr>
          <tr><td>Security</td><td>Encrypt data at rest and in transit</td></tr>
          <tr><td>Consistency</td><td>Strong vs eventual consistency</td></tr>
        </table>

        <h2 className="md-h2">MoSCoW Prioritization</h2>
        <ul>
          <li><strong>Must have:</strong> Critical features, system fails without them</li>
          <li><strong>Should have:</strong> Important but not critical</li>
          <li><strong>Could have:</strong> Nice to have, low priority</li>
          <li><strong>Won't have:</strong> Out of scope for current iteration</li>
        </ul>

        <h2 className="md-h2">Availability Nines</h2>
        <table>
          <tr><td><strong>Availability</strong></td><td><strong>Downtime/Year</strong></td></tr>
          <tr><td>99% (2 nines)</td><td>3.65 days</td></tr>
          <tr><td>99.9% (3 nines)</td><td>8.76 hours</td></tr>
          <tr><td>99.99% (4 nines)</td><td>52.6 minutes</td></tr>
          <tr><td>99.999% (5 nines)</td><td>5.26 minutes</td></tr>
        </table>

        <h2 className="md-h2">Key Takeaways</h2>
        <ul>
          <li>Functional = WHAT (features), Non-functional = HOW (quality)</li>
          <li>NFRs drive architecture decisions more than FRs</li>
          <li>Use MoSCoW to prioritize requirements</li>
          <li>Always clarify availability, latency, and scale requirements</li>
        </ul>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex], answered = Object.keys(selectedAnswers).length;
    if (showResults) {
      const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;
      return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Quiz Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span><span className="score-label">Score</span></div></div><div className="results-review"><h3>Review</h3>{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><div className="review-header"><span className="review-number">Q{i+1}</span><span className={`review-badge ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}>{selectedAnswers[q.id]===q.correct?'✓':'✗'}</span></div><p className="review-question">{q.question}</p><div className="review-answers"><p><strong>Your answer:</strong> {q.options[selectedAnswers[q.id]]||'None'}</p>{selectedAnswers[q.id]!==q.correct&&<p><strong>Correct:</strong> {q.options[q.correct]}</p>}</div><div className="explanation">{q.explanation}</div></div>))}</div><div className="results-actions"><button className="retry-btn" onClick={resetQuiz}>Retry</button></div></div></div></div>);
    }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Requirements Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-progress"><div className="progress-text">Question {currentQuestionIndex+1} of {total}</div><div className="progress-bar"><div className="progress-fill" style={{width:`${((currentQuestionIndex+1)/total)*100}%`}}></div></div></div><div className="quiz-question-single"><div className="question-card"><div className="question-header"><span className="question-number">Q{currentQuestionIndex+1}</span></div><p className="question-text">{curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt; Prev</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''} ${selectedAnswers[q.id]!==undefined?'answered':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>Next &gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Define System Requirements</h1><span className="difficulty-badge beginner">Beginner</span></div><p className="assignment-description">Practice identifying and categorizing requirements for a real-world system.</p></header><div className="assignment-body"><h3>Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Choose a system (e.g., food delivery app, e-commerce)</span></li><li><span className="req-number">2</span><span className="req-text">List 10 functional requirements</span></li><li><span className="req-number">3</span><span className="req-text">List 5 non-functional requirements with specific metrics</span></li><li><span className="req-number">4</span><span className="req-text">Prioritize using MoSCoW method</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Assignment</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span><span className="mobile-topic">{topic}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3><p>{concepts}</p></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav><div className="mobile-menu-footer"><div className="mobile-day-nav"><Link to="/hld/week/1/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/1/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back to Course</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2><p className="day-concepts">{concepts}</p></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<><span className="nav-label">{t.label}</span><span className="nav-count">1</span></>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/1/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/1/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><div className="header-left"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></div><div className="header-right"><span className="progress-indicator">Week {weekNum}, Day {dayNum}</span></div></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week1Day2;
