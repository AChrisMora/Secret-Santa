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

  // Send assignments to the server
  const sendAssignmentsToServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignments }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Assignments sent successfully:', result);
        alert('Assignments saved successfully!');
      } else {
        console.error('Failed to send assignments:', response.statusText);
        alert('Failed to save assignments.');
      }
    } catch (error) {
      console.error('Error sending assignments:', error);
      alert('An error occurred while saving assignments.');
    }
  };

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
      <button onClick={sendAssignmentsToServer}>Save Assignments</button>
      <button onClick={() => navigate('/create-group')}>Create a New Group</button>
    </div>
  );
};

export default RandomSelection;