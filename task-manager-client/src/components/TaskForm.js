import React, { useState, useEffect } from "react";
import "./TaskForm.css";

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="task-form">
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
      <div>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>
        {editingTask ? "Update Task" : "Add Task"}
      </button>
      {editingTask && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}

export default TaskForm;
