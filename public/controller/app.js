import { HomeView } from "../view/HomeView.js";
import { ProfileView } from "../view/ProfileView.js";
import { HomeController } from "./HomeController.js";
import { ProfileController } from "./ProfileController.js";
import { Router } from "./Router.js";
import { createAccount, loginFirebase, logoutFirebase } from "./firebase_auth.js"
import { startSpinner, stopSpinner } from "../view/util.js";

document.getElementById('appHeader').textContent = 'Cloud Web Template';
document.title = 'App Template';

const routes = [
   {
      path: '/',
      view: HomeView,
      controller: HomeController
   },
   {
      path: '/profile',
      view: ProfileView,
      controller: ProfileController
   }
];

export const router = new Router(routes);
router.navigate(window.location.pathname);

const menuItems = document.querySelectorAll('a[data-path]');
menuItems.forEach(item => {
   item.onclick = function(e) {
      const path = item.getAttribute('data-path');
      router.navigate(path);
   }
});

//login form
document.forms.loginForm.onsubmit = async function(e) {
   e.preventDefault(); // prevent form submission from reloading page
   const email = e.target.email.value
   const password = e.target.password.value;
   startSpinner();
   try {
      await loginFirebase(email, password);
      stopSpinner();
      console.log('User logged in', email);
   } catch (e) {
      stopSpinner();
      console.error('Error logging in:', e);
      const errorCode = e.code;
      const errorMessage = e.message;
      alert('Sign in failed: ' + errorCode + ' ' + errorMessage);
   }
}

//logout button
document.getElementById('logoutButton').onclick = async function(e) {
   startSpinner();
   try {
      await logoutFirebase();
      stopSpinner();
      console.log('User logged out.');
   } catch (e) {
      console.error('Error logging out:', e);
      stopSpinner();
      const errorCode = e.code;
      const errorMessage = e.message;
      alert('Sign out failed: ' + errorCode.code + ' ' + error.message);
   }
}

//Create account event
document.forms.createAccountForm.onsubmit = async function(e) {
   e.preventDefault(); // prevent form submission from reloading page
   const email = e.target.email.value
   const emailConfirm = e.target.emailConfirm.value;
   const password = e.target.password.value;

   if(email != emailConfirm) {
      alert('Emails do not match!');
      return;
   }

   startSpinner();
   try {
      await createAccount(email, password);
      stopSpinner();
      document.getElementById('createAccountDiv').classList.replace('d-block', 'd-none');
   } catch (e) {
      console.error('Error creating account', e);
      stopSpinner();
      const errorCode = e.code;
      const errorMessage = e.message;
      alert('Account creation failed: ' + errorCode + ' ' + errorMessage);
   }
}

document.getElementById('goToCreateAccount').onclick = function(e) {
   document.getElementById('loginDiv').classList.replace('d-block', 'd-none');
   document.getElementById('createAccountDiv').classList.replace('d-none', 'd-block');
}

document.getElementById('goToLogin').onclick = function(e) {
   document.getElementById('createAccountDiv').classList.replace('d-block', 'd-none');
   document.getElementById('loginDiv').classList.replace('d-none', 'd-block');
}