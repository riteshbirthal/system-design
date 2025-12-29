import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentApi } from '../api';
import './Content.css';

function Content() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await contentApi.getAll();
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        const response = await contentApi.search(searchQuery);
        setContents(response.data);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    } else {
      fetchContents();
    }
  };

  if (loading) return <div className="loading">Loading content...</div>;

  return (
    <div className="content-page">
      <h1 className="page-title">Reading Content</h1>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="content-list">
        {contents.map((content) => (
          <Link to={`/content/${content._id}`} key={content._id} className="content-card">
            <div className="content-card-body">
              <h3>{content.title}</h3>
              <p className="content-preview">
                {content.body.substring(0, 150)}...
              </p>
              <div className="content-meta">
                <span className="author">By {content.author}</span>
                <span className="read-time">{content.read_time} min read</span>
                <span className="category-tag">{content.category}</span>
              </div>
              {content.tags && (
                <div className="tags">
                  {content.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {contents.length === 0 && (
        <div className="empty-state">No content found.</div>
      )}
    </div>
  );
}

export default Content;
