import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week1Day1() {
  const weekNum = 1, dayNum = 1;
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);
  const topic = "What is System Design?";
  const concepts = "HLD vs LLD, System components, Architecture overview";

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }
  ];

  const quizQuestions = [
    { id: 1, question: "What is the primary focus of High-Level Design (HLD)?", options: ["Code implementation details", "System architecture and component interactions", "Database schema design", "Unit testing strategies"], correct: 1, explanation: "HLD focuses on the overall system architecture, major components, and how they interact with each other." },
    { id: 2, question: "Which of the following is NOT typically part of system design?", options: ["Scalability planning", "Database selection", "Variable naming conventions", "API design"], correct: 2, explanation: "Variable naming conventions are part of coding standards, not system design which focuses on architecture." },
    { id: 3, question: "What does LLD stand for?", options: ["Large-Level Design", "Low-Level Design", "Logic Layer Design", "Load Level Distribution"], correct: 1, explanation: "LLD stands for Low-Level Design, which focuses on detailed component design and implementation specifics." },
    { id: 4, question: "In system design, what is a 'component'?", options: ["A React UI element", "A modular, deployable part of the system with specific responsibilities", "A database table", "A CSS class"], correct: 1, explanation: "In system design, a component is a modular part of the system with defined responsibilities and interfaces." },
    { id: 5, question: "What is the typical order of design phases?", options: ["LLD → HLD → Requirements", "HLD → LLD → Requirements", "Requirements → HLD → LLD", "Requirements → LLD → HLD"], correct: 2, explanation: "The typical flow is: gather Requirements → create HLD (architecture) → create LLD (detailed design)." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (
    <div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Introduction to System Design</p></div></div><div className="video-details"><h2>What is System Design?</h2><p className="video-description">Learn the fundamentals of system design, understand the difference between HLD and LLD, and explore the key components of distributed systems.</p><div className="video-meta"><span className="meta-item"><span className="meta-icon">⏱️</span> 20 min</span><span className="meta-item"><span className="meta-icon">📊</span> Beginner</span></div></div></div></div>
  );

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>What is System Design?</h1><div className="article-meta"><span className="meta-item"><span className="meta-icon">📖</span> 12 min read</span></div><div className="article-tags"><span className="tag">Fundamentals</span><span className="tag">HLD</span><span className="tag">LLD</span><span className="tag">Architecture</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Introduction</h2>
        <p><strong>System Design</strong> is the process of defining the architecture, components, modules, interfaces, and data flow of a system to satisfy specified requirements. It's a critical skill for building scalable, reliable, and maintainable software systems.</p>

        {/* Why System Design Matters - Concept Cards */}
        <h2 className="md-h2">Why System Design Matters</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">📈</div>
            <div className="concept-card-title">Scalability</div>
            <div className="concept-card-description">Handle growing users and data without degrading performance</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">Reliability</div>
            <div className="concept-card-description">Ensure system works correctly even under failures</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔧</div>
            <div className="concept-card-title">Maintainability</div>
            <div className="concept-card-description">Make systems easy to modify, extend, and debug</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Performance</div>
            <div className="concept-card-description">Optimize response times and throughput</div>
          </div>
        </div>

        <h2 className="md-h2">HLD vs LLD</h2>
        
        {/* Comparison Diagram */}
        <div className="diagram-container">
          <div className="diagram-title">Design Levels Comparison</div>
          <div className="pros-cons">
            <div className="pros-section" style={{borderTopColor: '#667eea'}}>
              <h4 style={{color: '#667eea'}}>🏗️ High-Level Design (HLD)</h4>
              <ul>
                <li>System architecture overview</li>
                <li>Component interactions & data flow</li>
                <li>Technology stack selection</li>
                <li>Database design (conceptual)</li>
                <li>API contracts between services</li>
                <li>Non-functional requirements</li>
              </ul>
            </div>
            <div className="cons-section" style={{borderTopColor: '#11998e'}}>
              <h4 style={{color: '#11998e'}}>🔬 Low-Level Design (LLD)</h4>
              <ul style={{listStyle: 'none'}}>
                <li style={{paddingLeft: '1.5rem'}}><span style={{position: 'absolute', left: '1rem', color: '#11998e'}}>→</span>Class diagrams & relationships</li>
                <li style={{paddingLeft: '1.5rem'}}><span style={{position: 'absolute', left: '1rem', color: '#11998e'}}>→</span>Database schema (tables, indexes)</li>
                <li style={{paddingLeft: '1.5rem'}}><span style={{position: 'absolute', left: '1rem', color: '#11998e'}}>→</span>API request/response formats</li>
                <li style={{paddingLeft: '1.5rem'}}><span style={{position: 'absolute', left: '1rem', color: '#11998e'}}>→</span>Algorithm selection</li>
                <li style={{paddingLeft: '1.5rem'}}><span style={{position: 'absolute', left: '1rem', color: '#11998e'}}>→</span>Design patterns</li>
                <li style={{paddingLeft: '1.5rem'}}><span style={{position: 'absolute', left: '1rem', color: '#11998e'}}>→</span>Error handling strategies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* System Architecture Diagram */}
        <h2 className="md-h2">Typical System Architecture</h2>
        <div className="diagram-container">
          <div className="diagram-title">Web Application Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client">
                <span className="flow-node-icon">👤</span>
                <span className="flow-node-label">Client</span>
                <span className="flow-node-sublabel">Browser/Mobile</span>
              </div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node dns">
                <span className="flow-node-icon">🌐</span>
                <span className="flow-node-label">CDN</span>
                <span className="flow-node-sublabel">Static Content</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-node loadbalancer">
                <span className="flow-node-icon">⚖️</span>
                <span className="flow-node-label">Load Balancer</span>
                <span className="flow-node-sublabel">Traffic Distribution</span>
              </div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node server">
                <span className="flow-node-icon">🖥️</span>
                <span className="flow-node-label">Web Server 1</span>
              </div>
              <div className="flow-node server">
                <span className="flow-node-icon">🖥️</span>
                <span className="flow-node-label">Web Server 2</span>
              </div>
              <div className="flow-node server">
                <span className="flow-node-icon">🖥️</span>
                <span className="flow-node-label">Web Server N</span>
              </div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node cache">
                <span className="flow-node-icon">⚡</span>
                <span className="flow-node-label">Cache</span>
                <span className="flow-node-sublabel">Redis/Memcached</span>
              </div>
              <div className="flow-arrow">↔</div>
              <div className="flow-node database">
                <span className="flow-node-icon">🗄️</span>
                <span className="flow-node-label">Database</span>
                <span className="flow-node-sublabel">Primary + Replicas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Components Table */}
        <h2 className="md-h2">Key System Components</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Purpose</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feature-name">⚖️ Load Balancer</td>
              <td>Distribute traffic across servers</td>
              <td>Nginx, HAProxy, AWS ELB</td>
            </tr>
            <tr>
              <td className="feature-name">🖥️ Web Servers</td>
              <td>Handle HTTP requests</td>
              <td>Nginx, Apache, Node.js</td>
            </tr>
            <tr>
              <td className="feature-name">⚙️ App Servers</td>
              <td>Business logic processing</td>
              <td>Express, Django, Spring</td>
            </tr>
            <tr>
              <td className="feature-name">🗄️ Database</td>
              <td>Persistent data storage</td>
              <td>PostgreSQL, MongoDB, MySQL</td>
            </tr>
            <tr>
              <td className="feature-name">⚡ Cache</td>
              <td>Fast data access layer</td>
              <td>Redis, Memcached</td>
            </tr>
            <tr>
              <td className="feature-name">📨 Message Queue</td>
              <td>Async communication</td>
              <td>Kafka, RabbitMQ, SQS</td>
            </tr>
            <tr>
              <td className="feature-name">🌐 CDN</td>
              <td>Content delivery at edge</td>
              <td>Cloudflare, CloudFront</td>
            </tr>
          </tbody>
        </table>

        {/* Design Process Steps */}
        <h2 className="md-h2">System Design Process</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Gather Requirements</h4>
              <p>Understand functional (features) and non-functional (performance, scale) requirements from stakeholders.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Capacity Estimation</h4>
              <p>Calculate expected traffic, storage needs, and bandwidth using back-of-envelope math.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>High-Level Design</h4>
              <p>Define major components, their interactions, and the overall system architecture.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Deep Dive</h4>
              <p>Detail critical components - database schema, API design, algorithms for key features.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Identify Trade-offs</h4>
              <p>Discuss alternatives, bottlenecks, and justify design decisions with pros/cons.</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Pro Tip</h4>
            <p>In interviews, always start by clarifying requirements. Ask about scale (users, data), features (must-have vs nice-to-have), and constraints (budget, timeline) before diving into design.</p>
          </div>
        </div>

        {/* Key Takeaways */}
        <h2 className="md-h2">Key Takeaways</h2>
        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>System design defines how to build scalable, reliable systems</li>
              <li>HLD focuses on architecture; LLD focuses on implementation details</li>
              <li>Understanding core components (LB, Cache, DB, Queue) is essential</li>
              <li>Requirements drive all design decisions</li>
              <li>Always consider trade-offs in your design choices</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) {
      const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;
      return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Quiz Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span><span className="score-label">Score</span></div><p className="score-detail">{score} of {total} correct</p></div><div className="results-review"><h3>Review</h3>{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><div className="review-header"><span className="review-number">Q{i+1}</span><span className={`review-badge ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}>{selectedAnswers[q.id]===q.correct?'✓':'✗'}</span></div><p className="review-question">{q.question}</p><div className="review-answers"><p><strong>Your answer:</strong> {q.options[selectedAnswers[q.id]]||'None'}</p>{selectedAnswers[q.id]!==q.correct&&<p><strong>Correct:</strong> {q.options[q.correct]}</p>}</div><div className="explanation">{q.explanation}</div></div>))}</div><div className="results-actions"><button className="retry-btn" onClick={resetQuiz}>Retry</button></div></div></div></div>);
    }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>System Design Fundamentals Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-progress"><div className="progress-text">Question {currentQuestionIndex+1} of {total}</div><div className="progress-bar"><div className="progress-fill" style={{width:`${((currentQuestionIndex+1)/total)*100}%`}}></div></div></div><div className="quiz-question-single"><div className="question-card"><div className="question-header"><span className="question-number">Q{currentQuestionIndex+1}</span></div><p className="question-text">{curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt; Prev</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''} ${selectedAnswers[q.id]!==undefined?'answered':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>Next &gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Identify System Components</h1><span className="difficulty-badge beginner">Beginner</span></div><p className="assignment-description">Analyze a given system and identify its key components, their responsibilities, and interactions.</p></header><div className="assignment-body"><h3>Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Choose a familiar application (e.g., Twitter, Uber, Netflix)</span></li><li><span className="req-number">2</span><span className="req-text">List all major components you think it needs</span></li><li><span className="req-number">3</span><span className="req-text">Draw a simple architecture diagram showing component interactions</span></li><li><span className="req-number">4</span><span className="req-text">Identify which components handle HLD vs LLD concerns</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Assignment</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span><span className="mobile-topic">{topic}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3><p>{concepts}</p></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav><div className="mobile-menu-footer"><div className="mobile-day-nav"><span className="nav-link prev disabled">&lt;&lt; Prev</span><Link to="/hld/week/1/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back to Course</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2><p className="day-concepts">{concepts}</p></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<><span className="nav-label">{t.label}</span><span className="nav-count">1</span></>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><span className="nav-link prev disabled">&lt;&lt; Prev</span><Link to="/hld/week/1/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><div className="header-left"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></div><div className="header-right"><span className="progress-indicator">Week {weekNum}, Day {dayNum}</span></div></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week1Day1;
