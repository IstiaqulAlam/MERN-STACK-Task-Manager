import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginMERT from './LoginMERT';
import RegisterMERT from './RegisterMERT';
import MainPage from './MainPage';
import Recipes from './Recipes';
import VerificationPage from './VerificationPage'; 
import CalendarPage from './CalendarPage';
import ResetPassword from './ResetPassword';
import SetNewPassword from './SetNewPassword';
import VerifyPasswordChange from './VerifyPasswordChange';

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
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/setnewpassword" element={<SetNewPassword />} />
        <Route path="/verifypasswordchange" element={<VerifyPasswordChange />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;

