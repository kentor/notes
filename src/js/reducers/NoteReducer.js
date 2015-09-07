import * as NoteActions from '../actions/NoteActions';
import Immutable from 'immutable';
import Note from '../models/Note';
import { wrapReducer } from '../lib/redux-utils';

const initialState = Immutable.Map({
  items: Immutable.OrderedMap(),
  loaded: false,
  localHidden: Immutable.Map(),
});

function NoteReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case NoteActions.ADD_SUCCESS:
      return state.update('items', v => v.set(payload.id, new Note(payload)));

    case NoteActions.DESTROY_SUCCESS:
      return state.update('items', v => v.delete(payload.id));

    case NoteActions.FETCH_SUCCESS:
      return state.set('loaded', true).set('items', hydrateNotes(payload));

    case NoteActions.HYDRATE:
      return state.set('items', hydrateNotes(payload));

    case NoteActions.TOGGLE_LOCAL_HIDDEN:
      if (state.getIn(['localHidden', payload.id]) === undefined) {
        return state.setIn(['localHidden', payload.id], !payload.hidden);
      }
      return state.updateIn(['localHidden', payload.id], v => !v);

    case NoteActions.UPDATE_SUCCESS:
      if (payload.hidden !== state.getIn(['items', payload.id, 'hidden'])) {
        state = state.deleteIn(['localHidden', payload.id]);
      }
      return state.update('items', v => v.set(payload.id, new Note(payload)));

    default:
      return state;
  }
}

function hydrateNotes(payload) {
  return Immutable.OrderedMap(payload).map((json, id) => {
    json.id = id;
    return new Note(json);
  });
}

export default wrapReducer(NoteReducer);
