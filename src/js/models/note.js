import Immutable from 'immutable';

var Note = Immutable.Record({
  name: '',
  className: '',
  content: '',
  createdAt: new Date(),
  hidden: false,
  localHidden: false,
});

/* TODO: Fix when Immutable supports overriding serialization with toJSON
         instead of toJS */
Note.prototype.toJS = function() {
  var pojo = Immutable.Record.prototype.toJS.call(this);
  delete pojo.localHidden;
  return pojo;
};

export default Note;
