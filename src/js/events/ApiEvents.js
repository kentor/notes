import Reflux from 'reflux';

var ApiEvents = Reflux.createActions([
  'noteAdded',
  'noteChanged',
  'noteRemoved',
]);

export default ApiEvents;
