import {
   getAuth,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut
} from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js'

import { app } from "./firebase_core.js";

const auth = getAuth(app);

export let currentUser = null;

export async function loginFirebase(email, password) {
   await signInWithEmailAndPassword(auth, email, password);
      // .then((userCredential) => {
      //    // Signed up 
      //    const user = userCredential.user;
      //    // ...
      // })
      // .catch((error) => {
      //    const errorCode = error.code;
      //    const errorMessage = error.message;
      //    // ..
      // });

      // try {
      //    userCredential = await signInWithEmailAndPassword(auth, email, password)
      //    const user = userCredential.user; 
      // } catch (error) {
      //    const errorCode = error.code;
      //    const errorMessage = error.message;
      // }
      
}

export async function logoutFirebase() {
   await signOut(auth);
}

onAuthStateChanged(auth, user => {
   currentUser = user;

   const loginDiv = document.getElementById('loginDiv');
   const navMenu = document.getElementById('navMenuContainer');
   const spaRoot = document.getElementById('spaRoot');
   if(user) {
      console.log('AuthStateChanged: User logged in', user.email);
      loginDiv.classList.replace('d-block', 'd-none');
      navMenu.classList.replace('d-none', 'd-block');
      spaRoot.classList.replace('d-none', 'd-block');
   } else {
      console.log('AuthStateChanged: User logged out');
      loginDiv.classList.replace('d-none', 'd-block');
      navMenu.classList.replace('d-block', 'd-none');
      spaRoot.classList.replace('d-block', 'd-none');
   }
});