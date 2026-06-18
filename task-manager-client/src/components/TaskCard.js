import React from "react";
import "./TaskCard.css";

function TaskCard({ task, onDelete, onEdit, onToggleComplete }) {
  return (
    <div className={`task-card ${task.isCompleted ? "completed" : ""}`}>
      <div className="task-card-header">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task)}
        />
        <h3 className={task.isCompleted ? "completed-text" : ""}>
          {task.title}
        </h3>
      </div>
      <p>{task.description}</p>
      <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
      {task.completedAt && (
        <p>Completed: {new Date(task.completedAt).toLocaleDateString()}</p>
      )}
      <div className="task-card-actions">
        <button className="edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
