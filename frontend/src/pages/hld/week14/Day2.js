import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week14Day2() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 14, dayNum = 2, topic = "CDN Caching Strategies", concepts = "TTL, cache keys, invalidation, push vs pull";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What is TTL in CDN caching?", options: ["Total Transfer Load", "Time To Live - how long content stays cached", "Transfer Type Logic", "Time Table List"], correct: 1, explanation: "TTL (Time To Live) determines how long content remains in CDN cache before expiring and being refetched." },
    { id: 2, question: "What is Pull CDN?", options: ["CDN fetches from origin on first request", "You upload to CDN manually", "CDN pulls from users", "Removing content"], correct: 0, explanation: "Pull CDN fetches content from origin on first request, then caches it. Most common model." },
    { id: 3, question: "What is Push CDN?", options: ["Automatic caching", "You proactively upload content to CDN", "User uploads", "Load balancing"], correct: 1, explanation: "Push CDN requires you to proactively upload content to edge servers, giving more control." },
    { id: 4, question: "What is cache invalidation?", options: ["Adding to cache", "Forcing CDN to clear cached content before TTL expires", "Blocking users", "DNS update"], correct: 1, explanation: "Cache invalidation forces the CDN to remove or refresh cached content before its normal TTL expiration." },
    { id: 5, question: "What header controls CDN caching?", options: ["X-CDN-Cache", "Cache-Control", "CDN-TTL", "Content-Cache"], correct: 1, explanation: "Cache-Control header with directives like max-age, public, private controls how CDNs cache content." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>CDN Caching Strategies</p></div></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>CDN Caching Strategies</h1><div className="article-tags"><span className="tag">TTL</span><span className="tag">Invalidation</span><span className="tag">Push</span><span className="tag">Pull</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Push vs Pull CDN</h2>
        <table className="comparison-table">
          <thead><tr><th>Aspect</th><th>Pull CDN</th><th>Push CDN</th></tr></thead>
          <tbody>
            <tr><td className="feature-name">How it works</td><td>CDN fetches on first request</td><td>You upload content proactively</td></tr>
            <tr><td className="feature-name">Control</td><td>Less control, automatic</td><td>Full control over what's cached</td></tr>
            <tr><td className="feature-name">Best for</td><td>Dynamic content, frequent updates</td><td>Large static files, predictable content</td></tr>
            <tr><td className="feature-name">Cold start</td><td>First request hits origin</td><td>No cold start if pre-pushed</td></tr>
            <tr><td className="feature-name">Examples</td><td>CloudFlare, Fastly</td><td>AWS S3 + CloudFront</td></tr>
          </tbody>
        </table>

        <h2 className="md-h2">Cache Control Headers</h2>
        <div className="concept-cards">
          <div className="concept-card"><div className="concept-card-icon">⏱️</div><div className="concept-card-title">max-age</div><div className="concept-card-description">max-age=31536000 (1 year for static)</div></div>
          <div className="concept-card"><div className="concept-card-icon">🌐</div><div className="concept-card-title">public</div><div className="concept-card-description">Allow CDN and browser caching</div></div>
          <div className="concept-card"><div className="concept-card-icon">🔒</div><div className="concept-card-title">private</div><div className="concept-card-description">Browser only, not CDN (user-specific)</div></div>
          <div className="concept-card"><div className="concept-card-icon">🚫</div><div className="concept-card-title">no-cache</div><div className="concept-card-description">Revalidate with origin every time</div></div>
        </div>

        <h2 className="md-h2">Cache Key Components</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><div className="step-content"><h4>URL Path</h4><p>/images/logo.png - base cache key</p></div></div>
          <div className="step-card"><div className="step-number">2</div><div className="step-content"><h4>Query String</h4><p>?v=1.2 - version for cache busting</p></div></div>
          <div className="step-card"><div className="step-number">3</div><div className="step-content"><h4>Headers</h4><p>Accept-Encoding, Accept-Language variations</p></div></div>
          <div className="step-card"><div className="step-number">4</div><div className="step-content"><h4>Cookies</h4><p>User-specific caching (rare, use carefully)</p></div></div>
        </div>

        <h2 className="md-h2">Cache Invalidation</h2>
        <div className="pros-cons">
          <div className="pros-section" style={{borderTopColor: '#10B981'}}>
            <h4 style={{color: '#10B981'}}>✅ Methods</h4>
            <ul>
              <li>Purge by URL - clear specific file</li>
              <li>Purge by tag - clear related content</li>
              <li>Purge all - nuclear option</li>
              <li>Soft purge - serve stale while fetching</li>
            </ul>
          </div>
          <div className="cons-section" style={{borderTopColor: '#F59E0B'}}>
            <h4 style={{color: '#F59E0B'}}>Best Practices</h4>
            <ul style={{listStyle: 'none'}}>
              <li>→ Use versioned URLs for assets</li>
              <li>→ Short TTL for HTML, long for assets</li>
              <li>→ Cache tags for grouped invalidation</li>
              <li>→ Instant purge for critical updates</li>
            </ul>
          </div>
        </div>

        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <h4>Key Takeaways</h4>
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>Pull CDN: automatic, most common for web apps</li>
              <li>Push CDN: control, best for large media</li>
              <li>Use versioned URLs to avoid invalidation</li>
              <li>Cache-Control header controls caching behavior</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Caching Strategies Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>Caching Configuration</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Configure Cache-Control headers for: HTML (5 min), CSS/JS (1 year), images (1 month)</span></li><li><span className="req-number">2</span><span className="req-text">Implement cache busting with file hashes in build process</span></li><li><span className="req-number">3</span><span className="req-text">Design invalidation strategy for product catalog updates</span></li><li><span className="req-number">4</span><span className="req-text">Set up cache tags for grouped purging</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/14/day/1" className="nav-link prev">&lt;&lt; Day 1</Link><Link to="/hld/week/14/day/3" className="nav-link next">Day 3 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week14Day2;
