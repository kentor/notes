import ApiEvents from '../events/ApiEvents';
import BgGen from '../bg-gen';
import Immutable from 'immutable';
import Note from '../models/note';
import NoteActions from '../actions/NoteActions';
import Reflux from 'reflux';

var _notesByName = Immutable.OrderedMap();

var localNotes = localStorage && localStorage.notes;
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
    return _notesByName.size !== 0 ? _notesByName : coldNotesByName;
  },

  clearAll() {
    _notesByName = Immutable.OrderedMap();
    delete localStorage.notes;
  },

  persist() {
    localStorage.notes = JSON.stringify(this.getAll());
  },

  onNoteAdded(noteName, note) {
    note = deserializeNote(noteName, note);
    _notesByName = _notesByName.set(note.get('name'), note);
    this.triggerAsync();
  },

  onNoteRemoved(noteName) {
    _notesByName = _notesByName.remove(noteName);
    this.triggerAsync();
  },

  onNoteChanged(noteName, note) {
    var newNote = _notesByName.get(noteName).merge(note);
    newNote = newNote.set('localHidden', note.hidden);
    _notesByName = _notesByName.set(noteName, newNote);
    this.triggerAsync();
  },

  onToggleLocalHidden(note) {
    var newNote = note.set('localHidden', !note.get('localHidden'));
    _notesByName = _notesByName.set(note.get('name'), newNote);
    this.triggerAsync();
  }
});

export default NoteStore;
