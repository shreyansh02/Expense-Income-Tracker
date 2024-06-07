// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfCBvTBydO7aK4WEeyly9XydrbSLScEDs",
  authDomain: "mock-project-58e20.firebaseapp.com",
  projectId: "mock-project-58e20",
  storageBucket: "mock-project-58e20.appspot.com",
  messagingSenderId: "848264271100",
  appId: "1:848264271100:web:b1ce0d908dea5896a27379",
  measurementId: "G-JD1H7N24XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
  const auth = getAuth(app);
 const googleProvider=new GoogleAuthProvider();

export {auth,googleProvider}

