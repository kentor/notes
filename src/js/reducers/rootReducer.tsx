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
  if (action.type === '@@INIT') {
    const state = combinedReducers(undefined, action);
    try {
      const stateFromLocalStorage = JSON.parse(
        window.localStorage.getItem('state') || '',
      );
      const stateShapeExtraction = StateShapeExtractor.decode(
        stateFromLocalStorage,
      );
      if (stateShapeExtraction.isRight()) {
        return {
          ...state,
          notes: {
            ...state.notes,
            items: stateFromLocalStorage.notes.items,
          },
          session: stateFromLocalStorage.session,
        };
      }
    } catch {
      // ignore hydration
    }
    return state;
  }

  return combinedReducers(state, action);
}

export default rootReducer;
