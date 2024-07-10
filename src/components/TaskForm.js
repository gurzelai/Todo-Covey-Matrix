import React, { useState } from 'react';
import { addTaskToFirestore } from '../services/firestoreService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskForm.css'; // Importa los estilos CSS
import { convertToTimestamp } from '../utils/dateUtils';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ name: '', urgency: 'low', importance: 'low', dueDate: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskWithId = await addTaskToFirestore(task);
      taskWithId.dueDate = convertToTimestamp(taskWithId.dueDate)
      addTask(taskWithId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTask({ name: '', urgency: 'low', importance: 'low', dueDate: null });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        placeholder="Tarea"
        maxLength="75"
        required
      />
      <select
        value={task.urgency}
        onChange={(e) => setTask({ ...task, urgency: e.target.value })}
      >
        <option value="low">Baja Urgencia</option>
        <option value="high">Alta Urgencia</option>
      </select>
      <select
        value={task.importance}
        onChange={(e) => setTask({ ...task, importance: e.target.value })}
      >
        <option value="low">Baja Importancia</option>
        <option value="high">Alta Importancia</option>
      </select>
      <DatePicker
        selected={task.dueDate}
        onChange={(date) => setTask({ ...task, dueDate: date })}
        dateFormat="dd/MM/yyyy"
        placeholderText="Fecha de vencimiento"
      />
      <button type="submit">Añadir</button>
    </form>
  );
};

export default TaskForm;
