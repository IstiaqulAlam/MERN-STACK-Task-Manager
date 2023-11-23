import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import { TaskList, handleDelete, handleFinish, handleEdit } from './MainPageScript';
import { CreateTaskModal } from './CreateTaskModal';
import { YourIngredients } from './ViewIngredientsModal';
import { loginWithStoredCredentials } from './AutoLogin';
import { CreateDropDown } from './dropdown';

function MainPage() {
  const urlBase = 'http://67.205.172.88:5000';

  const [tasks, setTasks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalIngredients, setShowModalIngredients] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
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

  const location = useLocation();
  const user = location.state?.user;

  const getTasks = async () => {
    try {
      loginWithStoredCredentials();
      if (user) {
        const taskData = await TaskList(user);
        setTasks(taskData);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    } finally {
      setLoadingTasks(false);
    }
  };

  const getIngredients = async () => {
    try {
      const ingredientsData = await YourIngredients(user);
      setIngredients(ingredientsData);
    } catch (error) {
      console.error('Error fetching ingredients:', error.message);
    } finally {
      setLoadingIngredients(false);
    }
  };

  if (loadingTasks) {
    getTasks();
  }

  if (loadingIngredients) {
    getIngredients();
  }

  const navigate = useNavigate();

  const handleDeleteClick = async (taskId) => {
    setTaskIdToDelete(taskId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (taskIdToDelete !== null) {
      await handleDelete(taskIdToDelete, user, setTasks);
      setTaskIdToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleFinishTask = async (taskId) => {
    await handleFinish(taskId, user, setTasks);
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
  const handleEditClick = async (taskId) => {
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

  const handleCreateTask = async () => {
    setShowModalTask(true);
  };
  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="main-page-box">
          <div className="form-title">Welcome, {user}</div>
          <div className="form-title">Your tasks</div>
          <div className="task-list-container">
          <form id="mainForm">
            <button
              type="button"
              className="button_mainpage"
              onClick={handleCreateTask}
              id="CreatTaskButton"
            >
              Create Task
            </button>            <button type="button" className="button_mainpage" onClick={() => navigate('/recipes', { state: { user } })} id="ViewRecipesButton">View Recipes</button>
            <button type="button" className="button_mainpage" onClick={() => setShowModalIngredients(!showModalIngredients)} id="YourIngredientsButton">Your Ingredients</button>
            {loadingTasks && <p>Loading tasks...</p>}
            {!loadingTasks && tasks.length === 0 && <p>No tasks available</p>}
            {!loadingTasks && tasks.map(task => (
              <div key={task._id}>
                <p>{`Task: ${task.Desc}, Ingredient: ${task.Ingredient}`}</p>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteClick(task._id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="finish-button"
                  onClick={() => handleFinishTask(task._id, user)}
                >
                  Finish
                </button>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEditClick(task._id)}
                >
                  Edit
                </button>
              </div>
            ))}

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
            {showModalTask && (
              <CreateTaskModal
                username={user}
                setTasks={setTasks}
                setShowModalTask={setShowModalTask}
              />
            )}
            {showModalTask ? <div id="overlay" onClick={() => setShowModalTask(false)}></div> : undefined}
            {loadingIngredients && <p>Loading ingredients...</p>}
            {!loadingIngredients && showModalIngredients && (
              <>
                <div id="overlay" onClick={() => setShowModalIngredients(false)}></div>
                <div className="modalContainer">
                  <div className="modalBox">
                    <p>Your Ingredients</p>
                    <ul>
                      {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
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
          </form>
          </div>
          <div id="loginNotice"></div>
        </div>
      </div>
      <div className="mountain left-mountain"></div>
      <div className="mountain right-mountain"></div>
      <div className="sun"></div>
      <script src="LoginScript.js"></script>
    </>
  );
}

export default MainPage;
