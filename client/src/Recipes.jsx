import React, { useState } from 'react';
import './styles.css';
import { useNavigate, useLocation } from "react-router-dom";
import { YourIngredients } from './ViewIngredientsModal';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { loginWithStoredCredentials } from './AutoLogin';

function Recipes() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState();
  const [showModalIngredients, setShowModalIngredients] = useState(false);

  const [LasagnaTimesMade, SetLasagnaTimesMade] = useState(0);
  const [ApplePieTimesMade, SetApplePieTimesMade] = useState(0);
  const [PizzaTimesMade, SetPizzaTimesMade] = useState(0);

  const getIngredients = async () => {
    loginWithStoredCredentials();

    setIngredients(await YourIngredients(user))
  }
  if (ingredients === undefined)
  {
    getIngredients();
  }

  return (
    <>
      <h1>LifeQuests</h1>
      <div className="container">
        <div className="main-page-box">
          <div className="form-title">Recipes</div>
          <button type="button" className="button_mainpage" onClick=
          {() => 
          navigate('/mainpage', { state: { user } })}

          
          id="ShowTasksBUtton">View Tasks</button>
          <button type="button" className="button_mainpage" onClick={() => setShowModalIngredients(true)} id="YourIngredientsButton">Your Ingredients</button>
            {showModalIngredients ? ingredients: undefined}
            {showModalIngredients ? <div id="overlay" onClick={() => setShowModalIngredients(false)}></div> : undefined}
      <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope='col'>Recipe Name</th>
          <th scope='col'>Ingredient 1</th>
          <th scope='col'>Ingredient 2</th>
          <th scope='col'>Ingredient 3</th>
          <th scope='col'>Times made</th>
          <th scope='col'>Redeem</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>Lasagna</td>
          <td>Pasta</td>
          <td>Sauce</td>
          <td>Cheese</td>
          <td>{LasagnaTimesMade}</td>
          <td><button type="button" onClick={undefined} id="RedeemButton1">Redeem</button></td>
        </tr>
        <tr>
          <td>Apple Pie</td>
          <td>Puff Pastry</td>
          <td>Apples</td>
          <td>Sugar</td>
          <td>{ApplePieTimesMade}</td>
          <td><button type="button" onClick={undefined} id="RedeemButton2">Redeem</button></td>
        </tr>
        <tr>
          <td>Pizza</td>
          <td>Cheese</td>
          <td>Dough</td>
          <td>Tomato Sauce</td>
          <td>{PizzaTimesMade}</td>
          <td><button type="button" onClick={undefined} id="RedeemButton3">Redeem</button></td>
        </tr>
      </MDBTableBody>
    </MDBTable>
        </div>
      </div>
      <div className="mountain left-mountain"></div>
      <div className="mountain right-mountain"></div>
      <div className="sun"></div>
      <script src="LoginScript.js"></script>
    </>
  );
}

export default Recipes;
