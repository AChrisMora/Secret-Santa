import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Assignment {
  giver: string;
  receiver: string;
}

const RandomSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve assignments from state
  const assignments: Assignment[] = location.state?.assignments || [];

  return (
    <div>
      <h1>Secret Santa Assignments</h1>
      {assignments.length > 0 ? (
        <ul>
          {assignments.map((assignment, index) => (
            <li key={index}>
              {assignment.giver} → {assignment.receiver}
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments found. Please go back and try again.</p>
      )}
      <button onClick={() => navigate('/create-group')}>Create a New Group</button>
    </div>
  );
};

export default RandomSelection;