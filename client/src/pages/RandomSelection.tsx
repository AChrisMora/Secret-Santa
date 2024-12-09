import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_ASSIGNMENTS } from '../utils/mutations';
import { Assignment } from '../interfaces/AssignmentInterface';

const RandomSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [saveAssignments] = useMutation(SAVE_ASSIGNMENTS);

  const [groupId, setGroupId] = useState<string | null>(null);

  // Retrieve assignments from state
  const assignments: Assignment[] = location.state?.assignments || [];

  useEffect(() => {
    // Assuming groupId comes from the state or API
    const retrievedGroupId = location.state?.groupId || 'DEFAULT_GROUP_ID'; // Fetch the actual group ID
    setGroupId(retrievedGroupId); // Update groupId state
  }, [location.state]);

  // Send assignments to the server
  const sendAssignmentsToServer = async () => {
    if (!groupId) {
      alert('No group ID available');
      return;
    }

    try {
      const { data } = await saveAssignments({
        variables: { groupId, assignments },
      });

      console.log('Assignments sent successfully:', data);
      alert('Assignments saved successfully!');
    } catch (error) {
      console.error('Error sending assignments:', error);
      alert('An error occurred while saving assignments.');
    }
  };

  return (
    <div className="random-selection-container">
      <h1 className="random-selection-title">Secret Santa Assignments</h1>
      {assignments.length > 0 ? (
        <ul className="assignment-list">
          {assignments.map((assignment, index) => (
            <li key={index} className="assignment-item">
              {assignment.giver} → {assignment.receiver}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-assignments">No assignments found. Please go back and try again.</p>
      )}
      <button className="buttons" onClick={sendAssignmentsToServer}>
        Save Assignments
      </button>
      <button className="buttons" onClick={() => navigate('/create-group')}>
        Create a New Group
      </button>
    </div>
  );
};

export default RandomSelection;