import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Participant } from '../interfaces/ParticipantInterface';
import { Assignment } from '../interfaces/AssignmentInterface';
import '../App.css';

const CreateGroup: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Add a participant to the list
  const addParticipant = () => {
    if (name.trim()) {
      setParticipants([...participants, { name }]);
      setName('');
    }
  };

  // Send participants to the server
  const sendParticipantsToServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participants: participants.map((participant) => participant.name),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Participants sent successfully:', result);
        alert('Participants saved successfully!');
      } else {
        console.error('Failed to send participants:', response.statusText);
        alert('Failed to save participants.');
      }
    } catch (error) {
      console.error('Error sending participants:', error);
      alert('An error occurred while saving participants.');
    }
  };

  // Generate assignments and navigate to the results page
  const generateAssignments = async () => {
    if (participants.length > 1) {
      const shuffled = participants.map((p) => p.name).sort(() => Math.random() - 0.5);
      const assignments: Assignment[] = shuffled.map((giver, index) => ({
        giver,
        receiver: shuffled[(index + 1) % shuffled.length],
      }));

      // Save participants first before navigating
      await sendParticipantsToServer();

      // Navigate to the assignments page with the generated assignments
      navigate('/random-selection', { state: { assignments } });
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
            <li key={index}>{participant.name}</li>
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