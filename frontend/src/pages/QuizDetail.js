import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizzesApi } from '../api';
import './QuizDetail.css';

function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

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

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await quizzesApi.submit(id, {
        answers,
        user_id: 'demo-user'
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (!quiz) return <div className="error">Quiz not found</div>;

  if (result) {
    return (
      <div className="quiz-detail">
        <div className="result-container">
          <div className={`result-icon ${result.passed ? 'passed' : 'failed'}`}>
            {result.passed ? '&#10003;' : '&#10007;'}
          </div>
          <h2>{result.passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
          <div className="result-score">
            <span className="score-value">{result.score}</span>
            <span className="score-total">/ {result.total}</span>
          </div>
          <p className="result-percentage">{result.percentage.toFixed(1)}%</p>
          <p className="result-status">
            {result.passed 
              ? 'You passed the quiz!' 
              : `You need ${quiz.passing_score}% to pass.`}
          </p>
          <div className="result-actions">
            <Link to="/quizzes" className="btn btn-secondary">Back to Quizzes</Link>
            <button onClick={() => {
              setResult(null);
              setStarted(false);
              setAnswers({});
              setCurrentQuestion(0);
            }} className="btn btn-primary">
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
        <Link to="/quizzes" className="back-link">&larr; Back to Quizzes</Link>
        <div className="quiz-intro">
          <div className="quiz-intro-icon">&#10004;</div>
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
          <button onClick={() => setStarted(true)} className="btn btn-primary start-btn">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="quiz-detail">
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
              <span className="option-text">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button 
          onClick={handlePrev} 
          disabled={currentQuestion === 0}
          className="btn btn-secondary"
        >
          &larr; Previous
        </button>
        {currentQuestion === quiz.questions.length - 1 ? (
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit Quiz
          </button>
        ) : (
          <button onClick={handleNext} className="btn btn-primary">
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizDetail;
