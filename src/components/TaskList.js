import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, deleteTask }) => {
  const quadrants = {
    urgentImportant: [],
    notUrgentImportant: [],
    urgentNotImportant: [],
    notUrgentNotImportant: []
  };

  tasks.forEach(task => {
    if (task.urgency === 'high' && task.importance === 'high') {
      quadrants.urgentImportant.push(task);
    } else if (task.urgency === 'low' && task.importance === 'high') {
      quadrants.notUrgentImportant.push(task);
    } else if (task.urgency === 'high' && task.importance === 'low') {
      quadrants.urgentNotImportant.push(task);
    } else {
      quadrants.notUrgentNotImportant.push(task);
    }
  });

  return (
    <div className="matrix">
      <div className="quadrant">
        <h2>Urgent & Important</h2>
        {quadrants.urgentImportant.map((task, index) => (
          <Task key={index} task={task} onDelete={deleteTask} />
        ))}
      </div>
      <div className="quadrant">
        <h2>Not Urgent & Important</h2>
        {quadrants.notUrgentImportant.map((task, index) => (
          <Task key={index} task={task} onDelete={deleteTask} />
        ))}
      </div>
      <div className="quadrant">
        <h2>Urgent & Not Important</h2>
        {quadrants.urgentNotImportant.map((task, index) => (
          <Task key={index} task={task} onDelete={deleteTask} />
        ))}
      </div>
      <div className="quadrant">
        <h2>Not Urgent & Not Important</h2>
        {quadrants.notUrgentNotImportant.map((task, index) => (
          <Task key={index} task={task} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
