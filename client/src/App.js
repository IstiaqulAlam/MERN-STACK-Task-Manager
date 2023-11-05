import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginMERT from './LoginMERT';
import RegisterMERT from './RegisterMERT';
import MainPage from './MainPage';
import Recipies from './Recipies';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginMERT />} />
        <Route path="/register" element={<RegisterMERT />} />
        <Route path="/login" element={<LoginMERT />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/recipies" element={<Recipies />} />
      </Routes>
    </Router>
  );
}

export default App;

