import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week12Day3() {
  const weekNum = 12, dayNum = 3, topic = "RabbitMQ & Exchanges", concepts = "AMQP protocol, exchanges, bindings, routing patterns";
  
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
    { id: 1, question: "What is an Exchange in RabbitMQ?", options: ["A queue", "Routes messages from producers to queues based on rules", "A consumer", "A protocol"], correct: 1, explanation: "An exchange receives messages from producers and routes them to queues based on bindings and routing keys." },
    { id: 2, question: "What does a Direct exchange do?", options: ["Broadcast to all", "Route based on exact routing key match", "Pattern matching", "Round robin"], correct: 1, explanation: "Direct exchange routes messages to queues where the binding key exactly matches the message's routing key." },
    { id: 3, question: "What is a Fanout exchange?", options: ["Routes by key", "Broadcasts to all bound queues", "Uses patterns", "Single queue only"], correct: 1, explanation: "Fanout exchange broadcasts messages to all queues bound to it, ignoring routing keys entirely." },
    { id: 4, question: "What wildcards does Topic exchange support?", options: ["* and #", "% and _", "? and *", "No wildcards"], correct: 0, explanation: "Topic exchange supports * (matches one word) and # (matches zero or more words) wildcards in routing patterns." },
    { id: 5, question: "What is message acknowledgment in RabbitMQ?", options: ["Encryption", "Consumer confirming message processed successfully", "Producer notification", "Queue creation"], correct: 1, explanation: "Acknowledgment is when consumer confirms successful processing, allowing RabbitMQ to remove the message from queue." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>RabbitMQ & Exchanges</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>RabbitMQ & Exchanges</h1><div className="article-tags"><span className="tag">RabbitMQ</span><span className="tag">AMQP</span><span className="tag">Exchanges</span><span className="tag">Routing</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">RabbitMQ Architecture</h2>
        <p><strong>RabbitMQ</strong> is a message broker implementing AMQP protocol. Messages flow from producers through exchanges to queues to consumers.</p>

        <div className="diagram-container">
          <div className="diagram-title">RabbitMQ Message Flow</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📤</span><span className="flow-node-label">Producer</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node loadbalancer"><span className="flow-node-icon">🔀</span><span className="flow-node-label">Exchange</span><span className="flow-node-sublabel">Routing rules</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node cache"><span className="flow-node-icon">📬</span><span className="flow-node-label">Queue</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server"><span className="flow-node-icon">📥</span><span className="flow-node-label">Consumer</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Exchange Types</h2>
        <table className="comparison-table">
          <thead><tr><th>Type</th><th>Routing Logic</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Direct</td><td>Exact routing key match</td><td>Task queues, specific routing</td></tr>
            <tr><td className="feature-name">Fanout</td><td>Broadcast to all bound queues</td><td>Notifications, broadcasting</td></tr>
            <tr><td className="feature-name">Topic</td><td>Pattern matching (* and #)</td><td>Selective routing by pattern</td></tr>
            <tr><td className="feature-name">Headers</td><td>Match message headers</td><td>Complex routing rules</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Topic Exchange Patterns</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">*</div><div className="step-content"><h4>Single Word Wildcard</h4><p>*.error matches log.error, app.error but NOT system.log.error</p></div></div>
          <div className="step-card"><div className="step-number">#</div><div className="step-content"><h4>Multi-Word Wildcard</h4><p>log.# matches log.error, log.warning, log.system.critical</p></div></div>
        </div>

        <h2 className="md-h2">Key Features</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">✅</div><div className="concept-card-title">Message ACK</div><div className="concept-card-description">Explicit acknowledgment ensures reliable delivery</div></div>
          <div className="concept-card"><div className="concept-card-icon">💾</div><div className="concept-card-title">Durability</div><div className="concept-card-description">Persistent queues and messages survive restarts</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔧</div><div className="concept-card-title">Plugins</div><div className="concept-card-description">Management UI, clustering, federation</div></div>
          <div className="concept-card"><div className="concept-card-icon">📊</div><div className="concept-card-title">Prefetch</div><div className="concept-card-description">QoS settings for fair message distribution</div></div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Exchanges route messages to queues via bindings</li>
              <li>Direct for exact match, Fanout for broadcast, Topic for patterns</li>
              <li>Always use manual ACK for reliability</li>
              <li>Set prefetch count for fair dispatch among consumers</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>RabbitMQ Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>RabbitMQ Routing Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design exchange topology for a logging system (errors to alert, all logs to archive)</span></li><li><span className="req-number">2</span><span className="req-text">Implement topic exchange patterns for multi-service event routing</span></li><li><span className="req-number">3</span><span className="req-text">Configure durability and acknowledgment for guaranteed delivery</span></li><li><span className="req-number">4</span><span className="req-text">Set up DLX (Dead Letter Exchange) for failed message handling</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/12/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/12/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week12Day3;
