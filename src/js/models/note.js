var Immutable = require('immutable');

var Note = Immutable.Record({
  name: '',
  className: '',
  content: '',
  createdAt: new Date(),
  hidden: false,
  localHidden: false,
});

module.exports = Note;
