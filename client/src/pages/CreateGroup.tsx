import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroup: React.FC = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Add a participant to the list
  const addParticipant = () => {
    if (name.trim()) {
      setParticipants([...participants, name]);
      setName(''); // Clear the input field
    }
  };

  // Generate assignments and navigate to the results page
  const generateAssignments = () => {
    if (participants.length > 1) {
      const shuffled = [...participants].sort(() => Math.random() - 0.5);
      const assignments = shuffled.map((giver, index) => ({
        giver,
        receiver: shuffled[(index + 1) % shuffled.length],
      }));
      navigate('/random-selection', { state: { assignments } });
    } else {
      alert('You need at least two participants to generate assignments!');
    }
  };

  return (
    <div>
      <h1>Create Group</h1>
      <input
        type="text"
        placeholder="Enter participant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addParticipant}>Add Participant</button>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
      {participants.length > 1 && (
        <button onClick={generateAssignments}>Generate Assignments</button>
      )}
    </div>
  );
};

export default CreateGroup;