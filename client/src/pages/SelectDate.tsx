import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SelectDate: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Select Date</h1>
      <Calendar onChange={(value) => setDate(value as Date)} />
      <button
        onClick={() => {
          if (date) navigate('/select-location');
        }}
      >
        Next
      </button>
    </div>
  );
};

export default SelectDate;