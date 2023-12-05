import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const TaskCalendar = () => {
  const urlBase = 'http://67.205.172.88:5000';

  const location = useLocation();
  const user = location.state?.user || {};

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksByDueDate, setTasksByDueDate] = useState({});
  const navigate = useNavigate();
  const [loadingTasks, setLoadingTasks] = useState(true);

  const fetchAllUserTasks = async () => {
    try {
      if (!user) {
        console.error('User is undefined or has no username');
        return;
      }

      const response = await axios.get(`${urlBase}/api/getUserTaskDates/${user}`);
      const tasksByDueDate = response.data;

      setTasksByDueDate(tasksByDueDate);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const formatDayContent = (date) => {
    const tasksForDate = tasksByDueDate[date.toISOString().split('T')[0]] || [];

    return (
      <ul>
        {tasksForDate.map((task) => (
          <li key={task._id}>
            <strong>{task.Desc}</strong>
            <p>
              {new Date(task.DueDate).toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
              })}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Fetch user tasks for all dates
    fetchAllUserTasks();
  };

  if (loadingTasks) {
    // Fetch user tasks for all dates if tasks are still loading
    fetchAllUserTasks();
  }


  return (
    <div>
      <h1>Task Calendar</h1>
      <button
        type="button"
        className="button_mainpage3"
        onClick={() => navigate('/mainpage', { state: { user } })}
        id="MainPageButton">Back to Main Page
      </button>
      <div style={{ display: 'flex' }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date, view }) => view === 'month' && formatDayContent(date)}
        />
      </div>
    </div>
  );
};

export default TaskCalendar;
