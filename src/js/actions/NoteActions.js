import Reflux from 'reflux';

var Actions = Reflux.createActions([
  'noteAdded',
  'noteRemoved',
  'noteChanged',
  'toggleLocalHidden',
]);

export default Actions;
