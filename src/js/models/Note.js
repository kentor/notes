import Immutable from 'immutable';

const Note = Immutable.Record({
  content: '',
  createdAt: new Date(),
  hidden: false,
  id: '',
});

export default Note;
