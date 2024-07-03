import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.css';
import { auth, provider, firestore } from './firebaseConfig';
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from 'firebase/firestore';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const q = query(collection(firestore, 'tasks'), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const tasksFromFirestore = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTasks(tasksFromFirestore);
      } else {
        setTasks([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task.id !== taskToDelete.id));
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem('user');
      setTasks([]);
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="App">
      <h1>Tareas Covey Matrix</h1>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
          <img src={user.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <p style={{ marginLeft: '10px' }}>{user.displayName}</p>
          <button className="logout-button" onClick={signOut}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} style={{ marginBottom: '5px' }}>Iniciar sesión con Google</button>
      )}
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
