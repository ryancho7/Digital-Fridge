import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserHome from './pages/UserHome';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;