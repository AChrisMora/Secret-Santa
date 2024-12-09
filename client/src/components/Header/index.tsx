import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Title */}
        <Link to="/" className="header-title">
          Secret Santa
        </Link>

        {/* Login Button */}
        <nav>
          <Link to="/login" className="header-login-btn">
            Login
          </Link>
        </nav>
<nav>
          <Link to="/signup" className="header-login-btn">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;