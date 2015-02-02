import API from '../api';
import Reflux from 'reflux';

var NoteActions = Reflux.createActions([
  'createNote',
  'deleteNote',
  'expandAll',
  'resetLocalHidden',
  'toggleLocalHidden',
  'updateNote',
]);

NoteActions.createNote.listen((data) => {
  API.createNote(data);
});

NoteActions.deleteNote.listen((name) => {
  API.deleteNote(name);
});

NoteActions.updateNote.listen((name, data) => {
  API.updateNote(name, data);
});

export default NoteActions;
