 const CreateTaskModal = () => {
    return(
        <>
            <div className="modalContainer">
                <div className="modalBox">
                    <p>Create Task</p>
                    <input className="rounded-pill p-2 mb-4" id="NameTask" placeholder="Task name" required />
                    <button type="button" id="SubmitCreateTaskButton">Login</button>
                    <button type="button" onClick={undefined} id="SelectIngredientDropDown">Select an ingredient</button>
                </div>
            </div>
        </>
    );
}

export { CreateTaskModal };
