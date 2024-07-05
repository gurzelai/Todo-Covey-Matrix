import React from 'react';

// Función para formatear la fecha
const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
  // Si es un objeto Date
  if (date instanceof Date) {
    return date.toLocaleDateString(undefined, options);
  }

  // Si es un timestamp de Firebase
  if (date.seconds) {
    return new Date(date.seconds * 1000).toLocaleDateString(undefined, options);
  }

  return '';
};

const Task = ({ task, onDelete }) => {
  return (
    <div className="task">
      <p>{task.name}</p>
      <p>{task.dueDate ? `${formatDate(task.dueDate)}` : ''}</p>
      <button onClick={() => onDelete(task)}>Complete</button>
    </div>
  );
};

export default Task;
