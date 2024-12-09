import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import CreateGroup from './pages/CreateGroup';
import Signup from './pages/Signup';
import RandomSelection from './pages/RandomSelection'; // Import RandomSelection page

const App: React.FC = () => {
  return (
    <div>
      {/* Add Header */}
      <Header />
      {/* Main App Routes */}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/random-selection" element={<RandomSelection />} /> {/* Add RandomSelection route */}
          {/* Add other routes */}
        </Routes>
      </main>
    </div>
  );
};

export default App;