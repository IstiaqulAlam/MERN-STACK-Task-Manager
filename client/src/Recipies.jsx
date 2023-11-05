import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from "react-router-dom";
import { CreateTaskModal } from './CreateTaskModal';
import { YourIngredients } from './ViewIngredientsModal';

function Recipies() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState();
  const [showModalIngredients, setShowModalIngredients] = useState(false);

  const getIngredients = async () => {setIngredients(await YourIngredients())}
  if (ingredients === undefined)
  {
    getIngredients();
  }

  return (
    <>
      <h1>LifeQuests</h1>
      <div className="container">
        <div className="main-page-box">
          <div className="form-title">Recipies</div>
          <button type="button" className="button_mainpage" onClick={() => navigate("/mainpage")} id="ShowTasksBUtton">View Tasks</button>
          <button type="button" className="button_mainpage" onClick={() => setShowModalIngredients(true)} id="YourIngredientsButton">Your Ingredients</button>
            {showModalIngredients ? ingredients: undefined}
            {showModalIngredients ? <div id="overlay" onClick={() => setShowModalIngredients(false)}></div> : undefined}
        </div>
      </div>
      <div className="mountain left-mountain"></div>
      <div className="mountain right-mountain"></div>
      <div className="sun"></div>
      <script src="LoginScript.js"></script>
    </>
  );
}

export default Recipies;
