import React from 'react';
import './Task.css'

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

  const isDueDatePassedOrToday = () => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate.seconds * 1000);
    const today = new Date();
    return dueDate < today || dueDate.toDateString() === today.toDateString();
  };

 return (
    <div className={`task ${isDueDatePassedOrToday() ? 'task-overdue' : ''}`}>
      <div className="task-info">
        <p>{task.name}</p>
        <button onClick={() => onDelete(task)}>Completo</button>
      </div>
      <p className={`due-date ${isDueDatePassedOrToday() ? 'overdue-date' : ''}`}>
        {task.dueDate ? `${formatDate(task.dueDate)}` : ''}
      </p>
    </div>
  );
};

export default Task;
