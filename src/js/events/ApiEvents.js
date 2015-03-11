var Reflux = require('reflux');

var ApiEvents = Reflux.createActions([
  'loggedIn',
  'loggedOut',
  'noteAdded',
  'noteChanged',
  'noteRemoved',
]);

module.exports = ApiEvents;
