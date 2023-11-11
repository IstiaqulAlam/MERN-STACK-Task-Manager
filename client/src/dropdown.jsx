const CreateDropDown = ({setIngredientHook}) => {
    return(
        <>
            <div className="dropDownContainer">
                <div className="dropDownbox">
                        <button type="button" onClick={() => setIngredientHook("Ingredient 1")} id="ingredientButton1">Ingredient 1</button>
                        <button type="button" onClick={() => setIngredientHook("Ingredient 2")} id="ingredientButton2">Ingredient 2</button>
                        <button type="button" onClick={() => setIngredientHook("Ingredient 3")} id="ingredientButton3">Ingredient 3</button>
                </div>
            </div>
        </>
    );
}

export { CreateDropDown };
