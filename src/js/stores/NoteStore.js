var BgGen     = require('../bg-gen');
var Immutable = require('immutable');

var Reflux = require('reflux');
var NoteActions = require('../actions/NoteActions');

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

  return Immutable.Map(note);
}

var NoteStore = Reflux.createStore({
  listenables: NoteActions,

  getAll: function() {
    return _notesByName.size !== 0 ? _notesByName : coldNotesByName;
  },

  clearAll: function() {
    _notesByName = Immutable.OrderedMap();
  },

  persist: function() {
    localStorage.notes = JSON.stringify(this.getAll());
  },

  onNoteAdded: function(noteName, note) {
    note = deserializeNote(noteName, note);
    _notesByName = _notesByName.set(note.get('name'), note);
    this.triggerAsync();
  },

  onNoteRemoved: function(noteName) {
    _notesByName = _notesByName.remove(noteName);
    this.triggerAsync();
  },

  onNoteChanged: function(noteName, note) {
    var newNote = _notesByName.get(noteName).merge(note);
    newNote = newNote.set('localHidden', note.hidden);
    _notesByName = _notesByName.set(noteName, newNote);
    this.triggerAsync();
  },

  onToggleLocalHidden: function(note) {
    var newNote = note.set('localHidden', !note.get('localHidden'));
    _notesByName = _notesByName.set(note.get('name'), newNote);
    this.triggerAsync();
  }
});

module.exports = NoteStore;
