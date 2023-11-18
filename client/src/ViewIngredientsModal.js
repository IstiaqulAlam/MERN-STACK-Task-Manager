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
      return ingredients;
    } else {
      console.error('Failed to fetch ingredients:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching ingredients:', error.message);
    return [];
  }
};

export { YourIngredients };