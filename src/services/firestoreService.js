import { collection, getDocs, query, where, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

export const fetchTasksForUser = async (userId) => {
  const q = query(collection(firestore, 'tasks'), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const addTaskToFirestore = async (task) => {
  const user = auth.currentUser;
  if (user) {
    const taskWithUserId = { ...task, userId: user.uid };
    const docRef = await addDoc(collection(firestore, 'tasks'), taskWithUserId);
    return { ...taskWithUserId, id: docRef.id };
  } else {
    const localTask = { ...task, id: Date.now().toString() }; // Generar ID único con timestamp
    return localTask;
  }
};

export const deleteTaskFromFirestore = async (taskId) => {
  await deleteDoc(doc(firestore, 'tasks', taskId));
};