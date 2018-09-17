import * as NoteActions from './actions/NoteActions';
import * as SessionActions from './actions/SessionActions';
import store from './store';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export function API() {
  this.authRequired = true;

  const app = firebase.initializeApp({
    apiKey: 'AIzaSyBGVurJbad_oh6gs5jorT2Y7fSdiE_0W-c',
    authDomain: 'qdsndc.firebaseapp.com',
    databaseURL: 'https://qdsndc.firebaseio.com',
  });

  const database = app.database();

  this.noteRef = database.ref('/notes/');

  if (this.authRequired) {
    firebase.auth().onAuthStateChanged(user => {
      store.dispatch({
        type: user ? SessionActions.LOGIN_SUCCESS : SessionActions.LOGOUT,
        payload: user,
      });
    });
  }
}

Object.assign(API.prototype, {
  subscribe() {
    let initialDataLoaded = false;

    this.noteRef.once('value', snapshot => {
      store.dispatch({
        type: NoteActions.FETCH_SUCCESS,
        payload: snapshot.val(),
      });
      initialDataLoaded = true;
    });

    this.noteRef.on('child_added', snapshot => {
      if (initialDataLoaded) {
        const payload = snapshot.val();
        payload.id = snapshot.key;
        store.dispatch({
          type: NoteActions.ADD_SUCCESS,
          payload,
        });
      }
    });

    this.noteRef.on('child_removed', snapshot => {
      store.dispatch({
        type: NoteActions.DESTROY_SUCCESS,
        payload: { id: snapshot.key },
      });
    });

    this.noteRef.on('child_changed', snapshot => {
      const payload = snapshot.val();
      payload.id = snapshot.key;
      store.dispatch({
        type: NoteActions.UPDATE_SUCCESS,
        payload,
      });
    });
  },

  unsubscribe() {
    this.noteRef.off('child_added');
    this.noteRef.off('child_changed');
    this.noteRef.off('child_removed');
  },

  createNote(content) {
    this.noteRef.push({
      content,
      createdAt: new Date().toISOString(),
      hidden: false,
    });
  },

  destroyNote(id) {
    this.noteRef.child(id).remove();
  },

  updateNote(id, data) {
    this.noteRef.child(id).update(data);
  },

  login(username, password) {
    return firebase.auth().signInWithEmailAndPassword(username, password);
  },

  logout() {
    firebase.auth().signOut();
  },
});

export default new API();
