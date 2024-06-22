import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
  const [value, setValue] = useState(new Date());

  const handleChange = (value) => {
    setValue(value);
    console.log('Selected Date:', value);
  };

  return (
    <div>
      <Calendar onChange={handleChange} value={value} />
    </div>
  );
};

export default Calender
