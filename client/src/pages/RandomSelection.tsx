import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Assignment {
  giver: string;
  receiver: string;
}

const RandomSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const assignments: Assignment[] = location.state?.assignments || [];

  return (
    <div>
      <h1>Secret Santa Assignments</h1>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index}>
            {assignment.giver} → {assignment.receiver}
          </li>
        ))}
      </ul>
      <p>
        Notify participants of their assigned person and wishlist offline (via email, SMS, or in
        person).
      </p>
      <button onClick={() => navigate('/')}>Finish</button>
    </div>
  );
};

export default RandomSelection;