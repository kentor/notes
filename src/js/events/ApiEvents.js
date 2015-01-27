import Reflux from 'reflux';

var ApiEvents = Reflux.createActions([
  'loggedIn',
  'loggedOut',
  'noteAdded',
  'noteChanged',
  'noteRemoved',
]);

export default ApiEvents;
