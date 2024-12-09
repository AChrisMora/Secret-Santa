import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { User } from '../interfaces/UserInterface';

const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({ username: '', password: '' }); // Use User interface
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user.username.trim() && user.password.trim()) {
      setIsLoggedIn(true);
      console.log('User logged in successfully:', user.username);
    } else {
      console.error('Invalid username or password');
    }
  };

  const handleCreateGroup = () => {
    navigate('/create-group');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="login-container">
      {!isLoggedIn && <h1>Login</h1>}
      {!isLoggedIn ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
          <button onClick={handleLogin}>Login</button>
        </form>
      ) : (
        <div className="welcome-message">
          <h2>Welcome, Secret Santa!</h2>
          <button className="create-group-button" onClick={handleCreateGroup}>
            Create Group
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;