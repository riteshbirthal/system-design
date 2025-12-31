import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week12Day5() {
  const weekNum = 12, dayNum = 5, topic = "Choosing Message Queues", concepts = "Kafka vs RabbitMQ vs SQS, selection criteria, use cases";
  
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
    { id: 1, question: "When should you choose Kafka over RabbitMQ?", options: ["Complex routing", "High throughput event streaming with replay", "Request-reply pattern", "Low latency RPC"], correct: 1, explanation: "Kafka excels at high-throughput event streaming with replay capability, while RabbitMQ is better for complex routing." },
    { id: 2, question: "When is Amazon SQS the best choice?", options: ["Need replay", "AWS native, serverless, managed service", "Complex routing", "On-premise deployment"], correct: 1, explanation: "SQS is ideal for AWS-native workloads needing a managed, serverless queue without infrastructure management." },
    { id: 3, question: "Which supports message replay natively?", options: ["RabbitMQ", "SQS", "Kafka", "All of them"], correct: 2, explanation: "Kafka retains messages and allows consumers to replay from any offset. RabbitMQ deletes after consumption, SQS after visibility timeout." },
    { id: 4, question: "Which has the best complex routing support?", options: ["Kafka", "RabbitMQ with exchanges", "SQS", "Redis"], correct: 1, explanation: "RabbitMQ with its exchange types (direct, fanout, topic, headers) provides the most flexible routing options." },
    { id: 5, question: "For a simple work queue in AWS, which is easiest?", options: ["Self-managed Kafka", "Self-managed RabbitMQ", "Amazon SQS", "Custom solution"], correct: 2, explanation: "SQS is fully managed, requires no infrastructure, and integrates natively with Lambda for simple work queues." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Choosing Message Queues</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Choosing Message Queues</h1><div className="article-tags"><span className="tag">Kafka</span><span className="tag">RabbitMQ</span><span className="tag">SQS</span><span className="tag">Comparison</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Comparison Overview</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>Kafka</th><th>RabbitMQ</th><th>SQS</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Model</td><td>Distributed log</td><td>Message broker</td><td>Managed queue</td></tr>
            <tr><td className="feature-name">Throughput</td><td>Very High (M/s)</td><td>High (K/s)</td><td>High</td></tr>
            <tr><td className="feature-name">Replay</td><td>Yes (offset reset)</td><td>No</td><td>No</td></tr>
            <tr><td className="feature-name">Routing</td><td>Topic/partition</td><td>Complex (exchanges)</td><td>Simple</td></tr>
            <tr><td className="feature-name">Ordering</td><td>Per partition</td><td>Per queue</td><td>FIFO optional</td></tr>
            <tr><td className="feature-name">Managed</td><td>Confluent Cloud</td><td>CloudAMQP</td><td>AWS Native</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">When to Use Each</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">📊</div><div className="concept-card-title">Choose Kafka When</div><div className="concept-card-description">Event streaming, log aggregation, high throughput, need replay</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔀</div><div className="concept-card-title">Choose RabbitMQ When</div><div className="concept-card-description">Complex routing, RPC pattern, task queues, flexible protocols</div></div>
          <div className="concept-card"><div className="concept-card-icon">☁️</div><div className="concept-card-title">Choose SQS When</div><div className="concept-card-description">AWS native, serverless, managed service, simple queuing</div></div>
        </div>

        <h2 className="md-h2">Decision Tree</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">?</div><div className="step-content"><h4>Need message replay?</h4><p>Yes → Kafka or Pulsar</p></div></div>
          <div className="step-card"><div className="step-number">?</div><div className="step-content"><h4>Complex routing needed?</h4><p>Yes → RabbitMQ</p></div></div>
          <div className="step-card"><div className="step-number">?</div><div className="step-content"><h4>AWS native, serverless?</h4><p>Yes → SQS/SNS</p></div></div>
          <div className="step-card"><div className="step-number">?</div><div className="step-content"><h4>Ultra-low latency?</h4><p>Yes → Redis Streams</p></div></div>
        </div>

        <h2 className="md-h2">Use Case Examples</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>Event Streaming (Kafka)</h4>
            <ul>
              <li>Real-time analytics pipeline</li>
              <li>Log aggregation from services</li>
              <li>Event sourcing implementation</li>
              <li>Change data capture (CDC)</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>Task Queues (RabbitMQ/SQS)</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Email notification sending</li>
              <li>→ Image/video processing</li>
              <li>→ Order fulfillment workflow</li>
              <li>→ Background job processing</li>
            </ul>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Start Simple</h4>
            <p>Don't over-engineer. If SQS meets your needs in AWS, use it. Only adopt Kafka when you genuinely need its capabilities - it adds operational complexity.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Kafka: Event streaming, replay, very high throughput</li>
              <li>RabbitMQ: Complex routing, traditional messaging</li>
              <li>SQS: AWS managed, serverless integration</li>
              <li>Consider operational complexity when choosing</li>
              <li>You can use multiple systems for different use cases</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>MQ Selection Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Message Queue Architecture Review</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare Kafka vs RabbitMQ for your company's use case</span></li><li><span className="req-number">2</span><span className="req-text">Design messaging architecture for an e-commerce platform</span></li><li><span className="req-number">3</span><span className="req-text">Evaluate managed vs self-hosted options with cost analysis</span></li><li><span className="req-number">4</span><span className="req-text">Document migration strategy from one MQ to another</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/12/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/13/day/1" className="nav-link next">Week 13 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week12Day5;
