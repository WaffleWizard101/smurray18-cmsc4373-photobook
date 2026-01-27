import { AbstractView } from "./AbstractView";

export class HomeView extends AbstractView {
   //instance variables
   controller = null;
   constructor(controller) {
      //super() call required by JS
      super();
      this.controller = controller;
   }

   async onMount() {
      console.log('HomeView.onMount() called');
   }

   async updateView() {
      console.log('HomeView.updateView() called');
      const div = document.createElement('div');
      div.innerHTML = 'Home View';
      return div;
   }

   attachEvents() {
      console.log('HomeView.attachEvents() is called');
   }

   async onLeave() {
      console.log('HomeView.onLeave() is called')
   }
}