import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week12Day4() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 12, dayNum = 4, topic = "Event-Driven Patterns", concepts = "Event sourcing, CQRS, Saga pattern, transactional outbox";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is Event Sourcing?", options: ["Caching events", "Storing state as sequence of events rather than current state", "Event logging only", "Database backup"], correct: 1, explanation: "Event sourcing stores all changes as immutable events. Current state is derived by replaying events." },
    { id: 2, question: "What does CQRS stand for?", options: ["Command Query Responsibility Segregation", "Create Query Read Store", "Central Query Response System", "Command Queue Response Service"], correct: 0, explanation: "CQRS separates read and write operations into different models for optimized performance." },
    { id: 3, question: "What is the Saga pattern used for?", options: ["Data validation", "Managing distributed transactions across services", "Caching", "Load balancing"], correct: 1, explanation: "Saga manages distributed transactions by coordinating a series of local transactions with compensating actions for rollback." },
    { id: 4, question: "What is the Transactional Outbox pattern?", options: ["External inbox", "Write events and data in same transaction, then publish", "Message encryption", "Queue backup"], correct: 1, explanation: "Outbox pattern writes to database and outbox table atomically, then a separate process publishes to message queue." },
    { id: 5, question: "What are compensating transactions?", options: ["Payment processing", "Actions that undo the effect of previous transactions on failure", "Data compression", "Cache invalidation"], correct: 1, explanation: "Compensating transactions undo effects of previous steps when a saga fails, enabling eventual rollback." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Event-Driven Patterns</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Event-Driven Patterns</h1><div className="article-tags"><span className="tag">Event Sourcing</span><span className="tag">CQRS</span><span className="tag">Saga</span><span className="tag">Outbox</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Event Sourcing</h2>
        <p>Instead of storing current state, <strong>event sourcing</strong> stores all state changes as a sequence of immutable events. Current state is derived by replaying events.</p>

        <div className="diagram-container">
          <div className="diagram-title">Traditional vs Event Sourcing</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#EF4444'}}>
              <h4 style={{color: '#EF4444'}}>Traditional: Current State</h4>
              <ul>
                <li>User: balance = $100</li>
                <li>Previous states lost</li>
                <li>No audit trail</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>Event Sourcing: Event Log</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ AccountCreated: $0</li>
                <li>→ Deposited: +$150</li>
                <li>→ Withdrawn: -$50</li>
                <li>→ Current: $100 (derived)</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">CQRS (Command Query Responsibility Segregation)</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">✍️</div><div className="concept-card-title">Commands (Write)</div><div className="concept-card-description">Optimized for writes, validation, business logic</div></div>
          <div className="concept-card"><div className="concept-card-icon">📖</div><div className="concept-card-title">Queries (Read)</div><div className="concept-card-description">Optimized for reads, denormalized, fast lookups</div></div>
        </div>

        <h2 className="md-h2">Saga Pattern</h2>
        <p>Manages distributed transactions as a series of local transactions. Each step has a compensating action for rollback.</p>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><div className="step-content"><h4>Create Order</h4><p>Order service creates order → Compensate: Cancel order</p></div></div>
          <div className="step-card"><div className="step-number">2</div><div className="step-content"><h4>Reserve Inventory</h4><p>Inventory service reserves items → Compensate: Release inventory</p></div></div>
          <div className="step-card"><div className="step-number">3</div><div className="step-content"><h4>Process Payment</h4><p>Payment service charges → Compensate: Refund payment</p></div></div>
          <div className="step-card"><div className="step-number">4</div><div className="step-content"><h4>Ship Order</h4><p>Fulfillment ships order (final step)</p></div></div>
        </div>

        <h2 className="md-h2">Transactional Outbox</h2>
        <div className="diagram-container">
          <div className="diagram-title">Outbox Pattern Flow</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">1️⃣</span><span className="flow-node-label">DB Transaction</span><span className="flow-node-sublabel">Write data + outbox</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node cache"><span className="flow-node-icon">2️⃣</span><span className="flow-node-label">Relay Process</span><span className="flow-node-sublabel">Read outbox</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node database"><span className="flow-node-icon">3️⃣</span><span className="flow-node-label">Message Queue</span><span className="flow-node-sublabel">Publish events</span></div>
            </div>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Event sourcing provides complete audit trail and replay</li>
              <li>CQRS optimizes read and write models separately</li>
              <li>Saga handles distributed transactions with compensation</li>
              <li>Outbox pattern ensures atomic DB + messaging</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Event Patterns Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Event-Driven Order System</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design event-sourced order management with event replay</span></li><li><span className="req-number">2</span><span className="req-text">Implement saga for order → inventory → payment flow</span></li><li><span className="req-number">3</span><span className="req-text">Define compensating actions for each saga step</span></li><li><span className="req-number">4</span><span className="req-text">Use outbox pattern for reliable event publishing</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/12/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/12/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week12Day4;
