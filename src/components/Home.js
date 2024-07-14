import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const authLinks = (
    <>
      {/* <li className="nav-item">
        <Link className="nav-link" to="/profile">Profile</Link>
      </li> */}
      <li className="nav-item">
        <a className="nav-link" onClick={() => dispatch(logout())} href="/">
          Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      {/* <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li> */}
    </>
  );

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="text-center">
        <h1 className="mb-4">User Management App</h1>
        <Link to="/login" className="btn btn-primary">
          Click to continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
