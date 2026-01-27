import { AbstractView } from "./AbstractView.js";

export class ProfileView extends AbstractView {
   //instance variables
   controller = null;
   constructor(controller) {
      //super() call required by JS
      super();
      this.controller = controller;
   }

   async onMount() {
      console.log('ProfileView.onMount() called');
   }

   async updateView() {
      console.log('ProfileView.updateView() called');
      const div = document.createElement('div');
      div.innerHTML = 'Profile View';
      return div;
   }

   attachEvents() {
      console.log('ProfileView.attachEvents() is called');
   }

   async onLeave() {
      console.log('ProfileView.onLeave() is called')
   }
}