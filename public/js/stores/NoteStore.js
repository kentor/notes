var Markdown  = require('pagedown');
var mergeInPlace = require('merge');

var Reflux = require('reflux');
var NoteActions = require('../actions/NoteActions');

var _noteByName = {};
var _notes = [];

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
    return _notes;
  },

  clearAll: function() {
    _noteByName = {};
    _notes = [];
  },

  onNoteAdded: function(snapshot) {
    console.log('onNoteAdded Called');
    var note = transformSnapshotToNote(snapshot);
    _noteByName[note.name] = note;
    _notes.push(note);
    _notes.sort(function(a, b) { return a.createdAt > b.createdAt ? -1 : 1 });
    this.triggerAsync();
  },

  onNoteRemoved: function(noteName) {
    _notes = _notes.filter(function(note) {
      return note.name !== noteName;
    });
    delete _noteByName[noteName];
    this.triggerAsync();
  },

  onNoteChanged: function(noteName, note) {
    mergeInPlace(_noteByName[noteName], note);
    _noteByName[noteName].localHidden = note.hidden;
    this.triggerAsync();
  },
});

module.exports = NoteStore;
