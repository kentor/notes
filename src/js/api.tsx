import {
  noteDeleted,
  noteListFetched,
  noteRetrieved,
  sessionLoggedIn,
  sessionLoggedOut,
  store,
} from 'App/store';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore';
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {Note, NoteExtractor} from 'App/types';

const app = initializeApp({
  apiKey: 'AIzaSyBGVurJbad_oh6gs5jorT2Y7fSdiE_0W-c',
  authDomain: 'qdsndc.firebaseapp.com',
  projectId: 'qdsndc',
});

const db = getFirestore(app);
const notesCollection = collection(db, 'notes');

export const authRequired = true;

let auth: Auth | undefined;
if (authRequired) {
  auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(sessionLoggedIn({uid: user.uid}));
    } else {
      store.dispatch(sessionLoggedOut());
    }
  });
}

function extractNote(id: string, data: DocumentData): Note | undefined {
  const maybeNote = NoteExtractor.safeParse({
    ...data,
    createdAt: new Date(data.createdAt.seconds * 1000).toISOString(),
    id: id,
  });

  if (maybeNote.success) {
    return maybeNote.data;
  }

  console.error(`Note extraction error, please check the note with id ${id}`);
}

export function subscribe(): Unsubscribe {
  let isInitial = true;
  const q = query(notesCollection, orderBy('createdAt'));
  return onSnapshot(q, (querySnapshot) => {
    if (isInitial) {
      isInitial = false;
      const notes: Array<Note> = [];
      querySnapshot.forEach((doc) => {
        const note = extractNote(doc.id, doc.data());
        if (!note) return;
        notes.push(note);
      });
      store.dispatch(noteListFetched(notes));
    } else {
      querySnapshot.docChanges().forEach((change) => {
        const note = extractNote(change.doc.id, change.doc.data());
        if (!note) return;
        if (change.type === 'added' || change.type === 'modified') {
          store.dispatch(noteRetrieved(note));
        } else if (change.type === 'removed') {
          store.dispatch(noteDeleted(note));
        }
      });
    }
  });
}

export function createNote(content: string) {
  addDoc(notesCollection, {
    content,
    createdAt: Timestamp.now(),
    hidden: false,
  });
}

export function updateNote(id: string, updates: Pick<Note, 'hidden'>) {
  updateDoc(doc(db, 'notes', id), updates);
}

export function deleteNote(id: string) {
  deleteDoc(doc(db, 'notes', id));
}

export function login(email: string, password: string) {
  if (!auth) {
    throw new Error('Called login without having an auth.');
  }
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  if (!auth) {
    throw new Error('Called logout without having an auth.');
  }
  signOut(auth);
}
