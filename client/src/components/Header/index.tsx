import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import for custom styles

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
      </div>
    </header>
  );
};

export default Header;