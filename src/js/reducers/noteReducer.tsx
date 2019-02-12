import fromEntries from 'App/lib/fromEntries';
import {Note, AllActions, StateShape} from 'App/types';

const initialState = {
  items: {},
  loaded: false,
};

export default function noteReducer(
  state: StateShape['notes'] = initialState,
  action: AllActions,
): StateShape['notes'] {
  switch (action.type) {
    case 'NoteListFetched':
      return {
        items: fromEntries(
          action.payload
            .slice()
            .sort((noteA, noteB) =>
              noteA.createdAt.localeCompare(noteB.createdAt),
            )
            .map<[string, Note]>((note) => [note.id, note]),
        ),
        loaded: true,
      };
    case 'NoteRetrieved':
      return {
        ...state,
        items: {...state.items, [action.payload.id]: action.payload},
      };
    case 'NoteDeleted': {
      const {[action.payload.id]: deletedNote, ...rest} = state.items;
      return {...state, items: rest};
    }
    default:
      return state;
  }
}
