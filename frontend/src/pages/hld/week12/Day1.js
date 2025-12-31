import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week12Day1() {
  const weekNum = 12, dayNum = 1, topic = "Message Queue Fundamentals", concepts = "Pub/Sub, Point-to-point, delivery guarantees, brokers";
  
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
    { id: 1, question: "What is a message queue?", options: ["A database type", "Asynchronous service-to-service communication mechanism", "A caching system", "A load balancer"], correct: 1, explanation: "A message queue enables asynchronous communication where producers send messages to a queue and consumers process them independently." },
    { id: 2, question: "What is the difference between Queue and Topic?", options: ["Same thing", "Queue: one consumer per message, Topic: multiple consumers", "Topic: one consumer, Queue: multiple", "Neither store messages"], correct: 1, explanation: "Queue (point-to-point): one message consumed by one consumer. Topic (pub/sub): one message delivered to all subscribers." },
    { id: 3, question: "What is 'at-least-once' delivery?", options: ["Messages may be lost", "Messages delivered at least once, may duplicate", "Exactly one delivery", "No guarantees"], correct: 1, explanation: "At-least-once ensures messages are delivered at least once but may be duplicated. Consumers must be idempotent." },
    { id: 4, question: "What is a Dead Letter Queue (DLQ)?", options: ["Deleted messages", "Queue for failed messages that exceed retry limits", "Archive queue", "Primary queue"], correct: 1, explanation: "A DLQ stores messages that couldn't be processed after multiple attempts, preventing blocking of the main queue." },
    { id: 5, question: "Why use message queues?", options: ["Only for emails", "Decoupling, async processing, load leveling, resilience", "Data storage", "User authentication"], correct: 1, explanation: "Message queues provide decoupling between services, enable async processing, smooth traffic spikes, and add resilience." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Message Queue Fundamentals</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Message Queue Fundamentals</h1><div className="article-tags"><span className="tag">Message Queue</span><span className="tag">Pub/Sub</span><span className="tag">Async</span><span className="tag">Decoupling</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What are Message Queues?</h2>
        <p>A <strong>message queue</strong> is an asynchronous service-to-service communication mechanism. Messages are stored in a queue until processed, decoupling producers from consumers.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">Decoupling</div>
            <div className="concept-card-description">Services don't need to know about each other</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⏳</div>
            <div className="concept-card-title">Async Processing</div>
            <div className="concept-card-description">Non-blocking operations, better responsiveness</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Load Leveling</div>
            <div className="concept-card-description">Handle traffic spikes gracefully</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">Resilience</div>
            <div className="concept-card-description">Messages persist even if consumers are down</div>
          </div>
        </div>

        <h2 className="md-h2">Basic Architecture</h2>
        <div className="diagram-container">
          <div className="diagram-title">Message Queue Components</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📤</span><span className="flow-node-label">Producer</span><span className="flow-node-sublabel">Creates messages</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node loadbalancer"><span className="flow-node-icon">📬</span><span className="flow-node-label">Message Broker</span><span className="flow-node-sublabel">Stores & Routes</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server"><span className="flow-node-icon">📥</span><span className="flow-node-label">Consumer</span><span className="flow-node-sublabel">Processes messages</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Messaging Patterns</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>📨 Point-to-Point (Queue)</h4>
            <ul>
              <li>One message → One consumer</li>
              <li>Competing consumers pattern</li>
              <li>Message removed after processing</li>
              <li>Load balancing built-in</li>
              <li>Best for: Task distribution, work queues</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>📢 Publish-Subscribe (Topic)</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ One message → All subscribers</li>
              <li>→ Fan-out pattern</li>
              <li>→ Each subscriber has own cursor</li>
              <li>→ Multiple consumers receive same event</li>
              <li>→ Best for: Notifications, event broadcasting</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Delivery Guarantees</h2>
        <table className="comparison-table">
          <thead><tr><th>Guarantee</th><th>Description</th><th>Trade-off</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">At-Most-Once</td><td>Message may be lost, never duplicated</td><td>Fast, possible data loss</td></tr>
            <tr><td className="feature-name">At-Least-Once</td><td>Message never lost, may duplicate</td><td>Requires idempotent consumers</td></tr>
            <tr><td className="feature-name">Exactly-Once</td><td>Message delivered exactly once</td><td>Complex, performance overhead</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Key Concepts</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">✓</div>
            <div className="step-content">
              <h4>Acknowledgment (ACK)</h4>
              <p>Consumer confirms message processed. Without ACK, message may be redelivered.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">💀</div>
            <div className="step-content">
              <h4>Dead Letter Queue (DLQ)</h4>
              <p>Failed messages after max retries go to DLQ for investigation.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">⏱️</div>
            <div className="step-content">
              <h4>Message TTL</h4>
              <p>Time-to-live expiration for messages to prevent queue buildup.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🔢</div>
            <div className="step-content">
              <h4>Message Ordering</h4>
              <p>FIFO vs best-effort. Ordering often limited to partition/shard level.</p>
            </div>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Design for Idempotency</h4>
            <p>With at-least-once delivery, consumers may receive duplicates. Design your handlers to be idempotent - processing the same message twice should produce the same result.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Message queues enable async, decoupled communication</li>
              <li>Queue = point-to-point, Topic = pub/sub</li>
              <li>At-least-once is most common (requires idempotency)</li>
              <li>Use DLQ for failed message handling</li>
              <li>Always implement proper acknowledgment</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Message Queues Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Message Queue Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design a notification system using message queues (email, SMS, push)</span></li><li><span className="req-number">2</span><span className="req-text">Compare when to use queue vs topic for different scenarios</span></li><li><span className="req-number">3</span><span className="req-text">Implement idempotent message handler with deduplication</span></li><li><span className="req-number">4</span><span className="req-text">Design DLQ strategy with alerting and manual retry</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/11/day/5" className="nav-link prev">&lt;&lt; Week 11</Link><Link to="/hld/week/12/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week12Day1;
