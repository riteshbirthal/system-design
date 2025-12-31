import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuizState } from '../../../hooks/useRandomQuestions';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week11Day2() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const weekNum = 11, dayNum = 2, topic = "Layer 4 vs Layer 7 Load Balancing", concepts = "Transport vs Application layer, protocol awareness";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  // Use random questions hook
  const {
    questions: quizQuestions, currentQuestion, currentQuestionIndex, totalQuestions,
    selectedAnswers, handleAnswerSelect, showResults, score, scorePercentage,
    submitQuiz, resetQuiz, goToQuestion, nextQuestion, prevQuestion,
    isFirstQuestion, isLastQuestion, totalAvailable
  } = useQuizState(weekNum, dayNum, 5);

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Layer 4 vs Layer 7 Load Balancing</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Layer 4 vs Layer 7 Load Balancing</h1><div className="article-tags"><span className="tag">L4</span><span className="tag">L7</span><span className="tag">TCP</span><span className="tag">HTTP</span><span className="tag">SSL Termination</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Understanding the Layers</h2>
        <p>Load balancers operate at different OSI model layers, with significant implications for functionality and performance.</p>

        <div className="diagram-container">
          <div className="diagram-title">OSI Model Layers</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client"><span className="flow-node-icon">7️⃣</span><span className="flow-node-label">Application</span><span className="flow-node-sublabel">HTTP, HTTPS, gRPC</span></div>
            </div>
            <div className="flow-arrow down">↑ L7 Load Balancing</div>
            <div className="flow-row">
              <div className="flow-node server"><span className="flow-node-icon">4️⃣</span><span className="flow-node-label">Transport</span><span className="flow-node-sublabel">TCP, UDP</span></div>
            </div>
            <div className="flow-arrow down">↑ L4 Load Balancing</div>
            <div className="flow-row">
              <div className="flow-node database"><span className="flow-node-icon">3️⃣</span><span className="flow-node-label">Network</span><span className="flow-node-sublabel">IP Addresses</span></div>
            </div>
          </div>
        </div>

        <h2 className="md-h2">Layer 4 (Transport Layer)</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⚡</div>
            <div className="concept-card-title">Very Fast</div>
            <div className="concept-card-description">Minimal processing - doesn't inspect packet content</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔌</div>
            <div className="concept-card-title">Protocol Agnostic</div>
            <div className="concept-card-description">Works with any TCP/UDP traffic</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🎯</div>
            <div className="concept-card-title">Simple Routing</div>
            <div className="concept-card-description">Based on IP address and port only</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">💻</div>
            <div className="concept-card-title">Connection-Level</div>
            <div className="concept-card-description">Balances entire TCP connections</div>
          </div>
        </div>

        <h2 className="md-h2">Layer 7 (Application Layer)</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">🔍</div>
            <div className="concept-card-title">Content-Aware</div>
            <div className="concept-card-description">Can route based on URLs, headers, cookies</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🔐</div>
            <div className="concept-card-title">SSL Termination</div>
            <div className="concept-card-description">Decrypt HTTPS, inspect, re-encrypt if needed</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🛠️</div>
            <div className="concept-card-title">Request Modification</div>
            <div className="concept-card-description">Add/remove headers, rewrite URLs</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">📊</div>
            <div className="concept-card-title">Advanced Features</div>
            <div className="concept-card-description">Caching, compression, rate limiting per URL</div>
          </div>
        </div>

        <h2 className="md-h2">Detailed Comparison</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>Layer 4</th><th>Layer 7</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">Speed</td><td>Faster (less processing)</td><td>Slower (content inspection)</td></tr>
            <tr><td className="feature-name">Content Routing</td><td>No</td><td>Yes (URL, headers, cookies)</td></tr>
            <tr><td className="feature-name">SSL Termination</td><td>No (passthrough)</td><td>Yes</td></tr>
            <tr><td className="feature-name">Protocol Support</td><td>Any TCP/UDP</td><td>HTTP/HTTPS/gRPC/WebSocket</td></tr>
            <tr><td className="feature-name">Complexity</td><td>Lower</td><td>Higher</td></tr>
            <tr><td className="feature-name">Use Cases</td><td>Database, gaming, non-HTTP</td><td>Web apps, APIs, microservices</td></tr>
            <tr><td className="feature-name">AWS Example</td><td>Network Load Balancer (NLB)</td><td>Application Load Balancer (ALB)</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">L7 Routing Examples</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">🔗</div>
            <div className="step-content">
              <h4>Path-Based Routing</h4>
              <p>/api/* → API servers, /static/* → CDN origin, / → Web servers</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">🏷️</div>
            <div className="step-content">
              <h4>Host-Based Routing</h4>
              <p>api.example.com → API cluster, www.example.com → Web cluster</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">📱</div>
            <div className="step-content">
              <h4>Header-Based Routing</h4>
              <p>User-Agent: Mobile → Mobile-optimized servers</p>
            </div>
          </div>
        </div>

        <h2 className="md-h2">When to Use Each</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#3B82F6'}}>
            <h4 style={{color: '#3B82F6'}}>🚀 Use Layer 4 When</h4>
            <ul>
              <li>Maximum throughput needed</li>
              <li>Non-HTTP protocols (DB, gaming)</li>
              <li>Simple TCP/UDP load balancing</li>
              <li>SSL passthrough required</li>
              <li>Very high request rates</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>🔧 Use Layer 7 When</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Content-based routing needed</li>
              <li>→ SSL termination at LB</li>
              <li>→ Web applications and APIs</li>
              <li>→ Need request modification</li>
              <li>→ A/B testing, canary deployments</li>
            </ul>
          </div>
        </div>

        <div className="info-box warning">
          <div className="info-box-icon">⚠️</div>
          <div className="info-box-content">
            <h4>Important Consideration</h4>
            <p>Layer 7 load balancers terminate TCP connections, meaning the backend sees the LB's IP, not the client's. Use X-Forwarded-For header to preserve original client IP.</p>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>L4: Fast, simple, protocol-agnostic</li>
              <li>L7: Feature-rich, content-aware, HTTP-focused</li>
              <li>Use L4 for raw performance and non-HTTP</li>
              <li>Use L7 for web apps needing smart routing</li>
              <li>Many architectures use both together</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    if (!currentQuestion) return <div className="content-panel quiz-panel"><div className="quiz-container"><p>Loading questions...</p></div></div>;
    if (showResults) {
      return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{scorePercentage}%</span></div></div><p style={{textAlign:'center',color:'#9CA3AF',marginBottom:'1rem'}}>{score} of {totalQuestions} correct (from {totalAvailable} available)</p><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={resetQuiz}>Try Again (New Questions)</button></div></div></div>);
    }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>L4 vs L7 Quiz</h1><p style={{color:'#9CA3AF',fontSize:'0.9rem'}}>Random questions from pool of {totalAvailable}</p></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {currentQuestion.question}</p><div className="options-list">{currentQuestion.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[currentQuestion.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[currentQuestion.id]===i} onChange={()=>handleAnswerSelect(currentQuestion.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={isFirstQuestion} onClick={prevQuestion}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>goToQuestion(i)}>{i+1}</button>))}</div>{isLastQuestion?<button className="nav-btn submit" onClick={submitQuiz}>Submit</button>:<button className="nav-btn next" onClick={nextQuestion}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Load Balancer Selection</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Design routing rules for a microservices application using L7</span></li><li><span className="req-number">2</span><span className="req-text">Identify scenarios where L4 would be preferred over L7</span></li><li><span className="req-number">3</span><span className="req-text">Configure path-based routing for /api, /static, and / paths</span></li><li><span className="req-number">4</span><span className="req-text">Design SSL termination strategy with proper header forwarding</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/11/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/11/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week11Day2;
