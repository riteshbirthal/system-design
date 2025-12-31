import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tutorialsApi } from '../api';
import './TutorialDetail.css';

function TutorialDetail() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorial();
  }, [id]);

  const fetchTutorial = async () => {
    try {
      const response = await tutorialsApi.getById(id);
      setTutorial(response.data);
    } catch (error) {
      console.error('Error fetching tutorial:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading tutorial...</div>;
  if (!tutorial) return <div className="error">Tutorial not found</div>;

  return (
    <div className="tutorial-detail">
      <Link to="/tutorials" className="back-link">&lt;&lt; Back to Tutorials</Link>
      
      <div className="video-container">
        <div className="video-placeholder">
          <div className="play-icon-large">&#9658;</div>
          <p>Video Player Placeholder</p>
          <small>{tutorial.video_url}</small>
        </div>
      </div>

      <div className="tutorial-info">
        <div className="tutorial-header">
          <h1>{tutorial.title}</h1>
          <div className="tutorial-meta">
            <span className={`badge badge-${tutorial.difficulty.toLowerCase()}`}>
              {tutorial.difficulty}
            </span>
            <span className="meta-item">&#128337; {tutorial.duration}</span>
            <span className="meta-item">&#128193; {tutorial.category}</span>
          </div>
        </div>

        <div className="tutorial-description">
          <h2>About this Tutorial</h2>
          <p>{tutorial.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TutorialDetail;
