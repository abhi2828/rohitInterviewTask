import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './comp/Navbar';
import Home from './pages/home/Home';
import LoginPage from './pages/login/LoginPage';
import AboutPage from './pages/aboutPage/AboutPage';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './pages/login/authSlice';

const App = () => {
  const dispatch = useDispatch();

  // Check if there is a token in local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, dispatch loginSuccess action
      dispatch(loginSuccess({ token, user: null }));
    } else {
      // If token does not exist, dispatch logout action
      dispatch(logout());
    }
  }, [dispatch]);

  const { isLoading, error, isLoggedIn } = useSelector((state) => state.authSlice);

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="*" element={<Navigate to="/home" />} /> */}
          </Routes>
        </>
      ) : (
        <LoginPage />
      )}
    </Router>
  );
};

export default App;
