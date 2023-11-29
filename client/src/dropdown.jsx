const CreateDropDown = ({ ingredientNames, setIngredientHook }) => {
  return (
    <>
      <div className="dropDownContainer">
        <div className="dropDownbox">
          <button
            type="button"
            onClick={() => setIngredientHook('Select an Ingredient')}
            id="defaultIngredientButton"
            hidden
          >
            Select an Ingredient
          </button>

          {ingredientNames.map((name, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setIngredientHook(name)}
              id={`ingredientButton${index + 1}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export { CreateDropDown };
