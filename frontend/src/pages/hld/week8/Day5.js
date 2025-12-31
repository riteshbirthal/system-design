import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week8Day5() {
  const weekNum = 8, dayNum = 5, topic = "Resilience Patterns", concepts = "Circuit breaker, bulkhead, retry, saga pattern";
  
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
    { id: 1, question: "What does a circuit breaker pattern do?", options: ["Encrypts data", "Prevents cascade failures by failing fast", "Balances load", "Caches responses"], correct: 1, explanation: "Circuit breaker prevents cascade failures by monitoring for failures and 'tripping' to fail fast when threshold exceeded." },
    { id: 2, question: "What are the states of a circuit breaker?", options: ["On/Off", "Closed/Open/Half-Open", "Active/Passive", "Running/Stopped"], correct: 1, explanation: "Circuit breaker has three states: Closed (normal), Open (failing fast), and Half-Open (testing recovery)." },
    { id: 3, question: "What is the bulkhead pattern?", options: ["Data encryption", "Isolating components to contain failures", "Message queuing", "Load balancing"], correct: 1, explanation: "Bulkhead pattern isolates components so failure in one doesn't sink the whole ship, like ship compartments." },
    { id: 4, question: "What is exponential backoff?", options: ["Linear retry delays", "Increasing delays between retries", "No retries", "Immediate retries"], correct: 1, explanation: "Exponential backoff increases the wait time between retries exponentially to reduce load on failing services." },
    { id: 5, question: "What is the Saga pattern used for?", options: ["Caching", "Managing distributed transactions", "Load balancing", "Service discovery"], correct: 1, explanation: "Saga pattern manages distributed transactions across services using choreography or orchestration." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Resilience Patterns</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Resilience Patterns</h1><div className="article-tags"><span className="tag">Circuit Breaker</span><span className="tag">Bulkhead</span><span className="tag">Retry</span><span className="tag">Saga</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Why Resilience Patterns?</h2>
        <p>In distributed systems, failures are inevitable. <strong>Resilience patterns</strong> help systems gracefully handle failures, prevent cascade effects, and recover automatically. These patterns are essential for building robust microservices.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Circuit Breaker</div>
            <div className="concept-card-description">Fail fast when downstream service is unavailable</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🚢</div>
            <div className="concept-card-title">Bulkhead</div>
            <div className="concept-card-description">Isolate failures to prevent system-wide impact</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Retry</div>
            <div className="concept-card-description">Automatically retry failed operations</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📜</div>
            <div className="concept-card-title">Saga</div>
            <div className="concept-card-description">Manage distributed transactions with compensation</div>
          </div>
        </div>

        <h2 className="md-h2">Circuit Breaker Pattern</h2>
        <div className="diagram-container">
          <div className="diagram-title">Circuit Breaker States</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">✅</span><span className="flow-node-label">CLOSED</span><span className="flow-node-sublabel">Normal Operation</span></div>
            </div>
            <div className="flow-arrow down">↓ Failures exceed threshold</div>
            <div className="flow-row">
              <div className="flow-node database" style={{background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'}}><span className="flow-node-icon">🚫</span><span className="flow-node-label">OPEN</span><span className="flow-node-sublabel">Fail Immediately</span></div>
            </div>
            <div className="flow-arrow down">↓ Timeout expires</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">🔍</span><span className="flow-node-label">HALF-OPEN</span><span className="flow-node-sublabel">Test Recovery</span></div>
            </div>
            <div className="flow-arrow down">↓ Success → CLOSED | Failure → OPEN</div>
          </div>
        </div>

        <h2 className="md-h2">Bulkhead Pattern</h2>
        <div className="diagram-container">
          <div className="diagram-title">Bulkhead Isolation</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>🏊 Thread Pool Isolation</h4>
              <ul>
                <li>Separate thread pools per dependency</li>
                <li>Failure in one pool doesn't affect others</li>
                <li>Limit concurrent calls</li>
                <li>Used by Hystrix</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>🔌 Connection Pool Isolation</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Separate connection pools per service</li>
                <li>→ Database connection limits</li>
                <li>→ Rate limiting per consumer</li>
                <li>→ Resource quotas</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Retry Pattern with Backoff</h2>
        <table className="comparison-table">
          <thead><tr><th>Strategy</th><th>Delay Pattern</th><th>Example</th><th>Use Case</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Immediate</td><td>No delay</td><td>Retry now</td><td>Transient network glitches</td></tr>
            <tr><td className="feature-name">Fixed Delay</td><td>Same interval</td><td>1s, 1s, 1s</td><td>Known recovery time</td></tr>
            <tr><td className="feature-name">Exponential</td><td>Doubles each time</td><td>1s, 2s, 4s, 8s</td><td>Overloaded services</td></tr>
            <tr><td className="feature-name">Exponential + Jitter</td><td>Random variance</td><td>1.2s, 2.7s, 5.1s</td><td>Prevent thundering herd</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Saga Pattern for Distributed Transactions</h2>
        <div className="diagram-container">
          <div className="diagram-title">Saga: Choreography vs Orchestration</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#8B5CF6'}}>
              <h4 style={{color: '#8B5CF6'}}>💃 Choreography</h4>
              <ul>
                <li>Services communicate via events</li>
                <li>No central coordinator</li>
                <li>Decoupled, scalable</li>
                <li>Harder to track/debug</li>
                <li>Example: Event-driven order processing</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#F59E0B'}}>
              <h4 style={{color: '#F59E0B'}}>🎭 Orchestration</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Central orchestrator coordinates</li>
                <li>→ Clear transaction flow</li>
                <li>→ Easier monitoring</li>
                <li>→ Single point of failure risk</li>
                <li>→ Example: Order saga orchestrator</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Implementation Tools</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">☕</div>
            <div className="step-content">
              <h4>Resilience4j (Java)</h4>
              <p>Lightweight fault tolerance library with circuit breaker, retry, rate limiter, bulkhead</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🟣</div>
            <div className="step-content">
              <h4>Polly (.NET)</h4>
              <p>.NET resilience library with fluent API for retry, circuit breaker, timeout, bulkhead</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🌀</div>
            <div className="step-content">
              <h4>Hystrix (Netflix - Deprecated)</h4>
              <p>Original inspiration for many patterns - use Resilience4j instead</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🔷</div>
            <div className="step-content">
              <h4>Service Mesh (Istio/Linkerd)</h4>
              <p>Infrastructure-level resilience - circuit breaker, retry without code changes</p>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Best Practices</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Always use exponential backoff with jitter for retries</li>
              <li>Set appropriate timeouts before circuit breaker trips</li>
              <li>Define compensating transactions for saga rollbacks</li>
              <li>Monitor circuit breaker state changes</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Circuit breaker prevents cascade failures</li>
              <li>Bulkhead isolates components like ship compartments</li>
              <li>Retry with exponential backoff handles transient failures</li>
              <li>Saga pattern manages distributed transactions</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Resilience Patterns Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Resilience Implementation</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design circuit breaker configuration for payment service (thresholds, timeouts)</span></li><li><span className="req-number">2</span><span className="req-text">Implement bulkhead pattern for isolating critical vs non-critical services</span></li><li><span className="req-number">3</span><span className="req-text">Design saga for e-commerce order: payment, inventory, shipping</span></li><li><span className="req-number">4</span><span className="req-text">Define compensating transactions for saga rollback scenarios</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/8/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/9/day/1" className="nav-link next">Week 9 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week8Day5;
