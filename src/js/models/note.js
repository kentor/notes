var Immutable = require('immutable');

var Note = Immutable.Record({
  name: '',
  className: '',
  content: '',
  createdAt: new Date(),
  hidden: false,
  localHidden: false,
});

Note.prototype.toJSON = function() {
  var pojo = this.toJS();
  delete pojo.localHidden;
  return pojo;
};

module.exports = Note;
