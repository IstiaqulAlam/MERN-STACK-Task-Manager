import React, { useState } from 'react';
import './styles.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { YourIngredients } from './ViewIngredientsModal';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Recipes() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [showModalIngredients, setShowModalIngredients] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);

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
  
  const getUserRecipes = async () => {
    try {
      const response = await fetch(`http://67.205.172.88:5000/api/getUserRecipes/${user}`);

      if (response.ok) {
        const recipes = await response.json();
        setUserRecipes(recipes);
      } else {
        console.error('Failed to fetch user recipes:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user recipes:', error);
    }
  };

  const redeemRecipe = async (recipeName) => {
    try {
      const response = await fetch(`http://67.205.172.88:5000/api/redeemRecipe/${user}/${recipeName}`, {
        method: 'POST',
      });

      if (response.ok) {
        console.log(`Recipe ${recipeName} redeemed successfully!`);
        getUserRecipes();
        getIngredients();
      } else {
        console.error('Failed to redeem recipe:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error redeeming recipe:', error);
    }
  };

  if (loadingIngredients) {
    getIngredients();
  }
  if (userRecipes.length === 0) {
    getUserRecipes();
  }

  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="main-page-box">
        <div className="form-title">Recipes</div>
          <button type="button" className="button_mainpage" onClick={() => navigate('/mainpage', { state: { user }})} id="ShowTasksBUtton">View Tasks</button>
          <button type="button" className="button_mainpage" onClick={() => setShowModalIngredients(true)} id="YourIngredientsButton">Your Ingredients</button>
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
          <td>{userRecipes.filter(recipe => recipe === 'Lasagna').length}</td>
          <td>
            <button type="button" onClick={() => redeemRecipe('Lasagna')} id="RedeemButton1">
              Redeem
            </button>
          </td>
        </tr>
        <tr>
          <td>Apple Pie</td>
          <td>Puff Pastry</td>
          <td>Apples</td>
          <td>Sugar</td>
          <td>{userRecipes.filter(recipe => recipe === 'Apple Pie').length}</td>
          <td>
            <button type="button" onClick={() => redeemRecipe('Apple Pie')} id="RedeemButton2">
              Redeem
            </button>
          </td>
        </tr>
        <tr>
          <td>Pizza</td>
          <td>Cheese</td>
          <td>Dough</td>
          <td>Tomato Sauce</td>
          <td>{userRecipes.filter(recipe => recipe === 'Pizza').length}</td>
          <td>
            <button type="button" onClick={() => redeemRecipe('Pizza')} id="RedeemButton3">
              Redeem
            </button>
          </td>
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
