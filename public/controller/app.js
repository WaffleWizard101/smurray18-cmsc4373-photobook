import { HomeView } from "../view/HomeView.js";
import { ProfileView } from "../view/ProfileView.js";
import { HomeController } from "./HomeController.js";
import { ProfileController } from "./ProfileController.js";
import { Router } from "./Router.js";

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

const router = new Router(routes);
router.navigate(window.location.pathname);

const menuItems = document.querySelectorAll('a[data-path]');
menuItems.forEach(item => {
   item.onclick = function(e) {
      const path = item.getAttribute('data-path');
      router.navigate(path);
   }
});

//login form
document.forms.loginForm.onsubmit = function(e) {
   e.preventDefault(); // prevent form submission from reloading page
   console.log('Login form submitted', e.target.email.value, e.target.password.value)
}