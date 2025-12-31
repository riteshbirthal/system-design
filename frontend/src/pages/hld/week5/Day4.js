import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week5Day4() {
  const weekNum = 5, dayNum = 4, topic = "Apache Kafka Deep Dive", concepts = "Topics, Partitions, Consumer Groups, Offsets";
  
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
    { id: 1, question: "What is a Kafka topic?", options: ["A database table", "A category for messages", "A consumer group", "A broker node"], correct: 1, explanation: "A topic is a category/feed name to which messages are published. Similar to a table in a database." },
    { id: 2, question: "Why are Kafka topics partitioned?", options: ["For encryption", "For parallelism and scalability", "For compression", "For ordering"], correct: 1, explanation: "Partitions allow parallel consumption and horizontal scaling across multiple brokers." },
    { id: 3, question: "What is a consumer group?", options: ["Group of topics", "Group of consumers sharing work", "Group of brokers", "Group of partitions"], correct: 1, explanation: "A consumer group is a set of consumers that work together to consume a topic, with each partition assigned to one consumer." },
    { id: 4, question: "What does Kafka offset represent?", options: ["Message priority", "Position of message in partition", "Consumer count", "Partition size"], correct: 1, explanation: "Offset is a unique sequential ID that identifies each message's position within a partition." },
    { id: 5, question: "How does Kafka ensure durability?", options: ["In-memory only", "Replication across brokers", "No durability", "External backup"], correct: 1, explanation: "Kafka replicates partitions across multiple brokers to ensure messages survive broker failures." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Apache Kafka Deep Dive</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Apache Kafka Deep Dive</h1><div className="article-tags"><span className="tag">Kafka</span><span className="tag">Streaming</span><span className="tag">Partitions</span><span className="tag">Consumer Groups</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Apache Kafka?</h2>
        <p><strong>Apache Kafka</strong> is a distributed event streaming platform designed for high-throughput, fault-tolerant, real-time data pipelines and streaming applications.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">High Throughput</div>
            <div className="concept-card-description">Millions of messages per second</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔄</div>
            <div className="concept-card-title">Distributed</div>
            <div className="concept-card-description">Scales horizontally across clusters</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💾</div>
            <div className="concept-card-title">Durable</div>
            <div className="concept-card-description">Persists messages to disk with replication</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⏪</div>
            <div className="concept-card-title">Replayable</div>
            <div className="concept-card-description">Consumers can replay messages</div>
          </div>
        </div>

        <h2 className="md-h2">Kafka Architecture</h2>
        <div className="diagram-container">
          <div className="diagram-title">Kafka Cluster Overview</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📤</span><span className="flow-node-label">Producers</span><span className="flow-node-sublabel">Send messages</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">🗂️</span><span className="flow-node-label">Topic: Orders</span><span className="flow-node-sublabel">P0 | P1 | P2</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Broker 1</span></div>
              <div className="flow-node database"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Broker 2</span></div>
              <div className="flow-node database"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Broker 3</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node cache"><span className="flow-node-icon">📥</span><span className="flow-node-label">Consumer Group</span><span className="flow-node-sublabel">C1 | C2 | C3</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Topics and Partitions</h2>
        <table className="comparison-table">
          <thead><tr><th>Concept</th><th>Description</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Topic</td><td>Category for messages</td><td>Logical grouping of related events</td></tr>
            <tr><td className="feature-name">Partition</td><td>Ordered, immutable log</td><td>Parallelism and scalability</td></tr>
            <tr><td className="feature-name">Offset</td><td>Message position ID</td><td>Track consumption progress</td></tr>
            <tr><td className="feature-name">Replica</td><td>Partition copy</td><td>Fault tolerance</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Consumer Groups</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Load Distribution</h4>
              <p>Partitions are distributed among consumers in a group. Each partition is consumed by exactly one consumer.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Parallel Processing</h4>
              <p>More consumers = more parallelism (up to partition count). Consumer count should not exceed partitions.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Rebalancing</h4>
              <p>When consumers join/leave, partitions are automatically redistributed among remaining consumers.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Kafka vs RabbitMQ</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: 'var(--color-primary)'}}>
            <h4 style={{color: 'var(--color-primary)'}}>🚀 Kafka</h4>
            <ul>
              <li>Distributed log (append-only)</li>
              <li>Very high throughput (1M+ msg/sec)</li>
              <li>Message replay possible</li>
              <li>Best for event streaming</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: 'var(--color-warning)'}}>
            <h4 style={{color: 'var(--color-warning)'}}>🐰 RabbitMQ</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Traditional message broker</li>
              <li>→ Complex routing (exchanges)</li>
              <li>→ No replay (message deleted)</li>
              <li>→ Best for task queues</li>
            </ul>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Partition Key Strategy</h4>
            <p>Choose partition keys carefully! Messages with the same key go to the same partition, ensuring ordering. Use user_id for user-related events, order_id for order events.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Kafka is a distributed event streaming platform</li>
              <li>Topics are partitioned for parallelism</li>
              <li>Consumer groups enable load distribution</li>
              <li>Offsets track consumption progress</li>
              <li>Replication ensures fault tolerance</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Apache Kafka Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Event Sourcing with Kafka</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design an event sourcing system using Kafka</span></li><li><span className="req-number">2</span><span className="req-text">Define topics and partition strategy for an e-commerce platform</span></li><li><span className="req-number">3</span><span className="req-text">Implement consumer groups for order processing</span></li><li><span className="req-number">4</span><span className="req-text">Handle offset management and consumer rebalancing</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/5/day/3" className="nav-link prev">&lt;&lt; Day 3</Link><Link to="/hld/week/5/day/5" className="nav-link next">Day 5 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week5Day4;
