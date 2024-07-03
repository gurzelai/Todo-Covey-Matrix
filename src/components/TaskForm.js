import React, { useState } from 'react';
import { firestore } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ name: '', urgency: 'low', importance: 'low' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        const taskWithUserId = { ...task, userId: user.uid };
        const docRef = await addDoc(collection(firestore, 'tasks'), taskWithUserId);
        console.log("Document written with ID: ", docRef.id);
        addTask({ ...taskWithUserId, id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      // Si el usuario no está autenticado, agrega la tarea localmente con un ID único
      const localTask = { ...task, id: Date.now().toString() }; // Generar ID único con timestamp
      addTask(localTask);
    }
    setTask({ name: '', urgency: 'low', importance: 'low' });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Añadir</button>
    </form>
  );
};

export default TaskForm;
