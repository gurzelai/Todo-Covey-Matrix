import React, { useState , useEffect} from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.css';
import { auth, provider} from './firebaseConfig';
import {signInWithPopup, onAuthStateChanged} from "firebase/auth";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión con Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user); // Almacena la información del usuario en el estado
      localStorage.setItem('user', JSON.stringify(user)); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem('user');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="App">
      <h1>Todo Covey Matrix</h1>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right'}}>
          <img src={user.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <p style={{ marginLeft: '10px' }}>{user.displayName}</p>
          <button className="logout-button" onClick={signOut}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} style={{marginBottom: '5px'}}>Iniciar sesión con Google</button>
      )}
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
