import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { assignmentsApi } from '../api';
import './AssignmentDetail.css';

function AssignmentDetail() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      const response = await assignmentsApi.getById(id);
      setAssignment(response.data);
    } catch (error) {
      console.error('Error fetching assignment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignmentsApi.submit(id, {
        content: submission,
        user_id: 'demo-user'
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  if (loading) return <div className="loading">Loading assignment...</div>;
  if (!assignment) return <div className="error">Assignment not found</div>;

  return (
    <div className="assignment-detail">
      <Link to="/assignments" className="back-link">&lt;&lt; Back to Assignments</Link>

      <div className="assignment-content">
        <header className="detail-header">
          <div className="header-top">
            <span className={`badge badge-${assignment.difficulty.toLowerCase()}`}>
              {assignment.difficulty}
            </span>
            <span className="max-score">Max Score: {assignment.max_score}</span>
          </div>
          <h1>{assignment.title}</h1>
          <p className="description">{assignment.description}</p>
        </header>

        <section className="requirements-section">
          <h2>Requirements</h2>
          <ul className="requirements-list">
            {assignment.requirements.map((req, i) => (
              <li key={i}>
                <span className="req-number">{i + 1}</span>
                {req}
              </li>
            ))}
          </ul>
        </section>

        {!submitted ? (
          <section className="submission-section">
            <h2>Your Solution</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                placeholder="Describe your system design solution here. Include architecture diagrams descriptions, component explanations, data flow, scaling strategies, etc."
                rows={15}
              />
              <button type="submit" className="btn btn-primary">
                Submit Assignment
              </button>
            </form>
          </section>
        ) : (
          <div className="success-message">
            <div className="success-icon">&#10003;</div>
            <h3>Assignment Submitted!</h3>
            <p>Your solution has been submitted successfully.</p>
            <Link to="/assignments" className="btn btn-secondary">
              &lt;&lt; Back to Assignments
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentDetail;
