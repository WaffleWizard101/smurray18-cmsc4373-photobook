import { HomeModel } from "../model/HomeModel";

export class HomeController {
   //Instance members/variables
   model = null;
   view = null;

   constructor() {
      this.model = new HomeModel();
   }

   setView(view) {
      this.view = view;
   }
}