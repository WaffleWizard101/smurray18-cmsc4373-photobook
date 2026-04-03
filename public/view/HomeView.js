import { AbstractView } from "./AbstractView.js";
import { currentUser } from "../controller/firebase_auth.js";

export class HomeView extends AbstractView {
   //instance variables
   controller = null;
   constructor(controller) {
      //super() call required by JS
      super();
      this.controller = controller;
   }

   async onMount() {
      if(!currentUser) {
         this.parentElement.innerHTML = `<h1>Access Denied</h1>`
         return;
      }
      
      await this.controller.onLoadPhotoNoteList();
      console.log('HomeView.onMount() called', this.controller.model.photoNoteList);
   }

   async updateView() {
      console.log('HomeView.updateView() called');
      const viewWrapper = document.createElement('div');
      const response = await fetch('/view/templates/home.html', {cache: 'no-store'});
      viewWrapper.innerHTML = await response.text();

      return viewWrapper;
   }

   attachEvents() {
      document.getElementById('image-file').onchange = this.controller.onChangeImageFile;
      document.forms.formAddNew.onsubmit = this.controller.onSubmitAddNew
   }

   async onLeave() {
      console.log('HomeView.onLeave() is called');
   }
}