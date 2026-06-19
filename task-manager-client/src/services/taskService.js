//Service layer for all backend API calls

// Base URL for all task API calls
const API_URL = "http://localhost:5130/api/task";

// Fetches all tasks from the backend
export const getAllTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Fetches a single task by id
export const getTaskById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

// Creates a new task and returns the created task with its generated id
export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};

// Updates an existing task by id and returns the updated task
export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};

// Deletes a task by id, no return value needed
export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
