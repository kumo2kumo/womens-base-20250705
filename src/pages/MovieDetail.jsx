import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/${type}/${id}`, {
          params: {
            api_key: API_KEY,
            language: 'ja-JP',
            append_to_response: 'videos,credits,similar'
          }
        });
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        console.error('映画詳細取得エラー:', err);
        setError('映画の詳細を取得できませんでした');
        setLoading(false);
      }
    };

    if (id && type) {
      fetchMovieDetail();
    }
  }, [id, type, API_KEY]);

  if (loading) {
    return (
      <div className="movie-detail-loading">
        <div className="loading__spinner"></div>
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail-error">
        <h2>エラーが発生しました</h2>
        <p>{error || '映画が見つかりませんでした'}</p>
        <button onClick={() => navigate('/')} className="back-button">
          ホームに戻る
        </button>
      </div>
    );
  }

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}時間${mins}分`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '不明';
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="movie-detail">
      <div className="movie-detail__backdrop">
        <div 
          className="movie-detail__backdrop-image"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          }}
        />
        <div className="movie-detail__backdrop-overlay" />
      </div>

      <div className="movie-detail__content">
        <button 
          onClick={() => navigate('/')} 
          className="movie-detail__back-button"
        >
          ← 戻る
        </button>

        <div className="movie-detail__main">
          <div className="movie-detail__poster">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>

          <div className="movie-detail__info">
            <h1 className="movie-detail__title">
              {movie.title || movie.name}
            </h1>

            <div className="movie-detail__meta">
              <span className="movie-detail__year">
                {formatDate(movie.release_date || movie.first_air_date)}
              </span>
              {movie.runtime && (
                <span className="movie-detail__runtime">
                  {formatRuntime(movie.runtime)}
                </span>
              )}
              {movie.episode_run_time && movie.episode_run_time[0] && (
                <span className="movie-detail__runtime">
                  {formatRuntime(movie.episode_run_time[0])}
                </span>
              )}
              <span className="movie-detail__rating">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
            </div>

            <div className="movie-detail__genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="movie-detail__genre">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="movie-detail__overview">
              {movie.overview || '概要がありません'}
            </p>

            <div className="movie-detail__buttons">
              <button className="movie-detail__button movie-detail__button--play">
                ▶ 再生
              </button>
              <button className="movie-detail__button movie-detail__button--trailer">
                📺 トレーラー
              </button>
              <button className="movie-detail__button movie-detail__button--add">
                + マイリスト
              </button>
            </div>

            {movie.credits?.cast && (
              <div className="movie-detail__cast">
                <h3>キャスト</h3>
                <div className="movie-detail__cast-list">
                  {movie.credits.cast.slice(0, 6).map(actor => (
                    <div key={actor.id} className="movie-detail__cast-member">
                      <img
                        src={actor.profile_path 
                          ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
                          : '/default-avatar.png'
                        }
                        alt={actor.name}
                      />
                      <span>{actor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {movie.similar?.results && movie.similar.results.length > 0 && (
          <div className="movie-detail__similar">
            <h3>関連作品</h3>
            <div className="movie-detail__similar-list">
              {movie.similar.results.slice(0, 6).map(similarMovie => (
                <div 
                  key={similarMovie.id} 
                  className="movie-detail__similar-item"
                  onClick={() => navigate(`/movie/${type}/${similarMovie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                    alt={similarMovie.title || similarMovie.name}
                  />
                  <span>{similarMovie.title || similarMovie.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail; 