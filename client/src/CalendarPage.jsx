import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskCalendar = () => {
  // State to store selected date and tasks
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to add a task for the selected date
  const addTask = (task) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setTasks((prevTasks) => ({
      ...prevTasks,
      [formattedDate]: [...(prevTasks[formattedDate] || []), task],
    }));
  };

  return (
    <div>
      <h1>Task Calendar</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div>
          <div>
            <h2>Selected Date: {selectedDate.toISOString().split('T')[0]}</h2>
          </div>
          <div>
            <ul>
              {tasks[selectedDate.toISOString().split('T')[0]]?.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
          <div>
            <input
              type="text"
              placeholder="Add task"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;
