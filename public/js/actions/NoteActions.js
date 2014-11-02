var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'noteAdded',
  'noteRemoved',
  'noteChanged',
]);

module.exports = Actions;
