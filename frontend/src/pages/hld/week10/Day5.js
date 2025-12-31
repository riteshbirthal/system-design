import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week10Day5() {
  const weekNum = 10, dayNum = 5, topic = "OpenTelemetry & Observability Tools", concepts = "OTel, Prometheus, Grafana, unified observability";
  
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
    { id: 1, question: "What is OpenTelemetry?", options: ["Database", "Open-source observability framework", "Message queue", "Load balancer"], correct: 1, explanation: "OpenTelemetry is a vendor-neutral observability framework for metrics, logs, and traces instrumentation." },
    { id: 2, question: "What does the OTel Collector do?", options: ["Store data", "Receive, process, and export telemetry", "Generate alerts", "Create dashboards"], correct: 1, explanation: "OTel Collector receives telemetry, processes it, and exports to various backends (Jaeger, Prometheus, etc.)." },
    { id: 3, question: "What is Prometheus?", options: ["Log aggregator", "Pull-based metrics monitoring system", "Tracing tool", "Message queue"], correct: 1, explanation: "Prometheus is a pull-based metrics system with time-series database and PromQL query language." },
    { id: 4, question: "What is Grafana used for?", options: ["Data storage", "Visualization dashboards", "Log collection", "Tracing"], correct: 1, explanation: "Grafana is a visualization platform for creating dashboards from various data sources." },
    { id: 5, question: "What is the benefit of OpenTelemetry?", options: ["Vendor lock-in", "Vendor-neutral, switch backends easily", "Only works with one tool", "No auto-instrumentation"], correct: 1, explanation: "OTel is vendor-neutral - instrument once, export to any backend. Future-proof your observability." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>OpenTelemetry & Observability Tools</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>OpenTelemetry & Observability Tools</h1><div className="article-tags"><span className="tag">OpenTelemetry</span><span className="tag">Prometheus</span><span className="tag">Grafana</span><span className="tag">Tools</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is OpenTelemetry?</h2>
        <p><strong>OpenTelemetry (OTel)</strong> is a CNCF project providing vendor-neutral APIs, SDKs, and tools for observability. It unifies metrics, logs, and traces instrumentation with a single standard.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📚</div>
            <div className="concept-card-title">API</div>
            <div className="concept-card-description">Interfaces for instrumentation, language-specific implementations</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔧</div>
            <div className="concept-card-title">SDK</div>
            <div className="concept-card-description">Implementation with sampling, processing, configuration</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📦</div>
            <div className="concept-card-title">Collector</div>
            <div className="concept-card-description">Agent for receiving, processing, exporting telemetry</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📤</div>
            <div className="concept-card-title">Exporters</div>
            <div className="concept-card-description">Send data to backends (Jaeger, Prometheus, Datadog)</div>
          </div>
        </div>

        <h2 className="md-h2">OTel Collector Architecture</h2>
        <div className="diagram-container">
          <div className="diagram-title">Collector Pipeline</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📱</span><span className="flow-node-label">Applications</span><span className="flow-node-sublabel">OTel SDK</span></div>
            </div>
            <div className="flow-arrow down">↓ OTLP</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">📥</span><span className="flow-node-label">Receivers</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">⚙️</span><span className="flow-node-label">Processors</span></div>
              <div className="flow-node database"><span className="flow-node-icon">📤</span><span className="flow-node-label">Exporters</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📊</span><span className="flow-node-label">Prometheus</span></div>
              <div className="flow-node client"><span className="flow-node-icon">🔗</span><span className="flow-node-label">Jaeger</span></div>
              <div className="flow-node client"><span className="flow-node-icon">📝</span><span className="flow-node-label">Loki</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Observability Tools Ecosystem</h2>
        <table className="comparison-table">
          <thead><tr><th>Category</th><th>Tool</th><th>Type</th><th>Key Features</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Metrics</td><td>Prometheus</td><td>Open Source</td><td>Pull-based, PromQL, alerting</td></tr>
            <tr><td className="feature-name">Metrics</td><td>Victoria Metrics</td><td>Open Source</td><td>Prometheus-compatible, efficient</td></tr>
            <tr><td className="feature-name">Logs</td><td>Loki</td><td>Open Source</td><td>Like Prometheus for logs</td></tr>
            <tr><td className="feature-name">Logs</td><td>ELK Stack</td><td>Open Source</td><td>Full-text search, powerful</td></tr>
            <tr><td className="feature-name">Tracing</td><td>Jaeger</td><td>Open Source</td><td>CNCF, OTel native</td></tr>
            <tr><td className="feature-name">Visualization</td><td>Grafana</td><td>Open Source</td><td>Multi-source dashboards</td></tr>
            <tr><td className="feature-name">Full Stack</td><td>Datadog</td><td>Commercial</td><td>Unified, easy setup</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Why OpenTelemetry?</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">🔄</div>
            <div className="step-content">
              <h4>Vendor Neutral</h4>
              <p>Instrument once, export to any backend. Switch vendors without code changes.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🌐</div>
            <div className="step-content">
              <h4>Unified Standard</h4>
              <p>Single API for metrics, logs, traces. Consistent across all languages.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🤖</div>
            <div className="step-content">
              <h4>Auto-Instrumentation</h4>
              <p>Automatic instrumentation for common frameworks with minimal code.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🔮</div>
            <div className="step-content">
              <h4>Future-Proof</h4>
              <p>CNCF project with wide industry adoption. The emerging standard.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Production Readiness Checklist</h2>
        <div className="info-box tip">
          <div className="info-box-icon">✅</div>
          <div className="info-box-content">
            <h4>Before Going Live</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Service emits metrics (RED/Golden Signals)</li>
              <li>Structured logging with correlation IDs</li>
              <li>Distributed tracing enabled</li>
              <li>Dashboards created</li>
              <li>Alerts configured (SLO-based)</li>
              <li>Runbooks documented</li>
              <li>On-call rotation set up</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>OpenTelemetry is the future of observability instrumentation</li>
              <li>Use Collector for flexible data pipeline</li>
              <li>Combine Prometheus + Grafana + Jaeger/Loki</li>
              <li>Instrument from day one, not as afterthought</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Observability Tools Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Observability Stack Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design observability stack using OpenTelemetry + open source tools</span></li><li><span className="req-number">2</span><span className="req-text">Configure OTel Collector pipeline for metrics, logs, traces</span></li><li><span className="req-number">3</span><span className="req-text">Create Grafana dashboard with Golden Signals</span></li><li><span className="req-number">4</span><span className="req-text">Estimate infrastructure and cost for 100-service platform</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/10/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/11/day/1" className="nav-link next">Week 11 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week10Day5;
