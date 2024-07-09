import React from 'react';
import { formatDate } from '../utils/dateUtils';
import './Task.css';
import { useDrag } from 'react-dnd';

const Task = ({ task, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: task,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const isDueDatePassedOrToday = () => {
    if (!task.dueDate) return false;
    const dueDate = task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate.seconds * 1000);
    const today = new Date();

    return dueDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
  };

  return (
    <div ref={drag} className={`task ${isDragging ? 'dragging' : ''} ${isDueDatePassedOrToday() ? 'task-overdue' : ''}`}>
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
