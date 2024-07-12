import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UserProfile from './components/UserProfile';
import './styles/App.css';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { fetchTasksForUser } from './services/firestoreService';
import { signInWithGoogle, signOut } from './services/authService';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const tasksFromFirestore = await fetchTasksForUser(user.uid);
        setTasks(tasksFromFirestore);
      } else {
        setTasks([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const addTask = (task) => {
    setTasks(prevTasks => [...prevTasks, task].sort((a, b) => a.createdAt - b.createdAt));
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task.id !== taskToDelete.id));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1 style={{ margin: '5px 0px 0px 0px' }}>Tareas Covey Matrix</h1>
        {user ? (
          <UserProfile user={user} onSignOut={signOut} />
        ) : (
          <button onClick={signInWithGoogle} style={{ marginBottom: '5px' }}>Iniciar sesión con Google</button>
        )}
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
      </div>
    </DndProvider>
  );
};

export default App;
