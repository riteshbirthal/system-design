import React from 'react';
import { Link } from 'react-router-dom';
import './DayCard.css';

function DayCard({ week, day, topic, tutorials, content, quizzes, assignments, expanded, onToggle }) {
  const hasContent = tutorials?.length > 0 || content?.length > 0 || quizzes?.length > 0 || assignments?.length > 0;

  return (
    <div className={`day-card ${expanded ? 'expanded' : ''}`}>
      <div className="day-card-header" onClick={onToggle}>
        <div className="day-info">
          <span className="day-badge">Day {day}</span>
          <h4 className="day-topic">{topic}</h4>
        </div>
        <div className="day-stats">
          {tutorials?.length > 0 && <span className="stat tutorials">{tutorials.length} videos</span>}
          {content?.length > 0 && <span className="stat content">{content.length} articles</span>}
          {quizzes?.length > 0 && <span className="stat quizzes">{quizzes.length} quizzes</span>}
          {assignments?.length > 0 && <span className="stat assignments">{assignments.length} tasks</span>}
          <span className={`expand-icon ${expanded ? 'rotated' : ''}`}>&#9660;</span>
        </div>
      </div>

      {expanded && (
        <div className="day-card-content">
          {!hasContent ? (
            <div className="no-content-message">
              <p>Content coming soon for this day.</p>
              <Link to={`/course/week/${week}/day/${day}`} className="view-day-btn">
                View Day Details
              </Link>
            </div>
          ) : (
            <div className="day-resources">
              {tutorials?.length > 0 && (
                <div className="resource-group">
                  <h5>Video Tutorials</h5>
                  <ul>
                    {tutorials.map((t) => (
                      <li key={t._id}>
                        <Link to={`/tutorials/${t._id}`}>
                          <span className="resource-icon">&#9658;</span>
                          {t.title}
                          <span className="duration">{t.duration}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content?.length > 0 && (
                <div className="resource-group">
                  <h5>Reading Content</h5>
                  <ul>
                    {content.map((c) => (
                      <li key={c._id}>
                        <Link to={`/content/${c._id}`}>
                          <span className="resource-icon">&#128196;</span>
                          {c.title}
                          <span className="read-time">{c.read_time} min</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {quizzes?.length > 0 && (
                <div className="resource-group">
                  <h5>Quizzes</h5>
                  <ul>
                    {quizzes.map((q) => (
                      <li key={q._id}>
                        <Link to={`/quizzes/${q._id}`}>
                          <span className="resource-icon">&#10004;</span>
                          {q.title}
                          <span className="quiz-info">{q.questions?.length} Q</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {assignments?.length > 0 && (
                <div className="resource-group">
                  <h5>Assignments</h5>
                  <ul>
                    {assignments.map((a) => (
                      <li key={a._id}>
                        <Link to={`/assignments/${a._id}`}>
                          <span className="resource-icon">&#128221;</span>
                          {a.title}
                          <span className={`difficulty ${a.difficulty?.toLowerCase()}`}>{a.difficulty}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link to={`/course/week/${week}/day/${day}`} className="view-day-btn">
                View Full Day Content
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DayCard;
