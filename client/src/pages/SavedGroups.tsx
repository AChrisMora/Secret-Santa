import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_ASSIGNMENTS } from '../utils/queries'; // Import the query
import { Assignment } from '../interfaces/AssignmentInterface';
import '../App.css';
import { useParams } from 'react-router-dom';

const SavedGroups: React.FC = () => {
  const navigate = useNavigate();
  const [savedGroups, setSavedGroups] = useState<Assignment[][]>([]);

  // Fetch the groupId from URL params or other method
  const { groupId } = useParams(); // Extract groupId from URL params

  // Fetch saved groups from the API using the QUERY_ASSIGNMENTS query
  const { loading, error, data } = useQuery(QUERY_ASSIGNMENTS, {
    variables: { groupId: groupId }, // Pass the groupId dynamically
  });

  useEffect(() => {
    if (data) {
      // Map the fetched assignments into a structure that matches the component's expectations
      setSavedGroups(data.ssGroup.matches); // Use matches for the assignments
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching saved groups: {error.message}</div>;

  return (
    <div className="random-selection-container">
      <h1 className="random-selection-title">Saved Secret Santa Groups</h1>
      {savedGroups.length > 0 ? (
        savedGroups.map((group, index) => (
          <div key={index}>
            <h3>Group {index + 1}</h3>
            <ul className="assignment-list">
              {group.map((assignment, index) => (
                <li key={index} className="assignment-item">
                  {assignment.giver} → {assignment.receiver}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="no-assignments">No saved groups found.</p>
      )}
      <button className="buttons" onClick={() => navigate('/create-group')}>
        Create a New Group
      </button>
    </div>
  );
};

export default SavedGroups;