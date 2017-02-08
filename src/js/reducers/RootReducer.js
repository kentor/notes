import Immutable from 'immutable';
import NoteReducer from './NoteReducer';
import SessionReducer from './SessionReducer';

export default function RootReducer(state = Immutable.Map(), action) {
  return state.withMutations(s => {
    s.set('notes', NoteReducer(state.get('notes'), action));
    s.set('session', SessionReducer(state.get('session'), action));
  });
}
