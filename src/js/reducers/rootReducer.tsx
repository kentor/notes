import noteReducer from 'App/reducers/noteReducer';
import sessionReducer from 'App/reducers/sessionReducer';
import {AllActions, StateShape, StateShapeExtractor} from 'App/types';
import {combineReducers} from 'redux';

const combinedReducers = combineReducers<StateShape, AllActions>({
  notes: noteReducer,
  session: sessionReducer,
});

function rootReducer(
  state: StateShape | undefined,
  action: AllActions,
): StateShape {
  if (action.type === 'Init') {
    let state = combinedReducers(undefined, action);
    try {
      const stateFromLocalStorage = JSON.parse(
        window.localStorage.getItem('state') || '',
      );
      const result = StateShapeExtractor.parse(stateFromLocalStorage);
      state = {
        ...state,
        notes: {
          ...state.notes,
          items: result.notes.items,
        },
        session: result.session,
      };
    } catch (e) {
      // ignore hydration
      console.log(e);
    }
    return state;
  }

  return combinedReducers(state, action);
}

export default rootReducer;
