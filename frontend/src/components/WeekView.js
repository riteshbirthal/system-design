import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseApi } from '../api';
import DayCard from './DayCard';
import './WeekView.css';

function WeekView({ weekNumber, weekInfo, isExpanded, onToggle }) {
  const [weekData, setWeekData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedDays, setExpandedDays] = useState({});

  useEffect(() => {
    if (isExpanded && !weekData) {
      fetchWeekData();
    }
  }, [isExpanded]);

  const fetchWeekData = async () => {
    setLoading(true);
    try {
      const response = await courseApi.getWeek(weekNumber);
      setWeekData(response.data);
    } catch (error) {
      console.error('Error fetching week data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const expandAllDays = () => {
    const allExpanded = {};
    weekInfo.days.forEach((d) => {
      allExpanded[d.day] = true;
    });
    setExpandedDays(allExpanded);
  };

  const collapseAllDays = () => {
    setExpandedDays({});
  };

  const getPhaseColor = (phase) => {
    const colors = {
      'Fundamentals': '#4CAF50',
      'Core Components': '#2196F3',
      'Distributed Systems': '#9C27B0',
      'Architecture Patterns': '#FF9800',
      'Low-Level Design': '#E91E63',
      'Case Studies': '#00BCD4'
    };
    return colors[phase] || '#757575';
  };

  const getDayResources = (dayNum) => {
    if (!weekData) return { tutorials: [], content: [], quizzes: [], assignments: [] };
    
    return {
      tutorials: weekData.tutorials?.filter((t) => t.day === dayNum) || [],
      content: weekData.content?.filter((c) => c.day === dayNum) || [],
      quizzes: weekData.quizzes?.filter((q) => q.day === dayNum && !q.is_weekly_quiz) || [],
      assignments: weekData.assignments?.filter((a) => a.day === dayNum && !a.is_weekly_project) || []
    };
  };

  const getWeeklyResources = () => {
    if (!weekData) return { weeklyQuiz: null, weeklyProject: null };
    
    return {
      weeklyQuiz: weekData.quizzes?.find((q) => q.is_weekly_quiz),
      weeklyProject: weekData.assignments?.find((a) => a.is_weekly_project)
    };
  };

  const phaseColor = getPhaseColor(weekInfo.phase);
  const { weeklyQuiz, weeklyProject } = getWeeklyResources();

  return (
    <div className={`week-view ${isExpanded ? 'expanded' : ''}`}>
      <div 
        className="week-header" 
        onClick={onToggle}
        style={{ borderLeftColor: phaseColor }}
      >
        <div className="week-title-section">
          <span className="week-number">Week {weekNumber}</span>
          <h3 className="week-title">{weekInfo.title}</h3>
          <span className="week-phase" style={{ backgroundColor: phaseColor }}>
            {weekInfo.phase}
          </span>
        </div>
        <span className={`week-expand-icon ${isExpanded ? 'rotated' : ''}`}>&#9660;</span>
      </div>

      {isExpanded && (
        <div className="week-content">
          {loading ? (
            <div className="week-loading">Loading week content...</div>
          ) : (
            <>
              <div className="week-actions">
                <button onClick={expandAllDays} className="action-btn">Expand All Days</button>
                <button onClick={collapseAllDays} className="action-btn">Collapse All Days</button>
              </div>

              <div className="days-container">
                {weekInfo.days.map((day) => {
                  const resources = getDayResources(day.day);
                  return (
                    <DayCard
                      key={day.day}
                      week={weekNumber}
                      day={day.day}
                      topic={day.topic}
                      tutorials={resources.tutorials}
                      content={resources.content}
                      quizzes={resources.quizzes}
                      assignments={resources.assignments}
                      expanded={expandedDays[day.day]}
                      onToggle={() => toggleDay(day.day)}
                    />
                  );
                })}
              </div>

              {(weeklyQuiz || weeklyProject) && (
                <div className="weekly-resources">
                  <h4>Weekly Assessment</h4>
                  <div className="weekly-items">
                    {weeklyQuiz && (
                      <Link to={`/quizzes/${weeklyQuiz._id}`} className="weekly-item quiz">
                        <span className="weekly-icon">&#128203;</span>
                        <div className="weekly-info">
                          <span className="weekly-label">Weekly Quiz</span>
                          <span className="weekly-title">{weeklyQuiz.title}</span>
                          <span className="weekly-meta">{weeklyQuiz.questions?.length} Questions | {weeklyQuiz.time_limit} min</span>
                        </div>
                      </Link>
                    )}
                    {weeklyProject && (
                      <Link to={`/assignments/${weeklyProject._id}`} className="weekly-item project">
                        <span className="weekly-icon">&#128640;</span>
                        <div className="weekly-info">
                          <span className="weekly-label">Weekly Project</span>
                          <span className="weekly-title">{weeklyProject.title}</span>
                          <span className="weekly-meta">{weeklyProject.max_score} Points | {weeklyProject.difficulty}</span>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default WeekView;
