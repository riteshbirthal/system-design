import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week12Day2() {
  const weekNum = 12, dayNum = 2, topic = "Apache Kafka Deep Dive", concepts = "Topics, partitions, consumers, exactly-once semantics";
  
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
    { id: 1, question: "What is a Kafka partition?", options: ["A database table", "An ordered, immutable sequence of messages", "A consumer group", "A broker"], correct: 1, explanation: "A partition is an ordered, immutable sequence of messages. It's the unit of parallelism in Kafka." },
    { id: 2, question: "How do consumer groups work in Kafka?", options: ["All consumers get all messages", "Each partition consumed by one consumer in the group", "Random distribution", "No grouping"], correct: 1, explanation: "In a consumer group, each partition is consumed by exactly one consumer. This enables parallel processing and load balancing." },
    { id: 3, question: "What is an offset in Kafka?", options: ["Time delay", "Unique ID for a message within a partition", "Server address", "Partition count"], correct: 1, explanation: "An offset is a unique, sequential ID that identifies a message's position within a partition." },
    { id: 4, question: "How does Kafka achieve durability?", options: ["In-memory only", "Replication across multiple brokers", "Single disk write", "Client-side storage"], correct: 1, explanation: "Kafka replicates partitions across multiple brokers (configurable replication factor) for durability." },
    { id: 5, question: "What is the ISR in Kafka?", options: ["Internal Service Registry", "In-Sync Replicas - replicas caught up with leader", "Index Storage Record", "Initial Setup Request"], correct: 1, explanation: "ISR (In-Sync Replicas) is the set of replicas that are fully caught up with the partition leader." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Apache Kafka Deep Dive</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Apache Kafka Deep Dive</h1><div className="article-tags"><span className="tag">Kafka</span><span className="tag">Partitions</span><span className="tag">Consumer Groups</span><span className="tag">Streaming</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Apache Kafka?</h2>
        <p><strong>Apache Kafka</strong> is a distributed event streaming platform for high-throughput, fault-tolerant, publish-subscribe messaging. It's designed for real-time data pipelines and streaming applications.</p>

        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">📊</div><div className="concept-card-title">High Throughput</div><div className="concept-card-description">Millions of messages per second</div></div>
          <div className="concept-card"><div className="concept-card-icon">💾</div><div className="concept-card-title">Persistent Storage</div><div className="concept-card-description">Messages stored on disk with replication</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔄</div><div className="concept-card-title">Replay Capability</div><div className="concept-card-description">Consumers can replay from any offset</div></div>
          <div className="concept-card"><div className="concept-card-icon">📈</div><div className="concept-card-title">Horizontal Scaling</div><div className="concept-card-description">Add partitions and brokers as needed</div></div>
        </div>

        <h2 className="md-h2">Kafka Architecture</h2>
        <div className="diagram-container">
          <div className="diagram-title">Topics & Partitions</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">📝</span><span className="flow-node-label">Topic: orders</span></div>
            </div>
            <div className="flow-arrow down">↓ Split into partitions</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">P0</span><span className="flow-node-label">Partition 0</span><span className="flow-node-sublabel">[msg0,msg1,msg2...]</span></div>
              <div className="flow-node cache"><span className="flow-node-icon">P1</span><span className="flow-node-label">Partition 1</span><span className="flow-node-sublabel">[msg0,msg1,msg2...]</span></div>
              <div className="flow-node database"><span className="flow-node-icon">P2</span><span className="flow-node-label">Partition 2</span><span className="flow-node-sublabel">[msg0,msg1,msg2...]</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Consumer Groups</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><div className="step-content"><h4>Group Coordination</h4><p>Consumers with same group.id share partitions. Each partition assigned to one consumer.</p></div></div>
          <div className="step-card"><div className="step-number">2</div><div className="step-content"><h4>Parallel Processing</h4><p>Max parallelism = number of partitions. 10 partitions = max 10 consumers in group.</p></div></div>
          <div className="step-card"><div className="step-number">3</div><div className="step-content"><h4>Rebalancing</h4><p>When consumers join/leave, partitions are rebalanced automatically.</p></div></div>
        </div>

        <h2 className="md-h2">Key Configurations</h2>
        <table className="comparison-table">
          <thead><tr><th>Config</th><th>Producer</th><th>Consumer</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Durability</td><td>acks=all (wait for all replicas)</td><td>enable.auto.commit=false</td></tr>
            <tr><td className="feature-name">Performance</td><td>batch.size, linger.ms</td><td>fetch.min.bytes, max.poll.records</td></tr>
            <tr><td className="feature-name">Ordering</td><td>Same key → same partition</td><td>One consumer per partition</td></tr>
          </tbody>
        </table>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Partition Key Strategy</h4>
            <p>Use consistent partition keys (e.g., user_id, order_id) to ensure related messages go to the same partition and maintain ordering per entity.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Topics are split into partitions for parallelism</li>
              <li>Ordering guaranteed only within a partition</li>
              <li>Consumer groups enable parallel processing</li>
              <li>Offset tracking allows replay capability</li>
              <li>Replication provides fault tolerance</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Kafka Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Kafka Cluster Design</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design Kafka topic for order processing with appropriate partitioning</span></li><li><span className="req-number">2</span><span className="req-text">Calculate partition count based on throughput requirements</span></li><li><span className="req-number">3</span><span className="req-text">Design consumer group strategy for parallel processing</span></li><li><span className="req-number">4</span><span className="req-text">Plan replication factor and retention policy</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/12/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/12/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week12Day2;
