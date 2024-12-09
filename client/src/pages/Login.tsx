import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // import styling

const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate a login process (replace with real logic if needed)
    setIsLoggedIn(true);
    console.log('User logged in successfully');
  };

  const handleCreateGroup = () => {
    navigate('/create-group'); // Navigate to the Create Group page
  };

  return (
    <div className="login-container">
      {!isLoggedIn && <h1>Login</h1>}
      {!isLoggedIn ? (
        // Show the login form if the user is not logged in
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button onClick={handleLogin}>Login</button>
        </form>
      ) : (
        // Show the "Create Group" button after the user logs in
        <div className="welcome-message">
          <h2>Welcome, Secret Santa!</h2>
          <button className="create-group-button" onClick={handleCreateGroup}>Create Group</button>
        </div>
      )}
    </div>
  );
};

export default Login;