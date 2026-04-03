import { HomeModel } from "../model/HomeModel.js";

export const glHomeModel = new HomeModel();

export class HomeController {
   //Instance members/variables
   model = null;
   view = null;

   constructor() {
      this.model = new HomeModel;
      this.onChangeImageFile = this.onChangeImageFile.bind(this);
   }

   setView(view) {
      this.view = view;
   }

   onChangeImageFile(e) {
      const imgPreview = document.getElementById('image-preview');
      this.model.imageFile = e.target.files[0];
      if(!this.model.imageFile) {
         imgPreview.src = '';
         return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.model.imageFile);
      reader.onload = function() {
         imgPreview.src = reader.result;
      }
   }
}