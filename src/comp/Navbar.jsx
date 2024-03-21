import React from 'react';
import { NavLink } from 'react-router-dom';
import { logOut, logout } from '../pages/login/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.authSlice);

  const handleLogout = async() => {
    await dispatch(logOut());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/home">My App</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" exact="true" to="/home">Home</NavLink>
            </li>            
            <li className="nav-item">
              <NavLink className="nav-link" exact="true" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact="true" to="/"  onClick={handleLogout}>Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
