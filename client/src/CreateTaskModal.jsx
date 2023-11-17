import React, { useState } from 'react';
import { CreateDropDown } from './dropdown';

const CreateTaskModal = ({ username }) => {
    
    const urlBase = 'http://67.205.172.88:5000';

    const [showDropdown, setShowDropdown] = useState(false);
    const [pickedIngredient, setPickedIngredient] = useState("Pick an Ingredient");
    const [taskName, setTaskName] = useState("");
    const [ingredientNames, setIngredientNames] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchIngredientNames = async () => {
        try {
            const response = await fetch(`${urlBase}/api/getIngredientNames`);
            if (response.ok) {
                const data = await response.json();
                setIngredientNames(data);
            } else {
                console.error('Failed to fetch ingredient names:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching ingredient names:', error.message);
        }
    };

    // Fetch ingredient names when the component is first rendered
    fetchIngredientNames();

    const handleIngredientSelection = (ingredient) => {
        setPickedIngredient(ingredient);
        setShowDropdown(false);
    };

    const handleSubmit = async () => {
        console.log('Handling submit...');
        setLoading(true);
        try {
            console.log('Sending POST request...');
            const response = await fetch(`${urlBase}/api/createTask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    desc: taskName,
                    ingredient: pickedIngredient,
                }),
            });
            if (response.ok) {
                console.log('Task created successfully');
                window.location.reload(true);
            } else {
                // Handle the case where the server returns an error
                console.error('Failed to create task:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating task:', error.message);
        } finally {
            setLoading(false); 
        }
        console.log('Submit complete.');
        // Reset the form if needed
        setTaskName('');
        setPickedIngredient('Pick an Ingredient');
    };

    return (
        <>
            <div className="modalContainer">
                <div className="modalBox">
                    <p>Create Task</p>
                    <input
                        className="rounded-pill p-2 mb-4"
                        id="NameTask"
                        placeholder="Task name"
                        required
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        id="ingredientButton"
                    >
                        {pickedIngredient}
                    </button>
                    <button type="button" onClick={handleSubmit} id="submitButton" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {showDropdown ? <CreateDropDown setIngredientHook={handleIngredientSelection} ingredientNames={ingredientNames} /> : undefined}
                </div>
            </div>
        </>
    );
};

export { CreateTaskModal };
