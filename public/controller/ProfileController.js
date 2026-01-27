import { ProfileModel } from "../model/ProfileModel.js";

export class ProfileController {
   //Instance members/variables
   model = null;
   view = null;

   constructor() {
      this.model = new ProfileModel();
   }

   setView(view) {
      this.view = view;
   }
}