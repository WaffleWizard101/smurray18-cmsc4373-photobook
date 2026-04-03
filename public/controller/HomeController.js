import { HomeModel } from "../model/HomeModel.js";
import { uploadImageToCloudStorage } from "./cloudstorage_controller.js";
import { currentUser } from "./firebase_auth.js";
import { PhotoNote } from "../model/PhotoNote.js";

export const glHomeModel = new HomeModel();

export class HomeController {
   //Instance members/variables
   model = null;
   view = null;

   constructor() {
      this.model = new HomeModel;
      this.onChangeImageFile = this.onChangeImageFile.bind(this);
      this.onSubmitAddNew = this.onSubmitAddNew.bind(this);
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

   async onSubmitAddNew(e) {
      e.preventDefault();
      let imageName, imageURL;
      try {
         const r = await uploadImageToCloudStorage(this.model.imageFile);
         imageName = r.imageName;
         imageURL = r.imageURL;
      } catch (e) {
         console.error(e);
         alert('Error uploading image.');
         return;
      }
      const form = e.target;
      const caption = form.caption.value;
      const description = form.description.value;
      const sharedWith = form.sharedWith.value;
      const uid = currentUser.uid;
      const createdBy = currentUser.email;
      const timestamp = Date.now();

      const photoNote = new PhotoNote({
         caption, description, uid, createdBy, imageName,
         imageURL, timestamp, sharedWith
      });
      console.log(photoNote);
   }
}