import firebase, {firestore} from 'firebase/app';
import store from 'App/store';
import {Note, NoteExtractor} from 'App/types';

import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyBGVurJbad_oh6gs5jorT2Y7fSdiE_0W-c',
  authDomain: 'qdsndc.firebaseapp.com',
  projectId: 'qdsndc',
});

const db = firebase.firestore();
const notesCollection = db.collection('notes');

export const authRequired = true;

if (authRequired) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch({type: 'SessionLoggedIn', payload: user});
    } else {
      store.dispatch({type: 'SessionLoggedOut'});
    }
  });
}

function extractNote(
  id: string,
  data: firestore.DocumentData,
): Note | undefined {
  const noteExtraction = NoteExtractor.decode({
    ...data,
    createdAt: new Date(data.createdAt.seconds * 1000).toISOString(),
    id: id,
  });

  if (noteExtraction.isRight()) {
    return noteExtraction.value;
  }

  console.error(`Note extraction error, please check the note with id ${id}`);
}

export function subscribe() {
  let isInitial = true;
  return notesCollection
    .orderBy('createdAt', 'desc')
    .onSnapshot((querySnapshot) => {
      if (isInitial) {
        isInitial = false;
        const notes: Array<Note> = [];
        querySnapshot.forEach((doc) => {
          const note = extractNote(doc.id, doc.data());
          if (!note) return;
          notes.push(note);
        });
        store.dispatch({type: 'NoteListFetched', payload: notes});
      } else {
        querySnapshot.docChanges().forEach((change) => {
          const note = extractNote(change.doc.id, change.doc.data());
          if (!note) return;
          if (change.type === 'added' || change.type === 'modified') {
            store.dispatch({type: 'NoteRetrieved', payload: note});
          } else if (change.type === 'removed') {
            store.dispatch({type: 'NoteDeleted', payload: note});
          }
        });
      }
    });
}

export function createNote(content: string) {
  notesCollection.add({
    content,
    createdAt: firestore.Timestamp.now(),
    hidden: false,
  });
}

export function updateNote(id: string, updates: Pick<Note, 'hidden'>) {
  notesCollection.doc(id).update(updates);
}

export function deleteNote(id: string) {
  notesCollection.doc(id).delete();
}

export function login(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  firebase.auth().signOut();
}
