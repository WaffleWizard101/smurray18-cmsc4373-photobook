export class HomeModel {
   photoNoteList;
   imageFile;

   constructor() {
      this.photoNoteList = [];
      this.imageFile = null;
   }

   setPhotoNoteList(list) {
      this.photoNoteList = list;
   }
}