import React from 'react';
import Task from './Task';
import { deleteTaskFromFirestore } from '../services/firestoreService';
import { useDrop } from 'react-dnd';

const Quadrant = ({ title, tasks, onDrop, deleteTask}) => {

  const handleDelete = async (task) => {
    try {
      await deleteTaskFromFirestore(task.id);
      deleteTask(task);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };
  
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`quadrant ${isOver ? 'highlight' : ''}`}>
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={handleDelete}/>
      ))}
    </div>
  );
};

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  
  const handleDrop = (task, urgency, importance) => {
    updateTask({ ...task, urgency, importance });
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
      <Quadrant
        title="Urgente e importante"
        tasks={quadrants.urgenteImportante}
        onDrop={(task) => handleDrop(task, 'high', 'high')}
        deleteTask={deleteTask}
      />
      <Quadrant
        title="No Urgente e importante"
        tasks={quadrants.notUrgenteImportante}
        onDrop={(task) => handleDrop(task, 'low', 'high')}
        deleteTask={deleteTask}
      />
      <Quadrant
        title="Urgente y no importante"
        tasks={quadrants.urgenteNoImportante}
        onDrop={(task) => handleDrop(task, 'high', 'low')}
        deleteTask={deleteTask}
      />
      <Quadrant
        title="No urgente e no importante"
        tasks={quadrants.notUrgenteNoImportante}
        onDrop={(task) => handleDrop(task, 'low', 'low')}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskList;
