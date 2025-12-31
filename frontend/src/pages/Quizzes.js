import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizzesApi } from '../api';
import './Quizzes.css';

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.getAll();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading quizzes...</div>;

  return (
    <div className="quizzes-page">
      <h1 className="page-title">Quizzes</h1>
      <p className="page-subtitle">Test your system design knowledge</p>

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <Link to={`/quizzes/${quiz._id}`} key={quiz._id} className="quiz-card">
            <div className="quiz-icon">&#10004;</div>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <div className="quiz-stats">
              <div className="stat">
                <span className="stat-value">{quiz.questions?.length || 0}</span>
                <span className="stat-label">Questions</span>
              </div>
              <div className="stat">
                <span className="stat-value">{quiz.time_limit}</span>
                <span className="stat-label">Minutes</span>
              </div>
              <div className="stat">
                <span className="stat-value">{quiz.passing_score}%</span>
                <span className="stat-label">To Pass</span>
              </div>
            </div>
            <div className="quiz-category">{quiz.category}</div>
            <div className="take-quiz-btn">Take Quiz &gt;&gt;</div>
          </Link>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="empty-state">No quizzes available yet.</div>
      )}
    </div>
  );
}

export default Quizzes;
