import ApiEvents from './events/ApiEvents';
import { firebaseRef } from './appconfig';

var ref = firebaseRef.child('notes');

var API = {
  start() {
    ref.on('child_added', (snapshot) => {
      var noteName = snapshot.key();
      var note = snapshot.val();
      ApiEvents.noteAdded(noteName, note);
    });

    ref.on('child_removed', (snapshot) => {
      var noteName = snapshot.key();
      ApiEvents.noteRemoved(noteName);
    });

    ref.on('child_changed', (snapshot) => {
      var noteName = snapshot.key();
      var note = snapshot.val();
      ApiEvents.noteChanged(noteName, note);
    });
  },

  stop() {
    ref.off('child_added');
    ref.off('child_removed');
    ref.off('child_changed');
  },

  createNote(data) {
    ref.push(data);
  },

  deleteNote(name) {
    ref.child(name).remove();
  },

  updateNote(name, data) {
    ref.child(name).update(data);
  },
};

export default API;
