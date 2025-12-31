import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseApi } from '../api';
import './CourseDay.css';

function CourseDay() {
  const { week, day } = useParams();
  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDayData();
  }, [week, day]);

  const fetchDayData = async () => {
    try {
      const response = await courseApi.getDay(week, day);
      setDayData(response.data);
    } catch (error) {
      console.error('Error fetching day data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading day content...</div>;
  }

  if (!dayData) {
    return <div className="error">Day not found</div>;
  }

  return (
    <div className="course-day-container">
      <div className="day-header">
        <Link to="/course" className="back-link">&lt;&lt; Back to Course</Link>
        <h1>Week {week}, Day {day}: {dayData.topic}</h1>
      </div>

      <div className="day-content-grid">
        {dayData.tutorials.length > 0 && (
          <section className="day-section tutorials-section">
            <h2>Video Tutorials</h2>
            {dayData.tutorials.map((tutorial) => (
              <div key={tutorial._id} className="tutorial-card">
                <div className="tutorial-info">
                  <h3>{tutorial.title}</h3>
                  <p>{tutorial.description}</p>
                  <div className="tutorial-meta">
                    <span className="duration">{tutorial.duration}</span>
                    <span className={`difficulty ${tutorial.difficulty.toLowerCase()}`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>
                <Link to={`/tutorials/${tutorial._id}`} className="view-btn">
                  Watch Tutorial
                </Link>
              </div>
            ))}
          </section>
        )}

        {dayData.content.length > 0 && (
          <section className="day-section content-section">
            <h2>Reading Content</h2>
            {dayData.content.map((content) => (
              <div key={content._id} className="content-card">
                <div className="content-info">
                  <h3>{content.title}</h3>
                  <div className="content-meta">
                    <span className="read-time">{content.read_time} min read</span>
                    <span className="author">By {content.author}</span>
                  </div>
                  <div className="tags">
                    {content.tags?.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <Link to={`/content/${content._id}`} className="view-btn">
                  Read Article
                </Link>
              </div>
            ))}
          </section>
        )}

        {dayData.quizzes.length > 0 && (
          <section className="day-section quizzes-section">
            <h2>Quizzes</h2>
            {dayData.quizzes.map((quiz) => (
              <div key={quiz._id} className="quiz-card">
                <div className="quiz-info">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description}</p>
                  <div className="quiz-meta">
                    <span className="questions">{quiz.questions?.length} Questions</span>
                    <span className="time-limit">{quiz.time_limit} min</span>
                    <span className="passing-score">Pass: {quiz.passing_score}%</span>
                  </div>
                </div>
                <Link to={`/quizzes/${quiz._id}`} className="view-btn quiz-btn">
                  Take Quiz
                </Link>
              </div>
            ))}
          </section>
        )}

        {dayData.assignments.length > 0 && (
          <section className="day-section assignments-section">
            <h2>Assignments</h2>
            {dayData.assignments.map((assignment) => (
              <div key={assignment._id} className="assignment-card">
                <div className="assignment-info">
                  <h3>{assignment.title}</h3>
                  <p>{assignment.description}</p>
                  <div className="assignment-meta">
                    <span className={`difficulty ${assignment.difficulty.toLowerCase()}`}>
                      {assignment.difficulty}
                    </span>
                    <span className="max-score">{assignment.max_score} points</span>
                  </div>
                </div>
                <Link to={`/assignments/${assignment._id}`} className="view-btn assignment-btn">
                  Start Assignment
                </Link>
              </div>
            ))}
          </section>
        )}

        {dayData.tutorials.length === 0 && 
         dayData.content.length === 0 && 
         dayData.quizzes.length === 0 && 
         dayData.assignments.length === 0 && (
          <div className="no-content">
            <h2>Content Coming Soon</h2>
            <p>The content for this day is being prepared. Check back later!</p>
          </div>
        )}
      </div>

      <div className="day-navigation">
        {parseInt(day) > 1 && (
          <Link to={`/course/week/${week}/day/${parseInt(day) - 1}`} className="nav-btn prev">
            &lt;&lt; Previous Day
          </Link>
        )}
        {parseInt(day) < 5 && (
          <Link to={`/course/week/${week}/day/${parseInt(day) + 1}`} className="nav-btn next">
            Next Day &gt;&gt;
          </Link>
        )}
      </div>
    </div>
  );
}

export default CourseDay;
