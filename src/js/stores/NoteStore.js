import ApiEvents from '../events/ApiEvents';
import BgGen from '../bg-gen';
import Immutable from 'immutable';
import localStorage from './localStorage';
import Note from '../models/note';
import NoteActions from '../actions/NoteActions';
import Reflux from 'reflux';

var notesByName = Immutable.OrderedMap();

var localNotes = localStorage.getItem('notes');
var coldNotesByName = Immutable.OrderedMap();
if (localNotes) {
  coldNotesByName = coldNotesByName.mergeDeep(JSON.parse(localNotes));
}

function deserializeNote(noteName, note) {
  note.name = noteName;
  note.createdAt = new Date(note.createdAt);
  note.localHidden = note.hidden;

  var noteInColdNotes = coldNotesByName.get(note.name);

  var className = (noteInColdNotes && noteInColdNotes.get('className')) ||
    (new BgGen()).toClassName();
  note.className = className;

  return new Note(note);
}

var NoteStore = Reflux.createStore({
  listenables: [ApiEvents, NoteActions],

  getAll() {
    return notesByName.size ? notesByName : coldNotesByName;
  },

  clearAll() {
    notesByName = Immutable.OrderedMap();
    localStorage.removeItem('notes');
  },

  persist() {
    localStorage.setItem('notes', JSON.stringify(this.getAll()));
  },

  onNoteAdded(noteName, note) {
    note = deserializeNote(noteName, note);
    notesByName = notesByName.set(note.get('name'), note);
    this.triggerAsync();
  },

  onNoteRemoved(noteName) {
    notesByName = notesByName.remove(noteName);
    this.triggerAsync();
  },

  onNoteChanged(noteName, note) {
    this.onNoteAdded(noteName, note);
  },

  onToggleLocalHidden(noteName) {
    notesByName = notesByName.updateIn([noteName, 'localHidden'], v => !v);
    this.triggerAsync();
  },
});

export default NoteStore;
