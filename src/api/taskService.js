// api/taskService.js
export const fetchTasks = async (columnId) => {
    const response = await fetch(`https://taskban-task.netlify.app/.netlify/functions/server/tasks?boardId=${columnId}`);
    return response.json();
};

export const createTask = async (taskData) => {
    const response = await fetch(`https://taskban-task.netlify.app/.netlify/functions/server/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });
    return response.json();
};

export const updateTask = async (taskId, taskData) => {
    const response = await fetch(`https://taskban-task.netlify.app/.netlify/functions/server/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });
    return response.json();
};

export const deleteTask = async (taskId) => {
    await fetch(`https://taskban-task.netlify.app/.netlify/functions/server/tasks/${taskId}`, {
        method: 'DELETE',
    });
};
