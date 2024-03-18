// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:'AIzaSyCJVY-T6ZVjvF0-b1y2lrJMPX6RjVRORlY',
  authDomain: "mern-blog-6cae7.firebaseapp.com",
  projectId: "mern-blog-6cae7",
  storageBucket: "mern-blog-6cae7.appspot.com",
  messagingSenderId: "413494645369",
  appId: "1:413494645369:web:89abfd85770183081cbaa8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);