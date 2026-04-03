import {
   addDoc,
   getDocs,
   getFirestore,
   collection,
   orderBy,
   query,
   where,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js"
import { app } from "./firebase_core.js"
import { PhotoNote } from "../model/PhotoNote.js";

const db = getFirestore(app);

const PHOTONOTE_COLLECTION = 'photonotes';

export async function addPhotoNoteToFirestore(photoNote) {
   const collRef = collection(db, PHOTONOTE_COLLECTION);
   const docRef = await addDoc(collRef, photoNote.toFirestore());
   return docRef.id;
}

export async function getPhotoNoteListFromFirestore(uid) {
   let photoNoteList = [];
   const collRef = collection(db, PHOTONOTE_COLLECTION);
   const q = query(collRef,
         where('uid', '==', uid),
         orderBy('timestamp', 'desc'),
   );
   const snapshot = await getDocs(q);
   snapshot.forEach(doc => {
      const p = new PhotoNote(doc.data());
      p.set_docId(doc.id);
      photoNoteList.push(p);
   });
   return photoNoteList;
}