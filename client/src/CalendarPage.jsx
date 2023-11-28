/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import DropdownOptions from './DropdownOptions';
import { YourIngredients } from './ViewIngredientsModal';
import { handleDelete, handleFinish, handleEdit } from './MainPageScript';
import { CreateDropDown } from './dropdown';


const TaskCalendar = () => {
  const urlBase = 'http://67.205.172.88:5000';

  const location = useLocation();
  const user = location.state?.user || {};

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksByDueDate, setTasksByDueDate] = useState([]);
  const navigate = useNavigate();
  const [taskDropdowns, setTaskDropdowns] = useState({});

  const [tasks, setTasks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState(null);
  const [newDesc, setNewDesc] = useState('');
  const [newIngredient, setNewIngredient] = useState('Select an Ingredient'); // Set default text
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const [loadingIngredientNames, setLoadingIngredientNames] = useState(true);
  const [ingredientNames, setIngredientNames] = useState([]);


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
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchUserTasks(date);
  };

  const handleDeleteClick = async (taskId, e) => {
    e.preventDefault();
    setTaskIdToDelete(taskId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (taskIdToDelete !== null) {
      await handleDelete(taskIdToDelete, user, setTasks);
      setTaskIdToDelete(null);
      setShowDeleteConfirmation(false);

      // Refetch tasks after deletion
      await fetchUserTasks(selectedDate);
    }
  };

  const handleFinishTask = async (taskId, e) => {
    e.preventDefault();
    await handleFinish(taskId, user, setTasks);

    // Refetch tasks after finishing
    await fetchUserTasks(selectedDate);

    // Fetch the updated user's ingredients list and update the state
    const updatedIngredients = await YourIngredients(user);
    setIngredients(updatedIngredients);
  };

  const handleCancelDelete = () => {
    setTaskIdToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleEditTask = async () => {
    // Check if either new description or new ingredient is not filled out
    if (!newDesc || newIngredient === 'Select an Ingredient') {
      const errorMessage = 'Please fill out both fields.';
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }

    try {
      await handleEdit(taskIdToEdit, user, newDesc, newIngredient, setTasks);
      setTaskIdToEdit(null);
      setShowEditModal(false);
      // Optionally, clear the input fields
      setNewDesc('');
      setNewIngredient('');
      // Close the dropdown
      setShowDropdown(false);
    } catch (error) {
      // Handle errors if needed
      console.error('Error editing task:', error.message);
    } finally {
      // Reset the error message
      setError('');
    }
  };
  const handleEditClick = async (taskId, e) => {
    e.preventDefault();
    setTaskIdToEdit(taskId);
    setShowEditModal(true);

    // Fetch the list of ingredients when the Edit Task modal is opened
    try {
      setLoadingIngredientNames(true); // Set loading state to true while fetching
      const response = await fetch(`${urlBase}/api/getIngredientNames`);
      if (response.ok) {
        const data = await response.json();
        setIngredientNames(data);
      } else {
        console.error('Failed to fetch ingredient names:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching ingredient names:', error.message);
    } finally {
      setLoadingIngredientNames(false); // Set loading state to false when fetching is complete
    }
  };
  if (loadingTasks) {
    fetchUserTasks(selectedDate);
  }

  return (
    <div>
      <h1>Task Calendar</h1>
      <button
        type="button"
        className="button_mainpage"
        onClick={() => navigate('/mainpage', { state: { user } })}
        id="ViewRecipesButton">Back to Main Page
      </button>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div>
          <div>
            <h2>Selected Date: {selectedDate.toISOString().split('T')[0]}</h2>
          </div>

          {loadingTasks ? (
            <p>Loading tasks...</p>
          ) : (
            <ul>
              {tasksByDueDate.map((task) => (
                <li key={task._id}>
                  <strong>{task.Desc}</strong>
                  <p>Ingredient: {task.Ingredient}</p>
                  <p>Due Date: {new Date(task.DueDate).toLocaleString()}</p>
                  <p>Effort Points: {task.EffortPoints}</p>
                  <button
                    type="button"
                    className="dropdown-button"
                    onClick={() =>
                      setTaskDropdowns((prevDropdowns) => ({
                        ...prevDropdowns,
                        [task._id]: !prevDropdowns[task._id],
                      }))
                    }
                  >
                    Options
                  </button>
                  {taskDropdowns[task._id] && (
                    <DropdownOptions
                      onDelete={(e) => handleDeleteClick(task._id, e)}
                      onFinish={(e) => handleFinishTask(task._id, e)}
                      onEdit={(e) => handleEditClick(task._id, e)}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}

          {showEditModal && (
            <>
              <div id="overlay" onClick={() => setShowEditModal(false)}></div>
              <div className="modalContainer">
                <div className="modalBox">
                  <p>Edit Task</p>
                  <label htmlFor="editDesc">New Description:</label>
                  <input
                    type="text"
                    id="editDesc"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                  <label htmlFor="editIngredient">New Ingredient:</label>
                  {/* Convert the ingredient input to a dropdown */}
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    id="editIngredientButton"
                    disabled={loadingIngredientNames} // Disable the button when ingredient names are loading
                  >
                    {loadingIngredientNames ? 'Loading...' : newIngredient}
                  </button>
                  {loadingIngredientNames}
                  {!loadingIngredientNames && showDropdown && (
                    <CreateDropDown
                      setIngredientHook={(ingredient) => {
                        setNewIngredient(ingredient);
                        setShowDropdown(false); // Close the dropdown when an ingredient is selected
                      }}
                      ingredientNames={ingredientNames}
                    />
                  )}
                  <button type="button" onClick={handleEditTask}>
                    Save
                  </button>
                  <button type="button" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>
            </>
          )}
          {showDeleteConfirmation && (
            <>
              <div id="overlay" onClick={handleCancelDelete}></div>
              <div className="modalContainer">
                <div className="modalBox">
                  <p>Are you sure you want to delete this task?</p>
                  <button type="button" onClick={handleConfirmDelete}>Yes</button>
                  <button type="button" onClick={handleCancelDelete}>No</button>
                </div>
              </div>
            </>
          )}



        </div>
      </div>
    </div>
  );
};


export default TaskCalendar;
