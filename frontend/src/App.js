import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserHome from './pages/UserHome';
import { Home as LoginPage } from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;