import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = ({ movie }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (movie) {
      setIsLoaded(true);
    }
  }, [movie]);

  const handleMovieClick = () => {
    if (movie) {
      const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
      navigate(`/movie/${mediaType}/${movie.id}`);
    }
  };

  if (!movie) return null;

  return (
    <div className="banner" onClick={handleMovieClick}>
      <div className="banner__contents">
        <div className="banner__info">
          <h1 className="banner__title">
            {movie.title || movie.name}
          </h1>
          <div className="banner__buttons">
            <button 
              className="banner__button banner__button--play"
              onClick={(e) => {
                e.stopPropagation();
                handleMovieClick();
              }}
            >
              <span className="banner__button-icon">▶</span>
              再生
            </button>
            <button 
              className="banner__button banner__button--info"
              onClick={(e) => {
                e.stopPropagation();
                handleMovieClick();
              }}
            >
              <span className="banner__button-icon">ℹ</span>
              詳細情報
            </button>
          </div>
          <p className="banner__description">
            {movie.overview?.length > 150 
              ? `${movie.overview.substring(0, 150)}...` 
              : movie.overview
            }
          </p>
        </div>
      </div>
      
      <div className="banner__fadeBottom" />
      
      <div 
        className="banner__backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          opacity: isLoaded ? 1 : 0
        }}
      />
    </div>
  );
};

export default Banner; 