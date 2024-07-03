import React from 'react';

const Task = ({ task, onDelete }) => {
  return (
    <div className="task">
      <p>{task.name}</p>
      <button onClick={() => onDelete(task)}>Complete</button>
    </div>
  );
};

export default Task;
