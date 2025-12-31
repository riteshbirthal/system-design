import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week5Day3() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 5, dayNum = 3, topic = "Message Queue Basics", concepts = "Pub/Sub, Queues, Producers, Consumers, Delivery Guarantees";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is the main advantage of asynchronous communication?", options: ["Faster response time", "Decoupling of services", "Less network traffic", "Simpler code"], correct: 1, explanation: "Async communication decouples services, allowing them to operate independently without blocking." },
    { id: 2, question: "In point-to-point messaging, how many consumers receive each message?", options: ["All consumers", "Only one consumer", "Two consumers", "Random number"], correct: 1, explanation: "In point-to-point, each message is delivered to exactly one consumer from the queue." },
    { id: 3, question: "What is 'at-least-once' delivery guarantee?", options: ["Messages never lost, may duplicate", "Messages may be lost", "Exactly one delivery", "No guarantees"], correct: 0, explanation: "At-least-once ensures messages are not lost but may be delivered multiple times." },
    { id: 4, question: "What does backpressure handling prevent?", options: ["Message loss", "Consumer overwhelming", "Network failure", "Queue deletion"], correct: 1, explanation: "Backpressure prevents consumers from being overwhelmed by controlling message flow rate." },
    { id: 5, question: "Which pattern allows multiple subscribers to receive the same message?", options: ["Point-to-point", "Request-response", "Pub/Sub", "Direct queue"], correct: 2, explanation: "Publish/Subscribe pattern broadcasts messages to all interested subscribers." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Message Queue Basics</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Message Queue Basics</h1><div className="article-tags"><span className="tag">Pub/Sub</span><span className="tag">Queues</span><span className="tag">Async</span><span className="tag">Delivery</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Synchronous vs Asynchronous Communication</h2>
        <p>Understanding the difference between sync and async communication is fundamental to designing distributed systems.</p>

        <div className="diagram-container">
          <div className="diagram-title">Communication Patterns</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
              <h4 style={{color: 'var(--color-primary)'}}>🔄 Synchronous</h4>
              <ul>
                <li>Request → Wait → Response</li>
                <li>Immediate feedback</li>
                <li>Tight coupling</li>
                <li>Blocking operations</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: 'var(--color-success)'}}>
              <h4 style={{color: 'var(--color-success)'}}>⚡ Asynchronous</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Send → Continue → Process later</li>
                <li>→ Non-blocking</li>
                <li>→ Loose coupling</li>
                <li>→ Better scalability</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Message Queue Fundamentals</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📤</div>
            <div className="concept-card-title">Producer</div>
            <div className="concept-card-description">Creates and sends messages to the queue</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📨</div>
            <div className="concept-card-title">Queue/Topic</div>
            <div className="concept-card-description">Stores messages until consumed</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📥</div>
            <div className="concept-card-title">Consumer</div>
            <div className="concept-card-description">Retrieves and processes messages</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔔</div>
            <div className="concept-card-title">Broker</div>
            <div className="concept-card-description">Manages queues and message routing</div>
          </div>
        </div>

        <h2 className="md-h2">Point-to-Point vs Pub/Sub</h2>
        <div className="diagram-container">
          <div className="diagram-title">Messaging Models</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📬</span><span className="flow-node-label">Point-to-Point</span><span className="flow-node-sublabel">One message → One consumer</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node dns"><span className="flow-node-icon">📢</span><span className="flow-node-label">Pub/Sub</span><span className="flow-node-sublabel">One message → Many subscribers</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Delivery Guarantees</h2>
        <table className="comparison-table">
          <thead><tr><th>Guarantee</th><th>Description</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">At-most-once</td><td>May lose messages, no duplicates</td><td>Logs, metrics</td></tr>
            <tr><td className="feature-name">At-least-once</td><td>No loss, may duplicate</td><td>Orders with idempotency</td></tr>
            <tr><td className="feature-name">Exactly-once</td><td>No loss, no duplicates</td><td>Financial transactions</td></tr>
          </tbody>
        </table>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Exactly-Once is Hard</h4>
            <p>True exactly-once delivery is extremely difficult in distributed systems. Most systems achieve it through idempotent consumers with at-least-once delivery.</p>
          </div>
        </div>

        <h2 className="md-h2">Message Ordering</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Global Ordering</h4>
              <p>All messages processed in exact send order. Limits throughput but guarantees sequence.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Partition Ordering</h4>
              <p>Order preserved within partitions. Allows parallelism while maintaining related message order.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>No Ordering</h4>
              <p>Messages processed in any order. Maximum throughput but no sequence guarantees.</p>
            </div>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Message queues enable async, decoupled communication</li>
              <li>Point-to-point: one consumer per message</li>
              <li>Pub/Sub: broadcast to multiple subscribers</li>
              <li>Choose delivery guarantees based on use case</li>
              <li>Message ordering trades throughput for consistency</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Message Queue Basics Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Notification System Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design a notification system using message queues</span></li><li><span className="req-number">2</span><span className="req-text">Implement pub/sub for event broadcasting</span></li><li><span className="req-number">3</span><span className="req-text">Handle different delivery preferences (email, SMS, push)</span></li><li><span className="req-number">4</span><span className="req-text">Ensure at-least-once delivery with idempotency</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/5/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/5/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week5Day3;
