import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // import css

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

  // Send data to the server
  const sendDataToServer = async () => {
    const groupData = {
      participants: participants, 
    };

    try {
      const response = await fetch('http://localhost:5000/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Data sent successfully:', result);
        alert('Group data saved successfully!');
      } else {
        console.error('Failed to send data:', response.statusText);
        alert('Failed to save group data.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('An error occurred while saving group data.');
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
      // Send data to the server before navigating
      sendDataToServer();
      navigate('/random-selection', { state: { assignments } });
    } else {
      alert('You need at least two participants to generate assignments!');
    }
  };

  return (
    <div className="create-group-container">
     <div className='create-group-form'>
      <h1>  Create Group</h1>
      <input className='input-participant'
        type="text"
        placeholder="Enter participant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="add-participant-button" onClick={addParticipant}>Add Participant</button>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
      {participants.length > 1 && (
        <button className="generate-assignments-button" onClick={generateAssignments}>Generate Assignments</button>
      )}
      </div>
    </div>
  );
};

export default CreateGroup;