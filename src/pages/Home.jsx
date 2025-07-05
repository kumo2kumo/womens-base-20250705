import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import {
  getTrending,
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getTopRatedTV,
  getNowPlayingMovies,
  getOnTheAirTV,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getDocumentaries
} from '../api/tmdb';
import './Home.css';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trendingData,
          popularMoviesData,
          popularTVData,
          topRatedMoviesData,
          topRatedTVData,
          nowPlayingData,
          onTheAirData,
          actionMoviesData,
          comedyMoviesData,
          horrorMoviesData,
          romanceMoviesData,
          documentariesData
        ] = await Promise.all([
          getTrending('all', 'week'),
          getPopularMovies(),
          getPopularTV(),
          getTopRatedMovies(),
          getTopRatedTV(),
          getNowPlayingMovies(),
          getOnTheAirTV(),
          getActionMovies(),
          getComedyMovies(),
          getHorrorMovies(),
          getRomanceMovies(),
          getDocumentaries()
        ]);

        setTrending(trendingData);
        setPopularMovies(popularMoviesData);
        setPopularTV(popularTVData);
        setTopRatedMovies(topRatedMoviesData);
        setTopRatedTV(topRatedTVData);
        setNowPlaying(nowPlayingData);
        setOnTheAir(onTheAirData);
        setActionMovies(actionMoviesData);
        setComedyMovies(comedyMoviesData);
        setHorrorMovies(horrorMoviesData);
        setRomanceMovies(romanceMoviesData);
        setDocumentaries(documentariesData);
        setLoading(false);
      } catch (error) {
        console.error('データ取得エラー:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <Banner movie={trending[0]} />
      
      <div className="home__rows">
        <Row 
          title="トレンド" 
          movies={trending} 
          isLargeRow={true}
        />
        <Row 
          title="人気の映画" 
          movies={popularMovies}
        />
        <Row 
          title="人気のTV番組" 
          movies={popularTV}
        />
        <Row 
          title="高評価の映画" 
          movies={topRatedMovies}
        />
        <Row 
          title="高評価のTV番組" 
          movies={topRatedTV}
        />
        <Row 
          title="今公開中の映画" 
          movies={nowPlaying}
        />
        <Row 
          title="放送中のTV番組" 
          movies={onTheAir}
        />
        <Row 
          title="アクション映画" 
          movies={actionMovies}
        />
        <Row 
          title="コメディ映画" 
          movies={comedyMovies}
        />
        <Row 
          title="ホラー映画" 
          movies={horrorMovies}
        />
        <Row 
          title="ロマンス映画" 
          movies={romanceMovies}
        />
        <Row 
          title="ドキュメンタリー" 
          movies={documentaries}
        />
      </div>
    </div>
  );
};

export default Home; 