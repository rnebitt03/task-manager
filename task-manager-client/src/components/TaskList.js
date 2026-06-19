import React from "react";
import TaskCard from "./TaskCard";

/**
 * Loops through every task in the tasks array and renders a TaskCard for each one
 *
 * Four props passed in
 * tasks - array containing all the tasks from the database
 * onDelete - function to delete task
 * onEdit - function to edit task
 * onToggleComplete - function to mark a task as completed
 *
 */
function TaskList({ tasks, onDelete, onEdit, onToggleComplete }) {
  //Empty state check if no tasks have been created
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one above!</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;
