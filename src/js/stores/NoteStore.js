var ApiEvents = require('../events/ApiEvents');
var Immutable = require('immutable');
var localStorage = require('./localStorage');
var Note = require('../models/note');
var NoteActions = require('../actions/NoteActions');
var Reflux = require('reflux');

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

  onExpandAll() {
    notesByName = notesByName.map(n => n.set('localHidden', false));
    this.triggerAsync();
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

  onResetLocalHidden() {
    notesByName = notesByName.map(n => n.set('localHidden', n.get('hidden')));
    this.triggerAsync();
  },
});

module.exports = NoteStore;
