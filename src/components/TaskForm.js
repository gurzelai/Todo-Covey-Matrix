import React, { useState } from 'react';
import { firestore } from '../firebaseConfig';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ name: '', urgency: 'low', importance: 'low' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({ name: '', urgency: 'low', importance: 'low' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        placeholder="Task name"
        maxLength="75"
        required
      />
      <select
        value={task.urgency}
        onChange={(e) => setTask({ ...task, urgency: e.target.value })}
      >
        <option value="low">Low Urgency</option>
        <option value="high">High Urgency</option>
      </select>
      <select
        value={task.importance}
        onChange={(e) => setTask({ ...task, importance: e.target.value })}
      >
        <option value="low">Low Importance</option>
        <option value="high">High Importance</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
