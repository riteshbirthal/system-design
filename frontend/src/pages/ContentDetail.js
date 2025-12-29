import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { contentApi } from '../api';
import './ContentDetail.css';

function ContentDetail() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    try {
      const response = await contentApi.getById(id);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMarkdown = (text) => {
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br>');
  };

  if (loading) return <div className="loading">Loading content...</div>;
  if (!content) return <div className="error">Content not found</div>;

  return (
    <div className="content-detail">
      <Link to="/content" className="back-link">&larr; Back to Content</Link>

      <article className="article">
        <header className="article-header">
          <span className="article-category">{content.category}</span>
          <h1>{content.title}</h1>
          <div className="article-meta">
            <span>By {content.author}</span>
            <span>&bull;</span>
            <span>{content.read_time} min read</span>
          </div>
          {content.tags && (
            <div className="article-tags">
              {content.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div 
          className="article-body"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content.body) }}
        />
      </article>
    </div>
  );
}

export default ContentDetail;
