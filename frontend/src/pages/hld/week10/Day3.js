import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week10Day3() {
  const weekNum = 10, dayNum = 3, topic = "Logging & Distributed Tracing", concepts = "Structured logging, ELK stack, Jaeger, trace context propagation";
  
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
    { id: 1, question: "What is structured logging?", options: ["Plain text logs", "JSON-formatted logs with consistent fields", "Binary logs", "Encrypted logs"], correct: 1, explanation: "Structured logging uses consistent format (JSON) with defined fields for easier parsing and querying." },
    { id: 2, question: "What is a correlation ID?", options: ["Database index", "Unique identifier passed through all services for a request", "User ID", "Session ID"], correct: 1, explanation: "Correlation ID (trace ID) links all logs and spans for a single request across services." },
    { id: 3, question: "What is a span in distributed tracing?", options: ["Log entry", "Single operation within a trace", "Database query", "API response"], correct: 1, explanation: "A span represents a single operation with start time, duration, and parent-child relationships." },
    { id: 4, question: "What is head-based sampling?", options: ["Sampling decision made after trace completes", "Sampling decision made at trace start", "No sampling", "Manual selection"], correct: 1, explanation: "Head-based sampling decides at trace start whether to sample (e.g., 1% of requests)." },
    { id: 5, question: "What header propagates trace context (W3C)?", options: ["X-Trace-ID", "traceparent", "Authorization", "Content-Type"], correct: 1, explanation: "W3C Trace Context uses 'traceparent' header for trace ID, span ID, and flags." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Logging & Distributed Tracing</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Logging & Distributed Tracing</h1><div className="article-tags"><span className="tag">Logging</span><span className="tag">Tracing</span><span className="tag">ELK</span><span className="tag">Jaeger</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Structured vs Unstructured Logs</h2>
        <div className="diagram-container">
          <div className="diagram-title">Log Format Comparison</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#EF4444'}}>
              <h4 style={{color: '#EF4444'}}>❌ Unstructured</h4>
              <code style={{color: '#CBD5E1', fontSize: '0.85rem'}}>2025-12-30 ERROR Failed to process order 12345 for user john@example.com</code>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>✅ Structured (JSON)</h4>
              <pre style={{color: '#CBD5E1', fontSize: '0.8rem', margin: 0}}>{`{
  "timestamp": "2025-12-30T10:15:23Z",
  "level": "ERROR",
  "message": "Failed to process order",
  "order_id": "12345",
  "trace_id": "abc123xyz"
}`}</pre>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Log Levels</h2>
        <table className="comparison-table">
          <thead><tr><th>Level</th><th>When to Use</th><th>Production?</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">TRACE</td><td>Most detailed, method entry/exit</td><td>Disabled</td></tr>
            <tr><td className="feature-name">DEBUG</td><td>Diagnostic info for developers</td><td>Disabled</td></tr>
            <tr><td className="feature-name">INFO</td><td>Normal operation events</td><td className="check">✓</td></tr>
            <tr><td className="feature-name">WARN</td><td>Potentially harmful situations</td><td className="check">✓</td></tr>
            <tr><td className="feature-name">ERROR</td><td>Error events, app continues</td><td className="check">✓</td></tr>
            <tr><td className="feature-name">FATAL</td><td>Severe errors causing shutdown</td><td className="check">✓</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Distributed Tracing Concepts</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔗</div>
            <div className="concept-card-title">Trace</div>
            <div className="concept-card-description">End-to-end journey of a request, identified by trace ID</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📦</div>
            <div className="concept-card-title">Span</div>
            <div className="concept-card-description">Single operation with timing, parent-child relationships</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Context Propagation</div>
            <div className="concept-card-description">Passing trace context between services via headers</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Sampling</div>
            <div className="concept-card-description">Selecting which traces to store (head vs tail)</div>
          </div>
        </div>

        <h2 className="md-h2">Trace Structure Example</h2>
        <div className="diagram-container">
          <div className="diagram-title">Request Flow Across Services</div>
          <div className="code-block" data-language="trace">
            <code>
{`Trace: abc123
├── Span: API Gateway (100ms)
│   ├── Span: Auth Service (20ms)
│   └── Span: Order Service (70ms)
│       ├── Span: Database Query (30ms)
│       └── Span: Payment Service (35ms)
│           └── Span: External Payment API (30ms)`}
            </code>
          </div>
        </div>

        <h2 className="md-h2">Logging & Tracing Tools</h2>
        <table className="comparison-table">
          <thead><tr><th>Category</th><th>Tool</th><th>Key Features</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Log Aggregation</td><td>ELK Stack</td><td>Elasticsearch, Logstash, Kibana</td></tr>
            <tr><td className="feature-name">Log Aggregation</td><td>Loki + Grafana</td><td>Like Prometheus for logs, cost-effective</td></tr>
            <tr><td className="feature-name">Tracing</td><td>Jaeger</td><td>CNCF, OpenTelemetry compatible</td></tr>
            <tr><td className="feature-name">Tracing</td><td>Zipkin</td><td>Lightweight, wide language support</td></tr>
            <tr><td className="feature-name">Full Platform</td><td>Datadog/New Relic</td><td>Unified metrics, logs, traces</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Sampling Strategies</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Head-Based Sampling</h4>
              <p>Decision at trace start (e.g., 1% random). Simple but may miss interesting traces.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Tail-Based Sampling</h4>
              <p>Decision after trace completes. Keep errors, slow requests. Requires buffering.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Priority Sampling</h4>
              <p>Always sample certain types: errors, slow requests, specific users.</p>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Logging Best Practices</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Use structured logging (JSON)</li>
              <li>Include correlation/trace IDs in every log</li>
              <li>Never log sensitive data (passwords, PII, tokens)</li>
              <li>Use consistent timestamp format (ISO 8601)</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Structured logs enable better querying</li>
              <li>Correlation IDs link logs across services</li>
              <li>Traces show request flow and latency breakdown</li>
              <li>Sample appropriately to manage costs</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Logging & Tracing Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Logging & Tracing Setup</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design structured log format for microservices with correlation IDs</span></li><li><span className="req-number">2</span><span className="req-text">Set up log aggregation architecture (ELK or Loki)</span></li><li><span className="req-number">3</span><span className="req-text">Implement distributed tracing with sampling strategy</span></li><li><span className="req-number">4</span><span className="req-text">Define log retention policy balancing cost and investigation needs</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/10/day/2" className="nav-link prev">&lt;&lt; Day 2</Link><Link to="/hld/week/10/day/4" className="nav-link next">Day 4 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week10Day3;
