import React, { useState, useRef } from 'react';
import './Row.css';

const Row = ({ title, movies, isLargeRow = false }) => {
  const [isHovered, setIsHovered] = useState(null);
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      
      <div className="row__container">
        <button 
          className="row__arrow row__arrow--left"
          onClick={() => scroll('left')}
        >
          ‹
        </button>
        
        <div className="row__posters" ref={rowRef}>
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className={`row__poster ${isLargeRow ? 'row__poster--large' : ''}`}
              onMouseEnter={() => setIsHovered(movie.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <img
                className="row__poster-img"
                src={`https://image.tmdb.org/t/p/original${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name || movie.title}
              />
              
              {isHovered === movie.id && (
                <div className="row__poster-overlay">
                  <div className="row__poster-info">
                    <h3 className="row__poster-title">
                      {movie.name || movie.title}
                    </h3>
                    <p className="row__poster-overview">
                      {movie.overview?.length > 100 
                        ? `${movie.overview.substring(0, 100)}...` 
                        : movie.overview
                      }
                    </p>
                    <div className="row__poster-buttons">
                      <button className="row__poster-button row__poster-button--play">
                        ▶ 再生
                      </button>
                      <button className="row__poster-button row__poster-button--add">
                        +
                      </button>
                      <button className="row__poster-button row__poster-button--like">
                        👍
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button 
          className="row__arrow row__arrow--right"
          onClick={() => scroll('right')}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Row; 