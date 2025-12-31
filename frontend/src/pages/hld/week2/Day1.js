import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../HLDDay.css';
import '../ArticleContent.css';

function Week2Day1() {
  const [activeTab, setActiveTab] = useState('article');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const weekNum = 2, dayNum = 1, topic = "DNS & Domain Resolution", concepts = "DNS hierarchy, Record types, GeoDNS, TTL";
  const tabs = [{ id: 'video', label: 'Video', icon: '🎬', available: true, color: '#E91E63' },{ id: 'article', label: 'Article', icon: '📖', available: true, color: '#2196F3' },{ id: 'quiz', label: 'Quiz', icon: '✅', available: true, color: '#9C27B0' },{ id: 'assignment', label: 'Assignment', icon: '📝', available: true, color: '#FF9800' }];

  const quizQuestions = [
    { id: 1, question: "What does DNS stand for?", options: ["Domain Name System", "Digital Network Service", "Data Network System", "Domain Network Service"], correct: 0, explanation: "DNS = Domain Name System - translates domain names to IP addresses." },
    { id: 2, question: "Which DNS record type maps a domain to an IP?", options: ["CNAME", "MX", "A", "TXT"], correct: 2, explanation: "A record maps a domain name to an IPv4 address." },
    { id: 3, question: "What is TTL in DNS?", options: ["Total Transfer Length", "Time To Live - cache duration", "Transfer Time Limit", "Type To Load"], correct: 1, explanation: "TTL determines how long DNS records are cached before refresh." },
    { id: 4, question: "What is GeoDNS used for?", options: ["Security", "Routing users to nearest server based on location", "Email routing", "Caching"], correct: 1, explanation: "GeoDNS returns different IPs based on user's geographic location." },
    { id: 5, question: "DNS hierarchy order (top to bottom)?", options: ["Root → TLD → Authoritative", "TLD → Root → Authoritative", "Authoritative → TLD → Root", "Root → Authoritative → TLD"], correct: 0, explanation: "DNS hierarchy: Root servers → TLD servers (.com) → Authoritative servers." }
  ];

  const handleAnswerSelect = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));

  const renderVideoContent = () => (<div className="content-panel video-panel"><div className="video-container"><div className="video-player"><div className="video-placeholder"><div className="play-button"><span>▶</span></div><p>DNS & Domain Resolution</p></div></div><div className="video-details"><h2>Understanding DNS</h2><p className="video-description">Learn how DNS works, record types, and how domain names are resolved to IP addresses.</p></div></div></div>);

  const renderArticleContent = () => (
    <div className="content-panel article-panel"><article className="article-container"><header className="article-header"><h1>DNS & Domain Resolution</h1><div className="article-tags"><span className="tag">DNS</span><span className="tag">Networking</span><span className="tag">Infrastructure</span></div></header>
      <div className="article-content">
        <h2 className="md-h2">What is DNS?</h2>
        <p><strong>DNS (Domain Name System)</strong> is the "phonebook of the internet" - it translates human-readable domain names (like google.com) to machine-readable IP addresses (like 142.250.190.14).</p>
        
        <div className="info-box note">
          <div className="info-box-icon">🌐</div>
          <div className="info-box-content">
            <h4>Why DNS Matters</h4>
            <p>Without DNS, you'd need to remember IP addresses like 142.250.190.14 instead of google.com. DNS makes the internet human-friendly!</p>
          </div>
        </div>

        {/* DNS Hierarchy Diagram */}
        <h2 className="md-h2">DNS Hierarchy</h2>
        <div className="diagram-container">
          <div className="diagram-title">DNS Server Hierarchy</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node" style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white'}}>
                <span className="flow-node-icon">🌍</span>
                <span className="flow-node-label">Root Servers</span>
                <span className="flow-node-sublabel">13 root server clusters (a-m)</span>
              </div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node dns">
                <span className="flow-node-icon">🏷️</span>
                <span className="flow-node-label">TLD Servers</span>
                <span className="flow-node-sublabel">.com, .org, .net, .io</span>
              </div>
            </div>
            <div className="flow-arrow down">↓</div>
            <div className="flow-row">
              <div className="flow-node server">
                <span className="flow-node-icon">📋</span>
                <span className="flow-node-label">Authoritative Servers</span>
                <span className="flow-node-sublabel">Holds actual DNS records</span>
              </div>
            </div>
          </div>
        </div>

        {/* DNS Resolution Flow */}
        <h2 className="md-h2">DNS Resolution Flow</h2>
        <div className="diagram-container">
          <div className="diagram-title">Complete DNS Lookup Process</div>
          <svg viewBox="0 0 800 400" className="svg-diagram" style={{maxHeight: '400px'}}>
            {/* Background */}
            <defs>
              <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#667eea'}} />
                <stop offset="100%" style={{stopColor:'#764ba2'}} />
              </linearGradient>
              <linearGradient id="resolverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#f093fb'}} />
                <stop offset="100%" style={{stopColor:'#f5576c'}} />
              </linearGradient>
              <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#4facfe'}} />
                <stop offset="100%" style={{stopColor:'#00f2fe'}} />
              </linearGradient>
              <linearGradient id="tldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#43e97b'}} />
                <stop offset="100%" style={{stopColor:'#38f9d7'}} />
              </linearGradient>
              <linearGradient id="authGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#fa709a'}} />
                <stop offset="100%" style={{stopColor:'#fee140'}} />
              </linearGradient>
            </defs>
            
            {/* Client */}
            <rect x="20" y="160" width="100" height="80" rx="10" fill="url(#clientGrad)" />
            <text x="70" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">👤 Client</text>
            <text x="70" y="215" textAnchor="middle" fill="white" fontSize="10">Browser</text>
            
            {/* Recursive Resolver */}
            <rect x="180" y="160" width="120" height="80" rx="10" fill="url(#resolverGrad)" />
            <text x="240" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🔄 Resolver</text>
            <text x="240" y="215" textAnchor="middle" fill="white" fontSize="10">ISP/8.8.8.8</text>
            
            {/* Root Server */}
            <rect x="360" y="40" width="100" height="70" rx="10" fill="url(#rootGrad)" />
            <text x="410" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">🌍 Root</text>
            <text x="410" y="90" textAnchor="middle" fill="white" fontSize="9">a.root-servers.net</text>
            
            {/* TLD Server */}
            <rect x="520" y="120" width="100" height="70" rx="10" fill="url(#tldGrad)" />
            <text x="570" y="150" textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">🏷️ TLD</text>
            <text x="570" y="170" textAnchor="middle" fill="#333" fontSize="9">.com servers</text>
            
            {/* Authoritative Server */}
            <rect x="660" y="200" width="120" height="70" rx="10" fill="url(#authGrad)" />
            <text x="720" y="230" textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">📋 Authoritative</text>
            <text x="720" y="250" textAnchor="middle" fill="#333" fontSize="9">ns1.example.com</text>
            
            {/* Arrows with labels */}
            <path d="M120 200 L175 200" stroke="#667eea" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="147" y="190" textAnchor="middle" fontSize="9" fill="#666">1. Query</text>
            
            <path d="M300 180 L355 90" stroke="#f093fb" strokeWidth="2" strokeDasharray="5,3" />
            <text x="320" y="125" textAnchor="middle" fontSize="9" fill="#666">2. Root?</text>
            
            <path d="M460 75 L515 135" stroke="#4facfe" strokeWidth="2" strokeDasharray="5,3" />
            <text x="500" y="95" textAnchor="middle" fontSize="9" fill="#666">3. TLD ref</text>
            
            <path d="M620 155 L655 215" stroke="#43e97b" strokeWidth="2" strokeDasharray="5,3" />
            <text x="650" y="175" textAnchor="middle" fontSize="9" fill="#666">4. Auth ref</text>
            
            <path d="M660 250 L305 220" stroke="#fa709a" strokeWidth="2" />
            <text x="480" y="260" textAnchor="middle" fontSize="9" fill="#666">5. IP: 93.184.216.34</text>
            
            <path d="M180 220 L125 220" stroke="#667eea" strokeWidth="2" />
            <text x="147" y="235" textAnchor="middle" fontSize="9" fill="#666">6. Response</text>
            
            {/* Cache indicator */}
            <rect x="180" y="260" width="120" height="30" rx="5" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="240" y="280" textAnchor="middle" fontSize="10" fill="#475569">💾 Cache for TTL</text>
          </svg>
        </div>

        {/* Step by Step Resolution */}
        <h2 className="md-h2">Resolution Steps Explained</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Browser Cache Check</h4>
              <p>Browser first checks its local DNS cache. If found and TTL not expired, returns immediately.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>OS Cache Check</h4>
              <p>If not in browser cache, checks the operating system's DNS cache (hosts file, system resolver).</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Recursive Resolver Query</h4>
              <p>Query sent to recursive resolver (ISP or public DNS like 8.8.8.8). It may have cached response.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Root Server Query</h4>
              <p>Resolver asks root server "Where is .com?". Root returns TLD server addresses.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>TLD Server Query</h4>
              <p>Resolver asks TLD server "Where is example.com?". TLD returns authoritative nameserver.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">6</div>
            <div className="step-content">
              <h4>Authoritative Response</h4>
              <p>Authoritative server returns the actual IP address. Resolver caches it and returns to client.</p>
            </div>
          </div>
        </div>

        {/* DNS Record Types */}
        <h2 className="md-h2">DNS Record Types</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Record</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feature-name">A</td>
              <td>Maps domain to IPv4 address</td>
              <td><code>example.com → 93.184.216.34</code></td>
            </tr>
            <tr>
              <td className="feature-name">AAAA</td>
              <td>Maps domain to IPv6 address</td>
              <td><code>example.com → 2606:2800:220:1::</code></td>
            </tr>
            <tr>
              <td className="feature-name">CNAME</td>
              <td>Alias to another domain</td>
              <td><code>www.example.com → example.com</code></td>
            </tr>
            <tr>
              <td className="feature-name">MX</td>
              <td>Mail server for domain</td>
              <td><code>example.com → mail.example.com</code></td>
            </tr>
            <tr>
              <td className="feature-name">NS</td>
              <td>Authoritative nameservers</td>
              <td><code>example.com → ns1.example.com</code></td>
            </tr>
            <tr>
              <td className="feature-name">TXT</td>
              <td>Text data (verification, SPF)</td>
              <td><code>v=spf1 include:_spf.google.com</code></td>
            </tr>
          </tbody>
        </table>

        {/* TTL Explanation */}
        <h2 className="md-h2">TTL (Time To Live)</h2>
        <div className="concept-cards">
          <div className="concept-card">
            <div className="concept-card-icon">⏱️</div>
            <div className="concept-card-title">Low TTL (60-300s)</div>
            <div className="concept-card-description">Fast propagation, good for frequent changes. More DNS queries, higher load.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🕐</div>
            <div className="concept-card-title">High TTL (3600-86400s)</div>
            <div className="concept-card-description">Fewer queries, better performance. Slower propagation for changes.</div>
          </div>
          <div className="concept-card">
            <div className="concept-card-icon">🎯</div>
            <div className="concept-card-title">Best Practice</div>
            <div className="concept-card-description">Use 300s normally, lower to 60s before planned changes, raise after.</div>
          </div>
        </div>

        {/* GeoDNS */}
        <h2 className="md-h2">GeoDNS (Geographic DNS)</h2>
        <div className="diagram-container">
          <div className="diagram-title">GeoDNS Load Distribution</div>
          <div className="flow-diagram">
            <div className="flow-row">
              <div className="flow-node client">
                <span className="flow-node-icon">👤</span>
                <span className="flow-node-label">User in USA</span>
              </div>
              <div className="flow-node client" style={{background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'}}>
                <span className="flow-node-icon">👤</span>
                <span className="flow-node-label">User in Europe</span>
              </div>
              <div className="flow-node client" style={{background: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)'}}>
                <span className="flow-node-icon">👤</span>
                <span className="flow-node-label">User in Asia</span>
              </div>
            </div>
            <div className="flow-arrow down">↓ GeoDNS ↓</div>
            <div className="flow-row">
              <div className="flow-node server">
                <span className="flow-node-icon">🖥️</span>
                <span className="flow-node-label">US-East Server</span>
                <span className="flow-node-sublabel">52.1.2.3</span>
              </div>
              <div className="flow-node server" style={{background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'}}>
                <span className="flow-node-icon">🖥️</span>
                <span className="flow-node-label">EU-West Server</span>
                <span className="flow-node-sublabel">34.5.6.7</span>
              </div>
              <div className="flow-node server" style={{background: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)'}}>
                <span className="flow-node-icon">🖥️</span>
                <span className="flow-node-label">Asia-Pacific</span>
                <span className="flow-node-sublabel">13.8.9.10</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-icon">💡</div>
          <div className="info-box-content">
            <h4>GeoDNS Benefits</h4>
            <p>Reduces latency by routing users to nearest data center. Used by CDNs and global services like Netflix, Google, and AWS.</p>
          </div>
        </div>

        {/* Key Takeaways */}
        <h2 className="md-h2">Key Takeaways</h2>
        <div className="info-box note">
          <div className="info-box-icon">📌</div>
          <div className="info-box-content">
            <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
              <li>DNS translates domain names to IP addresses</li>
              <li>Hierarchy: Root → TLD → Authoritative servers</li>
              <li>A records for IPv4, AAAA for IPv6, CNAME for aliases</li>
              <li>TTL controls cache duration - balance between performance and flexibility</li>
              <li>GeoDNS routes users to nearest servers for lower latency</li>
            </ul>
          </div>
        </div>
      </div>
    </article></div>
  );

  const renderQuizContent = () => {
    const total = quizQuestions.length, curr = quizQuestions[currentQuestionIndex];
    if (showResults) { const score = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length; return (<div className="content-panel quiz-panel"><div className="quiz-container"><div className="quiz-results"><div className="results-header"><h2>Complete!</h2><div className="score-circle"><span className="score-value">{Math.round((score/total)*100)}%</span></div></div><div className="results-review">{quizQuestions.map((q,i)=>(<div key={q.id} className={`review-item ${selectedAnswers[q.id]===q.correct?'correct':'incorrect'}`}><p>Q{i+1}: {q.question}</p><div className="explanation">{q.explanation}</div></div>))}</div><button className="retry-btn" onClick={()=>{setSelectedAnswers({});setShowResults(false);setCurrentQuestionIndex(0);}}>Retry</button></div></div></div>); }
    return (<div className="content-panel quiz-panel"><div className="quiz-container"><header className="quiz-header"><h1>DNS Quiz</h1></header><div className="quiz-question-single"><div className="question-card"><p className="question-text">Q{currentQuestionIndex+1}: {curr.question}</p><div className="options-list">{curr.options.map((o,i)=>(<label key={i} className={`option-item ${selectedAnswers[curr.id]===i?'selected':''}`}><input type="radio" checked={selectedAnswers[curr.id]===i} onChange={()=>handleAnswerSelect(curr.id,i)}/><span className="option-letter">{String.fromCharCode(65+i)}</span><span className="option-text">{o}</span></label>))}</div></div></div><div className="quiz-navigation"><button className="nav-btn prev" disabled={currentQuestionIndex===0} onClick={()=>setCurrentQuestionIndex(i=>i-1)}>&lt;&lt;</button><div className="question-dots">{quizQuestions.map((q,i)=>(<button key={i} className={`dot ${i===currentQuestionIndex?'active':''}`} onClick={()=>setCurrentQuestionIndex(i)}>{i+1}</button>))}</div>{currentQuestionIndex===total-1?<button className="nav-btn submit" onClick={()=>setShowResults(true)}>Submit</button>:<button className="nav-btn next" onClick={()=>setCurrentQuestionIndex(i=>i+1)}>&gt;&gt;</button>}</div></div></div>);
  };

  const renderAssignmentContent = () => (<div className="content-panel assignment-panel"><div className="assignment-container"><header className="assignment-header"><h1>DNS Lookup Exercise</h1></header><div className="assignment-body"><ul className="requirements-list"><li><span className="req-number">1</span><span className="req-text">Use nslookup or dig to query DNS records for 3 websites</span></li><li><span className="req-number">2</span><span className="req-text">Document A, CNAME, MX, and NS records found</span></li><li><span className="req-number">3</span><span className="req-text">Explain the DNS resolution path for each</span></li></ul></div></div></div>);

  return (
    <div className="hld-day-layout">
      <div className="mobile-header"><Link to="/hld" className="mobile-back-link">&lt;&lt;</Link><div className="mobile-title"><span className="mobile-week-badge">W{weekNum}D{dayNum}</span></div><button className="mobile-menu-btn" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}><span className={`hamburger ${mobileMenuOpen?'open':''}`}></span></button></div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen?'open':''}`} onClick={()=>setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen?'open':''}`}><div className="mobile-menu-header"><div className="mobile-menu-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h3>{topic}</h3></div></div><nav className="mobile-menu-nav">{tabs.map(t=>(<button key={t.id} className={`mobile-nav-item ${activeTab===t.id?'active':''}`} onClick={()=>{setActiveTab(t.id);setMobileMenuOpen(false);}} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span><span className="nav-label">{t.label}</span></button>))}</nav></div>
      <aside className={`sidebar ${sidebarCollapsed?'collapsed':''}`}><div className="sidebar-header"><Link to="/hld" className="back-link"><span className="back-icon">&lt;&lt;</span>{!sidebarCollapsed&&<span>Back</span>}</Link><button className="collapse-btn" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?'>>':'<<'}</button></div>{!sidebarCollapsed&&<div className="sidebar-info"><div className="week-badge">Week {weekNum} • Day {dayNum}</div><h2 className="day-topic">{topic}</h2></div>}<nav className="sidebar-nav">{tabs.map(t=>(<button key={t.id} className={`nav-item ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)} style={{'--tab-color':t.color}}><span className="nav-icon">{t.icon}</span>{!sidebarCollapsed&&<span className="nav-label">{t.label}</span>}</button>))}</nav>{!sidebarCollapsed&&<div className="sidebar-footer"><div className="day-navigation"><Link to="/hld/week/1/day/7" className="nav-link prev">&lt;&lt; W1D7</Link><Link to="/hld/week/2/day/2" className="nav-link next">Day 2 &gt;&gt;</Link></div></div>}</aside>
      <main className="main-content"><header className="content-header"><span className="content-type" style={{'--type-color':tabs.find(t=>t.id===activeTab)?.color}}>{tabs.find(t=>t.id===activeTab)?.icon} {tabs.find(t=>t.id===activeTab)?.label}</span></header><div className="content-body">{activeTab==='video'&&renderVideoContent()}{activeTab==='article'&&renderArticleContent()}{activeTab==='quiz'&&renderQuizContent()}{activeTab==='assignment'&&renderAssignmentContent()}</div></main>
    </div>
  );
}

export default Week2Day1;
