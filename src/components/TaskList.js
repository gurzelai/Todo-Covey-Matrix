import React from 'react';
import Task from './Task';
import { deleteTaskFromFirestore, updateTaskInFirestore } from '../services/firestoreService';
import { useDrop } from 'react-dnd';

const Quadrant = ({ title, tasks, onDrop, deleteTask, updateTask}) => {

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
        <Task key={index} task={task} onDelete={handleDelete} updateTask={updateTask}/>
      ))}
    </div>
  );
};

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  
  const handleDrop = async (task, urgency, importance) => {
    task.urgency = urgency;
    task.importance = importance;
    await updateTaskInFirestore(task.id, { urgency, importance });
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
        updateTask={updateTask}
      />
      <Quadrant
        title="No Urgente e importante"
        tasks={quadrants.notUrgenteImportante}
        onDrop={(task) => handleDrop(task, 'low', 'high')}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
      <Quadrant
        title="Urgente y no importante"
        tasks={quadrants.urgenteNoImportante}
        onDrop={(task) => handleDrop(task, 'high', 'low')}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
      <Quadrant
        title="No urgente e no importante"
        tasks={quadrants.notUrgenteNoImportante}
        onDrop={(task) => handleDrop(task, 'low', 'low')}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </div>
  );
};

export default TaskList;
