const TaskList = async (username) => {
  try {
      console.log(`Fetching tasks for user: ${username}`);
      const response = await fetch(`http://67.205.172.88:5000/api/getUserTasks/${username}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          const tasks = await response.json();
          return tasks;
      } else {
          console.error('Failed to fetch tasks:', response.statusText);
          return [];
      }
  } catch (error) {
      console.error('Error fetching tasks:', error.message);
      return [];
  }
};


const handleDelete = async (taskId, username) => {
    console.log(`Delete task with ID ${taskId} for user ${username}`);
    try {
        // Make a DELETE request to delete the task
        const response = await fetch(`http://67.205.172.88:5000/api/deleteTask/${username}/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // If deletion is successful, update the tasks state
          console.log(`Deletion successful`);
          window.location.reload(true);

        } else {
          console.error('Failed to delete task:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting task:', error.message);
      }
};

const handleFinish = async (taskId, username) => {
    console.log(`Finish task with ID ${taskId} for user ${username}`);
    try {
        // Make a DELETE request to delete the task
        const response = await fetch(`http://67.205.172.88:5000/api/finishTask/${username}/${taskId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            // If deletion is successful, update the tasks state
            console.log(`Finish task successful`);
            window.location.reload(true);
        } else {
            console.error('Failed to finish task:', response.statusText);
        }
        } catch (error) {
        console.error('Error finishing task:', error.message);
        }
};
    

export { TaskList, handleDelete, handleFinish };
