import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Ensure this import is correct
import '../App.css';
import { User } from '../interfaces/UserInterface';
import Auth from '../utils/auth';

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({ username: '', password: '' });
  const [loginUser] = useMutation(LOGIN_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: { email: user.username, password: user.password }, // Send email and password
      });

      Auth.login(data.login.token); // Call the login method to save the token
      setIsLoggedIn(true);
      console.log('User logged in successfully:', user.username);
    } catch (error) {
      console.error('Invalid username or password');
    }
  };

  const handleCreateGroup = () => {
    navigate('/create-group');
  };

  return (
    <div className="login-container">
      {!isLoggedIn && <h1>Login</h1>}
      {!isLoggedIn ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="username"
            placeholder="Email"
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