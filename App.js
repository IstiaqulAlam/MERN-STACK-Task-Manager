import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginMERT from './LoginMERT';
import RegisterMERT from './RegisterMERT';
import MainPage from './MainPage';
import Recipes from './Recipes';
import VerificationPage from './VerificationPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginMERT />} />
        <Route path="/register" element={<RegisterMERT />} />
        <Route path="/login" element={<LoginMERT />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/verify" element={<VerificationPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;

