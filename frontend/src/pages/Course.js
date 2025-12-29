import React, { useState, useEffect } from 'react';
import { courseApi } from '../api';
import WeekView from '../components/WeekView';
import './Course.css';

function Course() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedWeeks, setExpandedWeeks] = useState({});

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await courseApi.getOverview();
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWeek = (weekNumber) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  const expandAllWeeks = () => {
    const allExpanded = {};
    course?.weeks.forEach((w) => {
      allExpanded[w.week] = true;
    });
    setExpandedWeeks(allExpanded);
  };

  const collapseAllWeeks = () => {
    setExpandedWeeks({});
  };

  const getPhaseGroups = () => {
    if (!course?.weeks) return {};
    
    const groups = {};
    course.weeks.forEach((week) => {
      if (!groups[week.phase]) {
        groups[week.phase] = [];
      }
      groups[week.phase].push(week);
    });
    return groups;
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

  if (loading) {
    return <div className="loading">Loading course...</div>;
  }

  const phaseGroups = getPhaseGroups();

  return (
    <div className="course-container">
      <div className="course-header">
        <h1>{course?.title}</h1>
        <p>{course?.description}</p>
        <div className="course-stats">
          <span>{course?.duration_weeks} Weeks</span>
          <span>{course?.days_per_week} Days/Week</span>
          <span>{course?.daily_hours} Hours/Day</span>
        </div>
      </div>

      <div className="course-controls">
        <button onClick={expandAllWeeks} className="control-btn">Expand All Weeks</button>
        <button onClick={collapseAllWeeks} className="control-btn">Collapse All Weeks</button>
      </div>

      <div className="course-phases">
        {Object.entries(phaseGroups).map(([phase, weeks]) => (
          <div key={phase} className="phase-section">
            <div className="phase-header" style={{ borderLeftColor: getPhaseColor(phase) }}>
              <h2 className="phase-title">{phase}</h2>
              <span className="phase-weeks">{weeks.length} {weeks.length === 1 ? 'Week' : 'Weeks'}</span>
            </div>
            <div className="phase-weeks-list">
              {weeks.map((week) => (
                <WeekView
                  key={week.week}
                  weekNumber={week.week}
                  weekInfo={week}
                  isExpanded={expandedWeeks[week.week]}
                  onToggle={() => toggleWeek(week.week)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
