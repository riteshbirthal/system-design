import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week5Day5() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 5, dayNum = 5, topic = "Queue Patterns & Best Practices", concepts = "DLQ, Retry, Idempotency, Circuit Breaker";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is a Dead Letter Queue (DLQ)?", options: ["Queue for deleted messages", "Queue for failed messages", "Encrypted queue", "Backup queue"], correct: 1, explanation: "A DLQ stores messages that couldn't be processed after multiple retry attempts for later analysis." },
    { id: 2, question: "Why is idempotency important for consumers?", options: ["Faster processing", "Handle duplicate messages safely", "Better security", "Less memory usage"], correct: 1, explanation: "Idempotent consumers can process the same message multiple times without side effects, crucial for at-least-once delivery." },
    { id: 3, question: "What is exponential backoff?", options: ["Linear retry delay", "Increasing retry delay", "No delay retry", "Random delay"], correct: 1, explanation: "Exponential backoff increases delay between retries (1s, 2s, 4s, 8s...) to avoid overwhelming services." },
    { id: 4, question: "When does a circuit breaker open?", options: ["On first failure", "After N consecutive failures", "Never", "Randomly"], correct: 1, explanation: "Circuit breaker opens after detecting N consecutive failures, preventing further attempts until service recovers." },
    { id: 5, question: "What should you monitor in message queues?", options: ["Only errors", "Queue depth and consumer lag", "Nothing", "Only throughput"], correct: 1, explanation: "Monitor queue depth, consumer lag, processing time, and error rates for healthy queue operation." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Queue Patterns & Best Practices</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Queue Patterns & Best Practices</h1><div className="article-tags"><span className="tag">DLQ</span><span className="tag">Retry</span><span className="tag">Idempotency</span><span className="tag">Monitoring</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Dead Letter Queue (DLQ)</h2>
        <p>A <strong>Dead Letter Queue</strong> is a special queue that stores messages that fail to process after multiple retry attempts, allowing for later analysis and reprocessing.</p>

        <div className="diagram-container">
          <div className="diagram-title">Dead Letter Queue Pattern</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📤</span><span className="flow-node-label">Producer</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node cache"><span className="flow-node-icon">📨</span><span className="flow-node-label">Main Queue</span></div>
              <div className="flow-arrow">→</div>
              <div className="flow-node server"><span className="flow-node-icon">📥</span><span className="flow-node-label">Consumer</span></div>
            </div>
            <div className="flow-arrow down">↓ Failed</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">💀</span><span className="flow-node-label">Dead Letter Queue</span><span className="flow-node-sublabel">Manual review/retry</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Retry Strategies</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Immediate Retry</h4>
              <p>Retry immediately on failure (max N times). Simple but can overwhelm failing services.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Exponential Backoff</h4>
              <p>Wait 1s → 2s → 4s → 8s between retries. Gives services time to recover.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Exponential + Jitter</h4>
              <p>Add random delay to prevent thundering herd when multiple consumers retry simultaneously.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Idempotent Consumers</h2>
        <p>An <strong>idempotent</strong> operation produces the same result regardless of how many times it's executed. Critical for handling message duplicates.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔑</div>
            <div className="concept-card-title">Idempotency Key</div>
            <div className="concept-card-description">Unique ID for each message to detect duplicates</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💾</div>
            <div className="concept-card-title">Processed Store</div>
            <div className="concept-card-description">Track processed message IDs in database/cache</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Upsert Operations</div>
            <div className="concept-card-description">Use upserts instead of inserts for natural idempotency</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⏰</div>
            <div className="concept-card-title">TTL Cleanup</div>
            <div className="concept-card-description">Expire old idempotency records to save storage</div>
          </div>
        </div>

        <h2 className="md-h2">Circuit Breaker Pattern</h2>
        <table className="comparison-table">
          <thead><tr><th>State</th><th>Behavior</th><th>Transition</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">🟢 Closed</td><td>Normal operation, requests pass through</td><td>Opens after N failures</td></tr>
            <tr><td className="feature-name">🔴 Open</td><td>Requests fail immediately, no processing</td><td>Half-open after timeout</td></tr>
            <tr><td className="feature-name">🟡 Half-Open</td><td>Allow limited requests to test recovery</td><td>Close on success, open on failure</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Best Practices</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-success)'}}>
            <h4 style={{color: 'var(--color-success)'}}>✅ Do</h4>
            <ul>
              <li>Make consumers idempotent</li>
              <li>Use message acknowledgments</li>
              <li>Implement dead letter queues</li>
              <li>Monitor queue depth & lag</li>
              <li>Set appropriate message TTL</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-error)'}}>
            <h4 style={{color: 'var(--color-error)'}}>❌ Don't</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Assume messages arrive once</li>
              <li>→ Ignore failed messages</li>
              <li>→ Retry infinitely without backoff</li>
              <li>→ Process without acknowledgment</li>
              <li>→ Skip monitoring and alerting</li>
            </ul>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Correlation IDs</h4>
            <p>Include correlation IDs in messages to trace requests across services. Essential for debugging distributed systems and understanding message flow.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Use DLQ to capture failed messages for analysis</li>
              <li>Exponential backoff with jitter for retries</li>
              <li>Always implement idempotent consumers</li>
              <li>Circuit breaker prevents cascading failures</li>
              <li>Monitor queue depth, lag, and error rates</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Queue Patterns Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Fault-Tolerant Order Pipeline</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design order processing pipeline with dead letter queue</span></li><li><span className="req-number">2</span><span className="req-text">Implement exponential backoff retry strategy</span></li><li><span className="req-number">3</span><span className="req-text">Add idempotency to order consumer using order_id</span></li><li><span className="req-number">4</span><span className="req-text">Implement circuit breaker for external payment service</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/5/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/6/day/1" className="nav-link next">Week 6 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week5Day5;
