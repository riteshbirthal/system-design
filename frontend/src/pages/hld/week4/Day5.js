import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week4Day5() {
  const weekNum = 4, dayNum = 5;
  const topic = "CDN & Edge Caching";
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);
  const concepts = "Content delivery, Edge locations, Cache headers";

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }
  ];

  const quizQuestions = [
    { id: 1, question: "What is the primary benefit of using a CDN?", options: ["Reduce database queries", "Serve content from geographically closer locations", "Encrypt data", "Provide authentication"], correct: 1, explanation: "CDNs serve content from edge locations closer to users, dramatically reducing latency." },
    { id: 2, question: "Which Cache-Control directive sets different TTL for CDN vs browser?", options: ["max-age only", "s-maxage (CDN) + max-age (browser)", "no-cache", "private"], correct: 1, explanation: "s-maxage sets CDN cache TTL while max-age sets browser cache TTL." },
    { id: 3, question: "What is the best cache invalidation strategy for versioned static assets?", options: ["Manual purge", "Short TTL", "Versioned URLs (cache busting)", "Event-based"], correct: 2, explanation: "Versioned URLs (app.v1.2.3.js) allow long TTLs - when content changes, URL changes." },
    { id: 4, question: "What is Origin Shield in CDN architecture?", options: ["Firewall", "Middle-tier cache that reduces origin load", "SSL management", "DDoS protection"], correct: 1, explanation: "Origin Shield is an optional caching layer between edge PoPs and origin that consolidates requests." },
    { id: 5, question: "Which CDN provider is known for instant (~150ms) cache purging?", options: ["Cloudflare", "CloudFront", "Fastly", "Akamai"], correct: 2, explanation: "Fastly is known for real-time purging capabilities (~150ms propagation)." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (
    <div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>CDN & Edge Caching - Video Lesson</p></div></div><div className="video-details"><h2>Content Delivery Networks Explained</h2><p className="video-description">Learn how CDNs work, Cache-Control headers, and edge computing for global content delivery.</p><div className="video-meta"><span className="meta-item"><span className="meta-icon">⏱️</span> 24 min</span><span className="meta-item"><span className="meta-icon">📊</span> Intermediate</span></div></div></div></div>
  );

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>CDN & Edge Caching</h1><div className="article-meta"><span className="meta-item"><span className="meta-icon">📖</span> 15 min read</span></div><div className="article-tags"><span className="tag">CDN</span><span className="tag">Edge Computing</span><span className="tag">Cache-Control</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is a CDN?</h2>
        <p>A <strong>Content Delivery Network (CDN)</strong> is a geographically distributed network of servers that delivers web content to users based on their location. Content is served from the nearest edge server, dramatically reducing latency.</p>
        <ul><li><strong>Without CDN:</strong> User in Tokyo → Origin in US (~200ms latency)</li><li><strong>With CDN:</strong> User in Tokyo → Edge in Tokyo (~20ms latency)</li></ul>

        <h3 className="md-h3">CDN Benefits</h3>
        <ul><li><strong>Reduced Latency:</strong> Content from nearby edge (20-50ms vs 200ms+)</li><li><strong>Scalability:</strong> Handle traffic spikes without origin overload</li><li><strong>DDoS Protection:</strong> Attacks absorbed at edge</li><li><strong>Cost Savings:</strong> Reduced origin bandwidth</li></ul>

        <h2 className="md-h2">Cache-Control Headers</h2>
        <table>
          <tr><td><code className="inline-code">public</code></td><td>Cacheable by CDN and browser</td></tr>
          <tr><td><code className="inline-code">private</code></td><td>Only browser can cache</td></tr>
          <tr><td><code className="inline-code">max-age=N</code></td><td>Cache valid for N seconds</td></tr>
          <tr><td><code className="inline-code">s-maxage=N</code></td><td>CDN-specific TTL</td></tr>
          <tr><td><code className="inline-code">no-cache</code></td><td>Must revalidate before use</td></tr>
          <tr><td><code className="inline-code">no-store</code></td><td>Never cache</td></tr>
          <tr><td><code className="inline-code">immutable</code></td><td>Content won't change</td></tr>
        </table>

        <h3 className="md-h3">Recommended Configurations</h3>
        <ul><li><strong>Static assets (versioned):</strong> <code className="inline-code">max-age=31536000, immutable</code></li><li><strong>HTML pages:</strong> <code className="inline-code">max-age=60, stale-while-revalidate=30</code></li><li><strong>API responses:</strong> <code className="inline-code">private, max-age=0, no-cache</code></li></ul>

        <h2 className="md-h2">CDN Providers</h2>
        <ul><li><strong>Cloudflare:</strong> 300+ cities, free tier, Workers edge compute</li><li><strong>AWS CloudFront:</strong> 400+ locations, Lambda@Edge, tight AWS integration</li><li><strong>Fastly:</strong> Real-time purging (~150ms), VCL configuration</li><li><strong>Akamai:</strong> 4000+ locations, enterprise features</li></ul>

        <h2 className="md-h2">Cache Invalidation Strategies</h2>
        <ul><li><strong>TTL Expiration:</strong> Let cache expire naturally</li><li><strong>Purge/Invalidate:</strong> Remove content via API</li><li><strong>Versioned URLs:</strong> New version = new URL (most reliable)</li><li><strong>Stale-While-Revalidate:</strong> Serve stale, refresh in background</li></ul>

        <h2 className="md-h2">Edge Computing</h2>
        <p>Modern CDNs run code at edge locations for dynamic functionality:</p>
        <ul><li>A/B testing at edge</li><li>Geolocation routing</li><li>Authentication</li><li>Personalization</li></ul>

        <h2 className="md-h2">Key Takeaways</h2>
        <ul><li>CDNs reduce latency by serving content from nearby edge servers</li><li>Cache-Control headers define caching behavior</li><li>Versioned URLs are the most reliable invalidation strategy</li><li>Edge compute enables dynamic functionality without origin requests</li></ul>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex], answered = Object.keys(selectedAnswers).length;
    if (showResults) {
      const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;
      return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Quiz Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span><span className="score-label">Score</span></div><p className="score-detail">{score} of {total} correct</p></div><div className="results-review"><h3>Review</h3>{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><div className="review-header"><span className="review-number">Q{i+1}</span><span className={`review-badge ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}>{selectedAnswers[q.id]===q.correct?'✓':'✗'}</span></div><p className="review-question">{q.question}</p><div className="review-answers"><p><strong>Your answer:</strong> {q.options[selectedAnswers[q.id]]||'None'}</p>{selectedAnswers[q.id]!==q.correct&&<p><strong>Correct:</strong> {q.options[q.correct]}</p>}</div><div className="explanation">{q.explanation}</div></div>))}</div><div className="results-actions"><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div></div>);
    }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>CDN & Edge Caching Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-progress"><div className="progress-text">Question {currentQuestionIndex+1} of {total}</div><div className="progress-bar"><div className="progress-fill" style={{width:`${((currentQuestionIndex+1)/total)*100}%`}}></div></div><div className="answered-text">{answered} answered</div></div><div className="quiz-question-single"><div className="question-card"><div className="question-header"><span className="question-number">Q{currentQuestionIndex+1}</span></div><p className="question-text">{curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt; Prev</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''} ${selectedAnswers[q.id]!==undefined?'answered':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>Next &gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Configure CDN Caching</h1><span className="difficulty-badge intermediate">Intermediate</span></div><p className="assignment-description">Set up proper Cache-Control headers for different content types in a web application.</p></header><div className="assignment-body"><h3>Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Configure headers for static assets (images, CSS, JS) with versioned URLs</span></li><li><span className="req-number">2</span><span className="req-text">Set up HTML page caching with stale-while-revalidate</span></li><li><span className="req-number">3</span><span className="req-text">Configure API response caching appropriately</span></li><li><span className="req-number">4</span><span className="req-text">Implement cache purge mechanism</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Assignment</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span><span className="mobile-topic">{topic}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3><p>{concepts}</p></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav><div className="mobile-menu-footer"><div className="mobile-day-nav"><Link to="/hld/week/4/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/4/day/6" className="nav-link next">Day 6 &gt;&gt;</Link></div></div></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back to Course</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2><p className="day-concepts">{concepts}</p></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<><span className="nav-label">{t.label}</span><span className="nav-count">1</span></>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/4/day/4" className="nav-link prev">&lt;&lt; Day 4</Link><Link to="/hld/week/4/day/6" className="nav-link next">Day 6 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><div className="header-left"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></div><div className="header-right"><span className="progress-indicator">Week {weekNum}, Day {dayNum}</span></div></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week4Day5;
