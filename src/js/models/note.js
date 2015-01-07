import Immutable from 'immutable';

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

export default Note;
