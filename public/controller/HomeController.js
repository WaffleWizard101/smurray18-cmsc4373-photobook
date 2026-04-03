import { HomeModel } from "../model/HomeModel.js";
import { deleteImageFromCloudStorage, uploadImageToCloudStorage } from "./cloudstorage_controller.js";
import { currentUser } from "./firebase_auth.js";
import { PhotoNote } from "../model/PhotoNote.js";
import { addPhotoNoteToFirestore, deletePhotoNoteInFirestore, getPhotoNoteListFromFirestore, updatePhotoNoteInFirestore } from "./firestore_controller.js";
import { startSpinner, stopSpinner } from "../view/util.js";

export const glHomeModel = new HomeModel();

export class HomeController {
   //Instance members/variables
   model = null;
   view = null;

   constructor() {
      this.model = new HomeModel();
      this.onChangeImageFile = this.onChangeImageFile.bind(this);
      this.onSubmitAddNew = this.onSubmitAddNew.bind(this);
      this.onClickCard = this.onClickCard.bind(this);
      this.onRightClickCard = this.onRightClickCard.bind(this);
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
      const r = PhotoNote.validateSharedWith(e.target.sharedWith.value);
      if(r != '') {
         alert(`Share With: Invalid email address: ${r}`);
         return;
      }
      startSpinner();
      let imageName, imageURL;
      try {
         const r = await uploadImageToCloudStorage(this.model.imageFile);
         imageName = r.imageName;
         imageURL = r.imageURL;
      } catch (e) {
         stopSpinner();
         console.error(e);
         alert('Error uploading image.');
         return;
      }
      const form = e.target;
      const caption = form.caption.value;
      const description = form.description.value;
      const sharedWith = PhotoNote.parseSharedWith(form.sharedWith.value);
      const uid = currentUser.uid;
      const createdBy = currentUser.email;
      const timestamp = Date.now();

      const photoNote = new PhotoNote({
         caption, description, uid, createdBy, imageName,
         imageURL, timestamp, sharedWith
      });

      try {
         const docId = await addPhotoNoteToFirestore(photoNote);
         photoNote.set_docId(docId);
         document.querySelector('button.btn-close').click();
         stopSpinner();
      } catch (e) {
         stopSpinner();
         console.error(e);
         alert('Error adding photo note to Firestore');
         return;
      }

      this.model.prependPhotoNoteList(photoNote);
      this.view.render();
   }

   async onLoadPhotoNoteList() {
      startSpinner();
      try {
         const photoNoteList = await getPhotoNoteListFromFirestore(currentUser.uid);
         this.model.setPhotoNoteList(photoNoteList);
         stopSpinner();
      } catch (e) {
         stopSpinner();
         console.error(e);
         this.model.setPhotoNoteList([]);
         alert('Error loading photo notes');
      }
   }

   onClickCard(e) {
      const card = e.currentTarget; //Element where the event listener was attached, instead of its child.
      const docId = card.id;
      const photoNote = this.model.getPhotoNoteByDocId(docId);
      if(!photoNote) {
         console.error('onClickCard: photoNote not found', error);
         return;
      }
      //Display photoNore in the edit modal
      const form = document.forms.formEdit;
      form.caption.value = photoNote.caption;
      form.description.value = photoNote.description;
      form.sharedWith.value = photoNote.sharedWith;
      const img = form.querySelector('img');
      img.src = photoNote.imageURL;
      form.onsubmit = function(e) {
         e.preventDefault();
         this.onSubmitEditForm(e, photoNote);
      }.bind(this);

      // Display the modal
      const modal = bootstrap.Modal.getOrCreateInstance(
         document.getElementById('modal-edit')
      );
      modal.show();
   }

   async onSubmitEditForm(e, photoNote) {
      const form = document.forms.formEdit;
      const r = PhotoNote.validateSharedWith(form.sharedWith.value);
      //Validate sharedWith
      if (r != '' ) {
         alert(`ShareWith: Invalid email address: ${r}`);
         return;
      }
      const caption = form.caption.value;
      const description = form.description.value;
      const sharedWith = PhotoNote.parseSharedWith(form.sharedWith.value);
      //Verify if any changes were made
      if(caption == photoNote.caption && description == photoNote.description &&
         sharedWith.sort().join(';') == photoNote.sharedWith.sort().join(';')) {
         //No changes => dismiss the modal.
         console.log('No change.');
         document.getElementById('modal-edit-close-button').click();
         return;
      }
      
      const update = { caption, description, sharedWith,
         timestamp: Date.now() };
      startSpinner();
      try {
         await updatePhotoNoteInFirestore(photoNote.docId, update);
         this.model.updatePhotoNoteList(photoNote, update);
         this.model.orderPhotoNoteListByTimestamp();
         // Dismiss modal
         document.getElementById('modal-edit-close-button').click();
         this.view.render();
         stopSpinner();
      } catch (e) {
         stopSpinner();
         console.error(e);
         alert('Error updating photo note');
         return;
      }
   }

   //Delete photonote
   async onRightClickCard(e) {
      e.preventDefault();     //Prevent context menu from appearing.
      const card = e.currentTarget;
      const docId = card.id;
      console.log('onRightClickCard', docId)
      const photoNote = this.model.getPhotoNoteByDocId(docId);
      if (!photoNote) {
         console.error('onRightClickCard: photoNote not defined', docId);
         return;
      }
      //Confirm delete
      if(!confirm('Delete this photo note?')) {
         return; //Cancel delete
      }
      startSpinner();
      try {
         await deletePhotoNoteInFirestore(photoNote.docId);
         this.model.removePhotoNoteByDocId(photoNote.docId);
         await deleteImageFromCloudStorage(photoNote.imageName);
         stopSpinner();
         this.view.render();
      } catch (e) {
         stopSpinner(0);
         console.error(e);
         alert('Error deleting photo note');
         return;
      }
   }
}