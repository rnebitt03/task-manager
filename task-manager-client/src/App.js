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

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        const updated = updateTask(editingTask.id, {
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

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updated = await updateTask(task.id, {
        title: task.title,
        description: task.description,
        isCompleted: !task.isCompleted,
      });
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      setError(null);
    } catch (err) {
      setError("Failed to update task.");
    }
  };
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
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={(task) => setEditingTask(task)}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
}

export default App;
