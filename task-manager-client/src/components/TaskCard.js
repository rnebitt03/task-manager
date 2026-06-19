import React from "react";
import "./TaskCard.css";

//Converts the priority number from the database into a color coded level
const getPriorityLevel = (priority) => {
  if (priority === 1) return { level: "High", color: "red" };
  if (priority === 2) return { level: "Medium", color: "orange" };
  return { level: "Low", color: "green" };
};

/**
 * Renders a single task card with Title, description, priority badge, and action buttons
 *
 * Four props passed in from TaskList
 * task - individual task object to display
 * onDelete - function to delete task
 * onEdit - function to edit task
 * onToggleComplete - function to mark a task as completed
 *
 */
function TaskCard({ task, onDelete, onEdit, onToggleComplete }) {
  const priorityInfo = getPriorityLevel(task.priority);

  return (
    <div className={`task-card ${task.isCompleted ? "completed" : ""}`}>
      <div className="task-card-header">
        <span
          style={{
            color: "white",
            backgroundColor: priorityInfo.color,
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "bold",
          }}
        >
          {priorityInfo.level}
        </span>
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
