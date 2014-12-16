var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'noteAdded',
  'noteRemoved',
  'noteChanged',
  'toggleLocalHidden',
]);

module.exports = Actions;
