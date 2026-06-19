import React, { useState, useEffect } from "react";
import "./TaskForm.css";

// Form component used for both creating and editing tasks
// When editingTask is passed in, the form fills with the tasks data, otherwise it starts empty
function TaskForm({ onSubmit, editingTask, onCancel }) {
  //Local state for each form field
  //Initialized to empty and default medium priority
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(2);

  //When editingTask changes, fill the form with the task data
  //When editing is cancelled and editingTask becomes null, clear the form back to its defaults
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority(2);
    }
  }, [editingTask]);

  // Prevents page reload, validates title, sends form data to parent, then clears the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Don't submit if title is empty or just whitespace
    if (!title.trim()) return;
    onSubmit({ title, description, priority });
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
      <div>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        >
          <option value={1}>High Priority</option>
          <option value={2}>Medium Priority</option>
          <option value={3}>Low Priority</option>
        </select>
      </div>
      <button onClick={handleSubmit}>
        {editingTask ? "Update Task" : "Add Task"}
      </button>
      {editingTask && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}

export default TaskForm;
