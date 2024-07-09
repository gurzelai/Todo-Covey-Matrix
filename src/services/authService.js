import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
};

export const signOut = () => {
  auth.signOut().then(() => {
    localStorage.removeItem('user');
  }).catch((error) => {
    console.error(error);
  });
};
