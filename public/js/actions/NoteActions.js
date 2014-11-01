var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var NoteActions = {
  add: function(snapshot) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NOTE_ADDED,
      snapshot: snapshot,
    });
  },

  remove: function(noteName) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NOTE_REMOVED,
      noteName: noteName,
    });
  },

  change: function(noteName, note) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NOTE_CHANGED,
      noteName: noteName,
      note: note,
    });
  }
};

module.exports = NoteActions;
