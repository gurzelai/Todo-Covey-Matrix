import { auth, provider } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
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
