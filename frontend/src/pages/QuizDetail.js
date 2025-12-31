import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizzesApi } from '../api';
import useQuizState from '../hooks/useQuizState';
import './QuizDetail.css';

function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  const {
    answers,
    currentQuestion,
    started,
    timeRemaining,
    isSubmitted,
    handleAnswer,
    setCurrentQuestion,
    startQuiz,
    submitQuiz,
    resetQuiz,
    setAutoSubmitCallback,
    formatTime
  } = useQuizState(id, quiz?.time_limit || 15);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.getById(id);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = useCallback(async () => {
    submitQuiz();
    try {
      // Calculate result locally for immediate feedback
      const correctCount = quiz.questions.filter(
        q => answers[q.id] === q.correct_answer
      ).length;
      const total = quiz.questions.length;
      const percentage = (correctCount / total) * 100;
      
      setResult({
        score: correctCount,
        total,
        percentage,
        passed: percentage >= quiz.passing_score
      });

      // Also submit to backend
      await quizzesApi.submit(id, {
        answers,
        user_id: 'demo-user'
      }).catch(() => {});
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  }, [quiz, answers, id, submitQuiz]);

  // Set auto-submit callback
  useEffect(() => {
    if (quiz) {
      setAutoSubmitCallback(handleSubmit);
    }
  }, [quiz, handleSubmit, setAutoSubmitCallback]);

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetry = () => {
    setResult(null);
    resetQuiz();
  };

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (!quiz) return <div className="error">Quiz not found</div>;

  if (result || isSubmitted) {
    const displayResult = result || {
      score: quiz.questions.filter(q => answers[q.id] === q.correct_answer).length,
      total: quiz.questions.length,
      percentage: (quiz.questions.filter(q => answers[q.id] === q.correct_answer).length / quiz.questions.length) * 100,
      passed: (quiz.questions.filter(q => answers[q.id] === q.correct_answer).length / quiz.questions.length) * 100 >= quiz.passing_score
    };

    return (
      <div className="quiz-detail">
        <div className="result-container">
          <div className={`result-icon ${displayResult.passed ? 'passed' : 'failed'}`}>
            {displayResult.passed ? '✓' : '✗'}
          </div>
          <h2>{displayResult.passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
          <div className="result-score">
            <span className="score-value">{displayResult.score}</span>
            <span className="score-total">/ {displayResult.total}</span>
          </div>
          <p className="result-percentage">{displayResult.percentage.toFixed(1)}%</p>
          <p className="result-status">
            {displayResult.passed 
              ? 'You passed the quiz!' 
              : `You need ${quiz.passing_score}% to pass.`}
          </p>
          {timeRemaining === 0 && (
            <p className="time-up-notice">Time's up! Quiz was auto-submitted.</p>
          )}
          <div className="result-actions">
            <Link to="/quizzes" className="btn btn-secondary">&lt;&lt; Back to Quizzes</Link>
            <button onClick={handleRetry} className="btn btn-primary">
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="quiz-detail">
        <Link to="/quizzes" className="back-link">&lt;&lt; Back to Quizzes</Link>
        <div className="quiz-intro">
          <div className="quiz-intro-icon">✓</div>
          <h1>{quiz.title}</h1>
          <p>{quiz.description}</p>
          <div className="quiz-info">
            <div className="info-item">
              <span className="info-value">{quiz.questions?.length || 0}</span>
              <span className="info-label">Questions</span>
            </div>
            <div className="info-item">
              <span className="info-value">{quiz.time_limit}</span>
              <span className="info-label">Minutes</span>
            </div>
            <div className="info-item">
              <span className="info-value">{quiz.passing_score}%</span>
              <span className="info-label">Passing Score</span>
            </div>
          </div>
          <button onClick={startQuiz} className="btn btn-primary start-btn">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const isLowTime = timeRemaining <= 60;

  return (
    <div className="quiz-detail">
      <div className="quiz-header-bar">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        <div className={`quiz-timer ${isLowTime ? 'low-time' : ''}`}>
          <span className="timer-icon">⏱️</span>
          <span className="timer-value">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{question.question}</h2>
        <div className="options-list">
          {question.options.map((option, index) => (
            <label 
              key={index} 
              className={`option ${answers[question.id] === option ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => handleAnswer(question.id, option)}
              />
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-dots-nav">
        {quiz.questions.map((q, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentQuestion ? 'active' : ''} ${answers[q.id] ? 'answered' : ''}`}
            onClick={() => setCurrentQuestion(idx)}
            title={`Question ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <div className="quiz-navigation">
        <button 
          onClick={handlePrev} 
          disabled={currentQuestion === 0}
          className="btn btn-secondary"
        >
          &lt;&lt; Previous
        </button>
        <div className="answered-count">
          {answeredCount} of {quiz.questions.length} answered
        </div>
        {currentQuestion === quiz.questions.length - 1 ? (
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit Quiz
          </button>
        ) : (
          <button onClick={handleNext} className="btn btn-primary">
            Next &gt;&gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizDetail;
