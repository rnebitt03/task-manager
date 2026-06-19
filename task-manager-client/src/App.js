import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

//Root component that manages task state and sends data and handlers to child components
function App() {
  //State
  //Full list of tasks from the backend
  const [tasks, setTasks] = useState([]);
  //Tracks which task is being edited
  const [editingTask, setEditingTask] = useState(null);
  //Error messages to display to user
  const [error, setError] = useState(null);
  //Tracks whether tasks are being fetched, starts true to show loading on render
  const [loading, setLoading] = useState(true);

  //Fetches all tasks from backend on initial page render
  useEffect(() => {
    fetchTasks();
  }, []);

  //Calls backend to get all tasks and updates state
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  //Handles both creating and updating a task
  //If editingTask is set it updates, otherwise it creates a new task
  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask.id, {
          ...taskData,
          isCompleted: editingTask.isCompleted,
        });
        setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
        setEditingTask(null);
      } else {
        const created = await createTask(taskData);
        setTasks([...tasks, created]);
      }
      setError(null);
    } catch (err) {
      setError("Failed to save task.");
    }
  };

  //Deletes a task by id and removes task from state without refetching
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  //Flips the completed status of a task, while perserving all other fields
  const handleToggleComplete = async (task) => {
    try {
      const updated = await updateTask(task.id, {
        title: task.title,
        description: task.description,
        isCompleted: !task.isCompleted,
        priority: task.priority,
      });
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      setError(null);
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  //Filters and sorts active tasks by priority so highest priority shows first
  const activeTasks = tasks
    .filter((t) => !t.isCompleted)
    .sort((a, b) => a.priority - b.priority);

  // Filters completed tasks into separate array for the completed column
  const completedTasks = tasks.filter((t) => t.isCompleted);
  return (
    <div className="app">
      <h1>Task Manager</h1>
      {error && <p>{error}</p>}
      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      {loading ? (
        <p>Loading tasks ...</p>
      ) : (
        <div className="task-columns">
          <div className="active-column">
            <h2>Active Tasks</h2>
            <TaskList
              tasks={activeTasks}
              onDelete={handleDelete}
              onEdit={(task) => setEditingTask(task)}
              onToggleComplete={handleToggleComplete}
            />
          </div>
          <div className="completed-column">
            <h2>Completed Tasks</h2>
            <TaskList
              tasks={completedTasks}
              onDelete={handleDelete}
              onEdit={(task) => setEditingTask(task)}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
