import ApiEvents from './events/ApiEvents';
import { firebaseRef } from './appconfig';

var ref = firebaseRef;
var noteRef = firebaseRef.child('notes');

var API = {
  start() {
    noteRef.on('child_added', (snapshot) => {
      var noteName = snapshot.key();
      var note = snapshot.val();
      ApiEvents.noteAdded(noteName, note);
    });

    noteRef.on('child_removed', (snapshot) => {
      var noteName = snapshot.key();
      ApiEvents.noteRemoved(noteName);
    });

    noteRef.on('child_changed', (snapshot) => {
      var noteName = snapshot.key();
      var note = snapshot.val();
      ApiEvents.noteChanged(noteName, note);
    });
  },

  stop() {
    noteRef.off('child_added');
    noteRef.off('child_removed');
    noteRef.off('child_changed');
  },

  createNote(data) {
    noteRef.push(data);
  },

  deleteNote(name) {
    noteRef.child(name).remove();
  },

  updateNote(name, data) {
    noteRef.child(name).update(data);
  },

  authenticate() {
    ref.onAuth(jsonUser => {
      if (jsonUser) {
        ApiEvents.loggedIn(jsonUser);
      } else {
        ApiEvents.loggedOut();
      }
    });
  },

  login() {
    ref.authWithOAuthRedirect('twitter', () => {});
  },

  logout() {
    ref.unauth();
  },
};

export default API;
