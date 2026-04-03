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

   prependPhotoNoteList(photoNote) {
      this.photoNoteList.unshift(photoNote);
   }

   getPhotoNoteByDocId(docId) {
      return this.photoNoteList.find(photoNote => photoNote.docId === docId );
   }
}