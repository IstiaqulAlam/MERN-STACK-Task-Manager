import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const TaskCalendar = () => {
  const urlBase = 'http://67.205.172.88:5000';

  const location = useLocation();
  const user = location.state?.user || {}; 

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksByDueDate, setTasksByDueDate] = useState([]);

  const fetchUserTasks = async (date) => {
    try {
      if (!user) {
        console.error('User is undefined or has no username');
        return;
      }

      const response = await axios.get(`${urlBase}/api/getUserTaskDates/${user}`);
      const tasksByDueDate = response.data;

      // Extract tasks for the selected date
      const tasksForSelectedDate = tasksByDueDate[date.toISOString().split('T')[0]] || [];

      console.log('Tasks for Selected Date:', tasksForSelectedDate);

      setTasksByDueDate(tasksForSelectedDate);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchUserTasks(date);
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
              {tasksByDueDate.map((task) => (
                <li key={task._id}>{task.Desc}</li>
              ))}
            </ul>
          </div>
          <div>
            <input
              type="text"
              placeholder="Add task"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // Implement logic to add a new task for the selected date
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
