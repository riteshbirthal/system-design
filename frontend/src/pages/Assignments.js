import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assignmentsApi } from '../api';
import './Assignments.css';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await assignmentsApi.getAll();
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyClass = (difficulty) => {
    return `badge badge-${difficulty.toLowerCase()}`;
  };

  if (loading) return <div className="loading">Loading assignments...</div>;

  return (
    <div className="assignments-page">
      <h1 className="page-title">Assignments</h1>
      <p className="page-subtitle">Practice real-world system design problems</p>

      <div className="assignments-list">
        {assignments.map((assignment) => (
          <Link to={`/assignments/${assignment._id}`} key={assignment._id} className="assignment-card">
            <div className="assignment-header">
              <h3>{assignment.title}</h3>
              <span className={getDifficultyClass(assignment.difficulty)}>
                {assignment.difficulty}
              </span>
            </div>
            <p className="assignment-description">{assignment.description}</p>
            <div className="assignment-details">
              <div className="requirements-preview">
                <strong>Requirements:</strong>
                <ul>
                  {assignment.requirements.slice(0, 2).map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                  {assignment.requirements.length > 2 && (
                    <li>+{assignment.requirements.length - 2} more...</li>
                  )}
                </ul>
              </div>
              <div className="assignment-meta">
                <span className="category">{assignment.category}</span>
                <span className="score">Max Score: {assignment.max_score}</span>
              </div>
            </div>
            <div className="start-btn">Start Assignment &gt;&gt;</div>
          </Link>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="empty-state">No assignments available yet.</div>
      )}
    </div>
  );
}

export default Assignments;
