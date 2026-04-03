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

   updatePhotoNoteList(photoNote, update) {
      //Update photoNote with the values of update by matching key values
      Object.assign(photoNote, update);
   }

   orderPhotoNoteListByTimestamp() {
      this.photoNoteList.sort((a, b) => b.timestamp - a.timestamp);
   }

   removePhotoNoteByDocId(docId) {
      const index = this.photoNoteList.findIndex(photoNote => photoNote.docId === docId);
      if(index >= 0) {
         this.photoNoteList.splice(index, 1); 
      } else {
         console.error('removePhotoNoteByDocId: photoNote not found', docId);
      }
   }
}