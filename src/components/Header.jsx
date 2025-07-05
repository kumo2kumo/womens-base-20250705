import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__content">
        <div className="header__left">
          <Link to="/" className="header__logo">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
              alt="Netflix" 
            />
          </Link>
          <nav className="header__nav">
            <Link to="/" className="header__nav-link">ホーム</Link>
            <Link to="/tv-shows" className="header__nav-link">TV番組</Link>
            <Link to="/movies" className="header__nav-link">映画</Link>
            <Link to="/my-list" className="header__nav-link">マイリスト</Link>
          </nav>
        </div>
        <div className="header__right">
          <div className="header__search">
            <input 
              type="text" 
              placeholder="タイトル、人物、ジャンルで検索" 
              className="header__search-input"
            />
          </div>
          <div className="header__profile">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
              alt="Profile" 
              className="header__profile-avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 