import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// トレンド（all, movie, tv, person）
export const getTrending = async (mediaType = 'all', timeWindow = 'day') => {
  // mediaType: 'all' | 'movie' | 'tv' | 'person'
  // timeWindow: 'day' | 'week'
  const response = await axios.get(`${BASE_URL}/trending/${mediaType}/${timeWindow}`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP'
    }
  });
  return response.data.results;
};

// 人気映画一覧
export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 人気TVシリーズ一覧
export const getPopularTV = async () => {
  const response = await axios.get(`${BASE_URL}/tv/popular`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// トップレーティング映画
export const getTopRatedMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// トップレーティングTVシリーズ
export const getTopRatedTV = async () => {
  const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 今公開中の映画
export const getNowPlayingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// 放送中のTVシリーズ
export const getOnTheAirTV = async () => {
  const response = await axios.get(`${BASE_URL}/tv/on_the_air`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      page: 1
    }
  });
  return response.data.results;
};

// アクション映画
export const getActionMovies = async () => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      with_genres: 28,
      page: 1
    }
  });
  return response.data.results;
};

// コメディ映画
export const getComedyMovies = async () => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      with_genres: 35,
      page: 1
    }
  });
  return response.data.results;
};

// ホラー映画
export const getHorrorMovies = async () => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      with_genres: 27,
      page: 1
    }
  });
  return response.data.results;
};

// ロマンス映画
export const getRomanceMovies = async () => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      with_genres: 10749,
      page: 1
    }
  });
  return response.data.results;
};

// ドキュメンタリー
export const getDocumentaries = async () => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: 'ja-JP',
      with_genres: 99,
      page: 1
    }
  });
  return response.data.results;
};
