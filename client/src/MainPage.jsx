import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './styles.css';
import { TaskList } from './MainPageScript';
import { CreateTaskModal } from './CreateTaskModal';
import { YourIngredients } from './ViewIngredientsModal';

function MainPage() {
  const [tasks, setTasks] = useState();
  const [ingredients, setIngredients] = useState();
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalIngredients, setShowModalIngredients] = useState(false);

  const location = useLocation();
  const user = location.state?.user;

  const getTasks = async () => {
    if (user) {
      const taskData = await TaskList(user)
      setTasks(taskData);
    }
  };
  
  if (tasks === undefined) {
    getTasks();
  }

  const getIngredients = async () => {
    const ingredientsData = await YourIngredients(user);
    setIngredients(ingredientsData);
  };
  
  if (ingredients === undefined)
  {
    getIngredients();
  }
  
  const navigate = useNavigate();

  return (
    <>
      <h1>LifeQuests</h1>
      <div className="container">
        <div className="main-page-box">
          <div className="form-title">Welcome, {user}</div>
          <div className="form-title">Your tasks</div>
          <form id="mainForm">
            <button type="button" className="button_mainpage" onClick={() => setShowModalTask(!showModalTask)} id="CreatTaskButton">Create Task</button>
            <button type="button" className="button_mainpage" onClick={() => navigate("/recipies")} id="ViewRecipiesButton">View Recipies</button>
            <button type="button" className="button_mainpage" onClick={() => setShowModalIngredients(!showModalIngredients)} id="YourIngredientsButton">Your Ingredients</button>
            {tasks}
            {tasks && tasks.length === 0 && <p>No tasks available</p>}
            {showModalTask ? <CreateTaskModal username={user} /> : undefined}
            {showModalTask ? <div id="overlay" onClick={() => setShowModalTask(false)}></div> : undefined}
            {showModalIngredients ? ingredients: undefined}
            {showModalIngredients ? <div id="overlay" onClick={() => setShowModalIngredients(false)}></div> : undefined}
          </form>
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
