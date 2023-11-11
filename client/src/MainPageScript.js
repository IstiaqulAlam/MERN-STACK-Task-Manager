const TaskList = async (username) => {
    try {
        console.log(`Fetching tasks for user: ${username}`);
        const response = await fetch(`http://67.205.172.88:5000/api/getUserTasks/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add any additional headers or authentication tokens as needed
        });

        if (response.ok) {
            const tasks = await response.json();
            // tasks is an array of task objects, you can map over them to create JSX elements
            return tasks.map(task => (
                <div key={task._id}>
                    <p>{`Task: ${task.Desc}, Ingredient: ${task.Ingredient}`}</p>
                </div>
            ));
        } else {
            console.error('Failed to fetch tasks:', response.statusText);
            return <p>Failed to fetch tasks</p>;
        }
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        return <p>Error fetching tasks</p>;
    }
};

export { TaskList };
