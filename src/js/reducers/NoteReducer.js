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
      return state.setIn(['items', payload.id], new Note(payload));

    case NoteActions.DESTROY_SUCCESS:
      return state.deleteIn(['items', payload.id]);

    case NoteActions.FETCH_SUCCESS:
      return state.set('loaded', true).set('items', hydrateNotes(payload));

    case NoteActions.HYDRATE:
      return state.set('items', hydrateNotes(payload));

    case NoteActions.TOGGLE_LOCAL_HIDDEN:
      return state.updateIn(
        ['localHidden', payload.id],
        payload.hidden,
        v => !v
      );

    case NoteActions.UPDATE_SUCCESS:
      return state.withMutations(s => {
        if (payload.hidden !== s.getIn(['items', payload.id, 'hidden'])) {
          s.deleteIn(['localHidden', payload.id]);
        }
        s.setIn(['items', payload.id], new Note(payload));
      });

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
