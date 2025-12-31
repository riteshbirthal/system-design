import React from 'react';
import { Link } from 'react-router-dom';
import { useQuizState } from '../../../hooks/useRandomQuestions';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week11Day1() {
  const weekNum = 11, dayNum = 1, topic = "Load Balancing Fundamentals", concepts = "Types, algorithms, VIP, upstream servers";
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
  } = useHLDDayState(weekNum, dayNum);
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  // Use random questions hook for quiz
  const {
    questions: quizQuestions,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswers,
    handleAnswerSelect,
    showResults,
    score,
    scorePercentage,
    submitQuiz,
    resetQuiz,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    isFirstQuestion,
    isLastQuestion,
    totalAvailable
  } = useQuizState(weekNum, dayNum, 5);

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Load Balancing Fundamentals</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Load Balancing Fundamentals</h1><div className="article-tags"><span className="tag">Load Balancer</span><span className="tag">Scalability</span><span className="tag">High Availability</span><span className="tag">Traffic Distribution</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is Load Balancing?</h2>
        <p><strong>Load balancing</strong> is the process of distributing incoming network traffic across multiple servers to ensure no single server bears too much demand. This improves application availability, responsiveness, and overall performance.</p>

        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🛡️</div>
            <div className="concept-card-title">Availability</div>
            <div className="concept-card-description">No single point of failure - if one server fails, others handle traffic</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📈</div>
            <div className="concept-card-title">Scalability</div>
            <div className="concept-card-description">Add or remove servers based on demand without downtime</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Performance</div>
            <div className="concept-card-description">Distribute load for faster response times</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔧</div>
            <div className="concept-card-title">Flexibility</div>
            <div className="concept-card-description">Perform maintenance without downtime by draining servers</div>
          </div>
        </div>

        <h2 className="md-h2">Basic Architecture</h2>
        <div className="diagram-container">
          <div className="diagram-title">Load Balancer Architecture</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">👤</span><span className="flow-node-label">Clients</span><span className="flow-node-sublabel">Users/Apps</span></div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node loadbalancer"><span className="flow-node-icon">⚖️</span><span className="flow-node-label">Load Balancer</span><span className="flow-node-sublabel">VIP: 10.0.0.1</span></div>
            </div>
            <div className="flow-arrow down">↓ Distributes Traffic</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Server 1</span></div>
              <div className="flow-node server"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Server 2</span></div>
              <div className="flow-node server"><span className="flow-node-icon">🖥️</span><span className="flow-node-label">Server 3</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Types of Load Balancers</h2>
        <table className="comparison-table">
          <thead><tr><th>Type</th><th>Description</th><th>Examples</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Hardware</td><td>Physical appliances with custom ASICs</td><td>F5 BIG-IP, Citrix ADC</td><td>Large enterprises, high performance</td></tr>
            <tr><td className="feature-name">Software</td><td>Applications on standard servers/VMs</td><td>NGINX, HAProxy, Traefik</td><td>Web apps, APIs, microservices</td></tr>
            <tr><td className="feature-name">Cloud</td><td>Managed services from cloud providers</td><td>AWS ELB, GCP LB, Azure LB</td><td>Cloud-native workloads</td></tr>
            <tr><td className="feature-name">DNS</td><td>Distributes via DNS responses</td><td>Route 53, Cloudflare DNS</td><td>Global distribution, DR</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Key Terminology</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Virtual IP (VIP)</h4>
              <p>The IP address that clients connect to. Maps to multiple backend servers for distribution.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Upstream/Backend Servers</h4>
              <p>The actual servers that receive traffic from the load balancer and process requests.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Health Checks</h4>
              <p>Periodic checks to verify server availability. Unhealthy servers are removed from the pool.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Session Persistence</h4>
              <p>Routing the same client to the same server, important for stateful applications.</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Common Algorithms Overview</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>📊 Static Algorithms</h4>
            <ul>
              <li><strong>Round Robin:</strong> Sequential distribution</li>
              <li><strong>Weighted Round Robin:</strong> Based on server capacity</li>
              <li><strong>IP Hash:</strong> Client IP determines server</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>🔄 Dynamic Algorithms</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ <strong>Least Connections:</strong> Route to server with fewest active</li>
              <li>→ <strong>Least Response Time:</strong> Route to fastest responding</li>
              <li>→ <strong>Resource-Based:</strong> Based on CPU/memory metrics</li>
            </ul>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>Design Tip</h4>
            <p>Start with Round Robin for simplicity. Move to Least Connections when you have varying request durations. Use IP Hash only when session persistence is required and you can't use external session storage.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Load balancing distributes traffic for availability and performance</li>
              <li>Three main types: Hardware, Software, and Cloud</li>
              <li>VIP is the single entry point for clients</li>
              <li>Health checks ensure traffic only goes to healthy servers</li>
              <li>Choose algorithm based on your specific needs</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    if (!currentQuestion) return <div className="content-panel quiz-panel"><div className="quiz-container"><p>Loading questions...</p></div></div>;
    
    if (showResults) {
      return (
        <div className="content-panel quiz-panel">
          <div className="quiz-container">
            <div className="quiz-results">
              <div className="results-header">
                <h2>Complete!</h2>
                <div className="score-circle"><span className="score-value">{scorePercentage}%</span></div>
              </div>
              <p style={{textAlign: 'center', color: '#9CA3AF', marginBottom: '1rem'}}>
                {score} of {totalQuestions} correct (from {totalAvailable} available questions)
              </p>
              <div className="results-review">
                {quizQuestions.map((q, i) => (
                  <div key={q.id} className={`review-item ${selectedAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                    <p>Q{i + 1}: {q.question}</p>
                    <div className="explanation">{q.explanation}</div>
                  </div>
                ))}
              </div>
              <button className="retry-btn" onClick={resetQuiz}>
                Try Again (New Questions)
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="content-panel quiz-panel">
        <div className="quiz-container">
          <header className="quiz-header">
            <h1>Load Balancing Quiz</h1>
            <p style={{color: '#9CA3AF', fontSize: '0.9rem'}}>Random questions from pool of {totalAvailable}</p>
          </header>
          <div className="quiz-question-single">
            <div className="question-card">
              <p className="question-text">Q{currentQuestionIndex + 1}: {currentQuestion.question}</p>
              <div className="options-list">
                {currentQuestion.options.map((o, i) => (
                  <label key={i} className={`option-item ${selectedAnswers[currentQuestion.id] === i ? 'selected' : ''}`}>
                    <input type="radio" checked={selectedAnswers[currentQuestion.id] === i} onChange={() => handleAnswerSelect(currentQuestion.id, i)} />
                    <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                    <span className="option-text">{o}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="quiz-navigation">
            <button className="nav-btn prev" disabled={isFirstQuestion} onClick={prevQuestion}>&lt;&lt;</button>
            <div className="question-dots">
              {quizQuestions.map((q, i) => (
                <button key={i} className={`dot ${i === currentQuestionIndex ? 'active' : ''}`} onClick={() => goToQuestion(i)}>{i + 1}</button>
              ))}
            </div>
            {isLastQuestion 
              ? <button className="nav-btn submit" onClick={submitQuiz}>Submit</button>
              : <button className="nav-btn next" onClick={nextQuestion}>&gt;&gt;</button>
            }
          </div>
        </div>
      </div>
    );
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Load Balancer Design Exercise</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design load balancing architecture for a 3-tier web application</span></li><li><span className="req-number">2</span><span className="req-text">Identify which type of load balancer (hardware/software/cloud) fits best</span></li><li><span className="req-number">3</span><span className="req-text">Define health check strategy for your backend servers</span></li><li><span className="req-number">4</span><span className="req-text">Document failover behavior when a server goes down</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/10/day/5" className="nav-link prev">&lt;&lt; Week 10</Link><Link to="/hld/week/11/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week11Day1;
