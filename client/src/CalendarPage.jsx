import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const TaskCalendar = () => {
    const urlBase = 'http://67.205.172.88:5000';

  const location = useLocation();
  const user = location.state.user;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksByDueDate, setTasksByDueDate] = useState({});

  const fetchUserTasks = async (date) => {
    try {
      const username = user.Username;
      const response = await axios.get(`${urlBase}/api/getUserTasks/${user}`);
      const tasks = response.data;
  
      // Initialize an object to store tasks organized by due date
      const tasksByDueDate = {};
  
      tasks.forEach((task) => {
        // Ensure the dueDate is a valid date before formatting
        const dueDate = task.DueDate ? new Date(task.DueDate) : null;
  
        if (dueDate instanceof Date && !isNaN(dueDate)) {
          const formattedDueDate = dueDate.toISOString().split('T')[0];
  
          if (!tasksByDueDate[formattedDueDate]) {
            tasksByDueDate[formattedDueDate] = [];
          }
  
          tasksByDueDate[formattedDueDate].push(task);
        } else {
          console.error('Invalid due date for task:', task);
        }
      });
  
      setTasksByDueDate(tasksByDueDate);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };
  
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchUserTasks(date); // Fetch tasks when the selected date changes
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
              {tasksByDueDate[selectedDate.toISOString().split('T')[0]]?.map((task) => (
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
