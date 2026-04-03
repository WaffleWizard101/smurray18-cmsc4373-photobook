import {
   addDoc,
   getFirestore,
   collection,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js"
import { app } from "./firebase_core.js"

const db = getFirestore(app);

const PHOTONOTE_COLLECTION = 'photonotes';

export async function addPhotoNoteToFirestore(photoNote) {
   const collRef = collection(db, PHOTONOTE_COLLECTION);
   const docRef = await addDoc(collRef, photoNote.toFirestore());
   return docRef.id;
}