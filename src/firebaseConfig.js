// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAxrCFpa95UpaeLdV3k3eA3bj8QESQIkAA",
  authDomain: "todo-covey-matrix.firebaseapp.com",
  projectId: "todo-covey-matrix",
  storageBucket: "todo-covey-matrix.appspot.com",
  messagingSenderId: "406012002437",
  appId: "1:406012002437:web:5900dd1ab7d9b576b4a9ec",
  measurementId: "G-XMDQ6M28ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export {provider, auth, analytics}
