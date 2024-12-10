import { useLocation, useNavigate } from 'react-router-dom';
import { Assignment } from '../interfaces/AssignmentInterface';
import '../App.css';

const RandomSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve assignments from state
  const assignments: Assignment[] = location.state?.assignments || [];

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
      {/* Removed Save Assignments button */}
      <button className="buttons" onClick={() => navigate('/create-group')}>
        Create a New Group
      </button>
    </div>
  );
};

export default RandomSelection;