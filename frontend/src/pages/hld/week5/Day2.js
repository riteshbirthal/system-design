import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week5Day2() {
  const weekNum = 5, dayNum = 2, topic = "Message Queues", concepts = "Async processing, Pub/Sub, Kafka, RabbitMQ";
  
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
    { id: 1, question: "What is a message queue?", options: ["Database", "Async communication between services", "Load balancer", "Cache"], correct: 1, explanation: "Message queues enable asynchronous communication by storing messages until consumers process them." },
    { id: 2, question: "Point-to-point messaging means?", options: ["Multiple consumers receive same message", "One message goes to one consumer", "Broadcast to all", "No queuing"], correct: 1, explanation: "Point-to-point: each message is consumed by exactly one consumer." },
    { id: 3, question: "Pub/Sub pattern allows?", options: ["Only one subscriber", "Multiple subscribers to receive same message", "No publishers", "Synchronous only"], correct: 1, explanation: "Publish/Subscribe allows multiple subscribers to receive copies of the same published message." },
    { id: 4, question: "Kafka is best for?", options: ["Simple task queues", "High-throughput event streaming", "Request-response", "Caching"], correct: 1, explanation: "Kafka excels at high-throughput, distributed event streaming with log-based storage." },
    { id: 5, question: "Dead letter queue holds?", options: ["Successful messages", "Messages that failed processing", "Cached messages", "Encrypted messages"], correct: 1, explanation: "Dead letter queues store messages that couldn't be processed after multiple retries." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Message Queues</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Message Queues</h1><div className="article-tags"><span className="tag">Queue</span><span className="tag">Async</span><span className="tag">Kafka</span><span className="tag">RabbitMQ</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is a Message Queue?</h2>
        <p>A <strong>message queue</strong> is middleware that enables asynchronous communication between services by storing messages until they are processed.</p>

        <div className="diagram-container">
          <div className="diagram-title">Message Queue Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📤</span><span className="flow-node-label">Producer</span><span className="flow-node-sublabel">Sends messages</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node cache"><span className="flow-node-icon">📨</span><span className="flow-node-label">Message Queue</span><span className="flow-node-sublabel">Stores & delivers</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server"><span className="flow-node-icon">📥</span><span className="flow-node-label">Consumer</span><span className="flow-node-sublabel">Processes messages</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Why Use Message Queues?</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⏱️</div>
            <div className="concept-card-title">Async Processing</div>
            <div className="concept-card-description">Decouple operations that don't need immediate response</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Load Leveling</div>
            <div className="concept-card-description">Buffer traffic spikes, process at steady rate</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">Decoupling</div>
            <div className="concept-card-description">Services communicate without direct dependencies</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">Reliability</div>
            <div className="concept-card-description">Messages persist until processed, surviving failures</div>
          </div>
        </div>

        <h2 className="md-h2">Messaging Patterns</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
            <h4 style={{color: 'var(--color-primary)'}}>📬 Point-to-Point</h4>
            <ul>
              <li>One message → one consumer</li>
              <li>Message removed after consumption</li>
              <li>Task distribution (work queues)</li>
              <li>Example: Order processing</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-secondary)'}}>
            <h4 style={{color: 'var(--color-secondary)'}}>📢 Publish/Subscribe</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ One message → many subscribers</li>
              <li>→ Each subscriber gets a copy</li>
              <li>→ Event broadcasting</li>
              <li>→ Example: Notifications</li>
            </ul>
          </div>
        </div>

        <h2 className="md-h2">Queue Technologies Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>RabbitMQ</th><th>Kafka</th><th>AWS SQS</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Type</td><td>Traditional queue</td><td>Distributed log</td><td>Managed queue</td></tr>
            <tr><td className="feature-name">Throughput</td><td>10K-50K msg/sec</td><td>1M+ msg/sec</td><td>Variable</td></tr>
            <tr><td className="feature-name">Message Retention</td><td>Until consumed</td><td>Configurable (days)</td><td>Up to 14 days</td></tr>
            <tr><td className="feature-name">Ordering</td><td>Per queue</td><td>Per partition</td><td>FIFO optional</td></tr>
            <tr><td className="feature-name">Best For</td><td>Complex routing</td><td>Event streaming</td><td>Simple queues</td></tr>
          </tbody>
        </table>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>When to Use Each</h4>
            <p><strong>RabbitMQ:</strong> Complex routing, multiple protocols, traditional messaging<br/>
            <strong>Kafka:</strong> High-throughput event streaming, log aggregation, replay<br/>
            <strong>SQS:</strong> Simple queues in AWS, serverless integration</p>
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
              <li>Kafka for high-throughput streaming, RabbitMQ for routing</li>
              <li>Dead letter queues handle failed messages</li>
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

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Message Queue Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Set up RabbitMQ or Redis for message queuing</span></li><li><span className="req-number">2</span><span className="req-text">Implement producer sending 100 messages</span></li><li><span className="req-number">3</span><span className="req-text">Implement consumer processing messages with delay</span></li><li><span className="req-number">4</span><span className="req-text">Handle failures with dead letter queue</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/5/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/5/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week5Day2;
