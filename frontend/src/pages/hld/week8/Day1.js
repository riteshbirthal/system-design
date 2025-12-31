import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week8Day1() {
  const weekNum = 8, dayNum = 1, topic = "Microservices vs Monoliths", concepts = "Architectural differences, trade-offs, when to choose";
  
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
    { id: 1, question: "What is a monolithic architecture?", options: ["Distributed services", "Single unified codebase deployed as one unit", "Multiple databases", "Cloud-only applications"], correct: 1, explanation: "A monolith is a single deployable unit where all components share the same codebase and are deployed together." },
    { id: 2, question: "What is a key advantage of microservices?", options: ["Simpler deployment", "Independent scaling of services", "Lower operational cost", "Easier debugging"], correct: 1, explanation: "Microservices allow independent scaling - you can scale only the services that need it." },
    { id: 3, question: "When is a monolith preferred?", options: ["Large distributed teams", "Small team with MVP", "High scalability needs", "Multiple technology stacks"], correct: 1, explanation: "Monoliths are preferred for small teams building MVPs due to simplicity and faster development." },
    { id: 4, question: "What is a bounded context in DDD?", options: ["Database boundary", "Network boundary", "Explicit boundary around a domain model", "Security perimeter"], correct: 2, explanation: "A bounded context is an explicit boundary within which a domain model exists, ensuring model consistency." },
    { id: 5, question: "What challenge is unique to microservices?", options: ["Code compilation", "Distributed system complexity", "Single point of failure", "Technology lock-in"], correct: 1, explanation: "Microservices introduce distributed system challenges like network latency, partial failures, and data consistency." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Microservices vs Monoliths</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Microservices vs Monoliths</h1><div className="article-tags"><span className="tag">Architecture</span><span className="tag">Microservices</span><span className="tag">Monolith</span><span className="tag">Design</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Understanding Architecture Choices</h2>
        <p>The choice between <strong>monolithic</strong> and <strong>microservices</strong> architecture is one of the most critical decisions in software development. It impacts team structure, deployment strategies, scalability, and long-term maintainability.</p>

        <div className="diagram-container">
          <div className="diagram-title">Architecture Comparison Overview</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
              <h4 style={{color: '#3B82F6'}}>🏛️ Monolithic Architecture</h4>
              <ul>
                <li>Single deployable artifact</li>
                <li>Shared database for all components</li>
                <li>In-process method calls</li>
                <li>Single technology stack</li>
                <li>Unified logging and monitoring</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#10B981'}}>
              <h4 style={{color: '#10B981'}}>🔷 Microservices Architecture</h4>
              <ul style={{listStyle: 'none'}}>
                <li>→ Multiple independent services</li>
                <li>→ Database per service pattern</li>
                <li>→ Network communication (API/MQ)</li>
                <li>→ Polyglot technology choices</li>
                <li>→ Distributed tracing required</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Monolithic Architecture Deep Dive</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🎯</div>
            <div className="concept-card-title">Simplicity</div>
            <div className="concept-card-description">Single codebase, straightforward debugging, easier local development</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🚀</div>
            <div className="concept-card-title">Deployment</div>
            <div className="concept-card-description">One build pipeline, one artifact, simple rollback</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Performance</div>
            <div className="concept-card-description">No network latency, shared memory, ACID transactions</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💰</div>
            <div className="concept-card-title">Cost Efficient</div>
            <div className="concept-card-description">Lower infrastructure costs, smaller ops team needed</div>
          </div>
        </div>

        <h2 className="md-h2">Microservices Architecture Deep Dive</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📈</div>
            <div className="concept-card-title">Independent Scaling</div>
            <div className="concept-card-description">Scale individual services based on demand</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔧</div>
            <div className="concept-card-title">Technology Freedom</div>
            <div className="concept-card-description">Choose best technology per service</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">Fault Isolation</div>
            <div className="concept-card-description">Failures contained within service boundaries</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">👥</div>
            <div className="concept-card-title">Team Autonomy</div>
            <div className="concept-card-description">Cross-functional teams with clear ownership</div>
          </div>
        </div>

        <h2 className="md-h2">Comparative Analysis</h2>
        <table className="comparison-table">
          <thead><tr><th>Aspect</th><th>Monolithic</th><th>Microservices</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Deployment</td><td>Single artifact</td><td>Multiple services</td></tr>
            <tr><td className="feature-name">Scalability</td><td>Horizontal/Vertical</td><td>Per-service granular</td></tr>
            <tr><td className="feature-name">Technology</td><td>Single stack</td><td>Polyglot</td></tr>
            <tr><td className="feature-name">Data Management</td><td>Shared database</td><td>Database per service</td></tr>
            <tr><td className="feature-name">Communication</td><td>In-process calls</td><td>Network calls (API/MQ)</td></tr>
            <tr><td className="feature-name">Fault Tolerance</td><td>All-or-nothing</td><td>Isolated failures</td></tr>
            <tr><td className="feature-name">Development Start</td><td>Simple</td><td>Complex</td></tr>
            <tr><td className="feature-name">Maintenance</td><td>Harder over time</td><td>Easier per service</td></tr>
            <tr><td className="feature-name">Testing</td><td>Simpler integration</td><td>Complex integration</td></tr>
            <tr><td className="feature-name">Transactions</td><td>ACID possible</td><td>Eventual consistency</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">When to Choose What?</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">🏛️</div>
            <div className="step-content">
              <h4>Choose Monolith When</h4>
              <p>Small team (2-10 devs), MVP/prototype stage, simple domain, tight deadlines, limited DevOps expertise</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🔷</div>
            <div className="step-content">
              <h4>Choose Microservices When</h4>
              <p>Large team (10+ devs), clear domain boundaries, need independent scaling, mature DevOps practices</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🎯</div>
            <div className="step-content">
              <h4>Consider Modular Monolith</h4>
              <p>Best of both worlds - single deployment with clear internal boundaries, easier migration path later</p>
            </div>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Monoliths are not bad - they're simpler for smaller teams</li>
              <li>Microservices add complexity but enable scale</li>
              <li>Start simple, evolve as needed</li>
              <li>Team structure should match architecture (Conway's Law)</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Microservices vs Monoliths Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Architecture Analysis Assignment</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Compare monolithic vs microservices for an e-commerce startup</span></li><li><span className="req-number">2</span><span className="req-text">Identify 3 scenarios where each architecture excels</span></li><li><span className="req-number">3</span><span className="req-text">Propose a migration strategy from monolith to microservices</span></li><li><span className="req-number">4</span><span className="req-text">Design bounded contexts for an online marketplace</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/7/day/5" className="nav-link prev">&lt;&lt; Week 7</Link><Link to="/hld/week/8/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week8Day1;
