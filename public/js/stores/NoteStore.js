var Markdown  = require('pagedown');
var mergeInPlace = require('merge');
var Immutable = require('immutable');

var Reflux = require('reflux');
var NoteActions = require('../actions/NoteActions');

var _notesByName = Immutable.OrderedMap();

function transformSnapshotToNote(snapshot) {
  var note = snapshot.val();
  note.name = snapshot.name();
  note.content = Markdown.getSanitizingConverter().makeHtml(note.content);
  note.createdAt = new Date(note.createdAt);
  note.localHidden = note.hidden;
  note.style = { background: 'hsl(' + Math.floor(Math.random()*360) + ',100%,87.5%)' };
  return note;
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
    _notesByName = _notesByName.set(note.name, note);
    this.triggerAsync();
  },

  onNoteRemoved: function(noteName) {
    _notesByName = _notesByName.remove(noteName);
    this.triggerAsync();
  },

  onNoteChanged: function(noteName, note) {
    mergeInPlace(_notesByName.get(noteName), note);
    _notesByName.get(noteName).localHidden = note.hidden;
    this.triggerAsync();
  },
});

module.exports = NoteStore;
