import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_GROUP } from '../utils/queries';
import { Group } from '../interfaces/SavedGroupInterface';
import '../App.css';

const SavedGroups: React.FC = () => {
  const navigate = useNavigate();
  const [savedGroups, setSavedGroups] = useState<Group[]>([]);

  // Use the `myGroups` query to fetch groups created by the user
  const { loading, error, data } = useQuery<{ myGroups: Group[] }> (QUERY_GROUP);

  useEffect(() => {
    if (data) {
      setSavedGroups(data.myGroups);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching saved groups: {error.message}</div>;

  return (
    <div className="random-selection-container">
      <h1 className="random-selection-title">Saved Secret Santa Groups</h1>
      {savedGroups.length > 0 ? (
        savedGroups.map((group) => (
          <div key={group._id}>
            <h3>{group.name}</h3>
            <ul className="assignment-list">
              {group.matches.map((assignment: any, idx: number) => (
                <li key={idx} className="assignment-item">
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