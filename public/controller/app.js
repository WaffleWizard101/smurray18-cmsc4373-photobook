import { HomeView } from "../view/HomeView.js";
import { ProfileView } from "../view/ProfileView.js";
import { HomeController } from "./HomeController.js";
import { ProfileController } from "./ProfileController.js";

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

const menuItems = document.querySelectorAll('a[data-path]');
menuItems.forEach(item => {
   item.onclick = function(e) {
      const path = item.getAttribute('data-path');
      console.log('Navigating to path: ', path);
   }
});