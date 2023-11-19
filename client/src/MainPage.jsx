import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import { TaskList, handleDelete, handleFinish } from './MainPageScript';
import { CreateTaskModal } from './CreateTaskModal';
import { YourIngredients } from './ViewIngredientsModal';
import { loginWithStoredCredentials } from './AutoLogin';

function MainPage() {
  const [tasks, setTasks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalIngredients, setShowModalIngredients] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

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

  const handleDeleteClick = (taskId) => {
    setTaskIdToDelete(taskId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (taskIdToDelete !== null) {
      handleDelete(taskIdToDelete, user);
      setTaskIdToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setTaskIdToDelete(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="main-page-box">
          <div className="form-title">Welcome, {user}</div>
          <div className="form-title">Your tasks</div>
          <form id="mainForm">
            <button type="button" className="button_mainpage" onClick={() => setShowModalTask(!showModalTask)} id="CreatTaskButton">Create Task</button>
            <button type="button" className="button_mainpage" onClick={() => navigate('/recipes', { state: { user } })} id="ViewRecipesButton">View Recipes</button>
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
                  onClick={() => handleFinish(task._id, user)}
                >
                  Finish
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
            {showModalTask ? <CreateTaskModal username={user} /> : undefined}
            {showModalTask ? <div id="overlay" onClick={() => setShowModalTask(false)}></div> : undefined}
            {loadingIngredients && <p>Loading ingredients...</p>}
            {!loadingIngredients && showModalIngredients && (
              <>
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
            {!loadingIngredients && showModalIngredients && <div id="overlay" onClick={() => setShowModalIngredients(false)}></div>}
          </form>
          <div id="loginNotice"></div>
        </div>
      </div>
      <script src="LoginScript.js"></script>
    </>
  );
}

export default MainPage;
