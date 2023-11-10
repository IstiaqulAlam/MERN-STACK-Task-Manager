const CreateDropDown = ({setIngredientHook}) => {
    return(
        <>
            <div className="dropDownContainer">
                <div className="dropDownbox">
                        <button type="button" onClick={() => setIngredientHook("Ingredeint 1")} id="ingredientButton1">Ingredeint 1</button>
                        <button type="button" onClick={() => setIngredientHook("Ingredeint 2")} id="ingredientButton2">Ingredeint 2</button>
                        <button type="button" onClick={() => setIngredientHook("Ingredeint 3")} id="ingredientButton3">Ingredient 3</button>
                </div>
            </div>
        </>
    );
}

export { CreateDropDown };
