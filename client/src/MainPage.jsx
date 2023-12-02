import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import { TaskList, handleDelete, handleFinish, handleEdit } from './MainPageScript';
import { CreateTaskModal } from './CreateTaskModal';
import { YourIngredients } from './ViewIngredientsModal';
import { CreateDropDown } from './dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsSearch, BsCheckLg, BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import ProfileModal from './ProfilePageModal';

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
  const [showLoadingMessage, setShowLoadingMessage] = useState(true);

  const location = useLocation();
  const user = location.state?.user;

  const [searchName, setSearchName] = useState('');
  const [searchDueDate, setSearchDueDate] = useState('');
  const [selectedDueDate, setSelectedDueDate] = useState('');
  const [selectedEffortPoints, setSelectedEffortPoints] = useState(0);

  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);
  const [taskIdToFinish, setTaskIdToFinish] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [sortOrder, setSortOrder] = useState({
    field: null,
    ascending: true,
  });
  const sortTable = async (field, e) => {
    e.preventDefault();

    const isAscending = sortOrder.field === field ? !sortOrder.ascending : true;
    const sortedTasks = [...tasks].sort((a, b) =>
      isAscending ? a[field] > b[field] : a[field] < b[field]
    );

    setSortOrder({
      field,
      ascending: isAscending,
    });
    setTasks(sortedTasks);
  };

  const getTasks = async () => {
    setLoadingTasks(false);
    try {
      if (user) {
        const taskData = await TaskList(user);
        setTasks(taskData);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
    setShowLoadingMessage(false);
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
  //const [alertShown, setAlertShown] = useState(false);
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');
  /*if (!alertShown && !storedUsername && !storedPassword) {
    alert("You are not logged in! Returning to login page.");
    setAlertShown(true);
    navigate('/');
  }*/
  if (!storedUsername && !storedPassword) {
    navigate('/');
  }

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
    }
  };

  const handleFinishTask = async (taskId, e) => {
    e.preventDefault();
    setTaskIdToFinish(taskId);
    setShowFinishConfirmation(true);
  };
  const handleConfirmFinish = async () => {
    if (taskIdToFinish !== null) {
      await handleFinish(taskIdToFinish, user, setTasks);
      // Fetch the updated user's ingredients list and update the state
      const updatedIngredients = await YourIngredients(user);
      setIngredients(updatedIngredients);
      setTaskIdToFinish(null);
      setShowFinishConfirmation(false);
    }
  };

  const handleCancelFinish = () => {
    setTaskIdToFinish(null);
    setShowFinishConfirmation(false);
  };
  const handleCancelDelete = () => {
    setTaskIdToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleEditTask = async () => {
    // Check if either new description or new ingredient is not filled out
    if (!newDesc || newIngredient === 'Select an Ingredient') {
      const errorMessage = 'Please fill out all fields.';
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }

    try {
      const formattedDueDate = selectedDueDate.toISOString();


      await handleEdit(
        taskIdToEdit,
        user,
        newDesc,
        newIngredient,
        setTasks,
        formattedDueDate,
        selectedEffortPoints
      );
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


  const handleEditClick = async (task, e) => {
    e.preventDefault();
    console.log(task);
    setTaskIdToEdit(task._id);
    setNewIngredient(task.Ingredient);
    setNewDesc(task.Desc);
    setSelectedEffortPoints(task.EffortPoints);
    setSelectedDueDate(new Date(task.DueDate));
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


  const handleCalendarClick = () => {
    // Navigate to the calendar page
    navigate('/calendar', { state: { user } });
  };


  const handleSearchByName = async () => {
    try {
      if (user) {
        if (searchName.trim() === '') {
          // If searchName is empty, fetch the unfiltered list of tasks
          await getTasks();
        } else {
          // Fetch tasks based on the searchName
          const taskData = await TaskList(user);
          const filteredTasks = taskData.filter((task) =>
            task.Desc.toLowerCase().includes(searchName.toLowerCase())
          );
          setTasks(filteredTasks);
        }
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };


  const handleSearchByDueDate = async () => {
    if (searchDueDate.trim() === '') {
      // If searchDueDate is empty, fetch the unfiltered list of tasks
      await getTasks();
    } else {
      // Filter tasks based on the searchDueDate
      const filteredTasks = tasks.filter((task) => {
        // Convert task's due date to the same format as the searchDueDate
        const taskDueDate = new Date(task.DueDate).toISOString().split('T')[0];
        return taskDueDate === searchDueDate;
      });

      setTasks(filteredTasks);
    }
  };

  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="main-page-box">

        <div className="welcome-user-container">
            <div className="form-title2 welcome-user">Welcome, {user}</div>
            <button
              type="button"
              className="button_mainpage2"
              onClick={() => setShowProfileModal(true)}
            >
              View Profile
            </button>
            {showProfileModal && (
              <ProfileModal 
              setShowProfileModal={setShowProfileModal} 
              />
            )}
            {showProfileModal ? <div id="overlay" onClick={() => setShowProfileModal(false)}></div> : undefined}

          </div>
          <div className="task-list-container">
            <form id="mainForm">
              <button
                type="button"
                className="button_mainpage"
                onClick={handleCreateTask}
                id="CreatTaskButton"
              >
                Create Task
              </button>
              <button
                type="button"
                className="button_mainpage"
                onClick={() => navigate('/recipes', { state: { user } })}
                id="ViewRecipesButton">View Recipes
              </button>
              <button type="button"
                className="button_mainpage"
                onClick={() => setShowModalIngredients(!showModalIngredients)}
                id="YourIngredientsButton">Your Ingredients
              </button>
              <button
                type="button"
                className="button_mainpage"
                onClick={handleCalendarClick}
                id="CalendarButton"
              >
                Calendar
              </button>

              <div className="search-container">

                <div className="form-title">Search tasks</div>

                <input
                  type="text"
                  placeholder="Search by Task Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="input_mainpage"
                />
                <button type="button" className="button_search" onClick={handleSearchByName}>
                  <BsSearch />
                </button>
                <input
                  type="date"
                  placeholder="Search by Due Date"
                  value={searchDueDate}
                  className="input_mainpage"
                  onChange={(e) => setSearchDueDate(e.target.value)}
                />
                <button type="button" className="button_search" onClick={handleSearchByDueDate}>
                  <BsSearch />
                </button>
              </div>
              <div className="form-title">Your tasks</div>
              {showLoadingMessage && <p>Loading tasks...</p>}
              {!showLoadingMessage && tasks.length === 0 && <p>No tasks available</p>}
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
              <div className="tableDiv">
                {!loadingTasks && (
                  <table>
                    <thead>
                      <tr>
                        <th scope='col' onClick={(e) => sortTable('Desc', e)}>
                          Task Name {sortOrder.field === 'Desc' ? (sortOrder.ascending ? '↑' : '↓') : '↕'}
                        </th>
                        <th scope='col' onClick={(e) => sortTable('Ingredient', e)}>
                          Ingredient {sortOrder.field === 'Ingredient' ? (sortOrder.ascending ? '↑' : '↓') : '↕'}
                        </th>
                        <th scope='col' onClick={(e) => sortTable('DueDate', e)}>
                          Due by {sortOrder.field === 'DueDate' ? (sortOrder.ascending ? '↑' : '↓') : '↕'}
                        </th>
                        <th scope='col' onClick={(e) => sortTable('EffortPoints', e)}>
                          Effort {sortOrder.field === 'EffortPoints' ? (sortOrder.ascending ? '↑' : '↓') : '↕'}
                        </th>
                        <th>Edit</th>
                        <th>Finish</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task._id}>
                          <td>{task.Desc}</td>
                          <td>{task.Ingredient}</td>
                          <td>{formatDate(task.DueDate)}</td>
                          <td>{task.EffortPoints}</td>
                          <td>
                            <button type="button" onClick={(e) => handleEditClick(task, e)}>
                              <BsFillPencilFill />
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={(e) => handleFinishTask(task._id, e)}>
                              <BsCheckLg />
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={(e) => handleDeleteClick(task._id, e)}>
                              <BsFillTrash3Fill />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

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
              {showFinishConfirmation && (
                <>
                  <div id="overlay" onClick={handleCancelFinish}></div>
                  <div className="modalContainer">
                    <div className="modalBox">
                      <p>Are you sure you want to finish this task?</p>
                      <button type="button" onClick={handleConfirmFinish}>
                        Yes
                      </button>
                      <button type="button" onClick={handleCancelFinish}>
                        No
                      </button>
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
                      <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        id="editIngredientButton"
                        disabled={loadingIngredientNames}
                      >
                        {loadingIngredientNames ? 'Loading...' : newIngredient}
                      </button>
                      {!loadingIngredientNames && showDropdown && (
                        <CreateDropDown
                          setIngredientHook={(ingredient) => {
                            setNewIngredient(ingredient);
                            setShowDropdown(false);
                          }}
                          ingredientNames={ingredientNames}
                        />
                      )}
                      <div className="datepicker-container">
                        <DatePicker
                          selected={selectedDueDate}
                          onChange={(date) => setSelectedDueDate(date)}
                          customInput={<DateButton />}
                          dateFormat="MMMM d, yyyy"
                          popperPlacement="bottom-start"
                        />
                      </div>
                      <div className="datepicker-container">
                        <DatePicker
                          selected={selectedDueDate}
                          onChange={(date) => setSelectedDueDate(date)}
                          customInput={<DateButton2 />}
                          dateFormat="h:mm aa"
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          placeholderText="Select Due Date and Time"
                          popperPlacement="bottom-start"
                        />
                      </div>
                      <input
                        type="number"
                        id="editEffortPoints"
                        placeholder="Effort Points"
                        value={selectedEffortPoints}
                        onChange={(e) => setSelectedEffortPoints(e.target.value)}
                      />
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
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // Use 12-hour clock format
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

}
const DateButton = ({ value, onClick }) => (
  <div className="date-button-container">
    <button type="button" className="date-button" onClick={onClick}>
      {value || 'Select Due Date'}
    </button>
  </div>
);
const DateButton2 = ({ value, onClick }) => (
  <div className="date-button-container">
    <button type="button" className="date-button" onClick={onClick}>
      {value || 'Select Time'}
    </button>
  </div>
);
export default MainPage;
