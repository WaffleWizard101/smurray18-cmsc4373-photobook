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