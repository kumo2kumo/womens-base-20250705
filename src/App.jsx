import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:type/:id" element={<MovieDetail />} />
          <Route path="/tv-shows" element={<div className="coming-soon">TV番組ページ - 近日公開</div>} />
          <Route path="/movies" element={<div className="coming-soon">映画ページ - 近日公開</div>} />
          <Route path="/my-list" element={<div className="coming-soon">マイリストページ - 近日公開</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
