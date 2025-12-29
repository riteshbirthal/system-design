import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">&#9881;</span>
          System Design
        </Link>
        <div className="navbar-links">
          <Link to="/hld" className={`nav-link ${isActive('/hld') ? 'active' : ''}`}>
            HLD
          </Link>
          <Link to="/lld" className={`nav-link ${isActive('/lld') ? 'active' : ''}`}>
            LLD
          </Link>
          <Link to="/hld-practice" className={`nav-link ${isActive('/hld-practice') ? 'active' : ''}`}>
            HLD Practice
          </Link>
          <Link to="/lld-practice" className={`nav-link ${isActive('/lld-practice') ? 'active' : ''}`}>
            LLD Practice
          </Link>
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
