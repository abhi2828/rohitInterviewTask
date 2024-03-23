import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './comp/Navbar';
import Home from './pages/home/Home';
import LoginPage from './pages/login/LoginPage';
import AboutPage from './pages/aboutPage/AboutPage';
import Register from './pages/login/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? <Navbar onLogout={handleLogout} />: <></>}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
