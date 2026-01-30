// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBuGAvghfT50MOChYdAVpKJR2ZkiB84-ak",
   authDomain: "smurray18-cmsc4373.firebaseapp.com",
   projectId: "smurray18-cmsc4373",
   storageBucket: "smurray18-cmsc4373.firebasestorage.app",
   messagingSenderId: "744375961291",
   appId: "1:744375961291:web:028eeb507b1104f06bbd4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);