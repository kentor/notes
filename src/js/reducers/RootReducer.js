import Immutable from 'immutable';
import NoteReducer from './NoteReducer';
import SessionReducer from './SessionReducer';

export default function RootReducer(state = Immutable.Map(), action) {
  return Immutable.Map({
    notes: NoteReducer(state.get('notes'), action),
    session: SessionReducer(state.get('session'), action),
  });
}
