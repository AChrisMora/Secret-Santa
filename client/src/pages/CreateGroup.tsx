import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_SSGROUP } from '../utils/mutations';
import { Assignment } from '../interfaces/AssignmentInterface';
import '../App.css';

const CreateGroup: React.FC = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Add a participant to the list
  const addParticipant = () => {
    if (name.trim()) {
      setParticipants([...participants, name]);
      setName('');
    }
  };

  // Create group using the GraphQL mutation
  const [createSSGroup] = useMutation(CREATE_SSGROUP);
  
  // Generate assignments and navigate to the results page
  const generateAssignments = async () => {
    if (participants.length > 1) {
      const shuffled = [...participants].sort(() => Math.random() - 0.5);
      const assignments: Assignment[] = shuffled.map((giver, index) => ({
        giver,
        receiver: shuffled[(index + 1) % shuffled.length],
      }));

      // Create the group and send assignments
      try {
        await createSSGroup({
          variables: { input: { name: 'Secret Santa Group', members: participants, matches: assignments } },
        });

        // Navigate to the assignments page
        navigate('/random-selection', { state: { assignments } });
      } catch (err) {
        console.error('Error creating group:', err);
      }
    } else {
      alert('You need at least two participants to generate assignments!');
    }
  };

  return (
    <div className="create-group-container">
      <div className="create-group-form">
        <h1>Create Group</h1>
        <input
          className="input-participant"
          type="text"
          placeholder="Enter participant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="add-participant-button" onClick={addParticipant}>
          Add Participant
        </button>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
        {participants.length > 1 && (
          <button className="generate-assignments-button" onClick={generateAssignments}>
            Generate Assignments
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateGroup;