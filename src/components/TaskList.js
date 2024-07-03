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
    urgenteImportante: [],
    notUrgenteImportante: [],
    urgenteNoImportante: [],
    notUrgenteNoImportante: []
  };

  tasks.forEach(task => {
    if (task.urgency === 'high' && task.importance === 'high') {
      quadrants.urgenteImportante.push(task);
    } else if (task.urgency === 'low' && task.importance === 'high') {
      quadrants.notUrgenteImportante.push(task);
    } else if (task.urgency === 'high' && task.importance === 'low') {
      quadrants.urgenteNoImportante.push(task);
    } else {
      quadrants.notUrgenteNoImportante.push(task);
    }
  });

  return (
    <div className="matrix">
      <div className="quadrant">
        <h2>Urgente e Importante</h2>
        {quadrants.urgenteImportante.map((task, index) => (
          <Task key={index} task={task} onDelete={handleDelete} />
        ))}
      </div>
      <div className="quadrant">
        <h2>No Urgente e Importante</h2>
        {quadrants.notUrgenteImportante.map((task, index) => (
          <Task key={index} task={task} onDelete={handleDelete} />
        ))}
      </div>
      <div className="quadrant">
        <h2>Urgente e No Importante</h2>
        {quadrants.urgenteNoImportante.map((task, index) => (
          <Task key={index} task={task} onDelete={handleDelete} />
        ))}
      </div>
      <div className="quadrant">
        <h2>No Urgente e No Importante</h2>
        {quadrants.notUrgenteNoImportante.map((task, index) => (
          <Task key={index} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
