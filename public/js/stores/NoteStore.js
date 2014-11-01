var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Markdown  = require('pagedown');
var merge = require('react/lib/merge');
var mergeInPlace = require('merge');

var CHANGE_EVENT = 'change';

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

var NoteStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return _notes;
  },

  clearAll: function() {
    _noteByName = {};
    _notes = [];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case AppConstants.NOTE_ADDED:
      var note = transformSnapshotToNote(action.snapshot);
      _noteByName[note.name] = note;
      _notes.push(note);
      _notes.sort(function(a, b) { return a.createdAt > b.createdAt ? -1 : 1 });
      break;

    case AppConstants.NOTE_REMOVED:
      _notes = _notes.filter(function(note) {
        return note.name !== action.noteName;
      });
      delete _noteByName[action.noteName];
      break;

    case AppConstants.NOTE_CHANGED:
      mergeInPlace(_noteByName[action.noteName], action.note);
      _noteByName[action.noteName].localHidden = action.note.hidden;
      break;

    default:
      return true;
  }

  NoteStore.emitChange();

  return true;
});

module.exports = NoteStore;
