import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tutorialsApi } from '../api';
import './Tutorials.css';

function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await tutorialsApi.getAll();
      setTutorials(response.data);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTutorials = filter === 'all' 
    ? tutorials 
    : tutorials.filter(t => t.difficulty.toLowerCase() === filter);

  const getDifficultyClass = (difficulty) => {
    return `badge badge-${difficulty.toLowerCase()}`;
  };

  if (loading) return <div className="loading">Loading tutorials...</div>;

  return (
    <div className="tutorials-page">
      <h1 className="page-title">Video Tutorials</h1>
      
      <div className="filter-bar">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'beginner' ? 'active' : ''}`}
          onClick={() => setFilter('beginner')}
        >
          Beginner
        </button>
        <button 
          className={`filter-btn ${filter === 'intermediate' ? 'active' : ''}`}
          onClick={() => setFilter('intermediate')}
        >
          Intermediate
        </button>
        <button 
          className={`filter-btn ${filter === 'advanced' ? 'active' : ''}`}
          onClick={() => setFilter('advanced')}
        >
          Advanced
        </button>
      </div>

      <div className="card-grid">
        {filteredTutorials.map((tutorial) => (
          <Link to={`/tutorials/${tutorial._id}`} key={tutorial._id} className="card tutorial-card">
            <div className="tutorial-thumbnail">
              <div className="play-icon">&#9658;</div>
              <span className="duration">{tutorial.duration}</span>
            </div>
            <div className="card-content">
              <h3 className="card-title">{tutorial.title}</h3>
              <p className="card-description">{tutorial.description}</p>
              <div className="card-meta">
                <span className={getDifficultyClass(tutorial.difficulty)}>
                  {tutorial.difficulty}
                </span>
                <span className="category">{tutorial.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="empty-state">No tutorials found for this filter.</div>
      )}
    </div>
  );
}

export default Tutorials;
