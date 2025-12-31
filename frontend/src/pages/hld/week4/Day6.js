import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDDayState } from '../../../hooks/usePersistedState';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week4Day6() {
  const weekNum = 4, dayNum = 6;
  const topic = "Performance Optimization";
  
  const {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz
  } = useHLDDayState(weekNum, dayNum);
  const concepts = "Profiling, Bottlenecks, N+1 queries";

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', available: true, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', available: true, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', available: true, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }
  ];

  const quizQuestions = [
    { id: 1, question: "What is the N+1 query problem?", options: ["Database connection limit", "1 query to get N items, then N queries for related data", "Query timeout issues", "Index fragmentation"], correct: 1, explanation: "N+1 occurs when code executes 1 query for a list, then N additional queries for related data per item." },
    { id: 2, question: "How do you fix N+1 queries in ORMs?", options: ["Add more indexes", "Use eager loading (JOIN) or batch loading (IN clause)", "Increase connection pool", "Add more cache"], correct: 1, explanation: "Eager loading (select_related/JOIN) or batch loading (prefetch_related/IN) reduces N+1 to 1-2 queries." },
    { id: 3, question: "What SQL command analyzes query execution plans?", options: ["DESCRIBE", "EXPLAIN", "ANALYZE", "PROFILE"], correct: 1, explanation: "EXPLAIN ANALYZE shows how the database executes a query and helps identify bottlenecks." },
    { id: 4, question: "What does 'Seq Scan' in EXPLAIN output indicate?", options: ["Optimized query", "Full table scan - needs index", "Using cache", "Parallel execution"], correct: 1, explanation: "Seq Scan means full table scan, indicating a missing or unused index." },
    { id: 5, question: "What is the trade-off of adding database indexes?", options: ["No trade-off", "Faster reads but slower writes", "More memory only", "Slower reads"], correct: 1, explanation: "Indexes speed up reads but slow down writes since INSERT/UPDATE/DELETE must update indexes too." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (
    <div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>Performance Optimization - Video Lesson</p></div></div><div className="video-details"><h2>Finding and Fixing Performance Bottlenecks</h2><p className="video-description">Learn to identify N+1 queries, optimize database queries, and apply strategic caching for better performance.</p><div className="video-meta"><span className="meta-item"><span className="meta-icon">⏱️</span> 26 min</span><span className="meta-item"><span className="meta-icon">📊</span> Advanced</span></div></div></div></div>
  );

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>Performance Optimization</h1><div className="article-meta"><span className="meta-item"><span className="meta-icon">📖</span> 14 min read</span></div><div className="article-tags"><span className="tag">N+1 Queries</span><span className="tag">Database</span><span className="tag">Profiling</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">Common Performance Bottlenecks</h2>
        <ul>
          <li><strong>Database:</strong> Slow queries, missing indexes, N+1 problems</li>
          <li><strong>Network:</strong> Too many round trips, large payloads</li>
          <li><strong>Memory:</strong> Leaks, large objects, GC pauses</li>
          <li><strong>CPU:</strong> Heavy computation, synchronous processing</li>
        </ul>

        <h2 className="md-h2">The N+1 Query Problem</h2>
        <p>N+1 occurs when code executes 1 query to get N items, then N additional queries to get related data for each item.</p>
        
        <h3 className="md-h3">Example (Bad)</h3>
        <p><code className="inline-code">orders = Order.objects.all()[:100]</code> # 1 query</p>
        <p>For each order: <code className="inline-code">order.customer.name</code> # 100 queries!</p>
        <p><strong>Total: 101 database queries for 100 orders!</strong></p>

        <h3 className="md-h3">Solution 1: Eager Loading (JOIN)</h3>
        <p><code className="inline-code">Order.objects.select_related('customer').all()</code></p>
        <p>Single query with JOIN - Total: 1 query</p>

        <h3 className="md-h3">Solution 2: Batch Loading (IN clause)</h3>
        <p><code className="inline-code">Post.objects.prefetch_related('comments').all()</code></p>
        <p>Query 1: SELECT posts | Query 2: SELECT comments WHERE post_id IN (...)</p>
        <p>Total: 2 queries regardless of N</p>

        <h3 className="md-h3">Solution 3: DataLoader (GraphQL)</h3>
        <p>Batches requests within a single tick - automatically coalesces N individual loads into 1 batch query.</p>

        <h2 className="md-h2">Database Query Optimization</h2>
        
        <h3 className="md-h3">Use EXPLAIN</h3>
        <p><code className="inline-code">EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 123;</code></p>
        <ul>
          <li><strong>Seq Scan:</strong> Full table scan - needs index</li>
          <li><strong>Index Scan:</strong> Using index efficiently</li>
          <li><strong>Index Only Scan:</strong> Best case - data from index</li>
        </ul>

        <h3 className="md-h3">Index Best Practices</h3>
        <ul>
          <li>Add indexes on columns in WHERE, JOIN, ORDER BY</li>
          <li>Composite indexes: column order matters</li>
          <li>Partial indexes for specific conditions</li>
          <li>Don't over-index - indexes slow down writes</li>
        </ul>

        <h2 className="md-h2">Strategic Caching</h2>
        <table>
          <tr><td><strong>Layer</strong></td><td><strong>What to Cache</strong></td><td><strong>TTL</strong></td></tr>
          <tr><td>Browser + CDN</td><td>Static assets</td><td>1 year (versioned)</td></tr>
          <tr><td>CDN + App</td><td>API responses (public)</td><td>1-60 minutes</td></tr>
          <tr><td>Redis</td><td>Sessions, query results</td><td>5-30 minutes</td></tr>
          <tr><td>Redis</td><td>Computed data</td><td>Minutes to hours</td></tr>
        </table>

        <h2 className="md-h2">Key Takeaways</h2>
        <ul>
          <li><strong>Profile before optimizing</strong> - measure to find actual bottlenecks</li>
          <li><strong>N+1 queries</strong> are common - use eager/batch loading</li>
          <li><strong>Use EXPLAIN</strong> to analyze database query performance</li>
          <li><strong>Add indexes strategically</strong> - balance read/write performance</li>
          <li><strong>Cache at multiple layers</strong> - Browser, CDN, Application, Database</li>
        </ul>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex], answered = Object.keys(selectedAnswers).length;
    if (showResults) {
      const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;
      return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Quiz Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span><span className="score-label">Score</span></div><p className="score-detail">{score} of {total} correct</p></div><div className="results-review"><h3>Review</h3>{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><div className="review-header"><span className="review-number">Q{i+1}</span><span className={`review-badge ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}>{selectedAnswers[q.id]===q.correct?'✓':'✗'}</span></div><p className="review-question">{q.question}</p><div className="review-answers"><p><strong>Your answer:</strong> {q.options[selectedAnswers[q.id]]||'None'}</p>{selectedAnswers[q.id]!==q.correct&&<p><strong>Correct:</strong> {q.options[q.correct]}</p>}</div><div className="explanation">{q.explanation}</div></div>))}</div><div className="results-actions"><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div></div>);
    }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>Performance Optimization Quiz</h1><div className="quiz-stats"><div className="stat-card"><span className="stat-value">{total}</span><span className="stat-label">Questions</span></div></div></header><div className="quiz-progress"><div className="progress-text">Question {currentQuestionIndex+1} of {total}</div><div className="progress-bar"><div className="progress-fill" style={{width:`${((currentQuestionIndex+1)/total)*100}%`}}></div></div><div className="answered-text">{answered} answered</div></div><div className="quiz-question-single"><div className="question-card"><div className="question-header"><span className="question-number">Q{currentQuestionIndex+1}</span></div><p className="question-text">{curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt; Prev</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''} ${selectedAnswers[q.id]!==undefined?'answered':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>Next &gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><div className="assignment-title-row"><h1>Fix N+1 Query Problem</h1><span className="difficulty-badge intermediate">Intermediate</span></div><p className="assignment-description">Identify and fix N+1 queries in a sample application using eager and batch loading.</p></header><div className="assignment-body"><h3>Requirements</h3><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Identify N+1 queries using query logging</span></li><li><span className="req-number">2</span><span className="req-text">Fix using select_related for ForeignKey relationships</span></li><li><span className="req-number">3</span><span className="req-text">Fix using prefetch_related for ManyToMany relationships</span></li><li><span className="req-number">4</span><span className="req-text">Measure before/after query counts and response times</span></li></ul></div><div className="assignment-actions"><button className="start-btn">Start Assignment</button></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span><span className="mobile-topic">{topic}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3><p>{concepts}</p></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav><div className="mobile-menu-footer"><div className="mobile-day-nav"><Link to="/hld/week/4/day/5" className="nav-link prev">&lt;&lt; Day 5</Link><Link to="/hld/week/4/day/7" className="nav-link next">Day 7 &gt;&gt;</Link></div></div></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back to Course</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2><p className="day-concepts">{concepts}</p></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<><span className="nav-label">{t.label}</span><span className="nav-count">1</span></>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/4/day/5" className="nav-link prev">&lt;&lt; Day 5</Link><Link to="/hld/week/4/day/7" className="nav-link next">Day 7 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><div className="header-left"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></div><div className="header-right"><span className="progress-indicator">Week {weekNum}, Day {dayNum}</span></div></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week4Day6;
