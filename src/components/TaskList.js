import React from 'react';
import Task from './Task';
import { firestore } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

const TaskList = ({ tasks, deleteTask }) => {
  const handleDelete = async (task) => {
    await deleteDoc(doc(firestore, 'tasks', task.id));
    deleteTask(task);
  };

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
          <Task key={index} task={task} onDelete={handleDelete} />
        ))}
      </div>
      <div className="quadrant">
        <h2>Not Urgent & Important</h2>
        {quadrants.notUrgentImportant.map((task, index) => (
          <Task key={index} task={task} onDelete={handleDelete} />
        ))}
      </div>
      <div className="quadrant">
        <h2>Urgent & Not Important</h2>
        {quadrants.urgentNotImportant.map((task, index) => (
          <Task key={index} task={task} onDelete={handleDelete} />
        ))}
      </div>
      <div className="quadrant">
        <h2>Not Urgent & Not Important</h2>
        {quadrants.notUrgentNotImportant.map((task, index) => (
          <Task key={index} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
