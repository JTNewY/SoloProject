import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContextProvider';

const Navigation = () => {
  const { isLogin, logout, loading } = useContext(LoginContext);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to="/">StarDEV Blog</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto py-4 py-lg-0">
            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/boards">Posts</Link></li>
            {isLogin ? (
              <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/" onClick={handleLogout}>Logout</Link></li>
            ) : (
              <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
