import React, { useState } from 'react';
import { CreateDropDown } from './dropdown';

const CreateTaskModal = ({ username }) => {
    
    const urlBase = 'http://67.205.172.88:5000';

    const [showDropdown, setShowDropdown] = useState(false);
    const [pickedIngredient, setPickedIngredient] = useState("Pick an Ingredient");
    const [taskName, setTaskName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleIngredientSelection = (ingredient) => {
        setPickedIngredient(ingredient);
        setShowDropdown(false);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${urlBase}/api/login`, {
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
                console.log('Logged in successfully');
                setLoggedIn(true);
            } else {
                // Handle the case where the server returns an error
                console.error('Failed to login:', response.statusText);
            }
        } catch (error) {
            console.error('Error loggin in:', error.message);
        }
    };

    const handleSubmit = async () => {
        if (!loggedIn) {
            // If not logged in, perform login first
            await handleLogin();
        }

        try {
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
                // Task created successfully
                console.log('Task created successfully');
                window.location.reload(true);
                // Add any additional logic you want to perform after successful task creation
            } else {
                // Handle the case where the server returns an error
                console.error('Failed to create task:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating task:', error.message);
        }
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
                    <button type="button" onClick={handleSubmit} id="submitButton">
                        Submit
                    </button>
                    {showDropdown ? <CreateDropDown setIngredientHook={handleIngredientSelection} /> : undefined}
                </div>
            </div>
        </>
    );
}

export { CreateTaskModal };
