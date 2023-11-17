const YourIngredients = async (username) => {
  try {
      console.log(`Fetching ingredients for user: ${username}`);
      const response = await fetch(`http://67.205.172.88:5000/api/getUserIngredients/${username}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
        const responseData = await response.json();
        const ingredients = responseData.ingredients;
        const ingredientsList = ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ));
        return (
          <>
            <div className="modalContainer">
              <div className="modalBox">
                <p>Your Ingredients</p>
                <ul>{ingredientsList}</ul>
              </div>
            </div>
          </>
        );

        } else {
        console.error('Failed to fetch ingredients:', response.statusText);
        return <p>Failed to fetch ingredients</p>;
      }
  } catch (error) {
      console.error('Error fetching ingredients:', error.message);
      return <p>Error fetching ingredients</p>;
  }
};

export { YourIngredients };
