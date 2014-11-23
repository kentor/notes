var BgGen     = require('../bg-gen');
var Immutable = require('immutable');

var Reflux = require('reflux');
var NoteActions = require('../actions/NoteActions');

var _notesByName = Immutable.OrderedMap();

var localNotes = localStorage && localStorage['notes'];
if (localNotes) {
  _notesByName = _notesByName.mergeDeep(JSON.parse(localNotes));
}

function transformSnapshotToNote(snapshot) {
  var note = snapshot.val();

  note.name = snapshot.name();
  note.createdAt = new Date(note.createdAt);
  note.localHidden = note.hidden;

  var noteInLocalStorage = _notesByName.get(note.name);
  var style = (noteInLocalStorage && noteInLocalStorage.get('style'))
    || Immutable.Map((new BgGen()).toStyle());
  note.style = style;

  return Immutable.Map(note);
}

var NoteStore = Reflux.createStore({
  listenables: NoteActions,

  getAll: function() {
    return _notesByName;
  },

  clearAll: function() {
    _notesByName = Immutable.OrderedMap();
  },

  onNoteAdded: function(snapshot) {
    var note = transformSnapshotToNote(snapshot);
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
