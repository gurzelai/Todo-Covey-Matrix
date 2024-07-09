import React from 'react';
import { formatDate } from '../utils/dateUtils';
import './Task.css';

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
