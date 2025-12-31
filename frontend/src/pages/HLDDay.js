import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tutorialsApi, contentApi, quizzesApi, assignmentsApi } from '../api';
import './HLDDay.css';

const QUIZ_STORAGE_PREFIX = 'hld_quiz_state_';
const TAB_STORAGE_PREFIX = 'hld_active_tab_';

function HLDDay() {
  const { week, day } = useParams();
  const [activeTab, setActiveTab] = useState(() => {
    // Load saved tab from localStorage on initial render
    const savedTab = localStorage.getItem(`${TAB_STORAGE_PREFIX}${week}_${day}`);
    return savedTab || 'article';
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState({
    tutorials: [],
    content: [],
    quizzes: [],
    assignments: []
  });
  const [loading, setLoading] = useState(true);
  
  // Quiz state with persistence
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  
  const timerRef = useRef(null);

  const weekNum = parseInt(week);
  const dayNum = parseInt(day);
  const quizStorageKey = `${QUIZ_STORAGE_PREFIX}${weekNum}_${dayNum}`;
  const tabStorageKey = `${TAB_STORAGE_PREFIX}${weekNum}_${dayNum}`;

  const weekStructure = {
    1: {
      title: 'Introduction to System Design & Requirements Engineering',
      days: {
        1: { topic: 'What is System Design?', type: 'content', concepts: 'HLD vs LLD, System components, Architecture overview' },
        2: { topic: 'Functional & Non-Functional Requirements', type: 'content', concepts: 'Requirements gathering, MoSCoW, User stories' },
        3: { topic: 'Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on Days 1-2 concepts' },
        4: { topic: 'Scalability Fundamentals', type: 'content', concepts: 'Vertical vs Horizontal scaling, Stateless design' },
        5: { topic: 'Back-of-Envelope Estimation', type: 'content', concepts: 'Traffic estimation, Storage calculation, Bandwidth' },
        6: { topic: 'System Design Framework', type: 'content', concepts: 'RESHADED framework, Interview approach' },
        7: { topic: 'Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Design a Pastebin' }
      }
    },
    2: {
      title: 'Networking Fundamentals & Communication Protocols',
      days: {
        1: { topic: 'DNS & Domain Resolution', type: 'content', concepts: 'DNS hierarchy, Record types, GeoDNS, TTL' },
        2: { topic: 'HTTP/HTTPS Protocols', type: 'content', concepts: 'HTTP methods, Status codes, TLS, HTTP/2' },
        3: { topic: 'Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on DNS and HTTP protocols' },
        4: { topic: 'TCP vs UDP', type: 'content', concepts: 'Transport layer, 3-way handshake, QUIC protocol' },
        5: { topic: 'REST API Design', type: 'content', concepts: 'REST principles, Versioning, Pagination' },
        6: { topic: 'GraphQL, gRPC & WebSockets', type: 'content', concepts: 'Query language, Protocol buffers, Real-time' },
        7: { topic: 'Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Design a Chat System' }
      }
    }
  };

  const defaultDay = { topic: `Day ${dayNum}`, type: 'content', concepts: 'System Design concepts' };
  const currentWeek = weekStructure[weekNum] || { title: `Week ${weekNum}`, days: {} };
  const currentDay = currentWeek?.days[dayNum] || defaultDay;

  // Load saved quiz state on mount
  useEffect(() => {
    const savedState = localStorage.getItem(quizStorageKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.selectedAnswers) setSelectedAnswers(parsed.selectedAnswers);
        if (typeof parsed.currentQuestionIndex === 'number') setCurrentQuestionIndex(parsed.currentQuestionIndex);
        if (parsed.quizStarted) setQuizStarted(parsed.quizStarted);
        if (parsed.showResults) setShowResults(parsed.showResults);
        
        // Calculate remaining time
        if (parsed.startTime && parsed.quizStarted && !parsed.showResults && parsed.timeLimit) {
          const elapsed = Math.floor((Date.now() - parsed.startTime) / 1000);
          const remaining = Math.max(0, (parsed.timeLimit * 60) - elapsed);
          setTimeRemaining(remaining);
          if (remaining === 0) {
            setShowResults(true);
            setAutoSubmitted(true);
          }
        }
      } catch (e) {
        console.error('Error loading quiz state:', e);
      }
    }
  }, [quizStorageKey]);

  // Save quiz state whenever it changes
  useEffect(() => {
    if (!quizStarted) return;
    
    const existingState = localStorage.getItem(quizStorageKey);
    let startTime = Date.now();
    let timeLimit = 15;
    
    if (existingState) {
      try {
        const parsed = JSON.parse(existingState);
        if (parsed.startTime) startTime = parsed.startTime;
        if (parsed.timeLimit) timeLimit = parsed.timeLimit;
      } catch (e) {}
    }

    const quiz = data.quizzes[0];
    if (quiz) {
      timeLimit = quiz.time_limit || 15;
    }

    const state = {
      selectedAnswers,
      currentQuestionIndex,
      quizStarted,
      showResults,
      startTime,
      timeLimit,
      lastUpdated: Date.now()
    };
    
    localStorage.setItem(quizStorageKey, JSON.stringify(state));
  }, [selectedAnswers, currentQuestionIndex, quizStarted, showResults, quizStorageKey, data.quizzes]);

  // Timer logic
  useEffect(() => {
    if (!quizStarted || showResults) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setShowResults(true);
          setAutoSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizStarted, showResults]);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(tabStorageKey, activeTab);
  }, [activeTab, tabStorageKey]);

  // Reset quiz state when navigating to a different day
  useEffect(() => {
    setSelectedAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setAutoSubmitted(false);
    setTimeRemaining(0);
    if (timerRef.current) clearInterval(timerRef.current);
    fetchDayData();
  }, [week, day]);

  const fetchDayData = async () => {
    setLoading(true);
    try {
      const [tutorialsRes, contentRes, quizzesRes, assignmentsRes] = await Promise.all([
        tutorialsApi.getByWeekDay(weekNum, dayNum).catch(() => ({ data: [] })),
        contentApi.getByWeekDay(weekNum, dayNum).catch(() => ({ data: [] })),
        quizzesApi.getByWeekDay(weekNum, dayNum).catch(() => ({ data: [] })),
        assignmentsApi.getByWeekDay(weekNum, dayNum).catch(() => ({ data: [] }))
      ]);

      const newData = {
        tutorials: tutorialsRes.data || [],
        content: contentRes.data || [],
        quizzes: quizzesRes.data || [],
        assignments: assignmentsRes.data || []
      };

      setData(newData);

      // Check if saved tab has content, otherwise select first available tab
      const savedTab = localStorage.getItem(tabStorageKey);
      const tabHasContent = {
        article: newData.content.length > 0,
        video: newData.tutorials.length > 0,
        quiz: newData.quizzes.length > 0,
        assignment: newData.assignments.length > 0
      };

      if (savedTab && tabHasContent[savedTab]) {
        setActiveTab(savedTab);
      } else if (newData.content.length > 0) setActiveTab('article');
      else if (newData.tutorials.length > 0) setActiveTab('video');
      else if (newData.quizzes.length > 0) setActiveTab('quiz');
      else if (newData.assignments.length > 0) setActiveTab('assignment');
    } catch (error) {
      console.error('Error fetching day data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'video', label: 'Video Lesson', icon: '🎬', count: data.tutorials.length, color: '#E91E63' },
    { id: 'article', label: 'Reading Material', icon: '📖', count: data.content.length, color: '#2196F3' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✅', count: data.quizzes.length, color: '#9C27B0' },
    { id: 'assignment', label: 'Assignment', icon: '📝', count: data.assignments.length, color: '#FF9800' }
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = (timeLimit) => {
    setQuizStarted(true);
    setTimeRemaining(timeLimit * 60);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setAutoSubmitted(false);
    
    // Save initial state with start time
    const state = {
      selectedAnswers: {},
      currentQuestionIndex: 0,
      quizStarted: true,
      showResults: false,
      startTime: Date.now(),
      timeLimit,
      lastUpdated: Date.now()
    };
    localStorage.setItem(quizStorageKey, JSON.stringify(state));
  };

  const handleRetry = () => {
    setShowResults(false);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setAutoSubmitted(false);
    localStorage.removeItem(quizStorageKey);
  };

  const renderMarkdown = (text) => {
    if (!text) return '';
    
    let html = text
      .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="inline-code">$1</code>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="numbered">$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => c.trim().match(/^[-:]+$/))) return '';
        return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
      });
    
    return html;
  };

  const renderVideoContent = () => (
    <div className="content-panel video-panel">
      {data.tutorials.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎬</div>
          <h3>Video Coming Soon</h3>
          <p>Video content for this lesson is being prepared.</p>
        </div>
      ) : (
        data.tutorials.map((tutorial) => (
          <div key={tutorial._id} className="video-container">
            <div className="video-player">
              <div className="video-placeholder">
                <div className="play-button">
                  <span>▶</span>
                </div>
                <p>Click to play video</p>
              </div>
            </div>
            <div className="video-details">
              <h2>{tutorial.title}</h2>
              <p className="video-description">{tutorial.description}</p>
              <div className="video-meta">
                <span className="meta-item"><span className="meta-icon">⏱️</span> {tutorial.duration}</span>
                <span className="meta-item"><span className="meta-icon">📊</span> {tutorial.difficulty}</span>
                <span className="meta-item"><span className="meta-icon">📁</span> {tutorial.category}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderArticleContent = () => (
    <div className="content-panel article-panel">
      {data.content.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📖</div>
          <h3>Article Coming Soon</h3>
          <p>Reading material for this lesson is being prepared.</p>
        </div>
      ) : (
        data.content.map((article) => (
          <article key={article._id} className="article-container">
            <header className="article-header">
              <h1>{article.title}</h1>
              <div className="article-meta">
                <span className="meta-item"><span className="meta-icon">📖</span> {article.read_time} min read</span>
                <span className="meta-item"><span className="meta-icon">👤</span> {article.author}</span>
                <span className="meta-item"><span className="meta-icon">📁</span> {article.category}</span>
              </div>
              <div className="article-tags">
                {article.tags?.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </header>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(article.body) }} />
          </article>
        ))
      )}
    </div>
  );

  const renderQuizContent = () => {
    if (data.quizzes.length === 0) {
      return (
        <div className="content-panel quiz-panel">
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <h3>Quiz Coming Soon</h3>
            <p>Practice quiz for this lesson is being prepared.</p>
          </div>
        </div>
      );
    }

    const quiz = data.quizzes[0];
    const questions = quiz.questions || [];
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentQuestionIndex];
    const answeredCount = Object.keys(selectedAnswers).length;
    const isLowTime = timeRemaining <= 60 && timeRemaining > 0;

    const goToNextQuestion = () => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };

    const goToPrevQuestion = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };

    // Show start screen if quiz not started
    if (!quizStarted) {
      return (
        <div className="content-panel quiz-panel">
          <div className="quiz-container">
            <header className="quiz-header">
              <h1>{quiz.title}</h1>
              <p className="quiz-description">{quiz.description}</p>
              <div className="quiz-stats">
                <div className="stat-card">
                  <span className="stat-value">{totalQuestions}</span>
                  <span className="stat-label">Questions</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{quiz.time_limit}</span>
                  <span className="stat-label">Minutes</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{quiz.passing_score}%</span>
                  <span className="stat-label">To Pass</span>
                </div>
              </div>
              <button 
                className="start-quiz-btn"
                onClick={() => startQuiz(quiz.time_limit || 15)}
              >
                Start Quiz
              </button>
            </header>
          </div>
        </div>
      );
    }

    return (
      <div className="content-panel quiz-panel">
        <div className="quiz-container">
          <header className="quiz-header">
            <h1>{quiz.title}</h1>
            <div className="quiz-header-row">
              <div className="quiz-stats">
                <div className="stat-card">
                  <span className="stat-value">{totalQuestions}</span>
                  <span className="stat-label">Questions</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{quiz.passing_score}%</span>
                  <span className="stat-label">To Pass</span>
                </div>
              </div>
              {!showResults && (
                <div className={`quiz-timer ${isLowTime ? 'low-time' : ''}`}>
                  <span className="timer-icon">⏱️</span>
                  <span className="timer-value">{formatTime(timeRemaining)}</span>
                </div>
              )}
            </div>
          </header>

          {!showResults ? (
            <>
              <div className="quiz-progress">
                <div className="progress-text">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                  ></div>
                </div>
                <div className="answered-text">{answeredCount} of {totalQuestions} answered</div>
              </div>

              <div className="quiz-question-single">
                {currentQuestion && (
                  <div className="question-card">
                    <div className="question-header">
                      <span className="question-number">Question {currentQuestionIndex + 1}</span>
                    </div>
                    <p className="question-text">{currentQuestion.question}</p>
                    <div className="options-list">
                      {currentQuestion.options?.map((option, optIdx) => (
                        <label 
                          key={optIdx} 
                          className={`option-item ${selectedAnswers[currentQuestion.id] === option ? 'selected' : ''}`}
                        >
                          <input 
                            type="radio" 
                            name={`q-${currentQuestion.id}`} 
                            checked={selectedAnswers[currentQuestion.id] === option}
                            onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                          />
                          <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                          <span className="option-text">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="quiz-navigation">
                <button 
                  className="nav-btn prev" 
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  &lt;&lt; Previous
                </button>
                
                <div className="question-dots">
                  {questions.map((q, idx) => (
                    <button
                      key={idx}
                      className={`dot ${idx === currentQuestionIndex ? 'active' : ''} ${selectedAnswers[q.id] ? 'answered' : ''}`}
                      onClick={() => setCurrentQuestionIndex(idx)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                {currentQuestionIndex === totalQuestions - 1 ? (
                  <button 
                    className="nav-btn submit"
                    onClick={() => setShowResults(true)}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button 
                    className="nav-btn next" 
                    onClick={goToNextQuestion}
                  >
                    Next &gt;&gt;
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="quiz-results">
              <div className="results-header">
                <h2>Quiz Complete!</h2>
                {autoSubmitted && (
                  <p className="auto-submit-notice">Time's up! Quiz was auto-submitted.</p>
                )}
                <div className="score-circle">
                  <span className="score-value">
                    {Math.round((questions.filter(q => selectedAnswers[q.id] === q.correct_answer).length / totalQuestions) * 100)}%
                  </span>
                  <span className="score-label">Score</span>
                </div>
                <p className="score-detail">
                  You got {questions.filter(q => selectedAnswers[q.id] === q.correct_answer).length} out of {totalQuestions} questions correct
                </p>
              </div>

              <div className="results-review">
                <h3>Review Answers</h3>
                {questions.map((q, idx) => (
                  <div key={q.id} className={`review-item ${selectedAnswers[q.id] === q.correct_answer ? 'correct' : 'incorrect'}`}>
                    <div className="review-header">
                      <span className="review-number">Q{idx + 1}</span>
                      <span className={`review-badge ${selectedAnswers[q.id] === q.correct_answer ? 'correct' : 'incorrect'}`}>
                        {selectedAnswers[q.id] === q.correct_answer ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="review-question">{q.question}</p>
                    <div className="review-answers">
                      <p><strong>Your answer:</strong> {selectedAnswers[q.id] || 'Not answered'}</p>
                      {selectedAnswers[q.id] !== q.correct_answer && (
                        <p><strong>Correct answer:</strong> {q.correct_answer}</p>
                      )}
                    </div>
                    {q.explanation && (
                      <div className="explanation">
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="results-actions">
                <button className="retry-btn" onClick={handleRetry}>
                  Retry Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAssignmentContent = () => (
    <div className="content-panel assignment-panel">
      {data.assignments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>Assignment Coming Soon</h3>
          <p>Assignment for this lesson is being prepared.</p>
        </div>
      ) : (
        data.assignments.map((assignment) => (
          <div key={assignment._id} className="assignment-container">
            <header className="assignment-header">
              <div className="assignment-title-row">
                <h1>{assignment.title}</h1>
                <span className={`difficulty-badge ${assignment.difficulty?.toLowerCase()}`}>
                  {assignment.difficulty}
                </span>
              </div>
              <p className="assignment-description">{assignment.description}</p>
              <div className="assignment-meta">
                <span className="meta-item"><span className="meta-icon">🏆</span> {assignment.max_score} points</span>
                <span className="meta-item"><span className="meta-icon">📁</span> {assignment.category}</span>
              </div>
            </header>
            <div className="assignment-body">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                {assignment.requirements?.map((req, idx) => (
                  <li key={idx}>
                    <span className="req-number">{idx + 1}</span>
                    <span className="req-text">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="assignment-actions">
              <button className="start-btn">Start Assignment</button>
              <button className="download-btn">Download Template</button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="hld-day-layout loading">
        <div className="loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="hld-day-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <Link to="/hld" className="mobile-back-link">&lt;&lt; Back</Link>
        <div className="mobile-title">
          <span className="mobile-week-badge">W{weekNum}D{dayNum}</span>
          <span className="mobile-topic">{currentDay?.topic}</span>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-info">
            <div className="week-badge">Week {weekNum} • Day {dayNum}</div>
            <h3>{currentDay?.topic}</h3>
            <p>{currentDay?.concepts}</p>
          </div>
        </div>
        <nav className="mobile-menu-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''} ${tab.count === 0 ? 'disabled' : ''}`}
              onClick={() => {
                if (tab.count > 0) {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }
              }}
              style={{ '--tab-color': tab.color }}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
              {tab.count > 0 && <span className="nav-count">{tab.count}</span>}
            </button>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <div className="mobile-day-nav">
            {dayNum > 1 && (
              <Link to={`/hld/week/${weekNum}/day/${dayNum - 1}`} className="nav-link prev" onClick={() => setMobileMenuOpen(false)}>
                &lt;&lt; Day {dayNum - 1}
              </Link>
            )}
            {dayNum < 7 && (
              <Link to={`/hld/week/${weekNum}/day/${dayNum + 1}`} className="nav-link next" onClick={() => setMobileMenuOpen(false)}>
                Day {dayNum + 1} &gt;&gt;
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link to="/hld" className="back-link">
            <span className="back-icon">&lt;&lt;</span>
            {!sidebarCollapsed && <span>Back to Course</span>}
          </Link>
          <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? '>>' : '<<'}
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="sidebar-info">
            <div className="week-badge">Week {weekNum} • Day {dayNum}</div>
            <h2 className="day-topic">{currentDay?.topic}</h2>
            <p className="day-concepts">{currentDay?.concepts}</p>
          </div>
        )}

        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''} ${tab.count === 0 ? 'disabled' : ''}`}
              onClick={() => tab.count > 0 && setActiveTab(tab.id)}
              style={{ '--tab-color': tab.color }}
            >
              <span className="nav-icon">{tab.icon}</span>
              {!sidebarCollapsed && (
                <>
                  <span className="nav-label">{tab.label}</span>
                  {tab.count > 0 && <span className="nav-count">{tab.count}</span>}
                </>
              )}
            </button>
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div className="sidebar-footer">
            <div className="day-navigation">
              {dayNum > 1 && (
                <Link to={`/hld/week/${weekNum}/day/${dayNum - 1}`} className="nav-link prev">
                  &lt;&lt; Day {dayNum - 1}
                </Link>
              )}
              {dayNum < 7 && (
                <Link to={`/hld/week/${weekNum}/day/${dayNum + 1}`} className="nav-link next">
                  Day {dayNum + 1} &gt;&gt;
                </Link>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <span className="content-type" style={{ '--type-color': tabs.find(t => t.id === activeTab)?.color }}>
              {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
            </span>
          </div>
          <div className="header-right">
            <span className="progress-indicator">
              Week {weekNum}, Day {dayNum}
            </span>
          </div>
        </header>

        <div className="content-body">
          {activeTab === 'video' && renderVideoContent()}
          {activeTab === 'article' && renderArticleContent()}
          {activeTab === 'quiz' && renderQuizContent()}
          {activeTab === 'assignment' && renderAssignmentContent()}
        </div>
      </main>
    </div>
  );
}

export default HLDDay;
