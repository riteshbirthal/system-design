import React from 'react';
import './TrackPage.css';

function LLDCourse() {
  const weeks = [
    { week: 10, title: 'Object-Oriented Design & SOLID Principles', phase: 'Low-Level Design' },
    { week: 11, title: 'Design Patterns & UML Diagrams', phase: 'Low-Level Design' },
  ];

  return (
    <div className="track-page">
      <div className="track-page-header lld">
        <span className="track-page-icon">⚙️</span>
        <h1>Low-Level Design (LLD)</h1>
        <p>Master object-oriented design, SOLID principles, and design patterns</p>
        <div className="track-page-stats">
          <span>2 Weeks</span>
          <span>10 Days</span>
          <span>20-30 Hours</span>
        </div>
      </div>

      <div className="track-page-content">
        <div className="coming-soon-banner">
          <span className="coming-soon-icon">🚧</span>
          <h2>Data will be coming soon...</h2>
          <p>We are working on creating comprehensive content for each week and day.</p>
        </div>

        <div className="weeks-preview">
          <h3>Course Outline</h3>
          {weeks.map((week) => (
            <div key={week.week} className="week-preview-card">
              <div className="week-preview-header">
                <span className="week-number">Week {week.week}</span>
                <span className="week-phase">{week.phase}</span>
              </div>
              <h4>{week.title}</h4>
              <div className="week-preview-days">
                <span>Day 1-5: Video tutorials, Articles, Quizzes, Assignments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LLDCourse;
